const { SlashCommandBuilder } = require('discord.js');

const CommandBuilder = new SlashCommandBuilder()
  .setName('벅머')
  .setDescription('버그머스마 명령어 입니다.')
  .addSubcommand((s) =>
    s
      .setName('등록')
      .setDescription('선수를 등록합니다.')
      .addUserOption((o) =>
        o.setName('선수_1').setDescription('선수를 고릅니다').setRequired(true)
      )
      .addUserOption((o) =>
        o.setName('선수_2').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_3').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_4').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_5').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_6').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_7').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_8').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_9').setDescription('선수를 고릅니다')
      )
      .addUserOption((o) =>
        o.setName('선수_10').setDescription('선수를 고릅니다')
      )
  )
  .addSubcommand((s) =>
    s
      .setName('구매')
      .setDescription('티켓을 구매합니다.')
      .addUserOption((o) =>
        o
          .setName('선수')
          .setDescription('선수를 선택해주세요')
          .setRequired(true)
      )
      .addIntegerOption((o) =>
        o
          .setName('금액')
          .setDescription('베팅금액의 5%는 선택한 선수에게 즉시 지급됩니다.')
          .setRequired(true)
      )
  )
  .addSubcommand((s) =>
    s.setName('명단').setDescription('선수명단을 조회합니다.')
  )
  .addSubcommand((s) =>
    s.setName('리셋').setDescription('게임데이터를 초기화 합니다.')
  )
  .addSubcommand((s) =>
    s.setName('판매시작').setDescription('판매를 시작합니다.')
  )
  .addSubcommand((s) =>
    s.setName('판매종료').setDescription('판매를 종료합니다.')
  )
  .addSubcommand((s) =>
    s
      .setName('결과')
      .setDescription('결과를 입력합니다.')
      .addUserOption((o) =>
        o
          .setName('선수')
          .setDescription('우승한 선수를 골라주세요.')
          .setRequired(true)
      )
  )
  .addSubcommand((s) =>
    s
      .setName('수정')
      .setDescription('선수 명단을 수정합니다. [추가/삭제]')
      .addStringOption((o) =>
        o
          .setName('선택')
          .setDescription('삭제/추가 중 하나를 고르세요.')
          .addChoices(
            { name: '삭제', value: '삭제' },
            { name: '추가', value: '추가' }
          )
          .setRequired(true)
      )
      .addUserOption((o) =>
        o.setName('선수').setDescription('선수를 입력하세요.').setRequired(true)
      )
  );

module.exports = CommandBuilder;
