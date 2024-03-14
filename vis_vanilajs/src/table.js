
var data = [
    ["Data 1-1", "Data 1-2"],
    ["Data 2-1", "Data 2-2"],
    ["Data 3-1", "Data 3-2"]
  ];

  
  // 페이지 로딩 시 테이블 생성
  createTable(data);


  function createTable(data) {
    // 테이블 요소 생성
    var table = document.createElement("table");
  
    // 테이블 내용 생성
    var tbody = document.createElement("tbody");
    for (var i = 0; i < data.length; i++) {
      var row = tbody.insertRow();
      for (var j = 0; j < data[i].length; j++) {
        var cell = row.insertCell();
        cell.textContent = data[i][j];
        if (j==0){
            cell.classList.add("cell1"); 
        } 
        else {
            cell.classList.add("cell2");
        }
      }
    }
  
    // 테이블 컨테이너에 테이블 추가
    var tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = "";
    table.appendChild(tbody);
    tableContainer.appendChild(table);
  }
