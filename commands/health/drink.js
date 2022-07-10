const User = require("../../app/models/User");

module.exports = {
  name: "drink",
  description: "Uống Sting",
  type: "CHAT_INPUT",

  run: async (client, interaction, user) => {
    try {
      if (user.health.drink >= 400) {
        return interaction.reply(` Bạn không khát nước.`);
      }

      user.money -= 1200;
      user.health.drink += 30;

      user.save();

      return interaction.reply(
        `${interaction.user.username} vừa uống  1 chai **sting** giá 800$`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("sting: có lỗi");
    }
  },
};
