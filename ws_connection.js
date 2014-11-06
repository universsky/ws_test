/* * test the websocket to my server * tinker 2014-7-21 */ 
var WebSocket = require("ws");
var param = "";

if(process.argv[2]) {
  param = "?since=" + process.argv[2];
}

var token = "20140812211935b91bb65b45d201ca35fb26091e51ec1b7c30d00f25d0106d249d1b312fe70398";
//var url= "ws://127.0.0.1:9000/ws/doctor/14969/" + token + param;
//var url = "ws://yisheng.aihaisi.com/ws/doctor/7276/20141030175626fbdab1724578d3aa523d0198ebc649103aa588da67fc042113ca6ee4a21230ca";
//var token = "20140812211935b91bb65b45d201ca35fb26091e51ec1b7c30d00f25d0106d249d1b312fe70398";

var url = "ws://yisheng.aihaisi.com/ws/doctor/14969/" + token + param;
//var url = "ws://xingren.com/ws/doctor/14969/" + token + param;
console.log(url);

var ws = new WebSocket(url);

ws.on('open', function(msg) {
  console.log('wsocket connected');
// console.log(msg);
  heartbeat();  
});

ws.on('message', function(msg, flag){
  //console.log(msg);
  var data = JSON.parse(msg);
 if(data.task || data.tasks )
    console.log(data);
});

ws.on('error', function(err){
  console.log(err);
  console.log(ws.url);
  ws.close();
});

var heartbeat = function() {
  setInterval(function(){
    ws.send("{\"stanza\": \"ping\"}");
  }, 10000);
};
