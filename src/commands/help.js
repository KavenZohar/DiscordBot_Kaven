import { EmbedBuilder } from 'discord.js';
import Help from '../components/help.js';

function help() {
    let help = Help;
    return new EmbedBuilder()
      .setColor("#00c6ff")
      .setTitle(help.title)
      .setDescription(help.help);
  }

export default help;