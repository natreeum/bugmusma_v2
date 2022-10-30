require('dotenv').config();
const env = process.env;

module.exports = {
  clientId: env.CLIENT_ID,
  guildId: env.GUILD_ID,
  bugcityApiKey: env.BUGCITY,
  api: env.API_ROOT,
  webhookLogsUrl: env.WEBGOOK_LOGS,
};
