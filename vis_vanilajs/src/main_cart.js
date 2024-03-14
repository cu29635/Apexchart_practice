
var baselineData = getdata();
var marlData = getdata();

var options = {
  chart: {
    height: 200,
    type: "line",
    group: 'social',
    stacked: false
  },
  plotOptions:{
    bar : {
      margin: {
        top: 10,
        right: 20,
        bottom: 10,
        left: 30
      }
    }
  },
  dataLabels: {
    enabled: false
  },
  colors: ["#000000", "#2DB400"],
  series: [
    {
      name: "Baseline",
      data: baselineData
    },
    {
      name: "MARL",
      data: marlData
    }
  ],
  stroke: {
    width: [4, 4],
    curve: 'smooth',
  },
  plotOptions: {
    bar: {
      columnWidth: "20%"
    }
  },
  xaxis: {
    type : 'numeric', //매우 중요... x축 위치 찾는데
    min : 0,
    max : 360, 
    categories: Array.from({length: 361}, (_, index) => index),
    labels : {
      show :false,
      min : 0,
      max : 360,
    },
    title: {
      text : "Simulation time",
      align: 'right',
      offsetY: -10
    }
  },
  yaxis: [
    { 
      title: {
        text : "Total Travel Time"
      },
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#FF1654"
      },
      labels: {
        show : false
      }
    },
    {
      opposite: true,
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
        color: "#247BA0"
      },
      labels: {
        show : false
      }
    }
  ],
  tooltip: {
    enabled : true,
    shared: true,
    intersect: false,
    x: {
      show: true,
      
    },
    y: {
      show: true  
    },
  },
  grid: {
    position : 'front'
  },
  legend: {
    horizontalAlign: "left",
    offsetY: -30
  },
  annotations: {
    xaxis : [
      {
        x : slider_location()-5,
        x2 : slider_location()+5,
        borderColor: '#000',
        fillColor: '#d3d3d3',
      }
    ]
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


function getdata(){
  var data = [];
  var value = 0; // 초기값
  var slope = Math.random() * 2; // 초기 기울기
  for (var i = 0; i <= 360; i++) {
    value += slope; // 기울기에 따라 값 증가
    slope -= Math.random() * 0.01; // 점차 감소하는 기울기
    if (slope < 0) slope = 0; // 음수 기울기 방지
    data.push(value); // 값 배열에 추가
  }
  return data;
}
