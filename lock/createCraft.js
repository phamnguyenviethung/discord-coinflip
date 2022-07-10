const Craft = require("../app/models/Craft");
module.exports = {
  name: "createcraft",
  description: "create craft",
  type: "CHAT_INPUT",
  permissions: ["ADMINSTRATOR"],
  run: async (client, interaction) => {
    try {
      await Craft.create({
        code: "knife",
        require: [
          {
            name: "iron",
            amount: 50,
            category: "metal",
          },
          {
            name: "cloth",
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
            name: "knife",
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
