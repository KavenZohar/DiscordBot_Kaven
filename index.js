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
import { Command } from './utils/command.js';
import { gemini } from './src/GeminiAI/gemini.js';

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

      // command
      const content = message.content.toLowerCase();

      if (Command.check.food(content, client.user.id)) {
            const food = await Command.foods();
            await message.channel.send({embeds: [food]}).catch((error) => {
              console.error(error);
            });
      };

      if (Command.check.help(content, client.user.id)) {
            const help = Command.help();
            await message.channel.send({embeds: [help]}).catch((error) => {
              console.error(error);
            });
      }

      if (Command.check.qr(content, client.user.id)) {
            const regex = new RegExp(`^(${config.prefix}qr|<@!?${client.user.id}>\\s?qr)`, 'i');
            const matched = content.match(regex);
            let args = "";
            if (matched) {
              args = content.slice(matched[0].length).trim();
            }

            if (args.length > 0) {
              await Command.qr(args);
              const file = new AttachmentBuilder('./qr.png');
              await message.channel.send({
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
            for (const key in Command.check) {
                if (Command.check[key](content, client.user.id)) {
                    return;
                }
            }
            const regex = new RegExp(`<@!?${client.user.id}>`, 'g');
            const text = message.content.replace(regex, '')
                    .trim()
                    .replace(/\s+/g, ' ');
            if (text.length > 0) {
              try {
                  const Message = await gemini(text);
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
        const Message = await gemini(message.content);
        message.reply(Message);
      } catch (error) {
        message.channel.send(`Error: ${error}`);
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