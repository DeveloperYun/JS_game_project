var 가로 = 4;
var 세로 = 3;

// 객체가 1단계 뿐이므로 slice를 통해 쉽게 복사 가능
var 색깔들 = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var 색깔후보 = 색깔들.slice(); // 색깔들 과의 참조관계를 끊기 위한 slice
var 색깔 = [];

var flag = true;
var 클릭카드 = [];
var 완성카드 = [];
var 시작시간;

function shuffle(){
    for (var i = 0; 색깔후보.length > 0; i += 1) {
        색깔 = 색깔.concat(색깔후보.splice(Math.floor(Math.random() * 색깔후보.length), 1));
        //console.log(색깔[i]);
    }
}

function cardset(가로, 세로) {
    flag = false;

    // flag = true 일때만 클릭 가능

    for(var i=0; i < 가로 * 세로; i += 1){
        var card = document.createElement('div');
        // card.classList.add('card'); // card.className = 'card'; 도 가능
        card.className = 'card';
        
        var cardInner = document.createElement('div');
        cardInner.className = 'card-inner';

        var cardFront = document.createElement('div');
        cardFront.className = 'card-front';

        var cardBack = document.createElement('div');
        cardBack.className = 'card-back';
        cardBack.style.backgroundColor = 색깔[i];

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        (function (c){  //즉시실행함수로 클로저 문제 해결
            card.addEventListener('click', function() {
                if(flag === true && 완성카드.includes(c)===false){
                    c.classList.toggle('flipped'); // flipped 클래스가 있으면 빼고, 없으면 넣고
                    클릭카드.push(c);
                    if(클릭카드.length === 2){
                        if( // 두 카드 색이 같다면
                            //style로 지정했던 카드의 색을 쿼리셀렉터로 받아오자
                            클릭카드[0].querySelector('.card-back').style.backgroundColor ===
                            클릭카드[1].querySelector('.card-back').style.backgroundColor){
                                완성카드.push(클릭카드[0]);
                                완성카드.push(클릭카드[1]);
                                클릭카드 = [];

                                //완성 -> 초기화
                                if(완성카드.length === 12){
                                    var 종료시간 = new Date();
                                    alert('COMPLETE! ' + (종료시간 - 시작시간)/1000 +' second');
                                    document.querySelector('#wrapper').innerHTML=''; // 내부 태그들 초기화
                                    색깔후보 = 색깔들.slice();
                                    색깔 = [];
                                    완성카드 = [];
                                    시작시간 = null;
                                    shuffle();
                                    cardset(가로, 세로);
                                }
                        }
                        else{ // 두 카드 색이 다르면
                            flag = false; // 도중 클릭 방지
                            setTimeout(function(){
                                클릭카드[0].classList.remove('flipped');
                                클릭카드[1].classList.remove('flipped');
                                flag = true;
                                클릭카드 = [];
                            },1000)

                        }
                    }
                }

            });
        })(card);
        document.querySelector('#wrapper').appendChild(card);
    }

    //초기 위치 암기할 시간 부여
    document.querySelectorAll('.card').forEach(function (carrd, iddx){
        setTimeout(function(){
            carrd.classList.add('flipped');
        }, 1000 + 100*iddx);
    });
    
    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function (carrd){
            carrd.classList.remove('flipped');
        });
    flag = true; // 3초 뒤에 클릭 가능
    시작시간 = new Date();
    },3000); 

}
shuffle();

cardset(가로, 세로);