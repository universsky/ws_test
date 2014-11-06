var exec = require('child_process').exec;
var fs   = require('fs');
var events    = require('events');
var util      = require('util');

var Tester = function(currentCount) {
  this.currentCount = currentCount || 10;
  this.totalSpendTime = 0;
  this.currentThreadNum = 0;

  events.EventEmitter.call(this);
};

util.inherits(Tester, events.EventEmitter);

Tester.prototype.test = function() {
  console.log("test start with concurrent - " + this.currentCount);

  var self = this;

  exec('node TestPerformance.js ' + this.currentCount, function(error, stdout, stderr){
    if(error) {
      console.log("error msg: " + error);
    } else {

      var time = parseInt(stderr);
      console.log( time + " ms");

      fs.writeFile(
        "./results/result_aihaisi_2014-9-3.csv", 
        self.currentCount + "," + time + "\n", 
        {flag: "a"}, 
        function(err, res){
          if(err) {
            console.log(err);
          }

          self.emit('over');
      });
    }
  });

};


var doTest = function(count, increment, limit) {
  var crrTester = new Tester(count);
  crrTester.on('over', function(){
    if(count < limit) {
      setTimeout(function(){
        doTest(count + increment, increment, limit)
      }, 5000)
    }
  });

  crrTester.test();
};


doTest(10, 10, 1000);
