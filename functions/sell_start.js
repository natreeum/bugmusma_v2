const fs = require('fs');

async function sell_end(interaction) {
  const gameDataBuffer = fs.readFileSync('./json/gamedata.json');
  const gameDataJson = gameDataBuffer.toString();
  const gameData = JSON.parse(gameDataJson);

  gameData.canBuy = true;

  const gameDataToJson = JSON.stringify(gameData);
  fs.writeFileSync('./json/gamedata.json', gameDataToJson);

  const playersDataBuffer = fs.readFileSync('./json/player.json');
  const playersDataJson = playersDataBuffer.toString();
  const playersData = JSON.parse(playersDataJson);
  const { players } = playersData;
  let message = `**티켓 판매가 시작되었습니다**\n\`/벅머 구매\`명령어를 사용하여 티켓을 구매할 수 있습니다.\n\n`;
  let cnt = 1;
  for (let i of players) {
    message += `\`${cnt}번 선수\`\n<@${i.playerUserId}>\n\n`;
    cnt++;
  }
  await interaction.reply(message);
}

module.exports = sell_end;
