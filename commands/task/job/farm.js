const _ = require("underscore");
const { random } = require("chance-percent");

module.exports = async (client, interaction, data) => {
  try {
    const { user } = data;

    const randomQuantity = _.random(2, 5);

    const options = [
      { value: "salad", percentage: 25 },
      { value: "tomato", percentage: 25 },
      { value: "peanut", percentage: 25 },
      { value: "corn", percentage: 20 },
      { value: "carrot", percentage: 5 },
    ];
    const randomItem = random(options);

    user.health.eat -= 5;
    user.health.drink -= 5;
    user.inventory.food[randomItem] += randomQuantity;
    user.save();

    return interaction.reply(
      `🧑‍🌾 **${interaction.user.username}** đã thu hoạch được **${randomQuantity} ${randomItem}**`
    );
  } catch (error) {
    console.log(error);
    return interaction.reply("farm: Có lỗi !!");
  }
};
