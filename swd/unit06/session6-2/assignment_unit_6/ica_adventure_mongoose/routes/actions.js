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

router.put('/:player/goto', async (req, res) => {
    const player = await Player.findById(req.params.player);
    const currentLocation = await Location.findById(player.currentLocation);
    const newLocationName = req.query.location;
    const newLocation = await Location.findById(newLocationName);

    console.log(player.map);
    // console.log(currentLocation);
    // console.log(currentLocation.exits);

    //if exits on currentLocation includes newLocation
    if(currentLocation.exits.includes(newLocationName)) {
        console.log("true");
        await player.goToLocation(newLocationName);
        
        player.currentLocation = newLocationName;
        await player.save();

        res.json({
            description: newLocation.description
        });
    } else {
        res.json({
            description: "Locatie bestaat niet!"
        })
        throw new Error("Locatie bestaat niet!");
    }
});



module.exports = router;