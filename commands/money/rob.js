const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
module.exports = {
  name: "rob",
  description: "Ăn cắp tiền",
  type: "CHAT_INPUT",
  cooldown: 300,
  options: [
    {
      name: "user",
      description: "Người bạn muốn ăn cắp",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({
        id: interaction.options.getUser("user").id,
      });
      const stealer = await User.findOne({ id: interaction.user.id });
      const fine = 50000;
      const pick = [
        1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0,
      ][_.random(20)];
      if (!user || !stealer)
        return interaction.reply("Bạn hoặc nạn nhân chưa đăng ký");
      if (user.money <= 0) {
        return interaction.reply("Mục tiêu đã hết tiền");
      }

      if (pick === 0) {
        stealer.money -= fine;
        stealer.save();
        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });
        return await interaction.reply(
          ` Ăn cắp thất bại. **${interaction.user.username}** bị phạt \`${fine}\` (Tiền có thể bị âm) `
        );
      }
      const percent = [10, 15, 20, 25, 30, 45];
      const moneyStolen =
        (user.money * percent[_.random(percent.length - 1)]) / 100;

      user.money -= moneyStolen;
      stealer.money += moneyStolen;
      user.save();
      stealer.save();
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      return await interaction.reply(
        ` **${interaction.user.username}** đã ăn cắp \`${formatMoney(
          user.money
        )}\` của **${interaction.options.getUser("user").username}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Rob: Có lỗi");
    }
  },
};
