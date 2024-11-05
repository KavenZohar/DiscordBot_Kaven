import { EmbedBuilder } from 'discord.js';
import Foods from '../components/foods.js';
import { checkCommand } from '../../utils/check.js';

async function food() {
    let random = Math.floor(Math.random() * Foods.length);
    let food = Foods[random];
    return new EmbedBuilder()
      .setColor('Random')
      .setTitle(food.name)
      .setImage(food.image);
  }

async function Food(message, client) {
        const content = message.content.toLowerCase();
        if (checkCommand("food", content, client.user.id)) {
          const Food = await food();
          await message.channel.send({embeds: [Food]}).catch((error) => {
            console.error(error);
          });
      };
  }

export default Food;