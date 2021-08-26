var body = document.body;
var table = document.createElement('table');
var lines = [];
var cells = [];
var turn = 'X'; // X가 선공
var result = document.createElement('div');

function 결과확인(line_idx,cols_idx){
    //틱택토가 완성됐는지(세칸이 다 채워졌는지) 확인하는 부분 (노가다)
        // 1. 가로 빙고 검사
        var full = false;
        if(
            cells[line_idx][0].textContent === turn && 
            cells[line_idx][1].textContent === turn &&
            cells[line_idx][2].textContent === turn){
                full = true;
            }
        // 2. 세로 빙고 검사
        if(
            cells[0][cols_idx].textContent === turn &&
            cells[1][cols_idx].textContent === turn &&
            cells[2][cols_idx].textContent === turn){
                full = true;
            }
        // 3. 대각선 빙고 검사
      //  if(line_idx - cols_idx === 0 || Math.abs(line_idx-cols_idx) === 2){
            if(
                cells[0][0].textContent === turn &&
                cells[1][1].textContent === turn &&
                cells[2][2].textContent === turn){
                    full = true;
                }
            //else 
            if(
                cells[0][2].textContent === turn &&
                cells[1][1].textContent === turn &&
                cells[2][0].textContent === turn){
                    full = true;
                }
         //   }
    return full;
}

function 초기화(무승부) { // 초기화
    if (무승부) {
      result.textContent = '무승부';
    } else { // 승부
        result.textContent = turn + '님이 승리!';
    }
  
    setTimeout(function() {
      result.textContent = '';
      cells.forEach(function (rows) {
        rows.forEach(function (cols) {
          cols.textContent = '';
        });
      });
      turn = 'X';
    }, 1000);
  }


//익명으로 쓸 함수를 빼내서 간결성 높임
//2차원 배열
var clickFunc = function(e){
    if(turn ==='O'){
        return; // comp의 턴일 때 클릭 방지
    }
    // console.log(e.target); // 이벤트 발생 요소 반환=>콘솔창 출력해줌
    // console.log(e.target.parentNode); // 이벤트 발생 요소 부모 반환

    //이벤트는 td에서 일어나지만 이벤트가 일어나는 "줄" 은 tr이므로 parentNode가 필요하다
    var line_idx = lines.indexOf(e.target.parentNode); // 몇번쨰줄인지 반환
    //console.log('line_idx',line_idx);
    var cols_idx = cells[line_idx].indexOf(e.target);
    //console.log('cols_idx',cols_idx);
 
    //칸이 채워져 있는지 확인
    //value메소드는 input에서. 외에는 textContent
    if(cells[line_idx][cols_idx].textContent !== ''){
        console.log("its not blank");
    } 
    else{
        console.log("its blank");
        cells[line_idx][cols_idx].textContent = turn; // X로 표시하고

        var 승리여부 = 결과확인(line_idx,cols_idx);

        //빈 칸 중 하나를 고른다.
        var 후보칸=[];
        cells.forEach(function (rows){
            rows.forEach(function (cols){
                후보칸.push(cols);
            });
        });
        후보칸 = 후보칸.filter(function(cols){ //filter는 true인 것들을 거른다
            return !cols.textContent; //빈칸만 남긴다
        });

        if(승리여부){
            초기화();
        }
        else if(후보칸.length === 0){
            초기화(true);
        }
        else{
            if(turn==='X'){
                turn = 'O';
            }
            // 컴퓨터의 턴
            setTimeout(function(){
                console.log('computers turn');

                var 선택칸 = 후보칸[Math.floor(Math.random() * 후보칸.length)];
                선택칸.textContent='O';
                //computer가 승리한지 체크
                var 몇줄 = lines.indexOf(선택칸.parentNode);
                var 몇칸 = cells[몇줄].indexOf(선택칸);
                var 승리여부 = 결과확인(몇줄,몇칸);
                
                //다 찼으면
                if(승리여부){
                    초기화();
                }
                //턴을 나에게 넘긴다
                turn = 'X';
            },1000);

        }
    }
}  

// 2차원배열 생성 + 표 그리기
for(var i=1; i<=3; i+=1){
    var rows = document.createElement('tr');
    lines.push(rows);
    cells.push([]);

    for(var j=1; j<=3; j+=1){
        var cols = document.createElement('td');

        //클릭 이벤트
        cols.addEventListener('click', clickFunc); // 등록된 함수 호출

        cells[i-1].push(cols);
        rows.appendChild(cols);
    }
    table.appendChild(rows);
}
body.appendChild(table);
body.appendChild(result);
console.log('줄', cells, '칸', lines);
