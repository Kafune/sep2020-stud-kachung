'use strict';

const { RSA_X931_PADDING } = require('constants');
const readline = require('readline');
const game = require('./game');

const rl = readline.createInterface(process.stdin, process.stdout);

const COMMAND_ERROR = Symbol();

rl.setPrompt('action?> ');
rl.prompt();

rl.on('line', (line) => {
    const [command, argument] = line.trim().split(' ');
    execute(command, argument).then(result => {
        //A)
        // Als ik een async await op de functie execute probeer uit te voeren, krijg ik de error: await is only valid in async function
        // Ik denk dat execute niet async uitgevoerd kan worden omdat deze functie in een synchronische functie rl.on wordt uitgevoerd.
        console.log(result);
        return Promise.resolve(result);
    }).catch((error) => {
        return Promise.reject(error);
    })

}).on('close', function () {
    //DEFAULT ^c
    console.log('Leaving the game');
    process.exit(0);
});

async function execute(command, argument) {
    let response;
    switch (command) {
        case 'where':
        case 'w':
            const locationInformation = await game.getLocationInformation()
            response = `you are in ${locationInformation.description}`;
            response += '\nand you can go to these location(s): '

            response += locationInformation.exits.reduce((allExits, exit) => {
                return allExits + `\n- ${exit}`;
            }, '');

            return response;

        case 'goto':
        case 'g':
            //C
            if(argument == null || argument == undefined) {
                return Promise.reject(`Geen locatie ingevoerd.`);
            }
            let locationInfo = await game.goToLocation(argument)
            response = `you are now in ${locationInfo.description}`;
            return Promise.resolve(response);
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            return Promise.reject(err);
    }
}