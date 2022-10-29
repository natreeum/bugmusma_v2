const fs = require('fs');

async function sell_end(interaction) {
  const gameDataBuffer = fs.readFileSync('./json/gamedata.json');
  const gameDataJson = gameDataBuffer.toString();
  const gameData = JSON.parse(gameDataJson);

  gameData.canBuy = false;

  const gameDataToJson = JSON.stringify(gameData);
  const playersDataBuffer = fs.readFileSync('./json/player.json');
  const playersDataJson = playersDataBuffer.toString();
  const playersData = JSON.parse(playersDataJson);
  const { players } = playersData;

  let message = `**티켓 판매가 종료되었습니다.**\n총 티켓 판매금액 : \`${gameData.totalBet} BTC\`\n\n`;
  let cnt = 1;
  for (let i of players) {
    message += `<@${i.playerUserId}>\n\`${cnt}번 선수 승리 시\` 배팅 금액의 x${i.rate} 지급\n\n`;
    cnt++;
  }
  fs.writeFileSync('./json/gamedata.json', gameDataToJson);
  await interaction.reply({ content: message });
}

module.exports = sell_end;
