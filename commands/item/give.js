const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "giveitem",
  description: "Ship đồ cho người khác!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn ship",
      type: "USER",
      required: true,
    },
    {
      name: "item",
      description: "Item muốn đưa",
      type: "STRING",
      choices: [
        {
          name: "Plastic",
          value: "plastic",
        },
        {
          name: "Iron",
          value: "iron",
        },
        {
          name: "Tape",
          value: "tape",
        },
        {
          name: "Wire",
          value: "wire",
        },
        {
          name: "Cloth",
          value: "cloth",
        },
        {
          name: "Knife",
          value: "knife",
        },
      ],
      required: true,
    },
    {
      name: "amount",
      description: "Số lượng",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    const { value } = interaction.options.get("amount");
    const { id, username } = interaction.options.getUser("user");
    const itemName = interaction.options.get("item").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const payee = await User.findOne({ id });
      if (!payee)
        return interaction.reply("Người nhận không đúng hoặc chưa đăng ký");
      if (user.id === payee.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }

      if (user.inventory[itemName] <= 0) {
        return interaction.reply("Bạn không có để đưa");
      }
      user.inventory[itemName] -= value;
      payee.inventory[itemName] += value;
      user.save();
      payee.save();

      return interaction.reply(
        ` **${interaction.user.username}** đã đưa **${
          value + " " + itemName
        }** cho **${username}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Give: Có lỗi !!");
    }
  },
};
