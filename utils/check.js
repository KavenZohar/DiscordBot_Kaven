import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('../config.json');

const checkCommand = {
    food: function(content, id) {
        if (content.startsWith(`${config.prefix}food`) || content.startsWith(`<@${id}>food`) || content.startsWith(`<@${id}> food`)) {
            return true;
        } else {
          return false;
        }
    },
  
    help: function(content, id) {
      if (content.startsWith(`${config.prefix}help`) || content.startsWith(`<@${id}>help`) || content.startsWith(`<@${id}> help`)) {
        return true;
      } else {
        return false;
      }
    },
  
    qr: function(content, id) {
      if (content.startsWith(`${config.prefix}qr`) || content.startsWith(`<@${id}>qr`) || content.startsWith(`<@${id}> qr`)) {
        return true;
      } else {
        return false;
      }
    },
  
  }

export default checkCommand;