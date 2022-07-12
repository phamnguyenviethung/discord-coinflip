module.exports = {
  name: "eat",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",
  cooldown: 30,

  run: async (client, interaction, user) => {
    try {
      if (user.health.eat >= 350) {
        return interaction.reply(` Bạn không đói.`);
      }

      user.money -= 2000;
      user.health.eat += 70;
      user.save();

      return interaction.reply(
        `**${interaction.user.username}** vừa bú **1 tô mì giá 2000$** 🍖`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("eat: có lỗi");
    }
  },
};
