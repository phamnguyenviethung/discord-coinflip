module.exports = {
  fsr: {
    require: [
      {
        name: "plastic",
        amount: 80,
        category: "metal",
      },
      {
        name: "iron",
        amount: 40,
        category: "metal",
      },
      {
        name: "tape",
        amount: 30,
        category: "metal",
      },
    ],
    result: [
      {
        name: "fishingrod",
        amount: 10,
        category: "fishing",
      },
    ],
  },
  hrl: {
    require: [
      {
        name: "plastic",
        amount: 25,
        category: "metal",
      },
      {
        name: "iron",
        amount: 20,
        category: "metal",
      },
      {
        name: "tape",
        amount: 30,
        category: "metal",
      },
    ],
    result: [
      {
        name: "huntingrifle",
        amount: 3,
        category: "tool",
      },
    ],
  },
  mask: {
    require: [
      {
        name: "cloth",
        amount: 20,
        category: "metal",
      },
    ],
    result: [
      {
        name: "mask",
        amount: 1,
        category: "tool",
      },
    ],
  },
  shotgun: {
    require: [
      {
        name: "tape",
        amount: 15,
        category: "metal",
      },
      {
        name: "iron",
        amount: 10,
        category: "metal",
      },
      {
        name: "plastic",
        amount: 20,
        category: "metal",
      },
      {
        name: "wire",
        amount: 5,
        category: "metal",
      },
    ],
    result: [
      {
        name: "shotgun",
        amount: 1,
        category: "weapon",
      },
    ],
  },
};
