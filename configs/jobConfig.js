const _ = require("underscore");

const basicSalary = 800;

const jobSalary = {
  janitor: () => _.random(basicSalary, basicSalary + 100) * 1.5,
  dig: () => _.random(basicSalary + 150, basicSalary + 250) * 1.8,
  farm: () => _.random(basicSalary + 300, basicSalary + 450) * 2,
  grab: () => _.random(basicSalary + 800, basicSalary + 1000) * 2.4,
  hunting: () => _.random(basicSalary + 1200, basicSalary + 1500) * 2.8,
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
    randomQuantity: _.random(2, 4),
    salary: jobSalary.dig,
    eat: 3,
    drink: 3,
    exp: 300,
    level: 2,

    percent: [
      { value: "tape", percentage: 30 },
      { value: "cloth", percentage: 24 },
      { value: "plastic", percentage: 18 },
      { value: "iron", percentage: 16 },
      { value: "empty", percentage: 11 },
      { value: "wire", percentage: 1 },
    ],
  },
  farm: {
    randomQuantity: _.random(1, 3),
    salary: jobSalary.farm,
    eat: 3,
    drink: 3,
    exp: 450,
    level: 3,

    percent: [
      { value: "salad", percentage: 40 },
      { value: "tomato", percentage: 35 },
      { value: "peanut", percentage: 20 },
      { value: "corn", percentage: 4 },
      { value: "carrot", percentage: 1 },
    ],
  },
  grab: {
    salary: jobSalary.grab,
    eat: 5,
    drink: 5,
    exp: 600,
    level: 4,
  },
  hunting: {
    randomQuantity: _.random(2, 4),
    salary: jobSalary.hunting,
    eat: 6,
    drink: 6,
    exp: 800,
    level: 5,
    percent: [
      { value: "bird", percentage: 45 },
      { value: "rabbit", percentage: 35 },
      { value: "empty", percentage: 15 },
      { value: "tiger", percentage: 4 },
      { value: "rhino", percentage: 1 },
    ],
  },
  fishing: {
    randomQuantity: _.random(2, 4),
    salary: jobSalary.fishing,
    eat: 6,
    drink: 6,
    level: 6,
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
    level: 7,
    percent: [
      { value: "perch", percentage: 35 },
      { value: "carp", percentage: 30 },
      { value: "empty", percentage: 20 },
      { value: "phattom", percentage: 14 },
      { value: "shark", percentage: 1 },
    ],
  },
};
