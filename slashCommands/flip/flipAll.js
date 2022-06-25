const User = require("../../app/models/User");
const _ = require("underscore");
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
  run: async (client, interaction) => {
    const pick = [
      "Heads",
      "Tails",
      "Heads",
      "Tails",
      "Heads",
      "Tails",
      "Heads",
      "Heads",
      "Tails",
      "Tails",
      "Tails",
      "Heads",
      "Heads",
      "Tails",
    ][_.random(13)];
    const userSide = interaction.options.get("side").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (userSide !== pick) {
        user.money = 0;
        user.save();
        return interaction.reply(
          ` Kết quả là **${pick}**. Bạn đã mất hết tiền cược `
        );
      }

      user.money *= 2;
      user.save();
      const formatMoney = user.money.toLocaleString("en-US");

      return interaction.reply(
        ` Kết quả là **${pick}**.Chúc mừng bạn đã thắng, số tiền hiện tại của bạn là **${formatMoney}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Có lỗi !!");
    }
  },
};
