const User = require("../../app/models/User");
const _ = require("underscore");
const { send, reply } = require("../../utils/reply");
const waitFor = require("../../utils/waitFor");
module.exports = {
  name: "rob",
  description: "Ăn cắp tiền",
  type: "CHAT_INPUT",
  cooldown: 300,
  options: [
    {
      name: "user",
      description: "Người bạn muốn ăn cắp",
      type: "USER",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({
        id: interaction.options.getUser("user").id,
      });
      const stealer = await User.findOne({ id: interaction.user.id });

      const pick = [
        1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
      ][_.random(20)];
      if (!user || !stealer)
        return interaction.reply("Bạn hoặc nạn nhân chưa đăng ký");

      if (pick === 0) {
        stealer.money -= 300;
        stealer.save();
        return interaction.channel.send(
          ` Ăn cắp thất bại. Bạn bị phạt 300$ (Tiền có thể bị âm) `
        );
      }
      const moneyStolen = (user.money * 40) / 100;

      user.money -= moneyStolen;
      stealer.money += moneyStolen;
      user.save();
      stealer.save();
      const formatMoney = moneyStolen.toLocaleString("en-US");

      return interaction.channel.send(
        ` **${interaction.user.username}** đã ăn cắp **${formatMoney}** của **${
          interaction.options.getUser("user").username
        }** `
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("Có lỗi");
    }
  },
};
