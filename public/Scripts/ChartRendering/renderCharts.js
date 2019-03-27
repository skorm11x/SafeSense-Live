function renderBarGraph(forceData) {
      var ctx = document.getElementById("barChannelChart").getContext("2d");
      var options = {
          responsive: false,
          cubicInterpolationMode: 'default',
          steppedLine: false,
          legend: {
            display: true,
            position: 'bottom',
          },
          title: {
            display: true,
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
   };


//** Rendering of raw ADC values **
function renderForceChart(forceData) {
      var ctx = document.getElementById("channelChart").getContext("2d");
      var options = {
          responsive: true,
          legend:{
            position: 'bottom',
            display: true,
            maxWidth: 1000,
            cubicInterpolationMode: 'default',
            steppedLine: false,
            maintainAspectRatio: false,
          },
          title: {
            display: true,
            text: 'Raw Data',
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
   };

//**Rendering of "Actual" force values (difference from baseline)
   function renderDiffChart(forceData) {
         var ctx = document.getElementById("diffChart").getContext("2d");
         var options = {
             responsive: true,
             legend:{
               position: 'bottom',
               display: true,
               maxWidth: 1000,
              cubicInterpolationMode: 'default',
              steppedLine: false,
              maintainAspectRatio: false,
             },
             title: {
               display: true,
               text: 'Impact Force Value',
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
      };
