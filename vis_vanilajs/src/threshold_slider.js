// 슬라이더의 값을 저장할 변수
var slider1Value = 0;
var slider2Value = 0;

// 슬라이더 이벤트 처리
document.getElementById("slider1").addEventListener("input", function() {
  slider1Value = this.value;
  document.getElementById("slider1Value").textContent = slider1Value;
});

document.getElementById("slider2").addEventListener("input", function() {
  slider2Value = this.value;
  document.getElementById("slider2Value").textContent = slider2Value;
});