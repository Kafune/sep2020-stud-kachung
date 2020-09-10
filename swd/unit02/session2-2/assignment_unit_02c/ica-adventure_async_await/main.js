'use strict';

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
        console.log(result);

    });

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
                
            response += locationInformation.exits.reduce((allExits, exit)  => {
                return allExits + `\n- ${exit}`;
            }, '');
                
            return response;
            
        case 'goto':
        case 'g':
            //C
            return game.goToLocation(argument).then(locationInfo => {
                response = `you are now in ${locationInfo.description}`;
                return response;
            }).catch((error) => {
                error = "Locatie bestaat niet.";
                return error;
            });
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            return Promise.reject(err);
    }
}