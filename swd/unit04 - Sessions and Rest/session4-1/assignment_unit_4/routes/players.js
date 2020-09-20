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
    res.send("sign in!");
});

players.post('/logout', async (req, res) => {
    res.send("sign out!");
});

module.exports = players;