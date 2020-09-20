'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();

const games = require('./routes/games');
const actions = require ('./routes/actions');
const players = require('./routes/players');

app.use(bodyParser.json());
app.use(session({resave: true, saveUninitialized: true, secret: "qwerabcdgjia"}));
app.use('/actions', actions);
app.use('/games', games);
app.use('/', players)


const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});

