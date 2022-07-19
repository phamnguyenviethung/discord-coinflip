const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
module.exports = {
  name: "flipall",
  description: "Cùng all in nào các chiến binh",
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
  ],
  run: async (client, interaction, user) => {
    try {
      const userSide = interaction.options.get("side").value;
      let pick = _.random(1, 30) % 2 === 0 ? "Heads" : "Tails";
      const bet = user.money;
      if (bet >= 20000 && pick === userSide && _.random(1, 100) >= 20) {
        if (userSide === "Heads") pick = "Tails";
        if (userSide === "Tails") pick = "Heads";
      }
      if (user.health.eat < 20 || user.health.drink < 20) {
        return interaction.reply("😫 Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }

      interaction.reply(
        `**${interaction.user.username}** đã all in ${formatMoney(
          user.money
        )} vào **${userSide}** 🙅‍♂️🙅‍♂️🙅‍♂️`
      );
      if (userSide !== pick) {
        user.money = 0;
        user.health.eat -= 8;
        user.health.drink -= 8;
        user.save();

        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
        );
      }
      const multiply = 2;

      user.money += bet * 2;
      user.health.eat -= 12;
      user.health.drink -= 12;
      user.save();

      await new Promise((resolve) => {
        setTimeout(resolve, 3200);
      });
      return await interaction.channel.send(
        `🎉🎉🎉 Kết quả là **${pick}**. Chúc mừng bạn đã thắng, bạn ăn được ${formatMoney(
          bet * multiply
        )}`
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("Flipall: Có lỗi");
    }
  },
};
