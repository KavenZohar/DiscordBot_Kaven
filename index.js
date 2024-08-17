import dotenv from "dotenv";
dotenv.config();

// Server
import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.send(".");
});
app.listen(process.env.PORT, () => {
  console.log(`Port : ${process.env.PORT}`);
});

// Bot
import { createRequire } from 'module';
import fs from 'fs';
import { Client, GatewayIntentBits, EmbedBuilder , AttachmentBuilder } from 'discord.js';
import { Command } from './src/command/command.js';

const require = createRequire(import.meta.url);
const config = require('./config.json');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});


client.on('ready', () => {
  console.log(`Đã đăng nhập vào ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();

  if (content.startsWith(`${config.prefix}food`) || content.startsWith(`<@${client.user.id}>food`) || content.startsWith(`<@${client.user.id}> food`)) {
    const food = await Command.food();
    await message.channel.send({embeds: [food]}).catch((error) => {
      console.error(error);
    });
  };

  if (content.startsWith(`${config.prefix}help`) || content.startsWith(`<@${client.user.id}>help`) || content.startsWith(`<@${client.user.id}> help`)) {
    const help = Command.help();
    await message.channel.send({embeds: [help]}).catch((error) => {
      console.error(error);
    });
  }

  if (content.startsWith(`${config.prefix}qr`) || content.startsWith(`<@${client.user.id}>qr`) || content.startsWith(`<@${client.user.id}> qr`)) {
    const regex = new RegExp(`^(${config.prefix}qr|<@!?${client.user.id}>\\s?qr)`, 'i');
    const matched = content.match(regex);
    let args = "";
    if (matched) {
      args = content.slice(matched[0].length).trim();
    }

    if (args.length > 0) {
      await Command.qr(args);
      const file = new AttachmentBuilder('./qr.png');
      const embedMessage = new EmbedBuilder()
          .setColor('Random')
          .setDescription(`**Mã QR**: ${args} __*Tự động xóa sau 10p.*__`)
          .setImage('attachment://qr.png');
      await message.channel.send({files: [file], embeds: [embedMessage] }).then((sentMessage) => {
        fs.unlinkSync('./qr.png');
        setTimeout(() => {
          sentMessage.delete().catch(console.error);
        }, 600000);
      }).catch(console.error);
    } else {
      await message.reply({embeds: [errorContent(`**${config.prefix}qr <nội dung>**: __*Tạo mã QR.*__`)]}).catch(console.error);
    }

  }


});


function errorContent(content) {
  let emBed = new EmbedBuilder()
  .setColor('Red')
  .setDescription(content);
  return emBed;
}

client.login(process.env.TOKEN);