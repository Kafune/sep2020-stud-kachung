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

function choiceAcceptedMessage(){
   return JSON.stringify({messageType: "CHOICE ACCEPTED" })
}
//TODO: Add some nessecary properties
function choiceNotAcceptedMessage(reason) {
   return JSON.stringify({messageType: "CHOICE NOT ACCEPTED", reason})
}

//TODO: Add some nessecary properties
function opponentChoiceMessage(opponentName) {
   return JSON.stringify({messageType: 'OPPONENT CHOICE', opponentName})
}

//TODO: Add some nessecary properties
function loseMessage(loser) {
   return JSON.stringify({messageType: 'LOSE', ownScore: loser.score, opponentName: loser.opponentName, opponentScore: loser.opponentScore})
}

//TODO: Add some nessecary properties
function opponentLeftMessage(opponentName) {
   return JSON.stringify({messageType: 'OPPONENT LEFT', opponentName})
}

function tieMessage(){
   return JSON.stringify({messageType: "TIE" })
}

//TODO: Add some nessecary properties
function winMessage(winner){
   return JSON.stringify({messageType: "WIN", ownScore: winner.score, opponentName: winner.opponentName, opponentScore: winner.opponentScore})
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

   if(webSocketServer.clients.size > 2) {
      console.log("Too many players.")
      websocket.reason = "Too many players."
      websocket.send(websocket.reason);
      websocket.close();
      return false;
   }

   console.log("CONNECTION CREATED");
   

   websocket.on('message', function incoming(message) {
      const messageObject = JSON.parse(message)
      websocket.choice = messageObject.choice
      websocket.userName = messageObject.userName
     
      //Check whether or not both servers have chosen something
      //beware! webSocketServer.clients is a set, not an array. So use size and destructuring.
      const [client1, client2] = webSocketServer.clients

      client1.score = 0;
      client2.score = 0;

      if(client1.choice) {
         console.log(client1.userName);
         client1.ownScore = client1.score;
         client2.opponentName = client1.userName;
         client2.opponentScore = client1.score;
         client1.send(prefabMessage.CHOICE_ACCEPTED());
         client2.send(prefabMessage.OPPONENT_CHOICE(client2.opponentName));
      } else {
         client2.ownScore = client2.score;
         client1.opponentName = client2.userName;
         client1.opponentScore = client2.score;
         client2.send(prefabMessage.CHOICE_ACCEPTED());
         client1.send(prefabMessage.OPPONENT_CHOICE(client1.opponentName));
      }
      
      if(webSocketServer.clients.size == 2 && client1.choice != undefined && client2.choice != undefined) {
         
         let result = playGame(client1, client2)

         if(result.isTie){
            console.log("tie")
            result.player1.send(prefabMessage.TIE())
            result.player2.send(prefabMessage.TIE())

         } else {
            console.log("winner")
            result.winner.score++;
            result.winner.send(prefabMessage.WIN(result.winner))
            result.loser.send(prefabMessage.LOSE(result.loser))
         }
         client1.choice = "";
         client2.choice = ""
      }
      
   
   });

   webSocketServer.on('close', function disconnect(websocket) {
      
   });
});




// connect the Express App to all incoming requests on the HTTP server
httpServer.on("request", expressApp);
httpServer.listen(3000, function() {
  console.log("The Server is listening on port 3000.");
});