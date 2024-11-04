import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('../config.json');

const commands = ["food", "help", "qr"];
function checkCommand(command, content, id) {
      if (content.startsWith(`${config.prefix}${command}`) || content.startsWith(`<@${id}>${command}`) || content.startsWith(`<@${id}> ${command}`)) {
        return true;
      } else {
        return false;
      }
}

function check(content, id) {
    for (const i of commands) {
      if (content.startsWith(`${config.prefix}${i}`) || content.startsWith(`<@${id}>${i}`) || content.startsWith(`<@${id}> ${i}`)) {
        return true;
      }
    }
    return false;
}

export { checkCommand, check };