const e = require('express');
const express = require('express')
const players = express.Router();


const promiseWrappers = require('./../promise-wrappers');

const playerfilesFolderName = 'player_files';

players.post('/register', async (req, res) => {
    try {
        const fileLocation = playerfilesFolderName + `/${req.body.player}.json`;
        await promiseWrappers.createEmptyFileP(fileLocation);
        await promiseWrappers.writeFileP(fileLocation, JSON.stringify(req.body));
        res.send("Sign up!")
    } catch (error) {
        error = "Er is iets fout gegaan bij het aanmaken van de speler.";
        res.send(error);
    }
});

players.post('/login', async (req, res) => {
    const fileLocation = playerfilesFolderName + `/${req.body.player}.json`;
    const readFile = await promiseWrappers.readFileP(fileLocation);
    const parsedJSONFile = await JSON.parse(readFile);
    if(req.body.password == parsedJSONFile.password) {
        req.session.player = req.body.player;
        res.send("sign in!");
    } else {
        res.send("Invalid username or password!");
    }

});

players.post('/logout', async (req, res) => {
    if(req.session.player) {
        delete req.session.player;
        res.send("sign out!");
    } else {
        res.send("Not logged in!");
    }
});

module.exports = players;