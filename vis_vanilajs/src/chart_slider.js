var loc = 50;
function handleSliderChange(loc) {
    // 차트 옵션 복제
    var newOptions = JSON.parse(JSON.stringify(options));
  
    // Annotation 업데이트
    newOptions.annotations.xaxis[0].x = loc-5;
    newOptions.annotations.xaxis[0].x2 = loc+5;
    newOptions.annotations.xaxis[1].x = loc;
  
    chart.updateOptions(newOptions);
  }

  //이거 쓰면 annotation이 넓어짐!!!
  function handleSliderChangePoint(loc) {
    // 차트 옵션 복제
    var newOptions = JSON.parse(JSON.stringify(options));
  
    // Annotation 업데이트
    newOptions.annotations.xaxis[0].x = loc;
  
    chart.updateOptions(newOptions);
  }
  
  // 차트 업데이트 함수
  function updateScatterChart(loc, data) {
    // 이전 차트 요소 제거
    // d3.select("#scatter-line-chart")
    //   .attr("viewBox",null)
    //   .remove();
    svg.selectAll("*").remove();
    // svg.attr("viewBox", null);

//     const svg = d3.select("#scatter-line-chart")
//               .attr("width", width+margin.top)
//               .attr("height",height)
//               .attr("viewBox", "" + 28000/360*loc + " 0 900 840")
//               .append("g")
//               .attr("style", "max-width: 100%; height: auto;")
//               .attr("transform",
//  "translate(" + margin.left + "," + margin.top + ")");

svg.attr("viewBox",""+28000/360*loc+" -20 900 860" );
// 축의 범위 정의
const xScale = d3.scaleLinear()
               .domain([0, d3.max(testdata, d=> d.X_Value)])
               .range([0, 28000]);

const yScale = d3.scaleLinear()
                .domain([0,d3.max(testdata, d=> d.agentID)])
                .range([800, 0]);



const xAxis = d3.axisBottom(xScale).ticks(200);
// x축 생성
svg.append("g")
.attr("class", "x-axis")
 .attr("transform", "translate(0, 800)")
 .call(xAxis);

// y축 생성
svg.append("g")
 .call(d3.axisLeft().scale(yScale));

// x 축 그리드 라인 추가
svg.append("g")
   .attr("class", "grid")
   .attr("transform", "translate(0," + 50 + ")")
   .call(d3.axisBottom(xScale)
           .tickSize(-1900) // 그리드 라인의 길이
           .tickFormat("") // 라벨 숨김
           .tickSizeOuter(0) // 시작과 끝의 그리드 라인 숨김
       )
   .selectAll(".tick line")
   .attr("stroke-opacity", 0.9) // 그리드 라인의 투명도 조정
   .attr("stroke", "#ccc"); // 그리드 라인의 색상 조정

// y 축 그리드 라인 추가
svg.append("g")
   .attr("class", "grid")
   .call(d3.axisLeft(yScale)
           .tickSize(-800) // 그리드 라인의 길이
           .tickFormat("") // 라벨 숨김
           .tickSizeOuter(0) // 시작과 끝의 그리드 라인 숨김
       )
   .selectAll(".tick line")
   .attr("stroke-opacity", 0.9) // 그리드 라인의 투명도 조정
   .attr("stroke", "#ccc"); // 그리드 라인의 색상 조정


//반올림
function roundToNearestHalf(value) {
  return Math.round((value * 2) / 2);
}

// y축 값을 기준으로 데이터를 그룹화
const groupedData = d3.group(testdata, d => roundToNearestHalf(d.agentID));

// Line 그래프 그리기
groupedData.forEach((group, agentID) => {

    // const filterGroup = group.filter(d => d.X_Value >= loc-11 && d.X_Value <= loc + 11)
    const line = d3.line()
        .x(d => xScale(d.X_Value))
        .y(d => yScale(d.agentID))
        .curve(d3.curveBasis);

    svg.append("path")
        .datum(group)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "grey")
        .attr("stroke-width", 2)
        .style("opacity", 0.5); // 그래프의 불투명도 설정
});


 // 차트 그리기
 svg.selectAll("circle")
 .data(testdata)
 .enter()
 .append("circle")
//  .filter(d => d.X_Value >= loc-10 && d.X_Value <= loc + 10)
 .filter(d => d.actionID ==1)
 .attr("cx", d => xScale(d.X_Value))
 .attr("cy", d => yScale(d.agentID))
 .attr("r", 15)
 .style("fill", "grey")
 .style("opacity", 0.5)
 .style("stroke", "grey") 
 .style("stroke-width", 3); 

svg.selectAll("rect-square")
 .data(testdata)
 .enter()
 .append("rect")
//  .filter(d => d.X_Value >= loc-10 && d.X_Value <= loc + 10)
 .filter(d => d.actionID != 1) // 조건에 따라 네모 그리기
 .attr("x", d => xScale(d.X_Value) - 15)
 .attr("y", d => yScale(d.agentID) - 15)
 .attr("width", 30)
 .attr("height", 30)
 .style("fill", "white")
 .style("opacity", 0.5)
 .style("stroke", "grey")
 .style("stroke-width", 3); 


}



  // 슬라이더 이벤트 리스너 등록 - line chart
  document.getElementById("slider_loc").addEventListener("input", function() {
    svg.selectAll("rect.red-square").remove(); 

    loc = parseInt(this.value); // 슬라이더의 값 가져오기
    handleSliderChange(loc); // 슬라이더 값으로 Annotation 업데이트
    // d3.select("#scatter-line-chart").remove();
    svg.attr("viewBox",""+28000/360*loc+" -20 900 860" );
    if(checkKey==1) makePRE(loc);
  });

  function slider_location() {
    return parseInt(document.getElementById("slider_loc").value);
}












// 슬라이더 이동할때마다 사용 - scatter
// function moveData(loc) {
//     // 새로운 데이터를 선택하여 가져옴
//     var newData = marlData.slice(loc-10,  loc+10);
//      // yScale 업데이트
//     yScale = d3.scaleLinear()
//                 .domain([0, newData[0]+20])
//                 .range([400, 0]);

//     // y축 업데이트
//     yAxis.transition().duration(1000).call(d3.axisLeft(yScale));

//     // scatter plot 갱신
//     svg.selectAll("circle")
//        .data(newData)
//        .attr("cy", d => yScale(d.y));

//     // Line 그래프 갱신
//     const line = d3.line()
//                    .x(d => xScale(d.x))
//                    .y(d => yScale(d.y));
//     svg.selectAll("path")
//        .datum(newData)
//        .attr("d", line);
//   }



  // document.getElementById("slider_loc").addEventListener("input", function() {
  //   var loc = parseInt(this.value); // 슬라이더의 값 가져오기
  //   moveData(loc);
  //   // changeScatter(loc); // 슬라이더 값으로 Annotation 업데이트
  // });
  
