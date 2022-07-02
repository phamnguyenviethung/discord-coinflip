const User = require("../../../app/models/User");
const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const require = {
      sting: 2,
    };
    if (user.inventory.huntingrifle <= 0) {
      return interaction.reply(
        `Bạn không có súng săn. Hãy sử dụng code \`hrl\` để craft`
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

    const randomQuantity = _.random(2, 6);
    const randomMoney = _.random(5000, 10000);

    // Cloth - Plastic - Tape - Iron - Wire
    const options = [
      { value: "bird", percentage: 50 },
      { value: "rabbit", percentage: 35 },
      { value: "empty", percentage: 14 },
      { value: "tiger", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không săn được gì.`
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
          eat: user.health.eat - 8,
          drink: user.health.drink - 8,
        },
        money: (user.money += randomMoney),
        inventory: {
          ...update,
          huntingrifle: (user.inventory.huntingrifle -= 1),
          [randomItem]: (user.inventory[randomItem] += randomQuantity),
        },
      }
    );
    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã săn được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        randomMoney
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("hunting: Có lỗi !!");
  }
};
