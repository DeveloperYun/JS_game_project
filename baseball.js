var 바디 = document.body; // 화면에 접근

//랜덤한 4개의 숫자를 만들어야함(1~9)
var rand_num;
var num_arr; // 여기다 랜덤하게 4개를 뽑는다.

function pickList(){
    rand_num = [1,2,3,4,5,6,7,8,9];
    num_arr = []; // 여기다 랜덤하게 4개를 뽑는다.
    for(var i=0; i<4; i++){
        var select = rand_num.splice(Math.floor(Math.random() * rand_num.length), 1)[0];
        num_arr.push(select);
     }
}

// //배열의 메소드
// for(var i=0; i<4; i++){
//    // var select = rand_num.pop();  배열 끝의 항목을 제거한다
//    // var select = rand_num.shift(); 배열 앞에서부터 항목을 제거한다
//    // num_arr.push(select);  배열 끝에 항목을 추가한다
//    // num_arr.unshift(select); 배열 앞에서부터 항목을 추가한다

//    // var select = rand_num.splice(a, b); a번쨰 인덱스부터 b개의 항목 제거 
//    // 만약 4,5를 뽑고싶다면 splice(4, 2)

//    // 랜덤으로 중복없이 뽑아보자.
//    var select = rand_num.splice(Math.floor(Math.random() * rand_num.length), 1)[0];
//    num_arr.push(select);
// }
pickList();
console.log(num_arr);

var result = document.createElement('h1'); // 제목생성
바디.append(result);


var newform = document.createElement('form');
document.body.append(newform);

var inputbox = document.createElement('input');
newform.append(inputbox);
inputbox.type='text'
inputbox.maxLength = 4; // 4자리초과 input 금지

var btn = document.createElement('button');
btn.textContent="입력";
newform.append(btn);

var cnt=0;

newform.addEventListener('submit', function callback_func(e){
   e.preventDefault();

   var answer = inputbox.value;
   //console.log(answer);

   //입력값은 string인데 num_arr은 배열.
   //배열을 문자로 만들떄는 join, 문자를 배열로 만들떄는 split
   if(answer === num_arr.join('')){
        result.textContent = 'homerun!';
        inputbox.value='';
        inputbox.focus();

        pickList();

        cnt = 0;
    }
   else{
        var answer_arr = answer.split('');
        var strike = 0;
        var ball = 0;

        cnt+=1;
        if(cnt>5)
        {
            result.textContent='failure' + num_arr.join(',');
            inputbox.value='';
            inputbox.focus();

            pickList();
            cnt=0;
         
        }
        else{
            for(var i=0; i<4; i++){
                if(Number(answer_arr[i]) === num_arr[i]){ // 같은자리 같은숫자 확인
                    strike+=1;
                }
                else if(num_arr.indexOf(Number(answer_arr[i])) > -1){ // 다른자리 같은숫자 확인
                    ball+=1;
                }
            }
            result.textContent= strike + 'strike' + ball + 'ball';
            inputbox.value='';
            inputbox.focus();
        }
   }

});