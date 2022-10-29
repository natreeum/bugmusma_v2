const CommandBuilder = require(`../SlashCommandBuilders/CommandBuilder`);

const fs = require('fs');

const buy = require(`../functions/buy`);
const list = require(`../functions/list`);
const modify = require(`../functions/modify`);
const register = require(`../functions/register`);
const result = require(`../functions/result`);
const sell_end = require(`../functions/sell_end`);
const sell_start = require(`../functions/sell_start`);
const reset = require(`../functions/reset`);

module.exports = {
  data: CommandBuilder,
  async execute(interaction) {
    const gameDataBuffer = fs.readFileSync('./json/gamedata.json');
    const gameDataJson = gameDataBuffer.toString();
    let gameData = JSON.parse(gameDataJson);
    if (interaction.options.getSubcommand() === '등록') {
      if (gameData.isRegistered === true) {
        return await interaction.reply({
          content: `이미 등록된 선수 명단이 있습니다.`,
          ephemeral: true,
        });
      }
      await register(interaction);
    }
    if (interaction.options.getSubcommand() === '리셋') {
      await reset(interaction);
    }
    if (interaction.options.getSubcommand() === '명단') {
      if (gameData.isRegistered === false || gameData.canBuy === false) {
        return await interaction.reply({
          content: `등록된 선수 명단이 없거나 아직 명단을 조회할 수 없습니다.`,
          ephemeral: true,
        });
      }
      await list(interaction);
    }
    if (interaction.options.getSubcommand() === '판매시작') {
      if (gameData.canBuy === true) {
        return await interaction.reply({
          content: `이미 티켓이 판매중입니다.`,
          ephemeral: true,
        });
      }
      await sell_start(interaction);
    }
    if (interaction.options.getSubcommand() === '판매종료') {
      if (gameData.canBuy === false) {
        return await interaction.reply({
          content: `이미 티켓 판매가 종료되었습니다.`,
          ephemeral: true,
        });
      }
      await sell_end(interaction);
    }
    if (interaction.options.getSubcommand() === '') {
    }
    if (interaction.options.getSubcommand() === '') {
    }
    if (interaction.options.getSubcommand() === '') {
    }
  },
};
