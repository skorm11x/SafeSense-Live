(function() {

  var mode = 0; //Mode selected by user
  //DEFAULT time width display of 27 data points
  var timeWidthDisplay = 27; //How many time data points are displayed before shift
  //TODO: Depending on Sample rate alter the time display for graphs
  //DEFAULT SAMPLE RATE OF 100 ms
  var sampleRate = 100; //Sample rate in ms

  //By Default this array will be empty at start
  var prevForceArray = new Array(16);//Array storing previous ForceArray
  var updateForceArray = new Array(16);

  var start = new Date().getTime(),
    time = 0;


    ajax('../../getModeSelect',"GET",{},onFetchModeSuccess);




    function showEle(elementId){
      document.getElementById(elementId).style.display = 'flex';
    }

    function hideEle(elementId){
      document.getElementById(elementId).style.display = 'none';
    }

    function onFetchModeSuccess(response){
        mode = JSON.parse(response);
    }

    function ajax(url, method, payload, successCallback){
      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4 || xhr.status != 200) return;
        successCallback(xhr.responseText);
      };
      xhr.send(JSON.stringify(payload));
    }

       ajax("../getChannelData", "GET",{}, onFetchTempSuccess);
       ajax("../getBarData","GET",{}, onFetchTempSuccessBar);

       function onFetchTempSuccess(response){
          hideEle("loader");
          var respData = JSON.parse(response);
          chartLineGraph.labels = respData.dataPoints.map(dataPoint => dataPoint.time);
          diffLineGraph.labels = respData.dataPoints.map(dataPoint => dataPoint.time);
          for(var i=0; i<16; i++){
            chartLineGraph.datasets[i].data = respData.dataPoints.map(dataPoint => dataPoint.force);
            diffLineGraph.datasets[i].data = respData.dataPoints.map(dataPoint => dataPoint.force);
          }
          renderForceChart(chartLineGraph)
          renderDiffChart(diffLineGraph)
      }


      function onFetchTempSuccessBar(response){
         hideEle("loader");
         var respData = JSON.parse(response);
         for(var i=0; i<1; i++){
           chartBarGraph.datasets[i].data = respData.dataPoints.map(dataPoint => dataPoint.force);
         }
         renderBarGraph(chartBarGraph)
     }


  var dummyTime = 0;
  setInterval(function(){
    if(mode == 1){
      ajax("/getRandomData", "GET",{}, onFetchRandomDataSuccess);
    }
    if(mode == 2){
      ajax("/getSineData", "GET",{}, onFetchSineDataSuccess);
    }
    if(mode == 3){
      ajax("/getSampleData","GET",{},onFetchSampleDataSuccess);
    }
    if(mode == 4){
      ajax("/getForceData", "GET",{}, onFetchForceDataSuccess);
    }
  }, sampleRate);

  setTimeout(function(){
   document.getElementById('barChannelChart').classList.remove('hide');
  }, 5000);

//Mode 1 Success response - Random
  function onFetchRandomDataSuccess(response){
    var forces = JSON.parse(response);
    if(Array.isArray(forces)){
      if(prevForceArray[0] == null){
        for(var i = 0; i<16; i++){
          prevForceArray[i] = forces[i];
        }
      }
      if(prevForceArray[0] != null){
        for(var i = 0; i<16; i++){
          var updateVal = (forces[i] - prevForceArray[i]);
          if(updateVal < 0){
            updateVal = 0;
          }
         updateForceArray[i] = updateVal;
         updateSensorCicles(updateVal, i);
          //Update the current prev array to store current array
          prevForceArray[i] = forces[i];
        }
      }
      if(dummyTime == 600){
        dummyTime = 0;
      }
      updateChart(forces,dummyTime);
      updateDiffChart(updateForceArray,dummyTime);
      dummyTime +=0.25;
    }
  }
//Mode 2 Success response - Sine
 function onFetchSineDataSuccess(response){
   var forces = JSON.parse(response);
   if (Array.isArray(forces)) {
     if(prevForceArray[0] == null){
       for(var i = 0; i<16; i++){
         prevForceArray[i] = forces[i];
       }
     }
     if(prevForceArray[0] != null){
       for(var i = 0; i<16; i++){
         var updateVal = (forces[i] - prevForceArray[i]);
        updateForceArray[i] = updateVal;
        if(updateVal <0){
          updateVal = 0;
        }
        updateSensorCicles(updateVal, i);
         //Update the current prev array to store current array
         prevForceArray[i] = forces[i];
       }
     }
     if(dummyTime == 60){
       dummyTime = 0;
     }
     updateChart(forces, dummyTime);
     updateDiffChart(updateForceArray,dummyTime);
     dummyTime = dummyTime + 0.25;
   }
 }
//Mode 3 Success response - Sample
function onFetchSampleDataSuccess(response){
  var forces = JSON.parse(response);
  if (Array.isArray(forces)) {
    if(dummyTime == 60){
      dummyTime = 0;
    }
    updateChart(forces, dummyTime);
    dummyTime = dummyTime + 0.25;
  }
}
//Mode 4 Success response - Live
  function onFetchForceDataSuccess(response) {
    var forces = JSON.parse(response);
    if (Array.isArray(forces)) {
      if(dummyTime == 60){
        dummyTime = 0;
      }
      updateChart(forces, dummyTime);
      dummyTime = dummyTime + 0.25;
    }
  }




  function updateChart(forceArray, time) {
    if(forceChartRef.data.labels.length > timeWidthDisplay){
      forceChartRef.data.labels.shift();
      //diffChartRef.data.labels.shift();
      for(var i=0; i<16; i++){
        forceChartRef.data.datasets[i].data.shift();
        //diffChartRef.data.datasets[i].data.shift();
      }
    }
  forceChartRef.data.labels.push(time);
  //diffChartRef.data.labels.push(time);
    for(var i=0; i<16; i++) {
      forceChartRef.data.datasets[i].data.push(forceArray[i]);
      //diffChartRef.data.datasets[i].data.push(forceArray[i]);
    }
    // forceBarchartRef.data.datasets[0].data.push(forceArray[0);
    //At j = 10 baseLineArray should have 10 arrays inside of it.
    forceChartRef.update();
    //diffChartRef.update();
  }

  function updateDiffChart(forceArray, time){
    if(diffChartRef.data.labels.length > timeWidthDisplay){
      diffChartRef.data.labels.shift();
      for(var i=0; i<16; i++){
        diffChartRef.data.datasets[i].data.shift();
      }
    }
      diffChartRef.data.labels.push(time);
      for(var i=0; i<16; i++) {
        //forceChartRef.data.datasets[i].data.push(forceArray[i]);
        diffChartRef.data.datasets[i].data.push(forceArray[i]);
      }
    diffChartRef.update();
  }






})();
//
// function toggleLegend(){
//   if(Chart.defaults.global.legend.display == true){
//       Chart.defaults.global.legend.display = false;
//   }
//   else{
//     Chart.defaults.global.legend.display = true;
//   }
// }
//
// function toggleTooltips(){
//   if(Chart.defaults.tooltips.enabled == true){
//     Chart.defaults.tooltips.enabled = false;
//   }
//   else{
//     Chart.defaults.tooltips.enabled = true;
//   }
// }
