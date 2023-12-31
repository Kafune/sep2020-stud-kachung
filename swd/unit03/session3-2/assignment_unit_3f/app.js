'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const games = require('./routes/games');
const actions = require ('./routes/actions');

app.use(bodyParser.json());
app.use('/action', actions);
app.use('/games', games);


const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});

