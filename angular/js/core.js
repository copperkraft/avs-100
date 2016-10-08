app


    .factory('mainCode', function () {

    


   

    function game() {
        
        



        function createInstructionSet() {
            program.invalidFunctions = [];
            program.instructionSet = [];
            var arrayLines = document.getElementById('textArea').value.match(/^.*/gm);
            arrayLines = arrayLines.map(function (lower) {
                return lower.toUpperCase();
            });

            for (var i = 0; i < arrayLines.length; i++) {
                var funcToSet = getOperationByString(arrayLines[i]);
                if (funcToSet == 'error') {
                    program.invalidFunctions.push(i);
                    funcToSet = function () {
                        outConsoleMessage('EIL' + program.counter + '>> ' + arrayLines[program.counter] + '<br>');
                    }
                }
                program.instructionSet.push(funcToSet);
            }
            if (isLocalStorageAvailable()) {
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
        
    }
})
