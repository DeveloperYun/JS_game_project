/*

<!-- <div>가지</div>
    <input type="text">
    <button>입력</button> -->

    html에서 세줄이면 끝나지만, 자바스크립트로 똑같은 기능을 재현해보았다.

*/
var 바디 = document.body;
var 단어 = document.createElement('div'); // documnet에 div라는 새로운 태그 생성

단어.textContent = '가지';
document.body.append(단어);

//html의 form태그 구현
var new_form = document.createElement('form');
document.body.append(new_form);

var inputBox = document.createElement('input');
new_form.append(inputBox);

var btn = document.createElement('button');
btn.textContent = "입력";
new_form.append(btn);

var result = document.createElement('div');
document.body.append(result);

// 클릭 이벤트 리스너 추가
new_form.addEventListener('submit', function (이벤트){ //익명클래스와 비슷한 익명함수
    이벤트.preventDefault(); // form이 서버로 데이터를 전송하고 새로고침되는걸 막기위한 이벤트
     
    if(단어.textContent[단어.textContent.length-1] === inputBox.value[0])
    {
        result.textContent = "congratulation";
        단어.textContent = inputBox.value;
        inputBox.value=""; //단어 입력후 공란 출력
        inputBox.focus(); // html의 autofocus 구현
    }
    else{
        result.textContent = "try again";
        inputBox.value=""; //단어 입력후 공란 출력
        inputBox.focus(); // html의 autofocus 구현
    }

});