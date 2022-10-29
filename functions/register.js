const fs = require('fs');

async function register(interaction) {
  let message = `선수가 등록되었습니다.\n`;
  // players 데이터 로드
  const playersDataBuffer = fs.readFileSync('./json/player.json');
  const playersJson = playersDataBuffer.toString();
  let playersData = JSON.parse(playersJson);
  // 선수id받기
  let i = 1;
  while (interaction.options.getUser(`선수_${i}`)) {
    const player = interaction.options.getUser(`선수_${i}`);
    const playerData = {
      playerUserId: player.id,
      betAmount: 0,
      rate: `??`,
    };
    playersData.players.push(playerData);
    message += `\`${i}번 선수\`\n<@${player.id}>\n\n`;
    i++;
  }
  playersData = JSON.stringify(playersData);
  fs.writeFileSync('./json/player.json', playersData);
  // gamedata - isRegisterd : false -> true
  const gameDataBuffer = fs.readFileSync('./json/gamedata.json');
  const gameDataJson = gameDataBuffer.toString();
  let gameData = JSON.parse(gameDataJson);
  gameData.isRegistered = true;
  gameData = JSON.stringify(gameData);
  fs.writeFileSync('./json/gamedata.json', gameData);
  await interaction.reply({ content: message, ephemeral: true });
}

module.exports = register;
