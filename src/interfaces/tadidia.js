const { Client, GatewayIntentBits } = require('discord.js');
const { commands, commandPrefix } = require('../configs');
require('dotenv').config();

class Tadidia {
    constructor() {
        this.client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
        this.init();
    }

    login = () => {
        this.client.login(process.env.LOGIN_TOKEN);
    }

    getReady = () => {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}`);
        });
    }

    findCommand = (message) => {
        return commands.find(command =>
            message.content.startsWith(commandPrefix + command.text)
        );
    }

    messageListener = () => {
        this.client.on('messageCreate', async (message) => {
            const matchedCommand = this.findCommand(message);
            if (matchedCommand)
                matchedCommand.execute(this.client, message);
        });
    }

    init = () => {
        this.login();
        this.getReady();
        this.messageListener();
    }
}

module.exports = Tadidia;
