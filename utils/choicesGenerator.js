module.exports.choicesGenerator = (array) => {
  const choices = [];
  array.forEach((item) => {
    choices.push({
      name: item,
      value: item,
    });
  });
  return choices;
};
