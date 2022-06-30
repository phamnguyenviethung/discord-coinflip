const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "storage",
  description: "Kiếm tra kho",
  permissions: [],
  type: "CHAT_INPUT",
  options: [
    {
      name: "type",
      description: "Chọn loại cần coi",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Water",
          value: "water",
        },
      ],
    },
  ],

  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const type = interaction.options.get("type").value;
      let text = "";
      const keys = Object.keys(user.storage[type]);
      keys.forEach((key) => {
        const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
        text += `${formatKey}: **${user.storage[type][key]}**\n`;
      });

      return interaction.reply(text);
    } catch (error) {
      console.log(error);
      return interaction.reply("storage: có lỗi");
    }
  },
};
