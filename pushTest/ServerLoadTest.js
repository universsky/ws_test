/**
 * Increase the websocket connection, but not send message.
 * Check the server loading status - memery and cpu
 */
var TestClient = require("../TestClient.js");
//var doctorId = 14969;
//var token = "20140812211935b91bb65b45d201ca35fb26091e51ec1b7c30d00f25d0106d249d1b312fe70398";
var doctorId = 13306
var token = "20141014163637fc4fdae2ba935bcdc2aa5758484300b6a71cb1988a342d4ebdc9209c5b1ed5e7";
//var url = "ws://127.0.0.1:9000/ws/doctor/" + doctorId + "/" + token;
//var url = "ws://yisheng.aihaisi.com/ws/doctor/" + doctorId + "/" + token;
var url = "ws://183.60.244.17:9090/ws/doctor/" + doctorId + "/" + token;


var totalClient = 0;

var showStatus = function() {
  console.log("active client count -- " + totalClient);
};

/** create a new client */
var newClient = function() {
  //no message sending nessary
  var client = new TestClient(url, 0);
  client.readyToFire();

  client.on('close', function(){
    totalClient--;

    showStatus();
  });

  totalClient++;
  showStatus();
};


setInterval(function(){
  newClient();
}, 1500)
