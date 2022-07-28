const choices = [];
["metal", "weapon", "tool", "fishing", "hunting", "vegatable", "old"].forEach(
  (item) => {
    choices.push({
      name: item,
      value: item,
    });
  }
);

module.exports = {
  name: "storage",
  description: "Kiếm tra kho",
  type: "CHAT_INPUT",
  cooldown: 2,
  options: [
    {
      name: "type",
      description: "Chọn thứ cần check",
      required: true,
      type: "STRING",
      choices,
    },
  ],

  run: async (client, interaction, user) => {
    const type = interaction.options.get("type").value;
    try {
      let text = "";
      const keys = Object.keys(user.inventory);
      keys.forEach((key) => {
        if (key === type) {
          Object.keys(user.inventory[key]).forEach((item) => {
            const formatKey = item.charAt(0).toUpperCase() + item.slice(1);
            text += `${formatKey}: **${user.inventory[type][item]}**\n`;
          });
        }
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
