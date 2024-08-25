import { food } from '../src/command/food.js';
import { help } from '../src/command/help.js';
import { QR } from '../src/command/qr.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const config = require('../config.json');

export class Command {
        static check = {
            food(content, id) {
                if (content.startsWith(`${config.prefix}food`) || content.startsWith(`<@${id}>food`) || content.startsWith(`<@${id}> food`)) {
                  return true;
                } else {
                  return false;
                }
            },

            help(content, id) {
              if (content.startsWith(`${config.prefix}help`) || content.startsWith(`<@${id}>help`) || content.startsWith(`<@${id}> help`)) {
                return true;
              } else {
                return false;
              }
            },

            qr(content, id) {
              if (content.startsWith(`${config.prefix}qr`) || content.startsWith(`<@${id}>qr`) || content.startsWith(`<@${id}> qr`)) {
                return true;
              } else {
                return false;
              }
            },

        }

        // food
        static async foods() {
          return await food();
        }
     

        // help
        static help() {
          return help();
        }

        //qr
        static async qr(content) {
          return await QR(content);
        }

};