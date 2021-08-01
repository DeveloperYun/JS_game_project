var op1 = Math.ceil(Math.random() * 9);
var op2 = Math.ceil(Math.random() * 9);
var res = op1 * op2;

var 바디 = document.body;
var word = document.createElement('div');

word.textContent = String(op1) + 'X' + String(op2) + '= ? ';
document.body.append(word);

var newform = document.createElement('form');
document.body.append(newform);

var inputbox = document.createElement('input');
newform.append(inputbox);

var btn = document.createElement('button');
btn.textContent="입력";
newform.append(btn);

var result_pop = document.createElement('div');
document.body.append(result_pop);

newform.addEventListener('submit', function (event){
    event.preventDefault();

    if(res === Number(inputbox.value)){
        result_pop.textContent = "congratulation";
        op1 = Math.ceil(Math.random() * 9);
        op2 = Math.ceil(Math.random() * 9);
        res = op1 * op2;

        word.textContent = String(op1) + 'X' + String(op2) + '= ? ';


        inputbox.value='';
        inputbox.focus();
    }
    else{
        result_pop.textContent = "try again";
        inputbox.value='';
        inputbox.focus();
    }

});