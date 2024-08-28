const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const fs = require('fs');
const TOKEN = '6853749239:AAFiIhMKvfiatNjkq8_Q_pf9ZPFDIwa8CHE';

// Initialize the bot
const bot = new TelegramBot(TOKEN, { polling: true });

// Listen for any kind of message
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the message is a YouTube URL
  if (text.includes('youtube.com') || text.includes('youtu.be')) {
    const videoUrl = text;
    const videoId = ytdl.getURLVideoID(videoUrl);
    const videoPath = `./${videoId}.mp4`;

    // Download the video from YouTube
    ytdl(videoUrl)
      .pipe(fs.createWriteStream(videoPath))
      .on('finish', () => {
        // Send the video to the user
        bot.sendVideo(chatId, videoPath)
          .then(() => {
            // Delete the video file after sending
            fs.unlinkSync(videoPath);
          });
      });
  }
});

console.log('Bot is running...');
