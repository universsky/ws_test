/*
 * test the websocket to my server
 * tinker 2014-7-21
 */
 
var WebSocket = require("ws");
var param = "";

if(process.argv[2]) {
  param = "?since=" + process.argv[2];
}

var token = "2014072111075838e405bff7e8517f3821fcb4b88f714889a27e3b97758beae48dc731b4adfce3";
var url= "ws://127.0.0.1:9000/ws/doctor/10180/" + token + param;

console.log(url);

var ws = new WebSocket(url);

ws.on('open', function() {
  console.log('wsocket connected');
  console.log(message);
  console.log("--------------");
  ws.send(message);
});

ws.on('message', function(msg, flag){
  var data = JSON.parse(msg);
  if(data.stanza != "init") {
    console.log(msg);
  }
});

ws.on('error', function(err){
  console.log(err);
  console.log(ws.url);
  ws.close();
});

var message  = JSON.stringify({
  stanza: "message",
  guid: "362e46a7-db7a-4070-a795-aec768aab5ec",
  message: {
    from: 10180,
    to: 6452,
    typ: 0,
    guid: "3dde42d9-9d65-b8e8-93ca-3918734d1b18",
    content: "来自上海的牛"
  }
});



