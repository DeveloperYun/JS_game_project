var tbody = document.querySelector('#table tbody');
var dataset = [];

document.querySelector('#exec').addEventListener('click',function(){

    tbody.innerHTML = ''; // tbody의 내부 태그들을 지운다.

    // 문자열을 정수로 바꾸는 parse
    var hor = parseInt(document.querySelector('#hor').value);
    var ver = parseInt(document.querySelector('#ver').value);
    var mine = parseInt(document.querySelector('#mine').value);

    console.log(hor, ver, mine);

    var list = Array(hor*ver).fill().map(function(element, idx){
        return idx; // 
    });

    console.log(list.length);
    var shuffle = [];

    //지뢰 심을 위치 선정
    //list를 splice 하면서 list의 길이는 1씩 감소.
    //res에는 splice한 결과값 반환, 지뢰좌표 get
    while(list.length > 80){
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
            arr.push(1);
            var td = document.createElement('td');

            // 우클릭으로 깃발 꽂기
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();

                // 우클릭했을 때 좌표를 알 수 있게...(like 틱택토)
                var parent_tr = e.currentTarget.parentNode;
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);
            
                console.log(parent_tr, parent_tbody, e.currentTarget, 칸, 줄);

                // 우클릭을 한번 더 하면 ? 를 표시한다
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent='★';
                   // dataset[줄][칸] = '★';
                } 
                else if(e.currentTarget.textContent === '★'){
                    e.currentTarget.textContent='?';
                   // dataset[줄][칸] = '?';
                }
                else{
                    e.currentTarget.textContent='';
                    //dataset[줄][칸] = '1'; // 데이터가 빈칸일 땐 1을 넣어줘야한다.

                    if(dataset[줄][칸] === '1'){
                        e.currentTarget.textContent ='';
                    }
                    else if(dataset[줄][칸] ==='X'){
                        e.currentTarget.textContent = 'X';
                    }
                }
            });

            // click 했을 때 주변 지뢰 갯수 띄워주기
            td.addEventListener('click',function(e){
                var parent_tr = e.currentTarget.parentNode;
                var parent_tbody = e.currentTarget.parentNode.parentNode;
                var 칸 = Array.prototype.indexOf.call(parent_tr.children, e.currentTarget);
                var 줄 = Array.prototype.indexOf.call(parent_tbody.children, parent_tr);

                if(dataset[줄][칸] === 'X'){
                    e.currentTarget.textContent = '펑';
                }
                else{
                    var 주변 =[
                        dataset[줄][칸-1],                    dataset[줄][칸+1]
                    ];

                    if(dataset[줄-1] != null){
                        주변 = 주변.concat(dataset[줄-1][칸-1],dataset[줄-1][칸],dataset[줄-1][칸+1]);
                    }
                    if(dataset[줄+1] != null){
                        주변 = 주변.concat(dataset[줄+1][칸-1],dataset[줄+1][칸],dataset[줄+1][칸+1]);
                    }

                    e.currentTarget.textContent = 주변.filter(function(v){
                        return v === 'X';
                    }).length;
                }

            });

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

   // 지뢰 심기
   for(var k=0; k<shuffle.length; k++){ // ex. 59
       var 세로 = Math.floor(shuffle[k] / 10); // 6번째 줄
       var 가로 = shuffle[k] % 10; // 9번째 칸

       console.log(세로, 가로);

       tbody.children[세로].children[가로].textContent = 'X';
       dataset[세로][가로]='X'; 
   }
   console.log(dataset);

});

// currentTarget 과 target의 차이를 보여주는 콘솔.
tbody.addEventListener('contextmenu',function(e){
    console.log('current target', e.currentTarget);
    console.log('target',e.target);
})