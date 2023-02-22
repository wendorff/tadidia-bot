const { ServerTime } = require("../useCases");

const commands = [
    {
        text: 'dayzTime',
        execute: new ServerTime().execute
    },
]

module.exports = commands;
