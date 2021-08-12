var img_position = '0';
var dictionary = {
    가위: '-142px',
    보: '-284px',
    바위: '0px'
};

var result = {
    가위: 1,
    바위: 0,
    보: -1
};

function comp(img_position){
    return Object.entries(dictionary).find(function(v){
        return v[1] === img_position; // 좌표는 2차원 배열의 두번째칸에 있으므로 1
    })[0];
}

//0.1초마다 background를 바꿔줄 것
var interval;
function interval_maker(){
    interval = setInterval(function(){
        if(img_position === dictionary.바위){
            img_position = dictionary.가위;
        }else if(img_position === dictionary.가위){
            img_position = dictionary.보;
        }else{
            img_position = dictionary.바위;
        }
        // 띄워쓰기 주의
        document.querySelector('#computer').style.background = 
            'url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ' + img_position + ' 0';
    }, 10);
}

interval_maker();

// 내가 가위바위보 버튼을 누르면 결과가 나오도록 이벤트를 등록해야함
// 가위바위보는 서로 뭘 내냐밖에 차이가 안남
// 따라서 가위,바위,보를 하나의 클래스에 담는 것이 리팩토링 결과.
document.querySelectorAll('.btn').forEach(function(btn){
    btn.addEventListener('click', function(){
        clearInterval(interval);
        setTimeout(function(){
            interval_maker();
        },1000);

        var user = this.textContent;
      //  console.log(user, comp(img_position)); // 왼쪽은 내가, 오른쪽은 컴퓨터가
        var con = result[user] - result[comp(img_position)];
        if(con === 0){
            console.log("draw");
        }
        else if(con === -1 || con ===2){
            console.log("win");
        }
        else{
            console.log("lose");
        }
        
    });
});

// 가위 =1, 바위 = 0, 보 = -1