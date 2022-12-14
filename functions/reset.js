const fs = require('fs');

async function reset(interaction) {
  const playersData = {
    players: [],
  };
  const gameData = {
    totalBet: 0,
    isRegistered: false,
    canBuy: false,
    toDev: 0.03,
    toCeo: 0.07,
    toPlayer: 0.05,
  };
  const tickets = {
    tickets: [],
  };
  const playerDataJson = JSON.stringify(playersData);
  const gameDataJson = JSON.stringify(gameData);
  const ticketsData = JSON.stringify(tickets);
  fs.writeFileSync('./json/player.json', playerDataJson);
  fs.writeFileSync('./json/gamedata.json', gameDataJson);
  fs.writeFileSync('./json/tickets.json', ticketsData);
  await interaction.reply({
    content: `게임 데이터가 모두 리셋되었습니다.`,
    ephemeral: true,
  });
}

module.exports = reset;
