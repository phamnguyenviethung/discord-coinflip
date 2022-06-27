const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
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
    try {
      const user = await User.findOne({ id: interaction.user.id });
      const userSide = interaction.options.get("side").value;
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

      if (!user) return interaction.channel.send("Bạn chưa đăng ký");
      if (user.health.eat < 25 || user.health.drink < 20) {
        return interaction.reply("Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }

      interaction.reply(
        `**${interaction.user.username}** đã all in vào **${userSide}**`
      );
      if (userSide !== pick) {
        user.money = 0;
        user.health.eat += _.random(0, 5);
        user.health.drink += _.random(0, 3);
        user.save();

        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          ` Kết quả là **${pick}**. Bạn đã mất hết tiền cược. Nhà cái tặng bạn *1 chai nước* và *1 ổ bánh mì*`
        );
      }

      user.money *= 2;
      user.health.eat -= 1;
      user.health.drink -= 1;
      user.save();

      await new Promise((resolve) => {
        setTimeout(resolve, 3200);
      });
      return await interaction.channel.send(
        ` Kết quả là **${pick}**. Chúc mừng bạn đã thắng, số tiền hiện tại của bạn là \`${formatMoney(
          user.money
        )}\` `
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("Flipall: Có lỗi");
    }
  },
};
