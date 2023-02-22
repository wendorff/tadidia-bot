const cheerio = require('cheerio');
const { Dayz } = require('../services');

class ServerTime {
    dayz = new Dayz();

    execute = async (client, message) => {
        try {
            const response = await this.dayz.getServer('16091215');
            const $ = cheerio.load(response.data);
            const hour = $('dt:contains("Time")').next().text();
            const channel = client.channels.cache.find(channel => channel.id === message.channelId);
            channel.send(`A hora atual é: ${hour}`);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ServerTime;
