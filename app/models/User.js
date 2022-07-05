const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
      require: [true, "Vui lòng cung cấp id"],
    },

    money: {
      type: Number,
      default: 10000,
    },
    bankloan: {
      type: Number,
      default: 0,
    },
    atm: {
      type: Number,
      default: 0,
    },
    money: {
      type: Number,
      default: 1000,
    },
    job: {
      type: String,
      default: "jobless",
      lowercase: true,
      trim: true,
    },
    health: {
      eat: {
        type: Number,
        default: 200,
      },
      drink: {
        type: Number,
        default: 200,
      },
      strength: {
        type: Number,
        default: 200,
      },
    },
    storage: {
      water: {
        volume: {
          type: Number,
          default: 0,
        },
      },
    },
    inventory: {
      cloth: {
        type: Number,
        default: 0,
      },
      wire: {
        type: Number,
        default: 0,
      },
      tape: {
        type: Number,
        default: 0,
      },
      iron: {
        type: Number,
        default: 0,
      },
      plastic: {
        type: Number,
        default: 0,
      },
      sting: {
        type: Number,
        default: 0,
      },
      knife: {
        type: Number,
        default: 0,
      },
      huntingrifle: {
        type: Number,
        default: 0,
      },
      fishingrod: {
        type: Number,
        default: 0,
      },
      shovel: {
        type: Number,
        default: 0,
      },
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
      rabbit: {
        type: Number,
        default: 0,
      },
      bird: {
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
      meat: {
        type: Number,
        default: 0,
      },
      gas: {
        type: Number,
        default: 0,
      },
      maycay: {
        type: Number,
        default: 0,
      },
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
