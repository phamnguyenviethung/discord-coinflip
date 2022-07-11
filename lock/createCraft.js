const Craft = require("../app/models/Craft");
module.exports = {
  name: "cc",
  description: "create craft",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      await Craft.create({
        code: "mask",
        require: [
          {
            name: "cloth",
            amount: 60,
            category: "metal",
          },
        ],
        result: [
          {
            name: "mask",
            amount: 1,
            category: "tool",
          },
        ],
      });

      return interaction.reply("Đăng ký thành công");
    } catch (error) {
      console.log(error);
      return interaction.reply("Có lỗi !!");
    }
  },
};
