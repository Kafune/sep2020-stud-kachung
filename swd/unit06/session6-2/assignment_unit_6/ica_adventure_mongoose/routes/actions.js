'use strict';

const mongoose = require('mongoose');
require('../model/player.js');
require('../model/location')

const express = require('express');
const router = express.Router();

const Player = mongoose.model('Player');
const Location = mongoose.model('Location');

router.get('/:player/where', async (req, res) => {
    
    const getPlayer = await (Player.findById(req.params.player)).exec();
    const getLocation = await(Location.findOne({_id: getPlayer.currentLocation}))
    res.json({
        "description": getLocation.description,
        "exits": getLocation.exits
    });
});

router.put('/:player/goto', (req, res) => {
    res.json('replace me with your code');
});



module.exports = router;