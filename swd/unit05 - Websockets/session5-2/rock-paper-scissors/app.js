var express = require('express');
var ws = require('ws');
var http = require('http');
var path = require('path');

var expressApp = express();
var httpServer = http.createServer();
var webSocketServer = new ws.Server({
   server: httpServer,
   verifyServer: hasTwoConnections
});

function hasTwoConnections() {
   return webSocketServer.clients.size <= 2;
}

// Code to setup the Express app (middleware, routes) can go here.
expressApp.use(express.static(path.join(__dirname, 'client-side')));

const rules = {
   rock: {
      scissors: true,
      paper: false
   },
   scissors: {
      rock: false,
      paper: true
   },
   paper: {
      rock: true,
      scissors: false
   }
}

const prefabMessage = {
   CHOICE_ACCEPTED : sendChoiceAcceptedMessage,
   CHOICE_NOT_ACCEPTED : () => {},
   OPPONENT_CHOICE : () => {},
   WIN: () => {},
   LOSER: () => {}
}
function choiceAcceptedMessage(message) {

}
// max 2 spelers, juiste messagetypes returnen, als een game gespeeld is, bijhouden wat de stand is
function winMessage() {
   return JSON.Stringify({messageType: "WIN", ownScore: ""})
}


function playGame(player1Socket, player2Socket) {
   if (player1Socket.choice === player2Socket.choice) {
      return {isTie = true, player1: player1Socket, player2: player2Socket}
   } else if (rules[player1Socket.choice][player2Socket.choice]) {
      return {winner: player1Socket, loser: player2Socket}
   } else {
      return {winner: player2Socket, loser: player1Socket}
   }
}

// code to setup event listeners for WebSocket communication can go here
webSocketServer.on('connection', function connection(websocket) {
   console.log("Connection CREATED");

   websocket.on('message', function incoming(message) {
      const messageObject = JSON.parse(message);
      websocket.choice = messageObject.choice;

      console.log(webSocketServer.clients.size);

      if (webSocketServer.clients.size == 2) {
         // client1.partner = client2;
         // client2.partner = client1;
         // client1.partner.forEach();

         
         let [client1, client2] = webSocketServer.clients();
         let result = playGame(...webSocketServer.clients())

         if(result.isTie) {
            //tie
         } else {
            result.winner.sendJSON(prefabMessage.WIN(result))
            result.loser.sendJSON("loser message")
         }
      }
      // const result = playGame(eerste, tweede);

   });
});

httpServer.on('request', expressApp);
httpServer.listen(3000,
   function () {
      console.log("The Server is lisening on port 3000.")
   });
