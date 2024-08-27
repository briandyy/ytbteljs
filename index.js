const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';

// Initialize bot with polling
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // Check if the message is a YouTube URL
  if (text.includes('youtube.com') || text.includes('youtu.be')) {
    try {
      // Send a message to the user that the download is starting
      await bot.sendMessage(chatId, 'Downloading your video...');

      // Extract video ID and download video
      const videoId = ytdl.getURLVideoID(text);
      const videoStream = ytdl(videoId, { quality: 'highestaudio' });

      // TODO: Implement the logic to send the video to the user
      // This could involve saving the stream to a file and then using bot.sendVideo()

    } catch (error) {
      await bot.sendMessage(chatId, 'Sorry, there was an error downloading the video.');
    }
  }
});

console.log('Bot server started in the polling mode...');
