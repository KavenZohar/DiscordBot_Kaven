import Food from '../src/commands/food.js';
import Help from '../src/commands/help.js';
import Qr from '../src/commands/qr.js';
import AI from '../src/commands/ai.js';

let client;

function app(Client) {
  client = Client;
}

const messageEvent = async (message) => {
        if (message.author.bot) return;
  
        // command
        Food(message, client);
        Help(message, client);
        Qr(message, client);
        AI(message, client);
    // command end
}

export { messageEvent, app};