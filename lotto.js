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
var lotto_number = shuffle.splice(0,6); // 배열의 인덱스 0,1,2,3,4,5까지 추출

//sort 메소드를 통해서 숫자 정렬(오름차순)
console.log('당첨 숫자', lotto_number.sort(function (p,c){return p - c;}), '보너스 숫자',bonus_number);

