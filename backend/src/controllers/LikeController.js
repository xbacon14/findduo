const Loldev = require("../models/Loldev");

module.exports = {
  async store(req, res) {
    const { lolId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Loldev.findById(user);
    const targetDev = await Loldev.findById(lolId);

    
    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    if (targetDev.likes.includes(loggedDev._id)) {
        console.log('Enhorabuena, Coincidieron!');
        
    }

    // adiciona el id al array likes del usuario
    loggedDev.likes.push(targetDev._id);

    await loggedDev.save();

    return res.json(loggedDev);
  }
};
