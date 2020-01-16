const { Schema, model } = require("mongoose");

const LolSchema = new Schema(
  {
    summonerId: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    rank: {
      type: String
    },
    tier: {
      type: String
    },
    wins: {
      type: Number
    },
    losses: {
      type: Number
    },
    leaguePoints: {
      type: Number
    },

    summonerLevel: String,

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Loldev"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Loldev"
      }
    ]
  },

  {
    timestamps: true
  }
);

module.exports = model("Lol", LolSchema);
