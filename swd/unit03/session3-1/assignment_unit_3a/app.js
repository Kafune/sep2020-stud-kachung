'use strict';

const express = require('express');
const game = require('./game.js');

const app = express();

app.get('/action/where', async (req, res) => {
    const locationInformation = await game.getLocationInformation(req);
    res.json(locationInformation);
});

app.put('/action/goto', async (req, res) => {
    //TODO A2)
    const destination = await game.goToLocation(req.query.location);
    res.json(destination);

    // const queryResponse = req.query;
    // console.log(queryResponse);
    
});

const server = app.listen(3000, () => {
    console.log(`game server started on port ${server.address().port}`);
});