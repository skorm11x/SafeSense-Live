//**Define 2 Color control ranges for impact values
var lowerImpactColor = '#C7E6D5';
var middleImpactColor = '#F4DF00';
var upperImpactColor = '#FF5D00';

function renderCircles(){
  var c1 = document.getElementById("sensorCircles1");
  var ctx1 = c1.getContext("2d");
  ctx1.beginPath();
  ctx1.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx1.fillStyle = '#C7E6D5';
  ctx1.fill();
  ctx1.stroke();
  var c2 = document.getElementById("sensorCircles2");
  var ctx2 = c2.getContext("2d");
  ctx2.beginPath();
  ctx2.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx2.fillStyle = '#C7E6D5';
  ctx2.fill();
  ctx2.stroke();
  var c3 = document.getElementById("sensorCircles3");
  var ctx3 = c3.getContext("2d");
  ctx3.beginPath();
  ctx3.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx3.fillStyle = '#C7E6D5';
  ctx3.fill();
  ctx3.stroke();
  var c4 = document.getElementById("sensorCircles4");
  var ctx4 = c4.getContext("2d");
  ctx4.beginPath();
  ctx4.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx4.fillStyle = '#C7E6D5';
  ctx4.fill();
  ctx4.stroke();
  var c5 = document.getElementById("sensorCircles5");
  var ctx5 = c5.getContext("2d");
  ctx5.beginPath();
  ctx5.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx5.fillStyle = '#C7E6D5';
  ctx5.fill();
  ctx5.stroke();
  var c6 = document.getElementById("sensorCircles6");
  var ctx6 = c6.getContext("2d");
  ctx6.beginPath();
  ctx6.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx6.fillStyle = '#C7E6D5';
  ctx6.fill();
  ctx6.stroke();
  var c7 = document.getElementById("sensorCircles7");
  var ctx7 = c7.getContext("2d");
  ctx7.beginPath();
  ctx7.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx7.fillStyle = '#C7E6D5';
  ctx7.fill();
  ctx7.stroke();
  var c8 = document.getElementById("sensorCircles8");
  var ctx8 = c8.getContext("2d");
  ctx8.beginPath();
  ctx8.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx8.fillStyle = '#C7E6D5';
  ctx8.fill();
  ctx8.stroke();
  var c9 = document.getElementById("sensorCircles9");
  var ctx9 = c9.getContext("2d");
  ctx9.beginPath();
  ctx9.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx9.fillStyle = '#C7E6D5';
  ctx9.fill();
  ctx9.stroke();
  var c10 = document.getElementById("sensorCircles10");
  var ctx10 = c10.getContext("2d");
  ctx10.beginPath();
  ctx10.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx10.fillStyle = '#C7E6D5';
  ctx10.fill();
  ctx10.stroke();
  var c11 = document.getElementById("sensorCircles11");
  var ctx11 = c11.getContext("2d");
  ctx11.beginPath();
  ctx11.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx11.fillStyle = '#C7E6D5';
  ctx11.fill();
  ctx11.stroke();
  var c12 = document.getElementById("sensorCircles12");
  var ctx12 = c12.getContext("2d");
  ctx12.beginPath();
  ctx12.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx12.fillStyle = '#C7E6D5';
  ctx12.fill();
  ctx12.stroke();
  var c13 = document.getElementById("sensorCircles13");
  var ctx13 = c13.getContext("2d");
  ctx13.beginPath();
  ctx13.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx13.fillStyle = '#C7E6D5';
  ctx13.fill();
  ctx13.stroke();
  var c14 = document.getElementById("sensorCircles14");
  var ctx14 = c14.getContext("2d");
  ctx14.beginPath();
  ctx14.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx14.fillStyle = '#C7E6D5';
  ctx14.fill();
  ctx14.stroke();
  var c15 = document.getElementById("sensorCircles15");
  var ctx15 = c15.getContext("2d");
  ctx15.beginPath();
  ctx15.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx15.fillStyle = '#C7E6D5';
  ctx15.fill();
  ctx15.stroke();
  var c16 = document.getElementById("sensorCircles16");
  var ctx16 = c16.getContext("2d");
  ctx16.beginPath();
  ctx16.arc(100, 75, 50, 0, 2 * Math.PI);
  ctx16.fillStyle = '#C7E6D5';
  ctx16.fill();
  ctx16.stroke();
};


function updateSensorCicles(updateVal, i){

  //Channel 1
  if(i == 0){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles1");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles1");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles1");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 2
  if(i == 1){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles2");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles2");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles2");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 3
  if(i == 2){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles3");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles3");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles3");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 4
  if(i == 3){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles4");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles4");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles4");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 5
  if(i == 4){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles5");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles5");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles5");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 6
  if(i == 5){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles6");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles6");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles6");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 7
  if(i == 6){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles7");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles7");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles7");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 8
  if(i == 7){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles8");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles8");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles8");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 9
  if(i == 8){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles9");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles9");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles9");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 10
  if(i == 9){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles10");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles10");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles10");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 11
  if(i == 10){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles11");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles11");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles11");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 12
  if(i == 11){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles12");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles12");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles12");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 13
  if(i == 12){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles13");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles13");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles13");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 14
  if(i == 13){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles14");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles14");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles14");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 15
  if(i == 14){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles15");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles15");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles15");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
  //Channel 16
  if(i == 15){
    //Display green safe value?
    if(updateVal>= 0 && updateVal <800){
        var c1 = document.getElementById("sensorCircles16");
        var ctx1 = c1.getContext("2d");
        ctx1.fillStyle = lowerImpactColor;
        ctx1.fill();
    }
    //Display yellow warning value?
    if(updateVal>=800 && updateVal < 1300){
      var c1 = document.getElementById("sensorCircles16");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = middleImpactColor;
      ctx1.fill();
    }
    //Display red heavy impact value!
    if(updateVal >= 1300 && updateVal <1900){
      var c1 = document.getElementById("sensorCircles16");
      var ctx1 = c1.getContext("2d");
      ctx1.fillStyle = upperImpactColor;
      ctx1.fill();
    }
  }
};