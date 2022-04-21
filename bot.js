require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const pageInfo = require('./wiki');

const { TOKEN} = process.env;

const app = express()
app.use(bodyParser.json())


const bot = new TelegramBot(TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {

    bot.sendMessage(msg.chat.id, "Welcome to the bot, i will be always there to help is the bad hooman is not 😁");
    
});

bot.onText(/\/getWiki/, async (msg) => {
    try {
        
        const { title, summary, url } = await pageInfo();
        const message = `<b>${title}</b> \n <i>${summary}</i> \n<a href=\"${url}\">Get full article</a>`;

        bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });


    } catch (error)
    {
        console.log(error);
        bot.sendMessage(msg.chat.id, "error");
    }
})


app.listen(process.env.PORT || 5000, async () => {
    console.log('app running on port', process.env.PORT || 5000)
    
});