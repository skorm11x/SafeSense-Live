(function() {
  var mode = 0;
    ajax('../../getModeSelect',"GET",{},onFetchModeSuccess);

    function onFetchModeSuccess(response){
        mode = JSON.parse(response);
    }

    function showEle(elementId){
      document.getElementById(elementId).style.display = 'flex';
    }

    function hideEle(elementId){
      document.getElementById(elementId).style.display = 'none';
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

    function renderBarGraph(forceData) {
          var ctx = document.getElementById("barChannelChart").getContext("2d");
          var options = {
              responsive: true,
              cubicInterpolationMode: 'default',
              steppedLine: false,
              legend: {
                display: true,
                position: 'bottom',
              },
              title: {
                display: false,
                text: 'Force values per Channel',
                fontSize: 32
              },
              pan: {
                enabled: true,
                mode: 'x',
                speed: 10,
                threshold: 10
              },
              zoom: {
                enabled: true,
                mode: 'y',
              },
              scales: {
                yAxes: [{
                  ticks: {
                    min: 1000,
                    max: 2000,
                    stepsize: 1
                  },
                  gridLines: {
                      display: false,
                      color: "black",
                      borderDash: [2, 5],
                    },
                fontSize: 32
              }],
              xAxes : [{
                fontSize: 32,
                gridLines: {
                    display: false,
                    color: "black",
                    borderDash: [2, 5],
                  },
              }]
              }
           };
          forceBarchartRef = new Chart(ctx, {
            type: "bar",
            data: forceData,
            options: options
          });
       }


    function renderForceChart(forceData) {
          var ctx = document.getElementById("channelChart").getContext("2d");
          var options = {
              responsive: true,
              legend:{
                position: 'right',
                display: true,
                maxWidth: 1000,
                cubicInterpolationMode: 'default',
                steppedLine: false,
              },
              title: {
                display: true,
                text: 'Force Data Channel Graph',
                fontSize: 32
              },
              pan: {
                enabled: true,
                mode: 'x',
                speed: 10,
                threshold: 10
              },
              zoom: {
                enabled: true,
                mode: 'y',
              },
              scales:{
                xAxes:[{
                gridLines: {
                  display: false,
                  color: "black"
                },
                scaleLabel:{
                  display: true,
                  labelString: "Time in Seconds",
                  fontColor: "blue",
                  fontSize: 32,
                },
                fontSize: 32
              }],
              yAxes: [{
                  gridLines: {
                      display: false,
                      color: "black",
                      borderDash: [2, 5],
                    },
                    scaleLabel: {
                      display: true,
                      labelString: "ADC value",
                      fontColor: "green",
                      fontSize: 32,
                    },
                    // ticks: {
                    //   min: 1300,
                    //   max: 2000,
                    //   stepsize: 1
                    // },
                    fontSize: 32,
                }]
              }
           };
          forceChartRef = new Chart(ctx, {
            type: "line",
            data: forceData,
            options: options
          });
       }

       function renderDiffChart(forceData) {
             var ctx = document.getElementById("diffChart").getContext("2d");
             var options = {
                 responsive: true,
                 legend:{
                   position: 'right',
                   display: true,
                   maxWidth: 1000,
                  cubicInterpolationMode: 'default',
                  steppedLine: false,
                 },
                 title: {
                   enabled: true,
                   text: 'Impact Force Channel Graph',
                   fontSize: 32
                 },
                 pan: {
                   enabled: true,
                   mode: 'x',
                   speed: 10,
                   threshold: 10
                 },
                 zoom: {
                   enabled: true,
                   mode: 'y',
                 },
                 scales:{
                   xAxes:[{
                   gridLines: {
                     display: false,
                     color: "black"
                   },
                   scaleLabel:{
                     display: true,
                     labelString: "Time in Seconds",
                     fontColor: "blue",
                     fontSize: 32
                   },
                   fontSize: 32
                 }],
                 yAxes: [{
                     gridLines: {
                         display: false,
                         color: "black",
                         borderDash: [2, 5],
                       },
                       scaleLabel: {
                         display: true,
                         labelString: "Impact Force",
                         fontColor: "green",
                         fontSize: 32
                       },
                       // ticks: {
                       //   min: 1300,
                       //   max: 2000,
                       //   stepsize: 1
                       // },
                       fontSize: 32
                   }]
                 }
              };
             diffChartRef = new Chart(ctx, {
               type: "line",
               data: forceData,
               options: options
             });
          }

       var chartBarGraph = {
         labels: ['Channel1','Channel2','Channel3','Channel4','Channel5',
         'Channel6','Channel7','Channel8','Channel9','Channel10','Channel11',
       'Channel12','Channel13','Channel14','Channel15','Channel16'],
         datasets: [
           {
           backgroundColor: "rgba(255,205,66,0.4)",
           borderColor: "rgba(255,0,255,1)",
           borderWidth: 1,
           label: ['Channel Data'],
           data: []
          }
        ]
       };

       var diffLineGraph = {
          labels: [],
          datasets: [
             {
                label: "Channel 1",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,205,66,0.4)",
                borderColor: "rgba(255,205,66,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 2",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,99,132,0.4)",
                borderColor: "rgba(255,99,132,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 3",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(54,162,235,0.4)",
                borderColor: "rgba(54,162,235,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 4",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(134,95,197,0.4)",
                borderColor: "rgba(134,95,197,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(134,95,197,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 5",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(102,51,0,0.4)",
                borderColor: "rgba(102,51,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(102,51,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 6",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(109,159,109,0.4)",
                borderColor: "rgba(109,159,109,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(109,159,109,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 7",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(196,36,37,0.4)",
                borderColor: "rgba(196,36,37,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(196,36,37,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 8",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(78,245,250,0.4)",
                borderColor: "rgba(78,245,250,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(78,245,250,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 9",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,255,127,0.4)",
                borderColor: "rgba(0,255,127,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,255,127,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 10",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,255,0.4)",
                borderColor: "rgba(255,0,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 11",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,127,0.4)",
                borderColor: "rgba(255,0,127,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,127,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 12",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,255,255,0.4)",
                borderColor: "rgba(0,255,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,255,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 13",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(251,206,177,0.4)",
                borderColor: "rgba(251,206,177,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(251,206,177,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 14",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(253,238,0,0.4)",
                borderColor: "rgba(253,238,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(253,238,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 15",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(132,132,130,0.4)",
                borderColor: "rgba(132,132,130,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(132,132,130,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 16",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(254,111,94,0.4)",
                borderColor: "rgba(254,111,94,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(254,111,94,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
          ]
       };



       var chartLineGraph = {
          labels: [],
          datasets: [
             {
                label: "Channel 1",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,205,66,0.4)",
                borderColor: "rgba(255,205,66,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 2",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,99,132,0.4)",
                borderColor: "rgba(255,99,132,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 3",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(54,162,235,0.4)",
                borderColor: "rgba(54,162,235,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 4",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(134,95,197,0.4)",
                borderColor: "rgba(134,95,197,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(134,95,197,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 5",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(102,51,0,0.4)",
                borderColor: "rgba(102,51,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(102,51,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 6",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(109,159,109,0.4)",
                borderColor: "rgba(109,159,109,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(109,159,109,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 7",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(196,36,37,0.4)",
                borderColor: "rgba(196,36,37,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(196,36,37,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 8",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(78,245,250,0.4)",
                borderColor: "rgba(78,245,250,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(78,245,250,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 9",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,255,127,0.4)",
                borderColor: "rgba(0,255,127,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,255,127,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 10",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,255,0.4)",
                borderColor: "rgba(255,0,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 11",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,0,127,0.4)",
                borderColor: "rgba(255,0,127,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,0,127,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 12",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(0,255,255,0.4)",
                borderColor: "rgba(0,255,255,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(0,255,255,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 13",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(251,206,177,0.4)",
                borderColor: "rgba(251,206,177,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(251,206,177,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 14",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(253,238,0,0.4)",
                borderColor: "rgba(253,238,0,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(253,238,0,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 15",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(132,132,130,0.4)",
                borderColor: "rgba(132,132,130,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(132,132,130,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
             {
                label: "Channel 16",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(254,111,94,0.4)",
                borderColor: "rgba(254,111,94,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(254,111,94,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [],
                spanGaps: false,
             },
          ]
       };

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
    }, 100);

  setTimeout(function(){
   document.getElementById('barChannelChart').classList.remove('hide');
  }, 5000);

//Mode 1 Success response - Random
  function onFetchRandomDataSuccess(response){
    var forces = JSON.parse(response);
    if(Array.isArray(forces)){
      if(dummyTime == 600){
        dummyTime = 0;
      }
      updateChart(forces,dummyTime);
      dummyTime +=0.25;
    }
  }
//Mode 2 Success response - Sine
 function onFetchSineDataSuccess(response){
   var forces = JSON.parse(response);
   if (Array.isArray(forces)) {
     if(dummyTime == 60){
       dummyTime = 0;
     }
     updateChart(forces, dummyTime);
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


  var j = 0;
  var baseLineArray = [];


  function updateChart(forceArray, time) {
      // console.log('updateChart');
      // console.log(forceArray);
      // console.log(time);
    if(forceChartRef.data.labels.length > 27){
      forceChartRef.data.labels.shift();
      diffChartRef.data.labels.shift();
      for(var i=0; i<16; i++){
        forceChartRef.data.datasets[i].data.shift();
        diffChartRef.data.datasets[i].data.shift();
      }
    }
  forceChartRef.data.labels.push(time);
  diffChartRef.data.labels.push(time);
    for(var i=0; i<16; i++) {
// console.log(forceArray[i]);
      forceChartRef.data.datasets[i].data.push(forceArray[i]);
      diffChartRef.data.datasets[i].data.push(forceArray[i]);
      // forceBarchartRef.data.datasets[0].data.push(forceArray[i+1]);
    }
    // forceBarchartRef.data.datasets[0].data.push(forceArray[0);
    if(j<10){
      console.log(forceArray);
        baseLineArray.push(forceArray);
    }
    j++;
    //At j = 10 baseLineArray should have 10 arrays inside of it.
    forceChartRef.update();
    diffChartRef.update();
    // forceBarchartRef.update();
    if(j == 10){
      console.log(baseLineArray);
      findvBaseline(baseLineArray);
      j = 40;
    }

  }



//************Begin Baseline section****************
//All baseline holders
var vBaselineChnl1,vBaselineChnl2,vBaselineChnl3,vBaselineChnl4,vBaselineChnl5,
vBaselineChnl6,vBaselineChnl7,vBaselineChnl8,vBaselineChnl9,vBaselineChnl10,
vBaselineChnl11,vBaselineChnl12,vBaselineChnl13,vBaselineChnl14,vBaselineChnl15,
vBaselineChnl16;

function findvBaseline(baseLineArray){
    //baseLineArray = array of arrays

    //Temp holders
  var chnl1Temp=0;
  var chnl2Temp=0;
  var chnl3Temp=0;
  var chnl4Temp=0;
  var chnl5Temp=0;
  var chnl6Temp=0;
  var chnl7Temp=0;
  var chnl8Temp=0;
  var chnl9Temp=0;
  var chnl10Temp=0;
  var chnl11Temp=0;
  var chnl12Temp=0;
  var chnl13Temp=0;
  var chnl14Temp=0;
  var chnl15Temp=0;
  var chnl16Temp=0;

    for(var i=0;i<10;i++){
        chnl1Temp += baseLineArray[i][0];
        chnl2Temp+=baseLineArray[i][1];
        chnl4Temp+=baseLineArray[i][2];
        chnl3Temp+=baseLineArray[i][3];
        chnl5Temp+=baseLineArray[i][4];
        chnl6Temp+=baseLineArray[i][5];
        chnl7Temp+=baseLineArray[i][6];
        chnl8Temp+=baseLineArray[i][7];
        chnl9Temp+=baseLineArray[i][8];
        chnl10Temp+=baseLineArray[i][9];
        chnl11Temp+=baseLineArray[i][10];
        chnl12Temp+=baseLineArray[i][11];
        chnl13Temp+=baseLineArray[i][12];
        chnl14Temp+=baseLineArray[i][13];
        chnl15Temp+=baseLineArray[i][14];
        chnl16Temp+=baseLineArray[i][15];

    }
    vBaselineChnl1 = chnl1Temp/10;
    vBaselineChnl2 = chnl2Temp/10;
    vBaselineChnl3 = chnl3Temp/10;
    vBaselineChnl4 = chnl4Temp/10;
    vBaselineChnl5 = chnl5Temp/10;
    vBaselineChnl6 = chnl6Temp/10;
    vBaselineChnl7 = chnl7Temp/10;
    vBaselineChnl8 = chnl8Temp/10;
    vBaselineChnl9 = chnl9Temp/10;
    vBaselineChnl10 = chnl10Temp/10;
    vBaselineChnl11 = chnl11Temp/10;
    vBaselineChnl12 = chnl12Temp/10;
    vBaselineChnl13 = chnl13Temp/10;
    vBaselineChnl14 = chnl14Temp/10;
    vBaselineChnl15 = chnl15Temp/10;
    vBaselineChnl16 = chnl16Temp/10;
}

function differential(forceArray){
  var diffArray = new Array();

    var temp1 = forceArray[0]-vBaselineChnl1;
    var temp2 = forceArray[1]-vBaselineChnl2;
    var temp3 = forceArray[2]-vBaselineChnl3;
    var temp4 = forceArray[3]-vBaselineChnl4;
    var temp5 = forceArray[4]-vBaselineChnl5;
    var temp6 = forceArray[5]-vBaselineChnl6;
    var temp7 = forceArray[6]-vBaselineChnl7;
    var temp8 = forceArray[7]-vBaselineChnl8;
    var temp9 = forceArray[8]-vBaselineChnl9;
    var temp10 = forceArray[9]-vBaselineChnl10;
    var temp11 = forceArray[10]-vBaselineChnl11;
    var temp12 = forceArray[11]-vBaselineChnl12;
    var temp13 = forceArray[12]-vBaselineChnl13;
    var temp14 = forceArray[13]-vBaselineChnl14;
    var temp15 = forceArray[14]-vBaselineChnl15;
    var temp16 = forceArray[15]-vBaselineChnl16;
    diffArray.push(temp1);
    diffArray.push(temp2);
    diffArray.push(temp3);
    diffArray.push(temp4);
    diffArray.push(temp5);
    diffArray.push(temp6);
    diffArray.push(temp7);
    diffArray.push(temp8);
    diffArray.push(temp9);
    diffArray.push(temp10);
    diffArray.push(temp11);
    diffArray.push(temp12);
    diffArray.push(temp13);
    diffArray.push(temp14);
    diffArray.push(temp15);
    diffArray.push(temp16);

    return diffArray;

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
