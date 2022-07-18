const _ = require("underscore");
const { faker } = require("@faker-js/faker");
const { job } = require("../../../configs/jobConfig");
const { formatMoney } = require("../../../utils/format");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    const { eat, drink, salary, exp, level } = job.grab;
    const randomName = faker.name.findName();
    const randdomPlace = faker.address.cityName();
    const pick = _.random(0, 10) <= 7;
    const ratingStar = _.random(1, 5);
    const randomMoney = pick
      ? salary()
      : salary() - (salary() * _.random(10, 30)) / 100;
    const n = _.random(4, 30);
    const randomWay = n % 2 === 0 ? n : n + 1;

    // send msg
    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("yes")
          .setLabel("YES")
          .setStyle("SUCCESS")
      )
      .addComponents(
        new MessageButton().setCustomId("no").setLabel("NO").setStyle("DANGER")
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
        if (user.item.fuel <= 0 || user.item.fuel < (1 / 2) * randomWay) {
          interaction.deleteReply();
          client.cooldowns.get("work").delete(interaction.user.id);
          return interaction.channel.send({
            content: "Bạn đã hết xăng",
          });
        }

        user.money += randomMoney;
        user.item.fuel -= (randomWay * 1) / 2;
        user.health.eat -= eat;
        user.health.drink -= drink;
        user.item.ratingStar += ratingStar;
        user.profile.exp.amount +=
          user.profile.exp.amount < exp && user.profile.exp.level === level
            ? 1
            : 0;
        user.save();

        interaction.deleteReply();
        return interaction.channel.send(
          `💸Chuyến xe thành công. Khách hàng đánh giá **${_.random(
            1,
            5
          )}** ⭐ trong chuyến đi dài ${randomWay}km và bạn nhận được **${formatMoney(
            randomMoney
          )}**\n⛽Bình xăng của bạn còn **${user.item.fuel}%**`
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
      content: `**${randomName}** muốn book xe của **${
        interaction.user.username
      }** đến **${randdomPlace}** cách đây ${randomWay}km với giá ${formatMoney(
        randomMoney
      )}. Bạn có muốn nhận không ?`,
      components: [row],
    });
  } catch (error) {
    console.log(error);
    return interaction.reply("grab: Có lỗi !!");
  }
};
