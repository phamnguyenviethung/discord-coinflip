module.exports = {
  name: "drink",
  description: "Uống Sting",
  type: "CHAT_INPUT",

  run: async (client, interaction, user) => {
    try {
      if (user.health.drink >= 400) {
        return interaction.reply(` Bạn không khát nước.`);
      }
      if (user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền`);
      }

      user.money -= 2000;
      user.health.drink += 35;

      user.save();

      return interaction.reply(
        `${interaction.user.username} vừa uống  1 chai **sting** giá 2000$`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("sting: có lỗi");
    }
  },
};
