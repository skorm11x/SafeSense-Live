//http methods
const http = require('http');
//Library used for loading html docs/ more complex web apps

//temp web address
const hostname = '127.0.0.1';
//chosen port to display information
const port = 3000;
//*************LIVE JAVASCRIPT FILES*******************
const dateTime = require('./Utility/Date');
const calc = require('./Utility/Calc');
const randomTest = require('./Test/RandomData');
const sineWaveTest = require('./Test/sineWaveTest');
const sampleTest = require('./Test/sampleData');
const zigBee = require('./Zigbee/serialPorts');
const opn = require('opn');
const requireJS = require('requirejs');

const express = require('express');
var path = require('path');
var bodyParse = require('body-parser');

var app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "testuser",
  password: " "
});

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('title','SafeSense LIVE');


var dataAvail = false;
// ************************
// Aquire Program Mode desired
// ************************
var modeSelect = 0;
var prompt = require('prompt');

  //
  // Start the prompt
  //
  prompt.start();

  console.log('Please select a mode to operate:');
  console.log('test');
  console.log('live');
  prompt.get(['Mode'], function (err, result) {

    if(result.Mode == 'test'){
      console.log('Please Select a test mode to operate:');
      console.log('Random Data Test - (1)');
      console.log('sineWave Test - (2)');
      console.log('Sample Data Test - (3)');
      prompt.get(['specifier'], function (err, result){
        if(result.specifier == 1){
          modeSelect = 1;
          console.log('modeSelect = '+modeSelect+', Random Data Test');
          setupServer();
        }
        if(result.specifier == 2){
          modeSelect = 2;
          console.log('modeSelect = '+modeSelect+', sineWave Test');
          setupServer();
        }
        if(result.specifier == 3){
          modeSelect = 3;
          console.log('modeSelect = '+modeSelect+', Sample Data Test');
          setupServer();
        }
      });
    }
    if(result.Mode=='live'){
      modeSelect = 4;
      console.log('modeSelect = '+modeSelect+', Live Zigbee Data');
      setupServer();
      zigBee.initializeZigbee();
    }
  });
// ********************
// Setup Server
// ********************
//TODO: Update JSON Location to reflect running server of Dell precision Tower
function setupServer(){
  var channelChartData = {
      location: 'Western Michigan University',
      channel: 'channel',
      unit: 'newtons',
      dataPoints: [
        {
          time: 0,
          force: 1000
        }
      ]
    }
  //TODO: Update JSON Location to reflect running server of Dell precision Tower
  var barChartData = {
    location: 'Western Michigan University',
    unit: 'newtons',
    dataPoints: [
      {
        force: 1000
      }
    ]
  }

//Open default user browser
opn('http://localhost:3000');

//GET request for modeSelect
  app.get('/getModeSelect', function(req,res){
    var f = JSON.stringify(modeSelect);
    res.send(f);
  });

  //GET request for channel historical data
  app.get('/getChannelData', function(req,res){
    res.send(channelChartData);
  });

  //GET request for channel bar data
  app.get('/getBarData', function(req,res){
    res.send(barChartData);
  });

  //API ingest new data points Linechart
  app.get('/addChannelData', function(req,res){
    var temp = parseInt(req.query.force);
    var time = parseInt(req.query.time);
    if(temp && time && !isNaN(temp) && !isNaN(time)){
      var newDataPoint = {
        force: temp,
        time: time
      };
      channelChartData.dataPoints.push(newDataPoint);
      res.send({success:true});
    }else{
      res.send({success:false, errorMessage: 'Invalid Query Paramaters, required - force & time.'});
    }
  });

  //API ingest new data points Linechart
  app.get('/addbarData', function(req,res){
    var temp = parseInt(req.query.force);
    if(temp && !isNaN(temp)){
      var newDataPoint = {
        force: temp,
      };
      channelChartData.dataPoints.push(newDataPoint);
      res.send({success:true});
    }else{
      res.send({success:false, errorMessage: 'Invalid Query Paramaters, required - force & time.'});
    }
  });


    app.get('/getRandomData',function(req,res){
        var result = randomTest.getRandomInt(0,1800);
        res.send(result);
    });

    /*
    Function has total of 32 points for full sine wave rotation
    Fpp max (force peak value: 1800 (unitless) ) Fpp min : 200
    Each step results in 100 (unitless) increase in value.
    Each channel has offset of 10 (8 treated as "middle") at 1000
    */
    var modifier = 0;
    var riseChk = 1;
    app.get('/getSineData',function(req,res){
        var result = sineWaveTest.getSineTest(modifier);
        if(modifier >= 0 && riseChk == 1 && modifier < 800){
          modifier += 100;
        }
        if(modifier == 800){
          riseChk = 0;
          modifier-=100;
        }
        if(modifier > -800 && riseChk == 0 && modifier < 800){
          modifier-=100;
        }
        if(modifier == -800){
          riseChk = 1;
          modifier += 100;
        }
        if(modifier >-800 && riseChk == 1){
          modifier += 100;
        }
        res.send(result);
    });

    /*
    Function pulls the sampleData set from the local database
    This function runs continuously as a demo in house
    */
    app.get('/getSampleData',function(req,res){

    });

    /*
    Function reads data points from Zigbee connection
    */
    app.get('/getForceData', function(req,res) {
    // console.log('dataAvail: ', dataAvail);
      if (dataAvail) {
        dataAvail = false;
    // console.log(forces);
        res.send(forces);
      } else {
        res.send('0');
      }
    });


    //Handle 404
    app.use(function(req,res,next){
      var error404 = new Error('Route not found!');
      error404.status = 404;
      next(error404);
    });

    //Export the App
    module.exports = app;

    //Display a message in command line listing Port used
    app.listen(3000,function(){
      console.log('SafeSense LIVE is running on port 3000');
    })
}
