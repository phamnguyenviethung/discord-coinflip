const Craft = require("../../app/models/Craft");
module.exports = {
  name: "res",
  description: "Đăng ký chơi Coinflip",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      await Craft.create({
        code: "fsr",
        require: [
          {
            name: "cloth",
            amount: 30,
          },
          {
            name: "iron",
            amount: 60,
          },
          {
            name: "plastic",
            amount: 50,
          },
        ],
        result: [
          {
            name: "huntingrifle",
            amount: 50,
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
