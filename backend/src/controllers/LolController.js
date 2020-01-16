const axios = require("axios");
const Loldev = require("../models/Loldev");

module.exports = {
  async index(req, res) {
    const { user } = req.headers;

    const loggedUser = await Loldev.findById(user);

    const users = await Loldev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedUser.likes } },
        { _id: { $nin: loggedUser.dislikes } }
      ]
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    // encontrar un usuario para ver si hay repetido
    const userExists = await Loldev.findOne({ user: username });
    const apikey = "RGAPI-581ae6b1-6b0d-46d0-9101-4a20c20eeab4";

    if (userExists) {
      return res.json(userExists);
    } else {
      // api de riot que llama los datos por nombre de usuario
      const promise1 = await axios.get(
        `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${apikey}`
      );
      const { id: summonerId } = promise1.data;
      console.log(summonerId);

      const promise2 = await axios.get(
        `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apikey}`
      );



      const { leaguePoints } = promise2.data;

      console.log(leaguePoints);

      if (leaguePoints != 0) {
        const { summonerLevel } = promise1.data;
        const { rank, tier, wins, losses, summonerName } = promise2.data[0];
        const loldev = await Loldev.create({
          user: summonerName,
          summonerLevel,
          summonerId,
          rank,
          leaguePoints,
          tier,
          wins,
          losses
        });
        return res.json(loldev);
      } else {
        const { summonerLevel, name } = promise1.data;
        const loldev = await Loldev.create({
          user: name,
          summonerLevel,
          summonerId,
          rank: "NA",
          tier: "NA",
          wins: 0,
          losses: 0
        });
        return res.json(loldev);
      }
    }
  }
};
