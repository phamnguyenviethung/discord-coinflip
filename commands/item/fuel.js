const { formatMoney } = require("../../utils/format");
const { MessageActionRow, MessageButton } = require("discord.js");
const _ = require("underscore");

module.exports = {
  name: "fuel",
  description: "Đổ xăng",
  type: "CHAT_INPUT",
  run: async (client, interaction, user) => {
    try {
      if (user.item.fuel >= 100) {
        return interaction.reply("Xe bạn đã đầy xăng...");
      }
      const price = 500;

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
        time: 20 * 1000,
      });

      collector.on("end", (collection) => {
        const userClickedInfo = collection.first();

        if (userClickedInfo?.customId === "yes") {
          if (user.money <= 0 || user.money < price * (100 - user.item.fuel)) {
            interaction.deleteReply();
            return interaction.channel.send({
              content: "Bạn không đủ tiền",
              ephemeral: true,
            });
          }

          user.money -= price * (100 - user.item.fuel);
          user.item.fuel = 100;
          user.save();

          const billID = _.random(3000, 5000);

          interaction.user.send(
            `💳 Bạn vừa đổ đầy bình xăng với giá ${formatMoney(
              price * (100 - user.item.fuel)
            )}. Mã giao dịch **#${billID}** `
          );
          interaction.deleteReply();
          return interaction.channel.send(
            `⛽ Đổ xăng thành công. Mã giao dịch **#${billID}** `
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
        content: `⛽ Xăng của **${interaction.user.username}** còn **${
          user.item.fuel
        }%**. Bạn có muốn đổ đầy bình với giá ${formatMoney(
          price * (100 - user.item.fuel)
        )}?`,
        components: [row],
      });
    } catch (error) {
      console.log(error);
      return interaction.reply("fuel: Có lỗi !!");
    }
  },
};
