const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const routes = require('./routes');

const server = express();

server.use(cors());


mongoose.connect('mongodb+srv://xbacon14:84125497@proyectoreact-yp1rn.mongodb.net/proyectoreact?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

server.use(express.json())
server.use(routes);

server.listen(3333);
