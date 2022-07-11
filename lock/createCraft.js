const Craft = require("../app/models/Craft");
module.exports = {
  name: "cc",
  description: "create craft",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      await Craft.create({
        code: "hrn",
        require: [
          {
            name: "cloth",
            amount: 2,
            category: "metal",
          },
          {
            name: "tape",
            amount: 2,
            category: "metal",
          },
          {
            name: "perch",
            amount: 10,
            category: "fishing",
          },
          {
            name: "carrot",
            amount: 8,
            category: "food",
          },
          {
            name: "corn",
            amount: 10,
            category: "food",
          },
        ],
        result: [
          {
            name: "heroin",
            amount: 5,
            category: "pill",
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
