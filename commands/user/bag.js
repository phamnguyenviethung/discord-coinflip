const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");

const categories = ["fishing", "hunting", "dig", "weapon", "drink", "tool"];
const choices = [];
categories.forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});

module.exports = {
  name: "bag",
  description: "Kiếm tra balo",
  type: "CHAT_INPUT",
  options: [
    {
      name: "type",
      description: "Chọn thứ cần check",
      required: true,
      type: "STRING",
      choices,
    },
  ],

  run: async (client, interaction) => {
    const type = interaction.options.get("type").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      let text = "";
      const keys = Object.keys(category);
      keys.forEach((key) => {
        if (key === type) {
          category[key].forEach((item) => {
            const formatKey = item.charAt(0).toUpperCase() + item.slice(1);
            text += `${formatKey}: **${user.inventory[item]}**\n`;
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
