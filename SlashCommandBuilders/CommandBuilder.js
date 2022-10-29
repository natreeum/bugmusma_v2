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
  .addSubcommand((s) => s.setName('구매').setDescription('선수를 등록합니다.'))
  .addSubcommand((s) => s.setName('명단').setDescription('선수를 등록합니다.'))
  .addSubcommand((s) => s.setName('리셋').setDescription('선수를 등록합니다.'))
  .addSubcommand((s) =>
    s.setName('판매시작').setDescription('선수를 등록합니다.')
  )
  .addSubcommand((s) =>
    s.setName('판매종료').setDescription('선수를 등록합니다.')
  )
  .addSubcommand((s) => s.setName('결과').setDescription('선수를 등록합니다.'));

module.exports = CommandBuilder;
