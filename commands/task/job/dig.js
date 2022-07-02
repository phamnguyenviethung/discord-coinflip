const User = require("../../../app/models/User");

const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
const { category } = require("../../../utils/category");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const require = {
      sting: 1,
      meat: 2,
    };
    if (user.inventory.shovel <= 0) {
      return interaction.reply(
        `Bạn không có xẻng. Hãy sử dụng code \`svl\` để craft`
      );
    }
    let text = "";
    Object.keys(require).forEach((key) => {
      text += `+ **${key}**: ${require[key]}\n`;
    });
    let isValid = true;

    Object.keys(require).forEach((key) => {
      if (user.inventory[key] < require[key]) {
        isValid = false;
      }
    });
    if (!isValid) {
      client.cooldowns.get("work").delete(interaction.user.id);
      return interaction.reply(
        `Bạn không đủ lương thực để dùng trong 1 tuần làm việc mệt mỏi.\n- Yêu cầu:\n${text}`
      );
    }

    const randomQuantity = _.random(1, 4);
    const randomMoney = _.random(5000, 10000);

    const options = [
      { value: "cloth", percentage: 30 },
      { value: "tape", percentage: 24 },
      { value: "plastic", percentage: 20 },
      { value: "iron", percentage: 15 },
      { value: "empty", percentage: 10 },
      { value: "wire", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không đào được gì.`
      );
    }

    const update = {
      ...user.inventory,
    };
    for (let key in require) {
      update[key] = user.inventory[key] - require[key];
    }

    await User.findOneAndUpdate(
      { id: interaction.user.id },
      {
        health: {
          eat: user.health.eat - 10,
          drink: user.health.drink - 10,
        },
        money: (user.money += randomMoney),
        inventory: {
          ...update,
          shovel: (user.inventory.shovel -= 1),
          [randomItem]: (user.inventory[randomItem] += randomQuantity),
        },
      }
    );
    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã đào được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        randomMoney
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("Dig: Có lỗi !!");
  }
};
