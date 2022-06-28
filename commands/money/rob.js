const User = require("../../app/models/User");
const _ = require("underscore");
const dayjs = require("dayjs");
const { formatMoney } = require("../../utils/format");
module.exports = {
  name: "rob",
  description: "Ăn cắp tiền",
  type: "CHAT_INPUT",
  cooldown: 800,
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
      const victim = await User.findOne({
        id: interaction.options.getUser("user").id,
      });
      const stealer = await User.findOne({ id: interaction.user.id });
      if (!victim || !stealer)
        return interaction.reply("Bạn hoặc nạn nhân chưa đăng ký");
      if (victim.id === stealer.id) {
        client.cooldowns.get("rob").delete(interaction.user.id);
        return interaction.reply("Đừng ăn cắp cuả chính mình =( ");
      }
      const fine = 10000;
      const pick = _.random(1, 10);

      if (stealer.health.eat < 30 || stealer.health.drink < 20) {
        client.cooldowns.get("rob").delete(interaction.user.id);
        return interaction.reply("Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }

      if (victim.money <= 0) {
        return interaction.reply("Mục tiêu đã hết tiền");
      }
      if (pick <= 7) {
        stealer.money -= fine;
        stealer.save();

        await new Promise((resolve) => {
          setTimeout(resolve, 1500);
        });
        return await interaction.reply(
          ` Ăn cắp thất bại. **${
            interaction.user.username
          }** bị phạt \`${formatMoney(fine)}\` `
        );
      }
      const percent = 15;
      const moneyStolen = (victim.money * percent) / 100;

      victim.money -= moneyStolen;
      victim.health.eat -= 10;
      victim.health.drink -= 10;
      stealer.money += moneyStolen;
      victim.save();
      stealer.save();
      await new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
      return await interaction.reply(
        ` **${interaction.user.username}** đã ăn cắp \`${formatMoney(
          victim.money
        )}\` của **${interaction.options.getUser("user").username}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Rob: Có lỗi");
    }
  },
};
