const User = require("../../app/models/User");

module.exports = {
  name: "setdesc",
  description: "VIết mô tả về bạn",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "Viết mô tả",
      required: true,
      type: "STRING",
      minLength: 5,
      maxLength: 500,
    },
  ],
  run: async (client, interaction, user) => {
    const text = interaction.options.get("value").value;
    console.log(text);
    try {
      user.profile.description = text;
      user.save();
      return interaction.reply(`Cập nhật mô tả thành công`);
    } catch (error) {
      console.log(error);
      return interaction.reply("checkHealth: có lỗi");
    }
  },
};
