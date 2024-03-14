

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
//     series: [{
//     name: "SAMPLE A",
//     type :  'line',
//     data: [
//     [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
//   },{
//     name: "SAMPLE B",
//     type: 'line',
//     data: [
//     [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
//   },{
//     name: "lf_filter",
//     type: 'scatter',
//     data: [
//     [21.7, 3], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [19, 5], [22.4, 3], [24.5, 3]]
//   },{
//     name: "pre_filter",
//     type: 'scatter',
//     data: [
//     [23.6, 3.5], [16.4, 4], [13.6, 0], [22.4, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
//   }],
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
