/*
 * test the websocket to my server
 * tinker 2014-7-21
 */
 
var WebSocket = require("ws");
var param = "2014090910312532dc833e92a2d4c9895b395a452985a79a6f3fa14afa69fbf2e6c4bbff12cf19&doctorId=14969";

if(process.argv[2]) {
  param = "?since=" + process.argv[2];
}

var token = "";
var url= "ws://127.0.0.1:9000/ws/doctor/13306/" + token + param;

console.log(url);

var ws = new WebSocket(url);

ws.on('open', function() {
  console.log('wsocket connected');
  console.log(msgStr);
  console.log("--------------");
  ws.send(msgStr);
});

ws.on('message', function(msg, flag){
  var data = JSON.parse(msg);
  if(data.stanza == 'error') {
    console.log(msg);
  }

  if(data.stanza == "support" && data.guid == message.guid) {
    console.log(msg);
  }
});

ws.on('error', function(err){
  console.log(err);
  console.log(ws.url);
  ws.close();
});

var message  = {
  stanza: "support",
  guid: "362e46a7-db7a-4070-a795-aec768aab5ec",
  support: {
    from: 13306,
    to: 14969,
    typ: 0,
    guid: "34de42d9-9d65-b8e8-93ca-3918734d1b18",
    content: "evert day be a nice day!"
   // deliverId: 0,
    //created: new Date().getTime()
  }
};

var msgStr = JSON.stringify(message)



