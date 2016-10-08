var registerCount = 16,
    register = [],
    registerValue = [],
    program = {
        counter: 0,
        instructionSet: [],
        play: false,
        pause: false,
        invalidFunctions: [0],
        resetSettings: function () {
            var i;
            this.play = false;
            this.pause = false;
            this.counter = 0;
            createInstructionSet();
            refreshButtons();
            for (i = 0; i < registerCount; i = i + 1) {
                registerValue['R' + i] = 0;
            }
            refreshRegisters();
            refreshStrNumArea();
            document.getElementById('consoleOut').innerHTML = '';
    }
};





var validButtons = {
    start: true,
    stop: true,
    step: true
};

function createRegisterArea(){
    for (var i = 0; i < registerCount; i++) {
        registerValue['R' + i] = 0;
        register[i] = document.createElement('p');
        register[i].innerHTML = registerValue['R' + i];
        register[i].style.textAlign = 'right';
        register[i].setAttribute('id', 'register' + i);

        var regNum = document.createElement('p');
        regNum.innerHTML = 'R' + i + ': ';

        var row = document.createElement('tr');
        document.getElementById('registersArea').appendChild(row);
        var col = document.createElement('td');
        row.appendChild(col);
        col.appendChild(regNum);
        col = document.createElement('td');
        row.appendChild(col);
        col.appendChild(register[i]);
    }
}
function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
function player(){
    if (program.play){
        if (!program.pause)
            executeProgram();
        setTimeout(player,300);
    }
}

window.onload = function(){
    if (isLocalStorageAvailable())
    {
        document.getElementById('textArea').value = localStorage['textArea'] + '';
    }
    createRegisterArea();
    createInstructionSet();
    refreshButtons();
    refreshStrNumArea();
};
document.getElementById('startButton').onclick = function(){
    if (program.play) {
        program.pause = false;
        refreshButtons();
        return;
    }
    program.play = true;
    refreshButtons();
    player();
};
document.getElementById('stopButton').onclick = function(){
    if (program.play) {
        program.resetSettings();
    } else {
        document.getElementById('textArea').value = '';
        createInstructionSet();
        refreshStrNumArea();
        refreshButtons();
    }
};
document.getElementById('stepButton').onclick = function(){
    if (!validButtons.step)
    return;
    if(program.pause)
    {
        executeProgram();
        refreshButtons();
    }
    else
    {
        if(!program.play){
            program.play = true;
            player();
        }
        program.pause = true;
        refreshButtons();
    }
};



function refreshButtons(){
    validButtons.start = true;
    validButtons.stop = true;
    validButtons.step = true;

    if (program.play == true)
    {
        validButtons.start = false;
        document.getElementById('stopButton').value = 'stop';
        document.getElementById('stepButton').value = 'pause';
    }
    else
    {
        document.getElementById('stopButton').value = 'clear';
        document.getElementById('stepButton').value = 'step';
    }
    if (program.pause == true)
    {
        validButtons.start = true;
        document.getElementById('stepButton').value = 'step';
    }
    if (validButtons.start == true)
        document.getElementById('startButton').style.color = 'lightgray';
    else
        document.getElementById('startButton').style.color = 'dimgray';
    if (validButtons.step == true)
        document.getElementById('stepButton').style.color = 'lightgray';
    else
        document.getElementById('stepButton').style.color = 'dimgray';
    if (validButtons.stop == true)
        document.getElementById('stopButton').style.color = 'lightgray';
    else
        document.getElementById('stopButton').style.color = 'dimgray';
}
function refreshStrNumArea(){
    var strNumArea = document.getElementById('strNumArea');

    while (strNumArea.childNodes.length > 0)
    {
        strNumArea.removeChild(strNumArea.firstChild);
    }
    for(i = 0; i < (program.instructionSet.length); i++)
    {
        var strNum = document.createElement('p');
        strNum.setAttribute('id','str' + i);
        strNum.style.color = 'lightgray';
        strNum.style.backgroundColor = 'black';
        if(i < 10)
            strNum.innerHTML = '0' + i + '>';
        else
            strNum.innerHTML = i + '>';
        strNumArea.appendChild(strNum);
    }
    for(var i = 0; i < program.invalidFunctions.length; i++)
    {
        document.getElementById('str' + program.invalidFunctions[i]).style.color = 'red';
    }
    document.getElementById('str' + program.counter).style.backgroundColor = 'dimgray';

}
function refreshRegisters(){

    for(var i = 0; i < registerCount; i++)
    {
        registerValue['R'+ i] = registerValue['R'+ i]%256;
        document.getElementById('register' + i).innerHTML = registerValue['R'+ i];
    }
}


document.getElementById('textArea').onkeyup = function(){
    createInstructionSet();
};

function outConsoleMessage(message){
    document.getElementById('consoleOut').style.color = 'lightgray';
    document.getElementById('consoleOut').innerHTML = document.getElementById('consoleOut').innerHTML + message;
}

function getOperationByString(input){
    var string = input.replace(/\/\/.*/,'');
    if (/^ *$/.test(string))
        return function() {};
    for (var i = 0; i< functionsArray.length; i++)
    {
        var match = string.match(regType1(functionsArray[i]));

        if (match != null) {
            return functionsArray[i](match[1], match[2]);
        }
    }
    return 'error';
}

function output(message){
    return function() {
        if (message.match(/R[0-9]+/))
            outConsoleMessage(message + '>> ' + registerValue[message] + '<br>');
        else
            outConsoleMessage(message  + '<br>');
    };
}
output.firstOperand = 'r|v';
output.literal = 'OUT';

function formatOutput(message){
    return function() {
        if (message.match(/R[0-9]+/))
            var output = registerValue[message];
        else if (message.match(/".*"/)) {
            output = message.replace(/\\N/,'<br>');
            output = output.match(/"(.*)"/)[1];
        }
        else
            output = message;
        outConsoleMessage(output);
    };
}
formatOutput.firstOperand = 'r|v|s';
formatOutput.literal = 'FOT';

function moving (destination , source) {
    if (/^[0-9]+$/.test(source))
        return function() {
            registerValue[destination] = Number(source);
        };
    else return function(){
        registerValue[destination] = registerValue[source];
    };
}
moving.firstOperand = 'r';
moving.secondOperand = 'r|v';
moving.literal = 'MOV';

function jumpTo (destination) {

    if (/^[0-9]+$/.test(destination))
        return function() {
            if (destination >= program.instructionSet.length) {
                outConsoleMessage('JMP DESTINATION ERROR!');
                return;
            }
            program.counter = destination;
        };else return function(){
        if (registerValue[destination] > program.instructionSet.length) {
            outConsoleMessage('JMP DESTINATION ERROR!');
            return;
        }
        program.counter = registerValue[destination];
    }
}
jumpTo.firstOperand = 'r|v';
jumpTo.literal = 'JMP';

function addition (destination , source) {
    if (/^[0-9]+$/.test(source))
        return function() {
            registerValue[destination] += Number(source);
        };
    else return function(){
        registerValue[destination] += registerValue[source];
    };
}
addition.firstOperand = 'r';
addition.secondOperand = 'r|v';
addition.literal = 'ADD';

function multiplication (destination , source) {
    if (/^[0-9]+$/.test(source))
        return function() {
            registerValue[destination] = registerValue[destination] * Number(source);
        };
    else return function(){
        registerValue[destination] = registerValue[destination] * registerValue[source];
    };
}
multiplication.firstOperand = 'r';
multiplication.secondOperand = 'r|v';
multiplication.literal = 'MUL';

function division (destination , source) {
    if (/^[0-9]+$/.test(source))
        return function() {
            if (Number(source) == 0)
            {
                outConsoleMessage('DIV ZERO ERROR!');
                return;
            }
            registerValue[destination] = Math.floor(registerValue[destination] / Number(source));
        };
    else return function(){
        if (registerValue[source] == 0)
        {
            outConsoleMessage('DIV ZERO ERROR!');
            return;
        }
        registerValue[destination] = Math.floor(registerValue[destination] / registerValue[source]);
    };
}
division.secondOperand = 'r|v';
division.literal = 'DIV';

function modulo (destination , source) {
    if (/^[0-9]+$/.test(source))
        return function() {
            if (Number(source) == 0)
            {
                outConsoleMessage('DIV ZERO ERROR!');
                return;
            }
            registerValue[destination] = (registerValue[destination] % Number(source));
        };
    else return function(){
        if (registerValue[source] == 0)
        {
            outConsoleMessage('DIV ZERO ERROR!');
            return;
        }
        registerValue[destination] = (registerValue[destination] % registerValue[source]);
    };
}
modulo.firstOperand = 'r';
modulo.secondOperand = 'r|v';
modulo.literal = 'MOD';

function jumpRelativelyDown (destination) {

    if (/^[0-9]+$/.test(destination))
        return function() {
            if (destination + program.counter >= program.instructionSet.length) {
                outConsoleMessage('JRD DESTINATION ERROR!');
                return;
            }
            program.counter = program.counter + destination;
        };else return function(){
        if (registerValue[destination] + program.counter > program.instructionSet.length) {
            outConsoleMessage('JRD DESTINATION ERROR!');
            return;
        }
        program.counter = program.counter + registerValue[destination];
    }
}
jumpRelativelyDown.firstOperand = 'r|v';
jumpRelativelyDown.literal = 'JRD';

function jumpRelativelyUp (destination) {

    if (/^[0-9]+$/.test(destination))
        return function() {
            if (destination >= program.instructionSet.length) {
                outConsoleMessage('JRL DESTINATION ERROR!');
                return;
            }
            program.counter = program.counter + destination;
        };else return function(){
        if (registerValue[destination] > program.instructionSet.length) {
            outConsoleMessage('JRL DESTINATION ERROR!');
            return;
        }
        program.counter = program.counter + registerValue[destination];
    }
}
jumpRelativelyUp.firstOperand = 'r|v';
jumpRelativelyUp.literal = 'JRU';




function createRegularExpression (str) {
    var output = '('+str+')';
    output = output.replace(/\/\/.+/,'');
    output = output.replace(/r/,'R[0-9]+');
    output = output.replace(/v/,'[0-9]+');
    output = output.replace(/s/,'".*"');
    var labels = '';
    if (program.label) {
        labels = program.label[0];
        for(var i = 1; i < program.label.length; i++)
            labels = labels + '|' + program.label[i];
    }
    output = output.replace(/l/,labels);
    return output;
}

function regType1(func){
    var output = '^ *' + func.literal;
    if (func.firstOperand)
        output = output + ' +' + createRegularExpression(func.firstOperand);
    if (func.secondOperand)
        output = output + ' +' + createRegularExpression(func.secondOperand);
    output = output + ' *$';
    return new RegExp(output);
}



var functionsArray = [
    output,
    addition,
    multiplication,
    division,
    modulo,
    jumpTo,
    jumpRelativelyDown,
    jumpRelativelyUp,
    moving,
    formatOutput
];

function createInstructionSet()
{
    program.invalidFunctions = [];
    program.instructionSet = [];
    var arrayLines = document.getElementById('textArea').value.match(/^.*/gm);
    arrayLines = arrayLines.map(function(lower){return lower.toUpperCase();});

    for (var i = 0; i < arrayLines.length; i++) {
        var funcToSet = getOperationByString(arrayLines[i]);
        if (funcToSet == 'error') {
            program.invalidFunctions.push(i);
            funcToSet = function(){
                outConsoleMessage('EIL'+program.counter+'>> '+ arrayLines[program.counter]+'<br>');
            }
        }
        program.instructionSet.push(funcToSet);
    }
    if(isLocalStorageAvailable()) {
        localStorage['textArea'] = document.getElementById('textArea').value;
    }
    refreshStrNumArea();
}


function executeProgram() {
    var currCounter = program.counter;
    program.instructionSet[currCounter]();
    if (currCounter == program.counter)
    program.counter++;
    if (program.counter >= program.instructionSet.length)
        program.counter = 0;
    refreshStrNumArea();
    refreshButtons();
    refreshRegisters();
}