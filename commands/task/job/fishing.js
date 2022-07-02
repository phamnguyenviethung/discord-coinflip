const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../../utils/format");
const User = require("../../../app/models/User");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;
    const require = {
      sting: 5,
      meat: 5,
    };
    if (user.inventory.fishingrod <= 0) {
      return interaction.reply(
        `Bạn không có cần câu. Hãy sử dụng code \`fsr\` để craft`
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
        `Bạn không đủ thức ăn để dùng trong 1 tuần làm việc.\n- Yêu cầu:\n${text}`
      );
    }
    const randomQuantity = _.random(2, 6);
    const randomMoney = _.random(1000, 5000);

    // Cloth - Plastic - Tape - Iron - Wire
    const options = [
      { value: "perch", percentage: 40 },
      { value: "carp", percentage: 30 },
      { value: "phattom", percentage: 19 },
      { value: "empty", percentage: 10 },
      { value: "shark", percentage: 1 },
    ];
    const randomItem = random(options);

    if (randomItem === "empty") {
      return interaction.reply(
        `Thật không may, **${interaction.user.username}** đã không câu được gì.`
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
          eat: (user.health.eat -= 6),
          drink: (user.health.drink -= 6),
        },
        money: (user.money += randomMoney),
        inventory: {
          ...update,
          fishingrod: (user.inventory.fishingrod -= 1),
          [randomItem]: (user.inventory[randomItem] += randomQuantity),
        },
      }
    );
    return interaction.reply(
      `🧑‍🌾 **${
        interaction.user.username
      }** đã câu được **${randomQuantity} ${randomItem}** và kiếm được **${formatMoney(
        randomMoney
      )}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("fishing: Có lỗi !!");
  }
};
