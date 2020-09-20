const express = require('express')
const players = express.Router();

players.post('/register', async (req, res) => {
    res.send("sign up!");
});

players.post('/login', async (req, res) => {
    res.send("sign in!");
});

players.post('/logout', async (req, res) => {
    res.send("sign out!");
});

module.exports = players;