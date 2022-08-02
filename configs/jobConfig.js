const _ = require("underscore");

const basicSalary = 1800;

const jobSalary = {
  janitor: () => _.random(basicSalary, basicSalary + 100) * 1.5,
  dig: () => _.random(basicSalary + 150, basicSalary + 250) * 1.8,
  farm: () => _.random(basicSalary + 300, basicSalary + 450) * 2,
  grab: () => _.random(basicSalary + 800, basicSalary + 1000) * 2.4,
  fishing: () => _.random(basicSalary + 1800, basicSalary + 2000) * 3,
  chef: () => _.random(basicSalary + 2500, basicSalary + 3000) * 4,
};

module.exports.job = {
  janitor: {
    eat: 2,
    drink: 2,
    salary: jobSalary.janitor,
    exp: 150,
    level: 1,
  },
  dig: {
    randomQuantity: () => _.random(3, 6),
    salary: jobSalary.dig,
    eat: 3,
    drink: 3,
    exp: 300,
    level: 2,

    percent: [
      { value: "tape", percentage: 28 },
      { value: "cloth", percentage: 22 },
      { value: "plastic", percentage: 20 },
      { value: "empty", percentage: 14 },
      { value: "iron", percentage: 11 },
      { value: "wire", percentage: 5 },
    ],
  },
  farm: {
    randomQuantity: () => _.random(2, 5),
    salary: jobSalary.farm,
    eat: 3,
    drink: 3,
    exp: 450,
    level: 3,

    percent: [
      { value: "salad", percentage: 30 },
      { value: "tomato", percentage: 25 },
      { value: "peanut", percentage: 15 },
      { value: "empty", percentage: 13 },
      { value: "corn", percentage: 12 },
      { value: "carrot", percentage: 5 },
    ],
  },
  grab: {
    salary: jobSalary.grab,
    eat: 5,
    drink: 5,
    exp: 600,
    level: 4,
  },
  fishing: {
    randomQuantity: () => _.random(2, 4),
    salary: jobSalary.fishing,
    eat: 6,
    drink: 6,
    level: 5,
    percent: [
      { value: "perch", percentage: 35 },
      { value: "carp", percentage: 30 },
      { value: "empty", percentage: 20 },
      { value: "phattom", percentage: 14 },
      { value: "shark", percentage: 1 },
    ],
  },
  chef: {
    salary: jobSalary.chef,
    eat: 8,
    drink: 8,
    exp: 1000,
    level: 6,
    percent: [
      { value: "perch", percentage: 35 },
      { value: "carp", percentage: 30 },
      { value: "empty", percentage: 20 },
      { value: "phattom", percentage: 14 },
      { value: "shark", percentage: 1 },
    ],
  },
};
