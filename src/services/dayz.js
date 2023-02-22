const axios = require('axios');

class Dayz {
    axiosInstance = axios.create({
        baseURL: 'https://www.battlemetrics.com/servers/dayz/'
    });

    getServer = async (id) => {
        return await this.axiosInstance.get(id);
    }
}

module.exports = Dayz;
