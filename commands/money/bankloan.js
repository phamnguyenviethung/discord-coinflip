const { formatMoney } = require("../../utils/format");
const { MessageActionRow, MessageButton } = require("discord.js");
const _ = require("underscore");

module.exports = {
  name: "bankloan",
  description: "Trả nợ ngân hàng",
  type: "CHAT_INPUT",

  run: async (client, interaction, user) => {
    try {
      if (user.bankloan === 0) {
        return interaction.reply("Bạn không nợ ngân hàng");
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
        interaction.user.id === btnInteraction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 60 * 1000,
      });

      collector.on("collect", (i) => {});

      collector.on("end", (collection) => {
        const userClickedInfo = collection.first();
        const loan = user.bankloan;

        if (userClickedInfo?.customId === "yes") {
          if (user.money <= 0 || user.money < user.bankloan) {
            interaction.deleteReply();
            return interaction.channel.send({
              content: "Bạn không có đủ tiền",
              ephemeral: true,
            });
          }

          user.money -= loan;
          user.bankloan = 0;

          user.save();

          const billID = _.random(1000, 50000);

          interaction.user.send(
            `💳 Bạn đã trả ${formatMoney(
              loan
            )} cho ngân hàng. Mã giao dịch ${billID}`
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
        content: `${
          interaction.user.username
        } đang nợ ngân hàng **${formatMoney(
          user.bankloan
        )}**. Bạn có muốn thanh toán tất cả không? `,
        components: [row],
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("sell: Có lỗi !!");
    }
  },
};
