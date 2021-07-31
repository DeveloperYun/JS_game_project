while(true){
    var op1 = Math.floor(Math.random() * 9) + 1; // 1~9 까지의 내림수(자연수) 랜덤값 추출
    // 0~9 를 뽑고싶었다면 Math.floor(Math.random() * 9)
    // Math.ceil(Math.random() *9) 도 1~9 까지 올림수(자연수) 랜덤값 추출

    var op2 = Math.floor(Math.random() * 9) + 1;
    var res = op1 * op2;
    var condition = false;

    while(condition === false){
        //prompt(입력) 는 브라우저에서만 구현되어 node.js 에서는 지원x
        var answer = prompt(String(op1) + 'X' + String(op2) + '=');
        //String형의 Number형으로의 형변환
        if(res === Number(answer)){
            alert('congratulation!');
            break;
        }
        else{
            alert('sorry..try again');
        }
    }
}