import fs from 'fs';
import { createRequire } from 'module';
import { EmbedBuilder , AttachmentBuilder } from 'discord.js';
import checkCommand from './check.js';
import food from '../src/commands/food.js';
import help from '../src/commands/help.js';
import QR from '../src/commands/qr.js';
import Gemini from '../src/GeminiAI/gemini.js';

const require = createRequire(import.meta.url);
const config = require('../config.json');
let client;

function errorContent(content) {
  let emBed = new EmbedBuilder()
  .setColor('Red')
  .setDescription(content);
  return emBed;
}

function app(Client) {
  client = Client;
}

const messageEvent = async (message) => {
        if (message.author.bot) return;
  
        // command
        const content = message.content.toLowerCase();
  
        if (checkCommand.food(content, client.user.id)) {
              const Food = await food();
              await message.channel.send({embeds: [Food]}).catch((error) => {
                console.error(error);
              });
        };
  
        if (checkCommand.help(content, client.user.id)) {
              const Help = help();
              await message.channel.send({embeds: [Help]}).catch((error) => {
                console.error(error);
              });
        }
  
        if (checkCommand.qr(content, client.user.id)) {
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
  
        if (message.mentions.has(client.user)) {
              if (content.includes("@everyone" || content.includes("@here"))) return;
              for (const key in checkCommand) {
                  if (checkCommand[key](content, client.user.id)) {
                      return;
                  }
              }
              const regex = new RegExp(`<@!?${client.user.id}>`, 'g');
              const text = message.content.replace(regex, '')
                      .trim()
                      .replace(/\s+/g, ' ');
              if (text.length > 0) {
                try {
                    const Message = await Gemini(text);
                    message.reply(Message);
                } catch (error) {
                    message.channel.send(`Error: ${error}`);
                }
              }
        }
    // command end
  
    // AI
    if (message.channelId === config.botChannelId) {
        try {
          const Message = await Gemini(message.content);
          message.reply(Message);
        } catch (error) {
          message.channel.send(`Error: ${error}`);
        }
    }
}

export { messageEvent, app};