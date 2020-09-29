var express = require("express");
var ws = require("ws");
var http = require("http");
var path = require("path");

var expressApp = express();
var httpServer = http.createServer();
var webSocketServer = new ws.Server({
  server: httpServer
});


// code to setup the Express app (middleware, routes) can go here; eg:
expressApp.use(express.static(path.join(__dirname, "client-side")));

const rules = {
   rock:{
      scissors: true,
      paper: false
   },
   scissors: {
      rock: false,
      paper: true
   },
   paper:{
      rock: true,
      scissors: false
   }
}


const prefabMessage = {
   CHOICE_ACCEPTED : choiceAcceptedMessage,
   CHOICE_NOT_ACCEPTED : choiceNotAcceptedMessage,
   OPPONENT_CHOICE : opponentChoiceMessage,
   WIN: winMessage,
   LOSE: loseMessage,
   TIE: tieMessage,
   OPPONENT_LEFT: opponentLeftMessage
}

//TODO: Add some nessecary properties
function choiceAcceptedMessage(){
   return JSON.stringify({messageType: "CHOICE ACCEPTED" })
}

function choiceNotAcceptedMessage() {
   return JSON.stringify({messageType: "CHOICE NOT ACCEPTED"})
}

function opponentChoiceMessage() {
   return JSON.stringify({messageType: 'OPPONENT CHOICE'})
}

function loseMessage() {
   return JSON.stringify({messageType: 'LOSE'})
}

function opponentLeftMessage() {
   return JSON.stringify({messageType: 'OPPONENT LEFT'})
}

//TODO: Add some nessecary properties
function tieMessage(){
   return JSON.stringify({messageType: "TIE" })
}

//TODO: Add some nessecary properties
function winMessage(){
   return JSON.stringify({messageType: "WIN" })
}


function playGame(player1Socket, player2Socket){
   console.log(player1Socket.choice)
   if(player1Socket.choice.toLowerCase() === player2Socket.choice.toLowerCase()){
      return {isTie : true, player1: player1Socket, player2: player2Socket}
   }else if(rules[player1Socket.choice.toLowerCase()][player2Socket.choice.toLowerCase()]){
      return {isTie: false, winner: player1Socket, loser: player2Socket}
   }else{
      return {isTie: false, winner: player2Socket, loser: player1Socket}
   }
}

webSocketServer.on('connection', function connection(websocket) {
   console.log("CONNECTION CREATED");

   websocket.on('message', function incoming(message) {
      
      
      const messageObject = JSON.parse(message)
      websocket.choice = messageObject.choice
     
      //Check whether or not both servers have chosen something
      //beware! webSocketServer.clients is a set, not an array. So use size and destructuring.
      const [client1, client2] = webSocketServer.clients

      
      
      if(webSocketServer.clients.size == 2 && client1.choice != undefined && client2.choice != undefined){
         
         let result = playGame(client1, client2)

         if(result.isTie){
            console.log("tie")
            result.player1.send(prefabMessage.TIE())
            result.player2.send(prefabMessage.TIE())
         }else{
            console.log("winner")
            
            result.winner.send(prefabMessage.WIN())
            result.loser.send(prefabMessage.LOSE())
         }
        // webSocketServer.clients.forEach((server)=>{server.choice = undefined})
      }
      
   
   });


});


// connect the Express App to all incoming requests on the HTTP server
httpServer.on("request", expressApp);
httpServer.listen(3000, function() {
  console.log("The Server is listening on port 3000.");
});