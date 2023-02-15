const {Client, GatewayIntentBits  } = require('discord.js');
const Config = require('./config')
const axios = require('axios');
const cheerio = require('cheerio');


const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });
const config = new Config();
const prefix = '!';
const channelName = 'comandos';

client.login(config.token);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
  
});

client.on('messageCreate', async (message) => {
    if (message.content.startsWith(prefix + 'dayzTime')) {
        const url = 'https://www.battlemetrics.com/servers/dayz/16091215';
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const hour = $('dt:contains("Time")').next().text();
            const channel = client.channels.cache.find(channel => channel.name === channelName);
            channel.send(`A hora atual é: ${hour}`);
        } catch (error) {
            console.error(error);
        }
    }
})