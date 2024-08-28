const TelegramBot = require('node-telegram-bot-api');
const youtubedl = require('youtube-dl-exec');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TOKEN = process.env.BOT_TOKEN;

// Initialize the bot
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text.includes('youtube.com') || text.includes('youtu.be')) {
        const videoUrl = text;
        const videoId = new URL(videoUrl).searchParams.get('v');
        const videoPath = path.resolve(__dirname, `${videoId}.mp4`);

        try {
            await youtubedl(videoUrl, {
                output: videoPath,
                format: 'best'
            });

            await bot.sendVideo(chatId, videoPath);

            fs.unlinkSync(videoPath); // Delete the video file after sending
        } catch (error) {
            console.error('Error downloading or sending video:', error);
            bot.sendMessage(chatId, 'Failed to download video.');
        }
    }
});

console.log('Bot is running...');