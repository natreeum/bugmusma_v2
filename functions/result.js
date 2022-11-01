const fs = require('fs');

const BankManager = require('../bank/bankManager');
const bankManager = new BankManager();

function readFile(fileDir) {
  const dataBuffer = fs.readFileSync(fileDir);
  const dataJson = dataBuffer.toString();
  return JSON.parse(dataJson);
}

function writeFile(fileDir, data) {
  const dataJson = JSON.stringify(data);
  fs.writeFileSync(fileDir, dataJson);
}

async function result(interaction) {
  const winnerUserId = interaction.options.getUser('선수').id;
  let playerData = readFile('./json/player.json');
  let ticketData = readFile('./json/tickets.json');
  let gameData = readFile('./json/gamedata.json');
  let winnerPlayerData = playerData.players.filter(
    (e) => e.playerUserId === winnerUserId
  );
  ticketData = ticketData.tickets.filter(
    (e) => e.choosedPlayerUserId === winnerUserId
  );

  await interaction.deferReply();

  const rate = winnerPlayerData[0].rate;
  let message = `<@${winnerUserId}> 선수가 우승했습니다! 축하드립니다🥳\n\n`;
  for (let i of ticketData) {
    await bankManager.withdrawBTC(i.buyer, i.betAmount * rate);
    message += `<@${i.buyer}> 축하드립니다! **${
      i.betAmount * rate
    } BTC**를 지급했습니다.\n`;
  }
  await interaction.editReply(message);
  await bankManager.withdrawBTC(
    '901812980944097300',
    Math.floor(gameData.totalBet * gameData.toCeo * 100) / 100
  );
  await bankManager.withdrawBTC(
    '251349298300715008',
    Math.floor(gameData.totalBet * gameData.toDev * 100) / 100
  );
  for (i of playerData.players) {
    i.betAmount = 0;
    i.rate = '??';
  }
  ticketData = { tickets: [] };
  gameData.totalBet = 0;
  writeFile('./json/player.json', playerData);
  writeFile('./json/tickets.json', ticketData);
  writeFile('./json/gamedata.json', gameData);
}

module.exports = result;
