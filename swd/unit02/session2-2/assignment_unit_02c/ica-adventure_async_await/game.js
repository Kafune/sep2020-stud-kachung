const fetch = require('node-fetch');

let game = {};

let player = {
    location: 'town',
    items: []
};

let map = {
    town: {
        description: 'a town',
        exits: ['forest', 'mountain']
    }
};
/**
 * Checks if there is a connection between the player current location 
 * and the location represented by the give locationName and moves the 
 * player to that location.
 * Otherwise it does nothing.
 * 
 * If this destination location is already visited, the local copy is 
 * loaded (e.g. the one in the map variable)
 * Otherwise a request for this location is issued to the server and the 
 * response is added to the local copy of the map.
 * 
 * @param {String} locationName - The name of the location the player wants to move to.
 * 
 * @returns {Promise} Promise object holding the name of the location the player is,
 * or an error-object when a connection with the map-server could not be established, or the 
 * received json is not valid.
 * 
 */
game.goToLocation = async locationName => {
    //B)
    if(map[locationName]) {
         return locationName;
    }

    let request = await fetch('http://localhost:3000/' + locationName);
    let response = await request.json();

    map[locationName] = response;
    map[locationName].description = response.description;
    player.location = map[locationName];

    return response;
};

/**
 * Returns an object containing the description and the 
 * exits of the players current location on the map.
 * 
 * @returns {Promnise} Promise object containing the location information object.
 */
game.getLocationInformation = async () => {
    const playerLocation = map[player.location];
    
    let locationInfo = {
        description: playerLocation.description,
        exits: playerLocation.exits
    };

    return locationInfo;
};

module.exports = game;
