/*
 * test the websocket to my server
 * tinker 2014-7-21
 */
var http = require('http');

var url = 'http://local.me/api/lottery/draw?loginId=14969&token=20140812211935b91bb65b45d201ca35fb26091e51ec1b7c30d00f25d0106d249d1b312fe70398';

var total = 10000;
var count = 0;
var winCount = 0;

var shot = function() {
  http.get(url, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(data){
      count++;
      var json = JSON.parse(data);
      if(json.isWin) {
        winCount++;

       // console.log("count - " + count + " probobility - " + ( winCount/count ).toFixed(4) );
      }
   
      console.log("count - " + count + " probobility - " + ( winCount/count ).toFixed(4) );
      if(count < total) shot();
    });
  });
};

shot();
