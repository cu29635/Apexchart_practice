// 체크박스 요소를 가져옵니다.
var toggleCheckbox1 = document.getElementById('check1');
var toggleCheckbox2 = document.getElementById('check2');
// ApexCharts에서 그래프를 렌더링합니다.
// var chart = new ApexCharts(document.querySelector("#scatter"), options);
// chart.render();

// 체크박스 상태에 따라 그래프 요소를 표시하거나 숨깁니다.
//LF filter
toggleCheckbox1.addEventListener('change', function() {
    if (this.checked) {
        // 체크되면 그래프 요소를 표시합니다.
        scatter.showSeries('lf_filter');
    } else {
        // 체크가 해제되면 그래프 요소를 숨깁니다.
        scatter.hideSeries('lf_filter');
    }
});
//PRE filter
toggleCheckbox2.addEventListener('change', function() {
    if (this.checked) {
        // 체크되면 그래프 요소를 표시합니다.
        scatter.showSeries('pre_filter');
    } else {
        // 체크가 해제되면 그래프 요소를 숨깁니다.
        scatter.hideSeries('pre_filter');
    }
});