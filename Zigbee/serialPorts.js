exports.initializeZigbee = function(){
  const SerialPort = require('serialport');
  var sp, commPort;
  // var parser;
  // find serial port that the ZigBee mondual is attached to...
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
  var forces = [], forcesIdx = 0;

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
  // console.log('\nSTART');
            if (ch == 0x7E) {
              varHdrByteIdx = 0;
              frmLength = 0;
              rxPktState = rxPktStateEnum.FRAME_LENGTH;
            } else {
  // console.log('  Packet resyncing %s', ch.toString(16));
            }
            break;

          case rxPktStateEnum.FRAME_LENGTH:
   // console.log('  FRAME_LENGTH.%s', varHdrByteIdx);
            frmLength = (frmLength << 8) + ch;
           if (++varHdrByteIdx >= 2) {
              if (frmLength < (ZigBeeRxFrameHeader.DATA_START - 2)) {
                // invalid frame size
  // console.log('    Invalid frame size: 0x', frmLength.toString(16));
                rxPktState = rxPktStateEnum.START;
              } else {
  // console.log('    frmLength: 0x%s', frmLength.toString(16));
                chksum = 0;
                varHdrByteIdx = 0;
                rxPktState = rxPktStateEnum.FRAME_TYPE;
              }
            }
            break;

          case rxPktStateEnum.FRAME_TYPE:
            frmType = ch;
  // console.log('  FRAME_TYPE');
            if (frmType != 0x91) {
              // not the frame type I'm looking for
  // console.log('    Invalid frmType: 0x%s', frmType.toString(16));
              rxPktState = rxPktStateEnum.START;
            } else {
  // console.log('    frmType: 0x%s', frmType.toString(16));
              varHdrByteIdx = 0;
              rxPktState = rxPktStateEnum.SOURCE_ADDRESS;
            }
            break;

          case rxPktStateEnum.SOURCE_ADDRESS:
  // console.log('  SOURCE_ADDRESS.%s', varHdrByteIdx);
            srcAddr[varHdrByteIdx] = ch.toString(16);
            if (++varHdrByteIdx >= 8) {
  // console.log('    srcAddr: 0x%s%s%s%s%s%s%s%s', srcAddr[0],srcAddr[1],srcAddr[2],srcAddr[3],srcAddr[4],srcAddr[5],srcAddr[6],srcAddr[7]);
              varHdrByteIdx = 0;
              srcNetworkAddr = 0;
              rxPktState = rxPktStateEnum.SOURCE_NETWORK_ADDRESS;
            }
            break;

          case rxPktStateEnum.SOURCE_NETWORK_ADDRESS:
  // console.log('  SOURCE_NETWORK_ADDRESS.%s', varHdrByteIdx);
            srcNetworkAddr = (srcNetworkAddr << 8) + ch;;
            if (++varHdrByteIdx >= 2) {
  // console.log('    srcNetworkAddr: 0x%s', srcNetworkAddr.toString(16));
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
  // console.log('  FORCE_DATA %s', ch.toString(16));
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
  // console.log(forces);
              dataAvail = true;
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

}
