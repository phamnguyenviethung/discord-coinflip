const Craft = require("../app/models/Craft");
module.exports = {
  name: "res",
  description: "Đăng ký chơi Coinflip",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      await Craft.create({
        code: "svl",
        require: [
          {
            name: "cloth",
            amount: 10,
          },
          {
            name: "iron",
            amount: 100,
          },
        ],
        result: [
          {
            name: "shovel",
            amount: 20,
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
