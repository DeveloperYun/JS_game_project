var tbody = document.querySelector('#table tbody');
var dataset = [];
var 중단플래그 = false; // 지뢰 밟았을 때 게임 끝..모든 동작 제어
var openCell_count = 0;

var 코드표={
    연칸: -1,
    물음표: -2,
    깃발: -3,
    깃발지뢰: -4,
    물음표지뢰: -5,
    지뢰: 1,
    보통칸: 0,
};

document.querySelector('#exec').addEventListener('click',function(){

    tbody.innerHTML = ''; // tbody의 내부 태그들을 지운다.
    중단플래그 = false;
    document.querySelector('#result').textContent = '';
    dataset = []; // 내부 실제 데이터 초기화
    openCell_count=0;

    // 문자열을 정수로 바꾸는 parse
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);

    console.log(hor, ver, mine);

    var list = Array(hor*ver).fill().map(function(element, idx){
        return idx; // 
    });

   // console.log(list.length);
    var shuffle = [];

    //지뢰 심을 위치 선정
    //list를 splice 하면서 list의 길이는 1씩 감소.
    //res에는 splice한 결과값 반환, 지뢰좌표 get
    while(list.length > hor*ver-mine){
        var res = list.splice(Math.floor(Math.random() * list.length), 1)[0];
        shuffle.push(res);
        //console.log(list);
      //  console.log(list.length , res);
    }

    console.log(shuffle);

    // 입력 받은 hor와 ver 값에 따라 동적으로 tr, td 생성
    for(var i=0; i < ver; i+=1){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);

        for(var j=0; j < hor; j+=1){
            arr.push(0);
            var td = document.createElement('td');

            // 우클릭으로 깃발 꽂기
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                if(중단플래그 === true){
                    return;
                }

                // 우클릭했을 때 좌표를 알 수 있게...(like 틱택토)
                var parent_tr = e.currentTarget.parentNode;
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
            
               // console.log(parent_tr, parent_tbody, e.currentTarget, 칸, 줄);

               if(dataset[줄][칸] === 코드표.연칸){
                   return;
               }

                // 우클릭을 한번 더 하면 ? 를 표시한다
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent='★';
                    e.currentTarget.classList.add('flag');
                    if(dataset[줄][칸] === 코드표.지뢰){
                        dataset[줄][칸] = 코드표.깃발지뢰;
                    }
                    else{
                        dataset[줄][칸] = 코드표.깃발;
                    }
                   // dataset[줄][칸] = '★';
                } 
                else if(e.currentTarget.textContent === '★'){
                    e.currentTarget.textContent='?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');
                   // dataset[줄][칸] = '?';
                   if(dataset[줄][칸] === 코드표.깃발지뢰){
                       dataset[줄][칸] = 코드표.물음표지뢰;
                   }
                   else{
                       dataset[줄][칸] = 코드표.물음표;
                   }
                }
                else{
                  //  e.currentTarget.textContent='';
                    //dataset[줄][칸] = '1'; // 데이터가 빈칸일 땐 1을 넣어줘야한다.
                    e.currentTarget.classList.remove('question');

                    if(dataset[줄][칸] === 코드표.물음표지뢰){
                        e.currentTarget.textContent ='X';
                        dataset[줄][칸] = 코드표.지뢰;
                    }
                    else{
                        e.currentTarget.textContent = '';
                        dataset[줄][칸] = 코드표.보통칸;
                    }
                }
            });

            // click 했을 때 주변 지뢰 갯수 띄워주기
            td.addEventListener('click',function(e){
                if(중단플래그 === true){
                    return;
                }
                var parent_tr = e.currentTarget.parentNode;
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);

                // 중복 클릭이 openCell_count에 카운팅 돼 버리는 문제
                if ([코드표.연칸, 코드표.깃발, 코드표.깃발지뢰, 코드표.물음표지뢰, 코드표.물음표].includes(dataset[줄][칸])) {
                    return;
                }
                
                e.currentTarget.classList.add('opened');
                openCell_count += 1;
                if(dataset[줄][칸] === 코드표.지뢰){
                    e.currentTarget.textContent = '펑';
                    document.querySelector('#result').textContent = '실패!!!';
                    중단플래그 = true;
                }
                else{
                    var 주변 =[
                        dataset[줄][칸-1],dataset[줄][칸+1]
                    ];

                    if(dataset[줄-1] != null){
                        주변 = 주변.concat(dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]);
                       // console.log(줄+1, 칸+1);
                    }
                    if(dataset[줄+1] != null){
                        주변 = 주변.concat(dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]);
                       // console.log(dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]);
                    }

                    var 주변지뢰개수 = 주변.filter(function(v){
                        return [코드표.지뢰, 코드표.깃발지뢰, 코드표.물음표지뢰].includes(v);
                    }).length;

                    // 0은 출력 안되게
                    // 거짓인 값 : false, '', 0, null, undefined, NaN
                    e.currentTarget.textContent = 주변지뢰개수 || ''; //주변 지뢰가 거짓인 값이면 ''를 대입
                    dataset[줄][칸] = 코드표.연칸;
                    if(주변지뢰개수 === 0){
                        // 주변 8칸 동시 오픈(재귀 함수)
                        var 주변칸 = [];
                        if(tbody.children[줄-1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄 - 1].children[칸 - 1],
                                tbody.children[줄 - 1].children[칸],
                                tbody.children[줄 - 1].children[칸 + 1],
                            ]);
                        }

                        주변칸 = 주변칸.concat([
                            tbody.children[줄].children[칸-1],
                            tbody.children[줄].children[칸+1],
                        ]);

                        if(tbody.children[줄+1]){
                            주변칸 = 주변칸.concat([
                                tbody.children[줄+1].children[칸-1],
                                tbody.children[줄+1].children[칸],
                                tbody.children[줄+1].children[칸+1],
                            ]);
                        }

                        // 배열에서 undefined나 null 같은 것들을 제거하기 위한 filter
                        주변칸.filter(function (v) {
                            return !!v;
                        }).forEach(function(옆칸) {
                            var parent_tr = 옆칸.parentNode;
                            var parent_tbody = 옆칸.parentNode.parentNode;
                            var 옆칸칸 = Array.prototype.indexOf.call(parent_tr.children, 옆칸);
                            var 옆칸줄 = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
                            if(dataset[옆칸줄][옆칸칸] !== 코드표.연칸){
                                옆칸.click();
                            }
                        });
                    }
                }

                // 10x10 판에서 80개를 열었단건 승리했단 의미
                if(openCell_count == hor*ver - mine){
                    중단플래그 = true;
                    document.querySelector('#result').textContent= '승리!!';
                }
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

   // 지뢰 심기
   for(var k=0; k<shuffle.length; k++){ // ex. 59
       var 세로 = Math.floor(shuffle[k] / ver); // 6번째 줄
       var 가로 = shuffle[k] % ver; // 9번째 칸
       console.dir(tbody);
       console.log(세로, 가로);

       tbody.children[세로].children[가로].textContent = 'X';
       dataset[세로][가로]=코드표.지뢰;
   }
   console.log(dataset);

});





// currentTarget 과 target의 차이를 보여주는 콘솔.
tbody.addEventListener('contextmenu',function(e){
    console.log('current target', e.currentTarget);
    console.log('target',e.target);
})