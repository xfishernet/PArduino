var Client = require('node-rest-client').Client;

var SerialPort = require("serialport").SerialPort
var serialport = require("serialport");
var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudrate: 115200,
  parser: serialport.parsers.readline("\n")
}, true); // this is the openImmediately flag [default is true]


var client = new Client();

serialPort.open(function () {

  console.log('open');

  serialPort.on('data', function(data) {
    console.log('data received: ' + data);

    obj = JSON.parse(data);

    
args ={

        headers:{"test-header":"client-api"},
        data: {"pressure": obj.pressure, "temp": obj.temperature}
      };

	client.post("http://map.x-fisher.org.ua/meteo", args, function(data, response){
            
	}).on('error', function(err) {
		
	    console.log("ERROR: " + err);

	});


  });


});


var cronJob = require('cron').CronJob;
new cronJob('00 */5 * * * *', function(){

    console.log('You will see this message every */5 second');

	serialPort.write("BMP085.getData\n", function(err, results) {
	    console.log('err ' + err);
	    console.log('results ' + results);
  });



}, null, true, "America/Los_Angeles");


