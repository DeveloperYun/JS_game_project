var lotto_number_list = Array(45).fill().map(function(elem,idx){
    return idx + 1;
});

console.log(lotto_number_list);

var shuffle = [];

while(lotto_number_list.length > 0 ){
    // lotto_number_list 는 1부터 45로 초기화된 "배열"이다.
    // 이 배열에서 splice 메소드를 통해서 값을 하나 뽑는다
   var picks=lotto_number_list.
             splice(Math.floor(Math.random() * lotto_number_list.length), 1)[0];

    shuffle.push(picks);
}

console.log(shuffle);

var bonus_number = shuffle[shuffle.length-1];
var lotto_number = shuffle
                .splice(0,6) // 배열의 인덱스 0,1,2,3,4,5까지 추출
                .sort(function (p,c){return p - c;});

//sort 메소드를 통해서 숫자 정렬(오름차순)
console.log('당첨 숫자', lotto_number, '보너스 숫자',bonus_number);

//element를 id로 찾기위한 메소드
var result = document.querySelector('#result'); 


//setTimeout은 비동기 콜백함수
//반복문 내에서 비동기는 closure 되야한다.
//closure를 적용한 코드는 이후에 리팩토링 하면서 추가하도록 한다.
//반복문을 쓸 수는 없으므로 함수를 써서 리팩토릭 해보는걸로 만족하자.

// 1초마다 숫자 하나씩 띄우면서 긴장감조성

function ball_style(numb,result_window){
    var ball = document.createElement('div');
    ball.textContent = numb;

    //css 코드를 js에서 통제하는 방법 실습
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid black';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '5px'
    ball.style.fontSize = '15px';
    ball.className = '공 숫자' + numb;

    //공에 색 입히기
    var back_color;
    if(numb <= 10){
        back_color = 'red';
    }
    else if(numb <= 20){
        back_color = 'orange';
    }
    else if(numb <= 30){
        back_color = 'yellow';
    }
    else if(numb <= 40){
        back_color = 'blue';
    }
    else{
        back_color = 'green';
    }
    ball.style.background = back_color;
    result_window.appendChild(ball);
}

for(var i=0; i<lotto_number.length; i++){
    (function cc(j){
        setTimeout(function(){
            ball_style(lotto_number[j], result);
        }, (j + 1) * 1000);
    })(i);
}


setTimeout(function 콜백함수(){
    // bonus number 표시
    var result_bonus = document.querySelector('.bonus');
    ball_style(bonus_number,result_bonus);
}, 7000); // 1000ms = 1s   