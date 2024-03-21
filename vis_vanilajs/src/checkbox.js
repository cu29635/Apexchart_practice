// 체크박스 요소를 가져옵니다.
var toggleCheckbox1 = document.getElementById('check1');
var toggleCheckbox2 = document.getElementById('check2');


// 체크박스 상태에 따라 그래프 요소를 표시하거나 숨깁니다.
function makePRE () {
    svg.selectAll("rect.red-square")
        .data(testdata)
        .enter()
        .append("rect")
        // .filter(d => d.X_Value >= loc-10 && d.X_Value <= loc + 10)
        .filter(d => d.actionID == 3) // 조건에 따라 네모 그리기
        .attr("class", "red-square") 
        .attr("x", d => xScale(d.X_Value) - 15)
        .attr("y", d => yScale(d.agentID) - 15)
        .attr("width", 30)
        .attr("height", 30)
        .style("fill", "red")
        .style("opacity", 0.5)
        .style("stroke", "red");
} 

var checkKey = 0


//PRE filter
toggleCheckbox2.addEventListener('change', function() {
    if (this.checked) {
        checkKey = 1;
        // 체크되면 그래프 요소를 표시합니다.
        makePRE();
    } else {
        // 체크가 해제되면 그래프 요소를 숨깁니다.
        checkKey = 0;
        svg.selectAll("rect.red-square").remove(); 
    }
});


//LF filter
toggleCheckbox1.addEventListener('change', function() {
    if (this.checked) {
        // 체크되면 그래프 요소를 표시합니다.
        scatter.showSeries('lf_filter');
    } else {
        // 체크가 해제되면 그래프 요소를 숨깁니다.
        scatter.hideSeries('pre_filter');
        svg.selectAll("square").remove(); // 선택이 해제되면 그래프 삭제
    }
});