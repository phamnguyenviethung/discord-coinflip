const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
module.exports = {
  name: "flip",
  description: "Người không all in là người thất bại",
  type: "CHAT_INPUT",
  options: [
    {
      name: "side",
      description: "Chọn side",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Heads",
          value: "Heads",
        },
        {
          name: "Tails",
          value: "Tails",
        },
      ],
    },
    {
      name: "money",
      description: "Số tiền bạn muốn đặt",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction, user) => {
    let pick = _.random(1, 20) % 2 === 0 ? "Heads" : "Tails";
    const userSide = interaction.options.get("side").value;
    const bet = interaction.options.get("money").value;
    const limit = user.limit || 99999999999;
    if (bet >= limit && pick === userSide && _.random(1, 100) >= 25) {
      if (userSide === "Heads") pick = "Tails";
      if (userSide === "Tails") pick = "Heads";
    }
    try {
      if (user.health.eat < 20 || user.health.drink < 20) {
        return interaction.reply("😫 Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money < bet || user.money <= 0) {
        return interaction.reply(`Bạn không đủ tiền! =))`);
      }

      interaction.reply(
        `**${interaction.user.username}** đã cược ${formatMoney(
          bet
        )} vào **${userSide}**`
      );

      if (userSide !== pick) {
        user.money -= bet;
        user.health.eat -= 12;
        user.health.drink -= 12;
        user.save();
        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          `🚑🚑🚑 Kết quả là **${pick}**. **${interaction.user.username}** đã mất hết tiền cược.`
        );
      }
      const multiply = 3;

      user.money += bet * multiply;
      user.health.eat -= 8;
      user.health.drink -= 8;
      user.save();
      await new Promise((resolve) => {
        setTimeout(resolve, 3200);
      });
      return await interaction.channel.send(
        `🎉🎉🎉 Kết quả là **${pick}**. **${
          interaction.user.username
        }** ăn được ${formatMoney(bet * multiply)}`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Flip:Có lỗi !!");
    }
  },
};
