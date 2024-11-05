import { createRequire } from 'module';
import Gemini from "../GeminiAI/gemini.js";
import { check } from "../../utils/check.js";

const require = createRequire(import.meta.url);
const config = require('../../config.json');

async function AI(message, client) {
    const content = message.content.toLowerCase();
    if (message.mentions.has(client.user)) {
        if (content.includes("@everyone" || content.includes("@here"))) return;
        if (check(content, client.user.id)) return;

        const regex = new RegExp(`<@!?${client.user.id}>`, 'g');
        const text = content.replace(regex, '')
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
    } else if (message.channelId === config.botChannelId) {
        if (check(content, client.user.id)) return;
        try {
          const Message = await Gemini(content);
          message.reply(Message);
        } catch (error) {
          message.channel.send(`Error: ${error}`);
        }
    }

}

export default AI;