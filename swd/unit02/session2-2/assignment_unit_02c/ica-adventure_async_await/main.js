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
        console.log(result);
        return Promise.resolve(result);
    }).catch((error) => {
        if (error) {
            if (error.code === COMMAND_ERROR) {
                console.log(error.message);
            } else {
                //Whenever we encounter an error we don't know how to deal with,
                //we throw it, so we can crash the program.
                throw error;
            }
        }
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

            response += locationInformation.exits.reduce((allExits, exit) => {
                return allExits + `\n- ${exit}`;
            }, '');

            return response;

        case 'goto':
        case 'g':
            //C
            try {
                let destination = await game.goToLocation(argument);
                let request = await destination();
                console.log(request);
            } catch (error) {
                error = "Ongeldige invoer!";
            }



        // .then(). => {
        //     error = "Locatie bestaat niet.";
        //     return error;
        // });
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            return Promise.reject(err);
    }
}