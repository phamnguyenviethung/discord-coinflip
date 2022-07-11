const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
module.exports = {
  name: "flipall",
  description: "Cùng all in nào các chiến binh",
  type: "CHAT_INPUT",
  cooldown: 15,

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
      const pick = _.random(1, 10) > 5 ? "Heads" : "Tails";
      const pickJail = _.random(1, 10);

      if (user.health.eat < 25 || user.health.drink < 20) {
        return interaction.reply("😫 Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }
      if (pickJail <= 3) {
        const time = dayjs().locale("vi").add(2, "minutes");
        user.health.eat -= 1;
        user.health.drink -= 1;
        user.timestamps.jail = time.valueOf();
        user.money = 0;
        user.save();
        return interaction.channel.send(
          `🚓🚓🚓 Police ập vào. Bạn bị tạm giam **2 phút**`
        );
      }

      interaction.reply(
        `**${interaction.user.username}** đã all in **${formatMoney(
          user.money
        )}** vào **${userSide}** 🙅‍♂️🙅‍♂️🙅‍♂️`
      );
      if (userSide !== pick) {
        user.money = 0;
        user.save();

        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
        );
      }

      user.money *= 3;
      user.health.eat -= 1;
      user.health.drink -= 1;
      user.save();

      await new Promise((resolve) => {
        setTimeout(resolve, 3200);
      });
      return await interaction.channel.send(
        `🎉🎉🎉 Kết quả là **${pick}**. Chúc mừng bạn đã thắng, số tiền hiện tại của bạn là \`${formatMoney(
          user.money
        )}\` `
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("Flipall: Có lỗi");
    }
  },
};
