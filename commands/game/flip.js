const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
module.exports = {
  name: "flip",
  description: "Người không all in là người thất bại",
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
    {
      name: "money",
      description: "Số tiền bạn muốn đặt",
      type: "INTEGER",
      required: true,
      min_value: 1,
      max_value: 400000,
    },
  ],
  run: async (client, interaction, user) => {
    const pick = _.random(1, 10) > 5 ? "Heads" : "Tails";
    const userSide = interaction.options.get("side").value;
    const userMoneyBet = interaction.options.get("money").value;
    const pickJail = _.random(1, 10);

    try {
      if (user.health.eat < 25 || user.health.drink < 20) {
        return interaction.reply("😫 Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money < userMoneyBet || user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }

      if (pickJail <= 3) {
        const time = dayjs().locale("vi").add(2, "minutes");
        user.health.eat -= 1;
        user.health.drink -= 1;
        user.timestamps.jail = time.valueOf();
        user.money -= userMoneyBet;
        user.save();
        return interaction.channel.send(
          `🚓🚓🚓 Police ập vào. Bạn bị tạm giam **5 phút**`
        );
      }

      interaction.reply(
        `**${interaction.user.username}** đã cược \`${formatMoney(
          userMoneyBet
        )}\` vào **${userSide}**`
      );

      if (userSide !== pick) {
        user.money -= userMoneyBet;
        user.save();
        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
        );
      }
      user.money += userMoneyBet * 3;
      user.health.eat -= 1;
      user.health.drink -= 1;
      user.save();
      await new Promise((resolve) => {
        setTimeout(resolve, 3200);
      });
      return await interaction.channel.send(
        `🎉🎉🎉  Kết quả là **${pick}**. Chúc mừng bạn đã thắng, số tiền hiện tại của bạn là \`${formatMoney(
          user.money
        )}\` `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Flip:Có lỗi !!");
    }
  },
};
