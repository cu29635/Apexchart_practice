var loc = 50;

// 슬라이더의 값 변경 이벤트를 감지하여 처리하는 함수
function handleSliderChange(loc) {
    // 차트의 옵션을 복제합니다.
    var newOptions = JSON.parse(JSON.stringify(options));
  
    // Annotation을 업데이트합니다.
    newOptions.annotations.xaxis[0].x = loc-5;
    newOptions.annotations.xaxis[0].x2 = loc+5;
  
    // 차트를 다시 그립니다.
    chart.updateOptions(newOptions);
  }
  
  // 슬라이더 이벤트 리스너 등록 - line chart
  document.getElementById("slider_loc").addEventListener("input", function() {
    var loc = parseInt(this.value); // 슬라이더의 값 가져오기
    handleSliderChange(loc); // 슬라이더 값으로 Annotation 업데이트
  });

  function slider_location() {
    return parseInt(document.getElementById("slider_loc").value);
}



// 슬라이더 이동할때마다 사용 - scatter
function moveData(loc) {
    // 새로운 데이터를 선택하여 가져옴
    var newData = marlData.slice(loc-10,  loc+10);
  
    // 차트에 새로운 데이터를 설정
    scatter.updateSeries([{
      data: newData
    }]);
  }


//   // 슬라이더의 값 변경 이벤트를 감지하여 처리하는 함수
// function changeScatter(loc) {
//     // 차트의 옵션을 복제합니다.
//     var newOptions = JSON.parse(JSON.stringify(sc_options));
  
//     // Annotation을 업데이트합니다.
//     newOptions.annotations.xaxis[0].x = loc-5;
//     newOptions.annotations.xaxis[0].x2 = loc+5;
  
//     // 차트를 다시 그립니다.
//     scatter.updateOptions(newOptions);
//   }

  document.getElementById("slider_loc").addEventListener("input", function() {
    var loc = parseInt(this.value); // 슬라이더의 값 가져오기
    moveData(loc);
    // changeScatter(loc); // 슬라이더 값으로 Annotation 업데이트
  });
  
