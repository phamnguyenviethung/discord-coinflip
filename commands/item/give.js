const User = require("../../app/models/User");
const { category } = require("../../utils/category");
const choices = [];
const alreadyHas = [];
Object.keys(category).forEach((key) => {
  category[key].forEach((item) => {
    if (!alreadyHas.includes(item)) {
      alreadyHas.push(item);
      choices.push({
        name: item,
        value: item,
      });
    }
  });
});

module.exports = {
  name: "give",
  description: "Đưa đồ cho người khác!",
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
      choices,
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
  run: async (client, interaction, user) => {
    const { value } = interaction.options.get("amount");
    const payeeInfo = interaction.options.getUser("user");
    const { id, username } = payeeInfo;
    const itemName = interaction.options.get("item").value;

    try {
      const payee = await User.findOne({ id });
      if (!payee)
        return interaction.reply("Người nhận không đúng hoặc chưa đăng ký");
      if (user.id === payee.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }
      let key;
      Object.keys(user.inventory).forEach((k) => {
        if (user.inventory[k].hasOwnProperty(itemName)) {
          key = k;
        }
      });
      if (
        user.inventory[key][itemName] <= 0 ||
        user.inventory[key][itemName] < value
      ) {
        return interaction.reply("Bạn không đủ để đưa");
      }
      user.inventory[key][itemName] -= value;
      payee.inventory[key][itemName] += value;
      user.save();
      payee.save();
      payeeInfo.send(
        `Bạn nhận được **${value + " " + itemName}** từ **${
          interaction.user.username
        }**`
      );

      return interaction.reply(
        `🚚🚚🚚 **${interaction.user.username}** đã gửi **${
          value + " " + itemName
        }** cho **${username}**.`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Give: Có lỗi !!");
    }
  },
};
