const fs = require('fs');

async function modify(interaction) {
  const mode = interaction.options.getString('선택'); // 삭제, 추가
  const user = interaction.options.getUser('선수'); // 선수

  function readFile(fileDir) {
    const dataBuffer = fs.readFileSync(fileDir);
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  }

  function writeFile(fileDir, data) {
    const dataJson = JSON.stringify(data);
    fs.writeFileSync(fileDir, dataJson);
  }
  let message = ``;

  if (mode === '삭제') {
    const playerData = readFile('./json/player.json');
    const delPlayerData = playerData.players.filter(
      (e) => e.playerUserId === user.id
    );
    if (delPlayerData.length === 0) {
      return await interaction.reply({
        content: `해당 선수가 존재하지 않습니다.`,
        ephemeral: true,
      });
    }
    const delPlayerIndex = playerData.players.indexOf(delPlayerData[0]);
    playerData.players.splice(delPlayerIndex, 1);
    writeFile('./json/player.json', playerData);
    message += `삭제가 `;
  }
  if (mode === '추가') {
    const playersData = readFile('./json/player.json');
    const playerData = {
      playerUserId: user.id,
      betAmount: 0,
      rate: '??',
    };
    playersData.players.push(playerData);
    writeFile('./json/player.json', playersData);
    message += `추가가 `;
  }
  message += `완료되었습니다. \n\n`;
  const playersData = readFile('./json/player.json');
  for (let i of playersData.players) {
    message += `\`${playersData.players.indexOf(i) + 1}번 선수\`\n<@${
      i.playerUserId
    }>\n\n`;
  }
  await interaction.reply({ content: message, ephemeral: true });
}

module.exports = modify;
