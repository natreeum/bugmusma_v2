const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  token: process.env.DISCORD_TOKEN,
  api: process.env.API_ROOT,
  storageName: process.env.STORAGE_NAME,
  bugcity: process.env.BUGCITY,
  webhookLogsUrl: process.env.WEBHOOK_LOGS,
};
