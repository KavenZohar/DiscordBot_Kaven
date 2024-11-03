import { Client, GatewayIntentBits } from 'discord.js';
import { messageEvent, app } from './app.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

function Bot(token) {
    app(client);

    client.on('ready', () => {
        console.log(`Đã đăng nhập vào ${client.user.tag}!`);
      });

    client.on('messageCreate', messageEvent);

    client.login(token);
}

export default Bot;