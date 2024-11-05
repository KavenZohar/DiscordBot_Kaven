import { EmbedBuilder } from 'discord.js';
import Helps from '../components/helps.js';
import { checkCommand } from '../../utils/check.js';

function help() {
    let help = Helps;
    return new EmbedBuilder()
      .setColor("#00c6ff")
      .setTitle(help.title)
      .setDescription(help.help);
  }

async function Help(message, client) {
  const content = message.content.toLowerCase();
  if (checkCommand("help", content, client.user.id)) {
    const Help = help();
    await message.channel.send({embeds: [Help]}).catch((error) => {
      console.error(error);
    });
  }
}

export default Help;