import fs from 'fs';
import qr from 'qr-image';
import { createRequire } from 'module';
import { EmbedBuilder , AttachmentBuilder } from 'discord.js';
import { checkCommand } from '../../utils/check.js';

const require = createRequire(import.meta.url);
const config = require('../../config.json');

function errorContent(content) {
  let emBed = new EmbedBuilder()
  .setColor('Red')
  .setDescription(content);
  return emBed;
}

async function QR(text) {
    const qr_png = qr.image(text, { type: 'png' });
    const qrPath = './qr.png';
    const qrStream = fs.createWriteStream(qrPath);
    
    return new Promise((resolve, reject) => {
      qrStream.on('finish', resolve);
      qrStream.on('error', reject);
      qr_png.pipe(qrStream);
    });
  }

  async function Qr(message, client) {
    const content = message.content.toLowerCase();
    if (checkCommand("qr", content, client.user.id)) {
      const regex = new RegExp(`^(${config.prefix}qr|<@!?${client.user.id}>\\s?qr)`, 'i');
      const matched = content.match(regex);
      let args = "";
      if (matched) {
        args = content.slice(matched[0].length).trim();
      }

      if (args.length > 0) {
        await QR(args);
        const file = new AttachmentBuilder('./qr.png');
        message.channel.send({
            files: [file],
            embeds: [
              new EmbedBuilder()
                .setColor('Random')
                .setDescription(`**Mã QR**: ${args} __*Tự động xóa sau 10p.*__`)
                .setImage('attachment://qr.png')
            ]
          })
            .then((sentMessage) => {
                fs.unlinkSync('./qr.png');
                setTimeout(() => {
                  sentMessage.delete().catch(console.error);
                }, 600000);
          }).catch(console.error);
      } else {
        await message.reply({
          embeds: [errorContent(`**${config.prefix}qr <nội dung>**: __*Tạo mã QR.*__`)]
        }).catch(console.error);
      }
    }
  }

  export default Qr;