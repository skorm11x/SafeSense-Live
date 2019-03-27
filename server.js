//http methods
const http = require('http');
//Library used for loading html docs/ more complex web apps

//temp web address
const hostname = '127.0.0.1';
var microtime = require('microtime');
//chosen port to display information
const port = 3000;
/***
Require stringify keeps pipe open for continuous data transmission
***/
var stringify = require('csv-stringify');
var stringifier = stringify();

// DEFINE EVENT LISTENER SETTINGS
process.setMaxListeners(1000);

//*************LIVE JAVASCRIPT FILES*******************
const dateTime = require('./Utility/Date');
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


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('title','SafeSense LIVE');


var dataAvail = false;
// ************************
// Aquire Program Mode desired
// ************************
var modeSelect = 0;
var dbConnect = 0; //Default defines no connection to database
var prompt = require('prompt');


  prompt.start();

  // console.log('Database Connection?');
  // console.log('yes');
  // console.log('no');
  // prompt.get(['DB'], function(err, dbConn){
  //   if(dbConn.DB == 'yes'){
  //     console.log('Select what database to connect to:');
  //     console.log('1 : Self connection (Test)');
  //     console.log('2: Main host connection');
  //     prompt.get(['Database'], function(err, database){
  //           if(database.Database == 1){
  //             //Jump to test host connect sequence
  //
  //           }
  //           if(database.Database == 2){
  //             //Jump to main host connect sequence
  //
  //           }
  //     });
  //   }
  //   else{
  //     dbConnect = 0;
  //   }
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
          dbCheck();
        }
        if(result.specifier == 2){
          modeSelect = 2;
          console.log('modeSelect = '+modeSelect+', sineWave Test');
          dbCheck();
        }
        if(result.specifier == 3){
          modeSelect = 3;
          console.log('modeSelect = '+modeSelect+', Sample Data Test');
          dbCheck();
        }
      });
    }
    if(result.Mode=='live'){
      modeSelect = 4;
      console.log('modeSelect = '+modeSelect+', Live Zigbee Data');
      dbCheck();
      zigBee.initializeZigbee();
    }
  });




function dbCheck(){

  var hold = 0;

  console.log("DB Connect? (yes) || (no)");
  prompt.get(['Connect'], function (err, result) {
    if(result.Connect == 'yes'){
      dbConnect = 1;
      console.log("Open Browser? (yes) || (no)");
      prompt.get(['browse'], function (err, result) {
        if(result.browse == 'yes'){
          //Open default user browser
          hold = 1;
          opn('http://localhost:3000');
          setupServer();
        }
        else{
          setupServer();
          hold = 1;
          //do nothing
        }
      });
    }
    else{
      dbConnect = 0;
      console.log("Open Browser? (yes) || (no)");
      prompt.get(['browse'], function (err, result) {
        if(result.browse == 'yes'){
          //Open default user browser
          hold = 1;
          opn('http://localhost:3000');
          setupServer();
        }
        else{
          //do nothing
          hold = 1;
          setupServer();
        }
      });
    }
  });
}




// ********************
// Setup Server
// ********************
//TODO: Update JSON Location to reflect running server of Dell precision Tower
function setupServer(){


if(dbConnect == 1){
  var con = mysql.createConnection({
    host: "localhost",
    user: "testuser",
    password: "safesense",
    database: "safesenselive"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
}

  var channelChartData = {
      location: 'Western Michigan University',
      channel: 'channel',
      unit: 'ADC Values',
      dataPoints: [
        {
          time: 0,
          force: 1000
        }
      ]
    }

  var channelChartDiffData = {
    location: 'Western Michigan University',
    channel: 'channel',
    unit: 'Newtons',
    dataPoints: [
      {
        time: 0,
        force: 0,
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

  //API ingest new data points Barchart
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
        console.log("First result: "+result);

                //Process time first val ms, second val nano
        var inTime = microtime.now();
        console.log("Server start time: "+inTime);

        //Delcare statement and values
        var sqState = "INSERT INTO randomdata (Time,Channel1, Channel2, Channel3, Channel4, Channel5, Channel6, Channel7, Channel8, Channel9, Channel10, Channel11, Channel12, Channel13, Channel14, Channel15, Channel16) VALUES ?";
        var valState = [
          [inTime ,result[0], result[1], result[2], result[3], result[4], result[5],
           result[6], result[7], result[8], result[9], result[10], result[11],
            result[12], result[13], result[14], result[15]]
        ];

        //Execute Query in continuous fashion
        if(dbConnect == 1){
          con.query(sqState, [valState], function(err) {
            if (err) throw err;
          }).stream().pipe(stringifier).pipe(process.stdout);
        }


        var endTime = microtime.now();
        console.log("Server end time: "+endTime);
        //Process time first val ms, second val nano
        var processTime = (endTime-inTime);
                console.log("Process time: "+processTime);
        console.log(processTime);
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
        //TODO: Capture time here for annotation into database.

        //LOG how much time it is taking for server action
        //Get the current time of data entering server
        var inTime = microtime.now();
        //Get the current time of data entering server
        //var hrTime = process.hrtime();
        //var sql = "INSERT INTO dataTable (Channel1, Channel2, Channel3, Channel4, Channel5, Channel6, Channel7, Channel8, Channel9, Channel10, Channel11, Channel12, Channel13, Channel14, Channel15, Channel16) VALUES (forces[0], forces[1], forces[2], forces[3], forces[4], forces[5], forces[6], forces[7], forces[8], forces[9], forces[10], forces[11], forces[12], forces[13], forces[14], forces[15])";
        //Delcare statement and values
        var sqState = "INSERT INTO livedata (Time,Channel1, Channel2, Channel3, Channel4, Channel5, Channel6, Channel7, Channel8, Channel9, Channel10, Channel11, Channel12, Channel13, Channel14, Channel15, Channel16) VALUES ?";
        var valState = [
          [inTime,forces[0], forces[1], forces[2], forces[3], forces[4], forces[5],
           forces[6], forces[7], forces[8], forces[9], forces[10], forces[11],
            forces[12], forces[13], forces[14], forces[15]]
        ];

        //Execute Query in continuous fashion
        if(dbConnect == 1){
          con.query(sqState, [valState], function(err) {
            if (err) throw err;
          }).stream().pipe(stringifier).pipe(process.stdout);
        }

        var endTime = microtime.now();
        var processTime = (endTime-inTime);
        console.log(processTime);

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
