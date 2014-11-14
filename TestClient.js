/*
 * test the websocket to my server
 * tinker 2014-7-21
 */
 
var WebSocket = require("ws");
var uuid      = require('node-uuid');
var events    = require('events');
var util      = require('util');
var fs        = require('fs');

var TestClient = function(url, msgCount, delay) {
  this.url = url;
  this.totalMessageCount = msgCount;
  this.cache = {};
  this.currentTotalMessageCount = 0;
  this.totalSpendTime = 0;
  this.avgSendTime = 0;
  this.ws = null;
  this.sendDirect = false;
  this.delay = delay || 3000;

  events.EventEmitter.call(this);

  this.on('fire', this.onfire);
};

util.inherits(TestClient, events.EventEmitter);

TestClient.prototype.readyToFire = function() {
  this.emit('fire');
};

TestClient.prototype.onfire = function() {
  var self = this;
  this.ws = new WebSocket(self.url);
  var ws = this.ws;

  ws.on('open', function(msg) {
    //console.log('wsocket connected');
    self.heartbeat();
    self.fireOne();
  });

  ws.on('message', function(msg, flag){
    var data = JSON.parse(msg);
    if(data.stanza && data.stanza == "message") {
      var uuid = data.friendMessage.guid;
      var createTime = self.cache[uuid];
      if(createTime) {
        var respSpendTime = new Date().getTime() - createTime;
        
        self.totalSpendTime += respSpendTime;
        self.currentTotalMessageCount ++;
        self.avgSendTime = (self.totalSpendTime / self.currentTotalMessageCount).toFixed();

        if(self.currentTotalMessageCount < self.totalMessageCount) {
          //self.fireOne();
        } else {
          ws.close();
        }

        self.showInfo(respSpendTime);
      }
    }
  });

  ws.on('error', function(err){
    self.showInfo();
    console.log(err);
    console.log(ws.url);
    ws.close();
  });

  ws.on('close', function(){
    self.showInfo();
    clearInterval(self.heartbeatHandler);
    self.emit('close');
  });
};

TestClient.prototype.fireOne = function(noDelay) {
  var self = this;

  self.fireDirectly()

  setInterval(function() {
    self.fireDirectly()
  }, self.delay)

};

TestClient.prototype.fireDirectly = function() {
  if(this.ws != null) {
    var msg = this.newMsg();
    var uuid = msg.friendMessage.guid;
    this.cache[uuid] = new Date().getTime();

    this.ws.send(JSON.stringify(msg));
  } else {
    console.error("websocket client is null");
  }
}

TestClient.prototype.newMsg = function() {
  return {
    "stanza": "friendMessage",
    "friendMessage": {
      "from":    14969,
      "to":      16498,
      "typ":     0,
      "content": "来自星星的老牛",
      "guid":     uuid.v1()
    }
  }
};


TestClient.prototype.heartbeat = function() {
  var self = this;
  var heartmsg = JSON.stringify({"stanza": "ping"});
  self.hearbeatHandler = setInterval(function() {
    if(self.ws.readyState == WebSocket.OPEN) { 
      self.ws.send(heartmsg);
    } else {
      clearInterval(this);
    }
  }, 5000);
};

TestClient.prototype.showInfo = function(respSpendTime) {
  // if (respSpendTime) {    
  //   console.log("current spend time: " + respSpendTime);
  // }

  // console.log(
  //   this.avgSendTime + " ms ---- " + 
  //   this.currentTotalMessageCount
  // );

  // console.error(this.avgSendTime);
};

module.exports = TestClient;





