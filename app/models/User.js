const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
    },

    money: {
      type: Number,
      default: 200000,
    },
    bankloan: {
      type: Number,
      default: 0,
    },
    atm: {
      type: Number,
      default: 0,
    },
    health: {
      eat: {
        type: Number,
        default: 150,
      },
      drink: {
        type: Number,
        default: 150,
      },
      stress: {
        type: Number,
        default: 150,
      },
    },
    inventory: {
      metal: {
        cloth: {
          type: Number,
          default: 20,
        },
        wire: {
          type: Number,
          default: 0,
        },
        tape: {
          type: Number,
          default: 20,
        },
        iron: {
          type: Number,
          default: 15,
        },
        plastic: {
          type: Number,
          default: 20,
        },
      },
      food: {
        meat: {
          type: Number,
          default: 5,
        },
        noodle: {
          type: Number,
          default: 5,
        },
        rice: {
          type: Number,
          default: 5,
        },
        bread: {
          type: Number,
          default: 5,
        },
        corn: {
          type: Number,
          default: 0,
        },
        carrot: {
          type: Number,
          default: 0,
        },
        salad: {
          type: Number,
          default: 0,
        },
        peanut: {
          type: Number,
          default: 0,
        },
        tomato: {
          type: Number,
          default: 0,
        },
      },
      drink: {
        sting: {
          type: Number,
          default: 10,
        },
      },
      weapon: {
        knife: {
          type: Number,
          default: 0,
        },
      },
      tool: {
        huntingrifle: {
          type: Number,
          default: 10,
        },
        fishingrod: {
          type: Number,
          default: 10,
        },
        shovel: {
          type: Number,
          default: 10,
        },
        gas: {
          type: Number,
          default: 10,
        },
        fuel: {
          type: Number,
          default: 10,
        },
      },
      fishing: {
        carp: {
          type: Number,
          default: 0,
        },
        perch: {
          type: Number,
          default: 0,
        },
        phattom: {
          type: Number,
          default: 0,
        },
        shark: {
          type: Number,
          default: 0,
        },
      },
      hunting: {
        rabbit: {
          type: Number,
          default: 0,
        },
        tiger: {
          type: Number,
          default: 0,
        },
        rhino: {
          type: Number,
          default: 0,
        },
      },
    },
    // timestamps: {
    //   jail: {
    //     type: Number,
    //     default: null,
    //   },
    //   health: {
    //     type: Number,
    //     default: null,
    //   },
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
