import { EmbedBuilder } from 'discord.js';
import { Foods } from '../modules/foods.js';

export async function food() {
    let random = Math.floor(Math.random() * Foods.length);
    let food = Foods[random];
    return new EmbedBuilder()
      .setColor('Random')
      .setTitle(food.name)
      .setImage(food.image);
  }