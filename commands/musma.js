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

const commandAllowed = ['251349298300715008', '901812980944097300'];
function permissionCheck(userId) {
  if (commandAllowed.includes(userId)) return true;
  else return false;
}

module.exports = {
  data: CommandBuilder,
  async execute(interaction) {
    const gameDataBuffer = fs.readFileSync('./json/gamedata.json');
    const gameDataJson = gameDataBuffer.toString();
    let gameData = JSON.parse(gameDataJson);
    if (interaction.options.getSubcommand() === '등록') {
      if (!permissionCheck(interaction.user.id)) {
        return await interaction.reply({
          content: `명령어를 사용할 권한이 없습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.isRegistered === true) {
        return await interaction.reply({
          content: `이미 등록된 선수 명단이 있습니다.`,
          ephemeral: true,
        });
      }
      await register(interaction);
    }
    if (interaction.options.getSubcommand() === '리셋') {
      if (!permissionCheck(interaction.user.id)) {
        return await interaction.reply({
          content: `명령어를 사용할 권한이 없습니다.`,
          ephemeral: true,
        });
      }
      await reset(interaction);
    }
    if (interaction.options.getSubcommand() === '명단') {
      if (gameData.isRegistered === false) {
        return await interaction.reply({
          content: `등록된 선수 명단이 없거나 아직 명단을 조회할 수 없습니다.`,
          ephemeral: true,
        });
      }
      await list(interaction);
    }
    if (interaction.options.getSubcommand() === '판매시작') {
      if (!permissionCheck(interaction.user.id)) {
        return await interaction.reply({
          content: `명령어를 사용할 권한이 없습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.isRegistered === false) {
        return await interaction.reply({
          content: `선수 명단이 등록되지 않았습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.canBuy === true) {
        return await interaction.reply({
          content: `이미 티켓이 판매중입니다.`,
          ephemeral: true,
        });
      }
      await sell_start(interaction);
    }
    if (interaction.options.getSubcommand() === '판매종료') {
      if (!permissionCheck(interaction.user.id)) {
        return await interaction.reply({
          content: `명령어를 사용할 권한이 없습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.canBuy === false) {
        return await interaction.reply({
          content: `이미 티켓 판매가 종료되었습니다.`,
          ephemeral: true,
        });
      }
      await sell_end(interaction);
    }
    if (interaction.options.getSubcommand() === '구매') {
      if (gameData.canBuy === false) {
        return await interaction.reply({
          content: '지금은 티켓을 구매할 수 없습니다.',
          ephemeral: true,
        });
      }
      if (interaction.options.getInteger('금액') < 20) {
        return await interaction.reply({
          content: '최소 베팅금액은 20BTC 입니다.',
          ephemeral: true,
        });
      }
      await buy(interaction);
    }
    if (interaction.options.getSubcommand() === '결과') {
      if (!permissionCheck(interaction.user.id)) {
        return await interaction.reply({
          content: `명령어를 사용할 권한이 없습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.isRegistered === false) {
        return await interaction.reply({
          content: `선수명단이 등록되지 않았습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.canBuy === true) {
        return await interaction.reply({
          content: `티켓판매가 종료되지 않았습니다.`,
          ephemeral: true,
        });
      }
      await result(interaction);
    }
    if (interaction.options.getSubcommand() === '수정') {
      if (!permissionCheck(interaction.user.id)) {
        return await interaction.reply({
          content: `명령어를 사용할 권한이 없습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.canBuy === true) {
        return await interaction.reply({
          content: `티켓 판매중에는 수정할 수 없습니다.`,
          ephemeral: true,
        });
      }
      if (gameData.isRegistered === false) {
        return await interaction.reply({
          content: `선수명단이 등록되지 않았습니다.`,
          ephemeral: true,
        });
      }
      await modify(interaction);
    }
  },
};
