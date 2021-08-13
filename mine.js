document.querySelector('#exec').addEventListener('click',function(){
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


    var dataset = [];
    var tbody = document.querySelector('#table tbody');

    // 입력 받은 hor와 ver 값에 따라 동적으로 tr, td 생성
    for(var i=0; i < ver; i+=1){
        var arr = [];
        var tr = document.createElement('tr');
        dataset.push(arr);

        for(var j=0; j < hor; j+=1){
            arr.push(1);
            var td = document.createElement('td');
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