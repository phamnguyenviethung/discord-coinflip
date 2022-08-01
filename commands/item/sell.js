const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");
const { MessageActionRow, MessageButton } = require("discord.js");
const _ = require("underscore");

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
  name: "sell",
  description: "Bán đồ cho người khác!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn bán",
      type: "USER",
      required: true,
    },
    {
      name: "item",
      description: "Bạn muốn bán gì",
      type: "STRING",
      choices,
      required: true,
    },
    {
      name: "amount",
      description: "Số lượng bạn muốn bán",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
    {
      name: "price",
      description: "Số tiền bạn muốn bán",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction, user) => {
    const customerInteraction = interaction.options.getUser("user");
    const amount = interaction.options.get("amount").value;
    const item = interaction.options.get("item").value;
    const price = interaction.options.get("price").value;

    try {
      // customer checker
      const customer = await User.findOne({ id: customerInteraction.id });
      if (!customer)
        return interaction.reply({
          content: "Người nhận không đúng hoặc chưa đăng ký",
          ephemeral: true,
        });
      // item checker
      let key;
      Object.keys(user.inventory).forEach((k) => {
        if (user.inventory[k].hasOwnProperty(item)) {
          key = k;
        }
      });
      if (
        user.inventory[key][item] <= 0 ||
        user.inventory[key][item] < amount
      ) {
        return interaction.reply("Bạn không đủ để bán");
      }
      // send msg
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("yes")
            .setLabel("YES")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("no")
            .setLabel("NO")
            .setStyle("DANGER")
        );

      const filter = (btnInteraction) =>
        customerInteraction.id === btnInteraction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 60 * 1000,
      });

      collector.on("collect", (i) => {});

      collector.on("end", (collection) => {
        const userClickedInfo = collection.first();

        if (userClickedInfo?.customId === "yes") {
          if (customer.atm <= 0 || customer.atm < price) {
            interaction.deleteReply();
            return interaction.channel.send({
              content: "Bạn không còn tiền",
              ephemeral: true,
            });
          }

          user.atm += price;
          user.inventory[key][item] -= amount;
          customer.inventory[key][item] += amount;
          customer.atm -= price;

          user.save();
          customer.save();

          const billID = _.random(100, 999);

          interaction.user.send(
            `💳 Bạn đã bán *${amount} ${item}* cho **${
              customerInteraction.username
            }** với giá ${formatMoney(price)}. Mã giao dịch ${billID}`
          );
          customerInteraction.send(
            `💳 Bạn đã mua *${amount} sting* từ **${
              interaction.user.username
            }** với giá ${formatMoney(price)}. Mã giao dịch ${billID}`
          );

          interaction.deleteReply();
          return interaction.channel.send(
            `Giao dịch **#${billID}** thành công`
          );
        }

        if (userClickedInfo?.customId === "no") {
          return interaction.deleteReply();
        }
        return interaction.editReply({
          content: `Đã hết hiệu lực`,
          components: [],
        });
      });

      return interaction.reply({
        content: `${customerInteraction.username} ơi, ${
          interaction.user.username
        } bán **${amount + " " + item}** với giá ${formatMoney(price)}.`,
        components: [row],
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("sell: Có lỗi !!");
    }
  },
};
