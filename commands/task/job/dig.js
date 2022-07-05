const User = require("../../../app/models/User");

const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
const { category } = require("../../../utils/category");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    if (user.inventory.maycay > 0) {
      const randomQuantity = _.random(60, 100);
      const randomQuantityVIP = _.random(10, 30);
      const randomMoney = _.random(2000, 5000);

      const options = [
        { value: "cloth", percentage: 30 },
        { value: "tape", percentage: 30 },
        { value: "plastic", percentage: 40 },
      ];
      const randomItem = random(options);

      const optionsVIP = [
        { value: "iron", percentage: 60 },
        { value: "wire", percentage: 40 },
      ];
      const randomItemVIP = random(optionsVIP);

      user.health.eat -= 5;
      user.health.drink -= 5;
      user.inventory[randomItem] += randomQuantity;
      user.inventory[randomItemVIP] += randomQuantityVIP;
      user.money += randomMoney;
      user.save();

      return interaction.reply(
        `🧑‍🌾 **${
          interaction.user.username
        }** đã đào được **${randomQuantity} ${randomItem}, ${randomQuantityVIP} ${randomItemVIP}** và kiếm được **${formatMoney(
          randomMoney
        )}**`
      );
    } else {
      if (user.inventory.shovel <= 0) {
        return interaction.reply(
          `Bạn không có xẻng. Hãy sử dụng code \`svl\` để craft`
        );
      }
      const limit = {
        eat: 70,
        drink: 60,
      };

      if (user.health.eat < limit.eat || user.health.drink < limit.drink) {
        return interaction.reply(
          `Bạn đã kiệt sức. Để tiếp tục làm việc, bạn cần có ít nhất **${limit.eat} eat và ${limit.drink} drink**`
        );
      }

      const randomQuantity = _.random(4, 10);
      const randomMoney = _.random(7000, 12000);

      const options = [
        { value: "cloth", percentage: 30 },
        { value: "tape", percentage: 22 },
        { value: "plastic", percentage: 22 },
        { value: "iron", percentage: 20 },
        { value: "empty", percentage: 5 },
        { value: "wire", percentage: 1 },
      ];
      const randomItem = random(options);

      if (randomItem === "empty") {
        return interaction.reply(
          `Thật không may, **${interaction.user.username}** đã không đào được gì.`
        );
      }

      user.health.eat -= 10;
      user.health.drink -= 10;
      user.inventory.shovel -= 1;
      user.inventory[randomItem] += randomQuantity;
      user.money += randomMoney;
      user.save();

      return interaction.reply(
        `🧑‍🌾 **${
          interaction.user.username
        }** đã đào được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
          randomMoney
        )}**`
      );
    }
  } catch (error) {
    console.log(error);
    return interaction.reply("Dig: Có lỗi !!");
  }
};
