

// 초기에 표시할 데이터의 시작 위치
var initialDataStartLoc = slider_location();
// 초기에 표시할 데이터 개수
var initialDataCount = 20;
var displayedData = marlData.slice(initialDataStartLoc - 10, initialDataStartLoc+10);

var sc_options = {
    chart: {
        height: 350,
        type: 'line',
        group: 'social',
        zoom: {
          enabled: true,
          type: 'xy'
        }
      },
  series: [{
    name :'test',
    data : displayedData,
    type: 'scatter',
  }],
  markers: { //이거 해줘야 라인이랑 scatter 같이 그릴 수 있음)
    size: [10, 10, 10, 10, 10] //그래프 1번,2번,3번 순 동그라미 크기

  }, 
  fill: {
    type:'solid',
  },
  tooltip: {
    shared: false,
    intersect: true,
  },
  xaxis: {
    tickAmount: 10,
    type : 'numeric',
    labels: {
        show: false,
      formatter: function(val) {
        return parseFloat(val).toFixed(1)
      }
    }
  },
  yaxis: {
    tickAmount: 7
  },
  annotations: {
    xaxis : [
      {
        x : 5,
        x2 : 15,
        borderColor: '#000',
        fillColor: '#d3d3d3',
      }
    ]
  }
  };

  var scatter = new ApexCharts(document.querySelector("#scatter"), sc_options);

scatter.render();
