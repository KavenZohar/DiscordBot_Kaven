import fs from 'fs';
import qr from 'qr-image';
import { EmbedBuilder } from 'discord.js';
import { Foods } from '../modules/foods.js';
import { Help } from '../modules/help.js';

export class Command {

    // food
    static async food() {
        let random = Math.floor(Math.random() * Foods.length);
        let food = Foods[random];
        let emBed = new EmbedBuilder()
          .setColor('Random')
          .setTitle(food.name)
          .setImage(food.image);
        return emBed;
      }

    // help
    static help() {
      let help = Help;
      let emBed = new EmbedBuilder()
        .setColor("#00c6ff")
        .setTitle(help.title)
        .setDescription(help.help);
      return emBed;
    }

    //qr
    static async qr(content) {
      const qr_png = qr.image(content, { type: 'png' });
      const qrPath = './qr.png';
      const qrStream = fs.createWriteStream(qrPath);
      
      return new Promise((resolve, reject) => {
        qrStream.on('finish', resolve);
        qrStream.on('error', reject);
        qr_png.pipe(qrStream);
      });
    }

};