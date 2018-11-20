  exports.getRandomInt = function(min,max){

    var randomArray = [];
    for(var i = 0; i <16; i++){
      randomArray[i] = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //16 random numbers
    return randomArray;
  }
