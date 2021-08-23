var screen = document.querySelector('#screen');
var start;
var end;
var timeout;
var record = [];
var result = document.querySelector('#result');

screen.addEventListener('click',function(){
    
    if(screen.classList.contains('waiting')){ // 현재 준비상태인지 파악
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = 'if screen turns into green, then click';

        timeout = setTimeout(function(){
            start = new Date(); //현재시각 기록
            screen.click();
        },Math.floor(Math.random()*1000) + 2000); // 2000~3000 ms 사이 수
    }
    else if(screen.classList.contains('ready')){
        if(start == null){ //부정출발
            clearTimeout(timeout);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = 'too fast';
        }
        else{
            screen.classList.remove('ready'); // 준비 상태 (red)
            screen.classList.add('now');
            screen.textContent = 'click';
        }
    }
    else if(screen.classList.contains('now')){ // 시작 (green)
        end = new Date(); //마친 시각 기록
        console.log((end - start)/1000); // 반응속도시간 (밀리초 단위므로 나누기 천)

        record.push((end - start)/1000);
        result.textContent = (end - start)/1000+' second';
        start=null;
        end=null;

        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = 'Click to start';

    }
})