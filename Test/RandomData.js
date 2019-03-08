/***
Fills 16 sensor output channels with random data. Each returned array of
16 values serves as one sensor point per time displayed, where time is defined
in a 250ms update speed.
**/
  exports.getRandomInt = function(min,max) {

    var randomArray = [];
    for (var i = 0; i < 16; i++) {
      randomArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //16 random numbers
    return randomArray;
  };
