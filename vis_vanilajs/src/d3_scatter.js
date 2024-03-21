// 데이터 준비
function generateData() {
  const test_data = [];
  // 1부터 20까지의 값을 갖는 ID 및 X_Value 생성
  for (var i = 1; i <= 3600; i+=10) {
    for (var j = 1; j <= 10; j++) {
      if(i%20==1){
        test_data.push({ X_Value : i, agentID: j , actionID :  Math.floor(Math.random() * 5)});
      }
      else {
        test_data.push({ X_Value : i, agentID: j+0.3 , actionID :  Math.floor(Math.random() * 5)});
      }
      
    }
  }
  console.log( test_data[1]);
  return test_data;
}

// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }

// function dragged(d) {
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }

// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50};

const testdata = generateData();

var width = 1800
var height = 800

// SVG 요소 생성
const svg = d3.select("#scatter-line-chart")
              .attr("width", width+margin.right+margin.left)
              .attr("height",height+margin.top+margin.left)
              .attr("style", "max-width: 100%; height: auto;")
              .attr("transform",
 "translate(" + margin.left + "," + margin.top + ")");


svg.attr("viewBox",""+28000/360*50+" -20 900 860" );


const zoom = d3.zoom()
                .on('zoom', zoomed);
svg.call(zoom);

function zoomed() {
  svg.attr('transform', d3.zoomTransform(this));
}
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







// const xOffset = 50; // x축으로 이동할 양
// const width_view = 300; // viewBox의 너비
// const height_view = 900; // viewBox의 높이
// svg.attr("viewBox", `${xOffset} 0 ${width_view} ${height_view}`);
// return svg.node();

// d3.select("#slider_loc").on("input", function() {
//   // 슬라이더의 현재 값 가져오기
//   var sliderValue = +this.value;
  
//   // viewbox 위치 조정
//   var newX = sliderValue; // 새로운 viewbox x 위치 계산
//   var newViewBox = [newX, 0, 1900, 800]; // 새로운 viewbox 배열 생성
// console.log(newViewBox);
//   // SVG 요소의 viewbox 업데이트
//   svg.attr("viewBox", newViewBox.join(" "));
// });