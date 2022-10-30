const fs = require('fs');

async function list(interaction) {
  const playersDataBuffer = fs.readFileSync('./json/player.json');
  const playersDataJson = playersDataBuffer.toString();
  const playersData = JSON.parse(playersDataJson);

  const gameDataBuffer = fs.readFileSync('./json/gamedata.json');
  const gameDataJson = gameDataBuffer.toString();
  const gameData = JSON.parse(gameDataJson);

  const { players } = playersData;
  let message = `총 티켓 판매금액 : \`${gameData.totalBet} BTC\`\n\n`;
  let cnt = 1;
  for (let i of players) {
    message += `\`${cnt}번 선수 승리 시\` 배팅 금액의 x${i.rate} 지급\n선수 : <@${i.playerUserId}>\n\n`;
    cnt++;
  }

  await interaction.reply(message);
}

module.exports = list;
