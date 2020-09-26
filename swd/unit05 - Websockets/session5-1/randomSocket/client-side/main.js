// alert("main.js is running, but does not do anything yet.\n"+
//       "Use main.js to write the code that connects to the server using WebSocket");


var wsConnection = new WebSocket('ws://localhost:3000/random'); // TODO Create a websocket and store it in this variable

function sendData() {
    var dataObject = {
       userName: document.getElementById("userNameField").value,
       maxValue: parseInt(document.getElementById("maxValueField").value)
    }

    let jsonStr = JSON.stringify(dataObject)

    wsConnection.send(jsonStr);
   
    console.log("SENT DATA:", jsonStr );
}

wsConnection.onopen = function(arg) {
    let li = document.createElement("li");
    document.getElementById("messageList").append(li);
    li.append("connection is open!");
};
 
wsConnection.onclose = function(arg) {
    let li = document.createElement("li");
    document.getElementById("messageList").append(li);
    li.append("connection is closed!");
    wsConnection = new WebSocket('ws://localhost:3000/random'); 
    sendData();
};
 
wsConnection.onmessage = function(arg) {
    let li = document.createElement("li");
    let msg = JSON.parse(arg.data);
    document.getElementById("messageList").append(li);
    li.append(msg.userName + " got the value " + msg.randomValue);
};
 
wsConnection.onerror = function(arg) {
    //TODO Complete this event handler
    let li = document.createElement("li");
    document.getElementById("messageList").append(li);
    li.append("Something went wrong");
};


/**
 * Function for adding text to the messalist element on the page
 * @param {String} text: the text to add to the messageList
 */
function addMessageItem(text) {
    var el = document.createElement("li");
    el.innerHTML = text;
    document.getElementById("messageList").appendChild(el);
}

/**
 * Function for handling form submissions
 */
document.getElementById("messageForm").addEventListener( "submit", function(eventInfo) {
    eventInfo.preventDefault();
    console.log("SUBMIT FORM");
    sendData();
});