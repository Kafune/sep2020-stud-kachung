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
    const newLocation = await Location.findById(newLocationName);
    const locationMap = this.map;
    console.log(locationMap)
    if(!this.map.includes(newLocationName)) {
        console.log(this.map)
        console.log('-----')
        console.log(newLocation._id);
        console.log(newLocation.exits)
        console.log(JSON.stringify(newLocation));
        // verwijst naar de .map functie i.p.v de locatie map in de db.
        // await this.map.update({
        //     _id: newLocation._id,
        //     description: newLocation.description,
        //     exits: newLocation.exits
        // })
    }
    return await this.updateOne({[this.currentLocation]: newLocationName})
}

//Place your model definition here below the method definitions
const Player = mongoose.model('Player', playerSchema);
