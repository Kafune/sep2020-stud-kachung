const mongoose = require('mongoose');

require ('./location');
const Location = mongoose.model('Location');

const playerSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: 'true'
    },
    items: {
        type: [String],
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    map: {
        type: [Map],
        of: Location,
        required: true
    }
});


playerSchema.methods.getLocationInformation = async function () {
    console.log(this.currentLocation)
    return await Location.findById(this.currentLocation)
}

playerSchema.methods.goToLocation = async function (newLocationName) {
    const location = await Location.findById(this.currentLocation);
    console.log(location)
    // if() {
    //     await Player.map.push(Location.findById(newLocationName))
    // }
    return await Player.updateOne({[this.currentLocation]: newLocationName})
}

//Place your model definition here below the method definitions
const Player = mongoose.model('Player', playerSchema);
