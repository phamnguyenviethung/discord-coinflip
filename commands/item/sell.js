const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { jobID } = require("../../config");
const { MessageActionRow, MessageButton } = require("discord.js");
const _ = require("underscore");

let choices = [];
Object.keys(jobID).forEach((key) => {
  if (jobID[key] > 0) {
    choices.push({
      name: key.toLocaleLowerCase(),
      value: key.toLocaleLowerCase(),
    });
  }
});

module.exports = {
  name: "sell",
  description: "Bán đồ cho người khác!",
  type: "CHAT_INPUT",
  permissions: ["989447620294504458", "992033393674043423"],
  options: [
    {
      name: "user",
      description: "Người bạn muốn bán",
      type: "USER",
      required: true,
    },
    {
      name: "type",
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
      min_value: 0,
      max_value: 30,
    },
    {
      name: "price",
      description: "Số tiền bạn muốn bán",
      type: "INTEGER",
      required: true,
      min_value: 0,
    },
  ],
  run: async (client, interaction) => {
    const customerInteraction = interaction.options.getUser("user");
    const amount = interaction.options.get("amount").value;
    const type = interaction.options.get("type").value;
    const price = interaction.options.get("price").value;

    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user)
        return interaction.reply({
          content: "Bạn chưa đăng ký",
          ephemeral: true,
        });
      const require = {
        cloth: 2,
        plastic: 5,
        tape: 2,
      };

      let isValid = true;
      let text = "";
      Object.keys(require).forEach((key) => {
        text += `+ **${key}**: ${require[key] * amount}\n`;
        if (user.inventory[key] < require[key] * amount) {
          isValid = false;
        }
      });
      if (!isValid)
        return interaction.reply({
          content: ` Để sản xuất **${amount} chai nước** thì bạn cần:\n${text}`,
          ephemeral: true,
        });

      const customer = await User.findOne({ id: customerInteraction.id });
      if (!customer)
        return interaction.reply({
          content: "Người nhận không đúng hoặc chưa đăng ký",
          ephemeral: true,
        });
      if (user.storage.water.volume <= 0) {
        return interaction.reply({
          content: "Bạn không đủ hàng để bán. Hãy đi chế tạo",
          ephemeral: true,
        });
      }

      if (user.job === "jobless") {
        return interaction.reply("Đây không phải nghề của bạn");
      }

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
        time: 30 * 1000,
      });

      collector.on("collect", (i) => {});

      collector.on("end", (collection) => {
        const userClickedInfo = collection.first();

        if (userClickedInfo?.customId === "yes") {
          if (customer.money <= 0 || customer.money < price) {
            interaction.deleteReply();
            return interaction.channel.send({
              content: "Bạn không còn tiền",
              ephemeral: true,
            });
          }
          if (customer.inventory.sting > 50) {
            interaction.deleteReply();
            return interaction.channel.send({
              content: "Bạn đã có 50 chai rồi.",
              ephemeral: true,
            });
          }

          user.storage.water.volume -= amount;
          user.inventory.plastic -= 2 * amount;
          user.inventory.tape -= 1 * amount;
          user.inventory.cloth -= 1 * amount;

          customer.inventory.sting += amount;
          customer.money -= price;
          user.money += price;

          user.save();
          customer.save();

          const billID = _.random(10, 500);

          interaction.user.send(
            `💳 Bạn đã bán *${amount} sting* cho **${
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
        } bán **${amount + " " + type} với giá ${formatMoney(
          price
        )}**. Cậu hãy mua đi ạ`,
        components: [row],
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("sell: Có lỗi !!");
    }
  },
};
