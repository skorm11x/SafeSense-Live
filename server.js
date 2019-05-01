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
//const zigBee = require('./Zigbee/serialPorts');
const opn = require('opn');
const requireJS = require('requirejs');

const SerialPort = require('serialport');
var sp, commPort;
// var parser;
// find serial port that the ZigBee mondual is attached to...
var dataAvail = false;
var forces = [], forcesIdx = 0;

const express = require('express');
var path = require('path');
var bodyParse = require('body-parser');

var app = express();

var mysql = require('mysql');


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('title','SafeSense LIVE');


//var dataAvail = zigBee.dataAvail;
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
      //dbCheck();
      initializeZigbee();
      setupServer();
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
          force: 0
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
        //console.log("First result: "+result);

                //Process time first val ms, second val nano
        var inTime = microtime.now();
        //console.log("Server start time: "+inTime);

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
        //console.log("Server end time: "+endTime);
        //Process time first val ms, second val nano
        var processTime = (endTime-inTime);
                //console.log("Process time: "+processTime);
        //console.log(processTime);
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
     //console.log('dataAvail: ', dataAvail);
      if (dataAvail == true) {
        //TODO: Capture time here for annotation into database.

        //LOG how much time it is taking for server action
        //Get the current time of data entering server
        //var inTime = microtime.now();
        //Get the current time of data entering server
        //var hrTime = process.hrtime();
        //var sql = "INSERT INTO dataTable (Channel1, Channel2, Channel3, Channel4, Channel5, Channel6, Channel7, Channel8, Channel9, Channel10, Channel11, Channel12, Channel13, Channel14, Channel15, Channel16) VALUES (forces[0], forces[1], forces[2], forces[3], forces[4], forces[5], forces[6], forces[7], forces[8], forces[9], forces[10], forces[11], forces[12], forces[13], forces[14], forces[15])";
        //Delcare statement and values
        //var sqState = "INSERT INTO livedata (Time,Channel1, Channel2, Channel3, Channel4, Channel5, Channel6, Channel7, Channel8, Channel9, Channel10, Channel11, Channel12, Channel13, Channel14, Channel15, Channel16) VALUES ?";
        // var valState = [
        //   [inTime,forces[0], forces[1], forces[2], forces[3], forces[4], forces[5],
        //    forces[6], forces[7], forces[8], forces[9], forces[10], forces[11],
        //     forces[12], forces[13], forces[14], forces[15]]
        // ];

        //Execute Query in continuous fashion
        // if(dbConnect == 1){
        //   con.query(sqState, [valState], function(err) {
        //     if (err) throw err;
        //   }).stream().pipe(stringifier).pipe(process.stdout);
        // }

        // var endTime = microtime.now();
        // var processTime = (endTime-inTime);
        // console.log(processTime);

        dataAvail = false;
    // console.log(forces);


        res.send(forces);
        //console.log(forces);
      }
       else {
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
};


//***SERIAL CONNECTION***
function initializeZigbee(){
  SerialPort.list().then(
    ports => commPorts(ports),
    err => console.error(err)
  );
  function commPorts(ports)
  {
    ports.forEach(function(port) {
      if (port.manufacturer == 'FTDI') {
        commPort = port.comName;
      }
    });
    console.log('');
    if (commPort === undefined) {
      console.log('  ZigBee Module was not found\n');
    } else {
      console.log('  ZigBee Module commPort used: ', commPort, '\n');

      sp = new SerialPort(commPort, { baudRate: 115200 }, function(err) {
        if (err) {
          return console.log('Error: ', err.message);
        }
      });
      // const ByteLength = require('@serialport/parser-byte-length');
      // parser = sp.pipe(new ByteLength({length: 16}));
      fnParser();
    }
  };

  const rxPktStateEnum = {
    START: 0,                     //  0 - 1 byte
    FRAME_LENGTH: 1,              //  1 - 2 bytes
    FRAME_TYPE: 2,                //  3 - 1 byte
    SOURCE_ADDRESS: 3,            //  4 - 8 bytes
    SOURCE_NETWORK_ADDRESS: 4,    // 12 - 2 bytes
    SOURCE_ENDPOINT: 5,           // 14 - 1 byte
    DEST_ENDPOINT: 6,             // 15 - 1 byte
    CLUSTER_ID: 7,                // 16 - 2 bytes
    PROFILE_ID: 8,                // 18 - 2 bytes
    RCV_OPTIONS: 9,               // 20 - 1 byte
    DATA: 10,                     // 21 - FRAME_LENGTH - 18
    CHKSUM: 11
  };
  var rxPktState = rxPktStateEnum.START;

  const rxPktDataStateEnum = {
    FRAME_START: 0,    // 2 bytes (0xAA, 0x55)
    FRAME_CMD: 1,
    FORCE_DATA: 2
  };
  var rxPktDataState = rxPktDataStateEnum.FRAME_START;

  const ZigBeeRxFrameHeader = {
      START_DELIMITER: 0,         // 1 byte
      FRAME_LENGTH: 1,            // 2 bytes
      FRAME_TYPE: 3,              // 1 byte
      SOURCE_ADDRESS: 4,          // 8 bytes
      SOURCE_NETWORK_ADDRESS: 12, // 2 bytes
      SOURCE_ENDPOINT: 14,        // 1 byte
      DEST_ENDPOINT: 15,          // 1 byte
      CLUSTER_ID: 16,             // 2 bytes
      PROFILE_ID: 18,             // 2 bytes
      RCV_OPTIONS: 20,            // 1 byte
      DATA_START: 21              // frameLenget - 3 bytes
  };

  var frmLength, varHdrByteIdx, varDataByteCnt = 0;
  var chksum = 0;
  var frmType, srcAddr=[], srcNetworkAddr, srcEndPt, destEndPt, clusterId, profileId, rcvOptions;

  forces.length = 16;
  srcAddr.length = 8;

  function fnParser()
  {
    // parser.on('data', function (data) {
    sp.on('data', function (data) {
      var ch;
  // console.log('Data:', data);
      for (var i = 0; i < data.length; i++) {

        ch = data[i];
        chksum += ch;
        chksum &= 0xFF;
        if ((rxPktState != rxPktStateEnum.START) && (rxPktState != rxPktStateEnum.FRAME_LENGTH)) {
          if (frmLength-- == 0) {
            rxPktState = rxPktStateEnum.CHKSUM;
          }
        }

        switch (rxPktState) {

          case rxPktStateEnum.START:
   //console.log('\nSTART');
            if (ch == 0x7E) {
              varHdrByteIdx = 0;
              frmLength = 0;
              rxPktState = rxPktStateEnum.FRAME_LENGTH;
            } else {
   //console.log('  Packet resyncing %s', ch.toString(16));
            }
            break;

          case rxPktStateEnum.FRAME_LENGTH:
  //  console.log('  FRAME_LENGTH.%s', varHdrByteIdx);
            frmLength = (frmLength << 8) + ch;
           if (++varHdrByteIdx >= 2) {
              if (frmLength < (ZigBeeRxFrameHeader.DATA_START - 2)) {
                // invalid frame size
   //console.log('    Invalid frame size: 0x', frmLength.toString(16));
                rxPktState = rxPktStateEnum.START;
              } else {
   //console.log('    frmLength: 0x%s', frmLength.toString(16));
                chksum = 0;
                varHdrByteIdx = 0;
                rxPktState = rxPktStateEnum.FRAME_TYPE;
              }
            }
            break;

          case rxPktStateEnum.FRAME_TYPE:
            frmType = ch;
   //console.log('  FRAME_TYPE');
            if (frmType != 0x91) {
              // not the frame type I'm looking for
   //console.log('    Invalid frmType: 0x%s', frmType.toString(16));
              rxPktState = rxPktStateEnum.START;
            } else {
   //console.log('    frmType: 0x%s', frmType.toString(16));
              varHdrByteIdx = 0;
              rxPktState = rxPktStateEnum.SOURCE_ADDRESS;
            }
            break;

          case rxPktStateEnum.SOURCE_ADDRESS:
   //console.log('  SOURCE_ADDRESS.%s', varHdrByteIdx);
            srcAddr[varHdrByteIdx] = ch.toString(16);
            if (++varHdrByteIdx >= 8) {
  // console.log('    srcAddr: 0x%s%s%s%s%s%s%s%s', srcAddr[0],srcAddr[1],srcAddr[2],srcAddr[3],srcAddr[4],srcAddr[5],srcAddr[6],srcAddr[7]);
              varHdrByteIdx = 0;
              srcNetworkAddr = 0;
              rxPktState = rxPktStateEnum.SOURCE_NETWORK_ADDRESS;
            }
            break;

          case rxPktStateEnum.SOURCE_NETWORK_ADDRESS:
   //console.log('  SOURCE_NETWORK_ADDRESS.%s', varHdrByteIdx);
            srcNetworkAddr = (srcNetworkAddr << 8) + ch;;
            if (++varHdrByteIdx >= 2) {
   //console.log('    srcNetworkAddr: 0x%s', srcNetworkAddr.toString(16));
              rxPktState = rxPktStateEnum.SOURCE_ENDPOINT;
            }
            break;

          case rxPktStateEnum.SOURCE_ENDPOINT:
  // console.log('  SOURCE_ENDPOINT');
            srcEndPt = ch;
  // console.log('    srcEndPt: 0x%s', srcEndPt.toString(16));
            rxPktState = rxPktStateEnum.DEST_ENDPOINT;
            break;

          case rxPktStateEnum.DEST_ENDPOINT:
  // console.log('  DEST_ENDPOINT');
            destEndPt = ch;
  // console.log('    destEndPt: 0x%s', destEndPt.toString(16));
            varHdrByteIdx = 0;
            clusterId = 0;
            rxPktState = rxPktStateEnum.CLUSTER_ID;
            break;

          case rxPktStateEnum.CLUSTER_ID:
  // console.log('  CLUSTER_ID.%s', varHdrByteIdx);
            clusterId = (clusterId << 8) + ch;;
            if (++varHdrByteIdx >= 2) {
  // console.log('    clusterId: 0x%s', clusterId.toString(16));
              varHdrByteIdx = 0;
              profileId = 0;
              rxPktState = rxPktStateEnum.PROFILE_ID;
            }
            break;

          case rxPktStateEnum.PROFILE_ID:
  // console.log('  PROFILE_ID.%s', varHdrByteIdx);
            profileId = (profileId << 8) + ch;;
            if (++varHdrByteIdx >= 2) {
  // console.log('    profileId: 0x%s', profileId.toString(16));
              rxPktState = rxPktStateEnum.RCV_OPTIONS;
            }
            break;

          case rxPktStateEnum.RCV_OPTIONS:
  // console.log('  RCV_OPTIONS');
            rcvOptions = ch;
  // console.log('    rcvOptions: 0x%s', rcvOptions.toString(16));
            rxPktState = rxPktStateEnum.DATA;
            break;

          case rxPktStateEnum.DATA:
            switch (rxPktDataState) {
              case rxPktDataStateEnum.FRAME_START:
  // console.log('  FRAME_START.%s %s', varDataByteCnt, ch.toString(16));
                switch (varDataByteCnt) {
                  case 0:
                    if (ch != 0xAA) {
  // console.log('    Frame resyncing');
                    } else {
                      varDataByteCnt++;
                    }
                    break;
                  case 1:
                    if (ch != 0x55) {
  // console.log('    Frame resyncing');
                      if (ch != 0xAA) {
                        varDataByteCnt = 0;
                      }
                    } else {
                      // begining of new force data frame
                      rxPktDataState = rxPktDataStateEnum.FRAME_CMD;
                    }
                    break;
                  default:
  // console.log('      Invalid varDataByteCnt: ', varDataByteCnt);
                    rxPktDataState = rxPktDataStateEnum.FRAME_START;
                }
                break;

              case rxPktDataStateEnum.FRAME_CMD:
  // console.log('  FORCE_CMD %s', ch.toString(16));
                if (ch != 0x01) {
                  // not the frame command I'm looking for...
                  rxPktDataState = rxPktDataStateEnum.FRAME_START;
                } else {
                  // Force Data command
                  varDataByteCnt = 0;
                  forcesIdx = 0;
                  rxPktDataState = rxPktDataStateEnum.FORCE_DATA;
                }
                break;

              case rxPktDataStateEnum.FORCE_DATA:
   //console.log('  FORCE_DATA %s', ch.toString(16));
                if ((forcesIdx > 15) || (forcesIdx < 0)) {
                  // forcesIdx is out of range
                  forcesIdx = 0;
                  varDataByteCnt = 0;
                }
                if (varDataByteCnt > 1) {
                  // varDataByteCnt is out of range
                  varDataByteCnt = 0;
                }
  // console.log('    forcesIdx: %s:%s', forcesIdx, varDataByteCnt);
                switch (varDataByteCnt) {
                  case 0:
                    forces[forcesIdx] = ch;
                    varDataByteCnt++;
                    break;
                  case 1:
                    forces[forcesIdx] += ch << 8;
  // console.log('    forces[%s]: %s', forcesIdx, forces[forcesIdx].toString(16));
                    varDataByteCnt = 0;
                    if (++forcesIdx >= 16) {
                      forcesIdx = 0;
                      varDataByteCnt = 0;
                      rxPktDataState = rxPktDataStateEnum.FRAME_START;
                    }
                    break;
                }
                break;

              default:
  // console.log('Invalid rxPktDataState: ', rxPktDataState);
                rxPktDataState = rxPktDataStateEnum.FRAME_START;
                varDataByteCnt = 0;
                forcesIdx = 0;
                rxPktState = rxPktStateEnum.START;
            }
            break;

          case rxPktStateEnum.CHKSUM:
  // console.log('  CHKSUM ', chksum);
            if (chksum == 0xFF) {
              // valid frame
              //console.log(forces);
              dataAvail = true;
              //console.log(dataAvail);
            } else {
              // invalid frame - throw frame away
  console.log('    *** Invalid frame ***')
              varDataByteCnt = 0;
              rxPktDataState = rxPktDataStateEnum.FRAME_START;
            }
            rxPktState = rxPktStateEnum.START;
            break;

          default:
            rxPktState = rxPktStateEnum.START;
        }
      }
    });
  };
  // *********************
  // Serial Port ENDS
  // *********************
};
