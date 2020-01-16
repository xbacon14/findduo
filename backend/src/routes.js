const express = require("express");
const LolController = require("./controllers/LolController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = express.Router();

routes.get("/lol", LolController.index);

routes.post("/lol", LolController.store);
routes.post("/lol/:lolId/likes", LikeController.store);
routes.post("/lol/:lolId/dislikes", DislikeController.store);

module.exports = routes;
