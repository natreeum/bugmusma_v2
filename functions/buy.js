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

async function buy(interaction) {
  //tickets에서 내가 산 티켓이 2개 이하일 경우에만 구매 가능
  const commandUser = interaction.user;
  let ticketData = readFile('./json/tickets.json');
  if (
    ticketData.tickets.filter((e) => e.buyer === interaction.user.id).length >=
    3
  ) {
    return await interaction.reply({
      content: `티켓을 3개 이상 구매할 수 없습니다.`,
      ephemeral: true,
    });
  }
  const choosed = interaction.options.getUser('선수').id;
  // 선수명단체크
  let playerDataForCheck = readFile('./json/player.json');
  playerDataForCheck.players = playerDataForCheck.players.filter(
    (e) => e.playerUserId === choosed
  );
  if (playerDataForCheck.players.length === 0) {
    return await interaction.reply({
      content: `명단에 없는 선수입니다.`,
      ephemeral: true,
    });
  }

  const optionBetAmount = interaction.options.getInteger('금액');
  await bankManager.depositBTC(commandUser.id, optionBetAmount);
  let gameData = readFile('./json/gamedata.json');
  await bankManager.withdrawBTC(choosed, optionBetAmount * gameData.toPlayer);
  let playerData = readFile('./json/player.json');
  gameData.totalBet += optionBetAmount;
  ticketData.tickets.push({
    buyer: commandUser.id,
    betAmount: Math.floor(optionBetAmount * 0.85),
    choosedPlayerUserId: choosed,
  });
  let findPlayer = playerData.players.filter((e) => {
    if (e.playerUserId === choosed) return true;
  });
  let playerIndex = playerData.players.indexOf(findPlayer[0]);
  playerData.players[playerIndex].betAmount += Math.floor(
    optionBetAmount * 0.85
  );
  let totalBetAfterFee = 0;
  for (let i of playerData.players) {
    totalBetAfterFee += i.betAmount;
  }
  playerData.players[playerIndex].rate =
    Math.floor(
      (totalBetAfterFee / playerData.players[playerIndex].betAmount) * 100
    ) / 100;
  writeFile('./json/gamedata.json', gameData);
  writeFile('./json/player.json', playerData);
  writeFile('./json/tickets.json', ticketData);

  let message = `<@${commandUser.id}> 티켓 구매 완료!\n선택한 선수 : <@${choosed}>\n금액 : ${optionBetAmount} BTC\n\n`;
  let cnt = 1;
  for (let i of playerData.players) {
    message += `\`${cnt}번 선수 승리 시\` 배팅 금액의 x${i.rate} 지급\n선수 : <@${i.playerUserId}>\n\n`;
    cnt++;
  }
  await interaction.reply(message);
}

module.exports = buy;
