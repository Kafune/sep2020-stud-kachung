'use strict';

const readline = require('readline');
const game = require('./game');
const { doesNotMatch } = require('assert');
const { error } = require('console');
const { RSA_X931_PADDING } = require('constants');

const rl = readline.createInterface(process.stdin, process.stdout);

const COMMAND_ERROR = Symbol();

rl.setPrompt('action?> ');
rl.prompt();

rl.on('line', (line) => {
    const [command, argument] = line.trim().split(' ');
    execute(command, argument).then(error, result => {
        //A)
        if (error) {
            if (error.code && error.code === COMMAND_ERROR) {
                console.log(error.message);
                return rl.prompt();
            } 
            else {
                //Whenever we encounter an error we don't know how to deal with,
                //we throw it, so we can crash the program.
                throw error;
            }
        } 
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

function execute(command, argument) {
    let response;
    switch (command) {
        case 'where':
        case 'w':
            return game.getLocationInformation().then(locationInformation => {
                response = `you are in ${locationInformation.description}`;
                response += '\nand you can go to these location(s): '

                response += locationInformation.exits.reduce((allExits, exit) => {
                    return allExits + `\n- ${exit}`;
                }, '');

                console.log(response);

                return Promise.resolve(response);
            }).catch((error) => {
                return Promise.reject(error);
            });
        case 'goto':
        case 'g':
            //C)
            if(argument == null || argument == undefined) {
                let error = new Error(`Ongeldige invoer`);
                return Promise.reject(error);
            }

            return game.goToLocation(argument).then(locationInfo => {
                response = `you are now in ${locationInfo.description}`;
                return Promise.resolve(response);
            }).catch((error) => {
                return Promise.reject(error);
            });
        default:
            let err = new Error(`The input: '${command}' is not defined`)
            err.code = COMMAND_ERROR;
            return Promise.reject(err);
    }
}