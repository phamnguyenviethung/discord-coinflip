const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");

module.exports = {
  name: "eat",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",

  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.inventory.meat < 2) {
        return interaction.reply(
          ` Bạn cần ít  nhất có **2 meat**. Hãy sử dụng \`/cooking\` để nấu ăn`
        );
      }

      if (user.health.eat >= 350) {
        return interaction.reply(` Bạn không đói.`);
      }

      user.inventory.meat -= 1;
      user.health.eat += 45;
      user.save();

      return interaction.reply(
        `**${interaction.user.username}** vừa húp 2 miếng thịt 🍖`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
