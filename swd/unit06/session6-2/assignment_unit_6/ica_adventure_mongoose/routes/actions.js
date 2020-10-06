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

    console.log(player.map)
    console.log(currentLocation);
    console.log(currentLocation.exits);

    //if exits on currentLocation includes newLocation
    if(currentLocation.exits.includes(newLocationName) ) {
        console.log("true");
        player.currentLocation = newLocationName;
        const newLocation = await Location.findById(player.currentLocation);

        await player.map.push(newLocation);
    } else {
        const newLocation = await Location.findById(newLocationName);

        console.log(newLocation.description)
    }


    //if !newLocation in player.map

    // await player.map.push(newLocation);

    //await goToLocation(newLocationName)
    await player.save();

    // res.json(newLocationName.description);
});



module.exports = router;