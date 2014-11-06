/**
 * Test the websocket service 
 *
 * 老牛 - 2014-9-1
 */
var TestClient = require("./TestClient.js");

var doctorId = 14969;
var token = "20140812211935b91bb65b45d201ca35fb26091e51ec1b7c30d00f25d0106d249d1b312fe70398";
var url = "http://127.0.0.1:9000/ws/doctor/" + doctorId + "/" + token;

var clientCount = 10;
var clientMsgCount = 10;
var totalClientMsgRespTime = 0;


var createClients = function(count) {
  var actaulCount = count || clientCount;
  var clients = [];
  var respCount = 0;
  
  for(var i = 0; i < actaulCount; i++) {
    var client = new TestClient(url, clientMsgCount);
    client.on('close', function() {
      totalClientMsgRespTime += parseInt(client.avgSendTime);
      respCount++;

      if(respCount == actaulCount) {
        var theTime = (totalClientMsgRespTime/respCount).toFixed()
        console.log("avg resp time: " + theTime + " ms");
        console.error(theTime)
      }
      
    });
    clients.push(client);
  }

  return clients;
};

var fireClients = function(clients) {
  var len = clients.length;
  if(len > 0) {
    for(var i = 0; i < len; i++) {
      clients[i].readyToFire();      
    }
  }
};

var count = process.argv[2];
if(!!count) {
  fireClients(createClients(parseInt(count)));
}






