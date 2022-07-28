const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
    },
    limit: {
      type: Number,
      default: 999999999999,
    },
    money: {
      type: Number,
      default: 10000,
    },
    bankloan: {
      type: Number,
      default: 0,
    },
    volunteer: {
      type: Number,
      default: 0,
    },
    atm: {
      type: Number,
      default: 0,
    },

    profile: {
      description: {
        type: String,
        default: "Không có",
        trim: true,
      },
      kill: {
        type: Number,
        default: 0,
      },
      jail: {
        type: Number,
        default: 0,
      },
      flip: {
        win: {
          type: Number,
          default: 0,
        },
        lose: {
          type: Number,
          default: 0,
        },
      },
      exp: {
        level: {
          type: Number,
          default: 1,
        },
        amount: {
          type: Number,
          default: 0,
        },
      },
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
    },
    inventory: {
      grab: {
        ratingStar: {
          type: Number,
          default: 0,
        },
      },
      metal: {
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
      },
      vegatable: {
        salad: {
          type: Number,
          default: 0,
        },
        tomato: {
          type: Number,
          default: 0,
        },
        peanut: {
          type: Number,
          default: 0,
        },
        corn: {
          type: Number,
          default: 0,
        },
        carrot: {
          type: Number,
          default: 0,
        },
      },
      weapon: {
        knife: {
          type: Number,
          default: 0,
        },
        shotgun: {
          type: Number,
          default: 0,
        },
      },
      tool: {
        huntingrifle: {
          type: Number,
          default: 0,
        },
        shovel: {
          type: Number,
          default: 0,
        },
        fishingrod: {
          type: Number,
          default: 0,
        },
        mask: {
          type: Number,
          default: 0,
        },
      },
      hunting: {
        bird: {
          type: Number,
          default: 0,
        },
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
    },
    item: {
      fuel: {
        type: Number,
        default: 50,
      },
      sting: {
        type: Number,
        default: 0,
      },
      coffee: {
        type: Number,
        default: 0,
      },
      beer: {
        type: Number,
        default: 0,
      },
      bread: {
        type: Number,
        default: 0,
      },
      noodle: {
        type: Number,
        default: 0,
      },
      rice: {
        type: Number,
        default: 0,
      },
      hamburger: {
        type: Number,
        default: 0,
      },
    },

    timestamps: {
      jail: {
        type: Number,
        default: null,
      },
      health: {
        type: Number,
        default: null,
      },
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

UserSchema.virtual("statics").get(function () {
  const { win, lose } = this.profile.flip;
  const total = win + lose === 0 ? 1 : win + lose;
  const winrate = (win * 100) / total;
  return {
    total,
    winrate: winrate.toFixed(1),
  };
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
