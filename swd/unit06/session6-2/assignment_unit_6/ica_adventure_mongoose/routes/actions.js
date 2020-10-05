'use strict';

const mongoose = require('mongoose');
require('../model/player.js');
require('../model/location')

const express = require('express');
const router = express.Router();

const Player = mongoose.model('Player');
const Location = mongoose.model('Location');

router.get('/:player/where', (req, res) => {
    //1. find the correct player.
    Player.findById(req.params.player).then(player => {
        //2. call the correct method from the model.
        return player.getLocationInformation();
    }).then(locationInformation => {
        //3. send back the response.
        res.json(locationInformation);
    });
});

router.put('/:player/goto', (req, res) => {
    res.json('replace me with your code');
});



module.exports = router;