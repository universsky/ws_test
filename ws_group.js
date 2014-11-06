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

  var toNewGroup = JSON.stringify({
    stanza: "group",
    group: {
      doctorId: 10180,
      name: "来自上海的牛-new"
    }
  });

  var toUpdateGroup = JSON.stringify({
    stanza: "group",
    operation: "update",
    group: {
      id: 1805,
      doctorId: 10180,
      name: "来自上海的老牛修改-update"
    }
  });

  var toDeleteGroup = JSON.stringify({
    stanza: "group",
    operation: "delete",
    group: {id: 1807, doctorId: 10180}
  });


 // ws.send(toNewGroup);
  ws.send(toUpdateGroup);
 // ws.send(toDeleteGroup);
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
