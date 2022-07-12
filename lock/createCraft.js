const Craft = require("../app/models/Craft");
module.exports = {
  name: "cc",
  description: "create craft",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      await Craft.create({
        code: "shotgun",
        require: [
          {
            name: "iron",
            amount: 100,
            category: "metal",
          },
          {
            name: "plastic",
            amount: 80,
            category: "metal",
          },
          {
            name: "wire",
            amount: 10,
            category: "metal",
          },
          {
            name: "tape",
            amount: 5,
            category: "metal",
          },
        ],
        result: [
          {
            name: "shotgun",
            amount: 1,
            category: "weapon",
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
