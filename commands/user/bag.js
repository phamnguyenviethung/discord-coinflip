module.exports = {
  name: "bag",
  description: "Kiếm tra balo",
  type: "CHAT_INPUT",
  cooldown: 0,
  run: async (client, interaction, user) => {
    try {
      let text = "";
      const keys = Object.keys(user.item);
      keys.forEach((key) => {
        const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
        text += `+ **${formatKey}**: ${user.item[key]}\n`;
      });

      return interaction.reply({
        content: text,
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("bag: có lỗi");
    }
  },
};
