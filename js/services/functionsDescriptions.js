function createRegExpForOperand(operandType) {
    var output = '(' + operandType + ')';
    output = output.replace(/r/, 'R[0-9]+');
    output = output.replace(/v/, '[0-9]+');
    output = output.replace(/s/, '".*"');
    return output;
}
function OperationConstructor(name, code, firstOperandType, secondOperandType) {
    var output = '^ *' + name;
    if (firstOperandType) {
        output = output + ' +' + createRegExpForOperand(firstOperandType);
    }
    if (secondOperandType) {
        output = output + ' +' + createRegExpForOperand(secondOperandType);
    }
    output = output + ' *$';
    this.regExpr = new RegExp(output);
    this.operationClosure = function (firstOperand, secondOperand) {
        var operation = function () {
            code.call(this, firstOperand, secondOperand);
        };
        operation.type = name;
        return operation;
    };
}
var functionsArray = [
    new OperationConstructor('MOV', function (to, from) {
        this.registers[to] = Number(this.registers[from] === 0? 0: this.registers[from] || from);
    }, 'r', 'r|v'),
    new OperationConstructor('ADD', function (to, from) {
        this.registers[to] += Number(this.registers[from] === 0? 0: this.registers[from] || from);
    }, 'r', 'r|v'),
    new OperationConstructor('JMP', function (to) {
        this.counter = (Number(this.registers[to] === 0? 0: this.registers[to] || to)) - 1;
    }, 'r|v'),
    new OperationConstructor('OUT', function (to) {

        var out;
        if (this.registers[to] === 0) {
            out = 0;
        } else {
            out = this.registers[to] || to;
        }

        this.output.push(out);
        this.outputEvents.forEach(function (outputEvent) { outputEvent(out); });
    }, 'r|v'),
    new OperationConstructor('SLP', function () {
        this.waiting = !this.waiting;
    }),
    new OperationConstructor('INP', function (to) {
        this.waiting = true;
        if (parseInt(this.input, 10) || parseInt(this.input, 10) === 0) {
            this.registers[to] = parseInt(this.input, 10);
            this.waiting = false;
            this.input = null;
        }
    }, 'r'),
    new OperationConstructor('SUB', function (to, from) {
        this.registers[to] -= Number(this.registers[from] === 0? 0:this.registers[from] || from);
    }, 'r', 'r|v'),
    new OperationConstructor('JEZ', function (data, to) {
        if (this.registers[data] === 0) {
            this.counter = (Number(this.registers[to] === 0? 0:this.registers[to] || to)) - 1;
        }
    }, 'r', 'r|v'),
    new OperationConstructor('JCF', function (to) {
        if (this.registers.CF === 1) {
            this.counter = (Number(this.registers[to] === 0? 0:this.registers[to] || to)) - 1;
        }
    }, 'r|v'),
    new OperationConstructor('MRD', function (to, from) {
        this.registers[to] = Number(this.registers['R'+ Number(this.registers[from] === 0? 0:this.registers[from] || from)] || '0');
    }, 'r', 'r|v'),
    new OperationConstructor('MWR', function (to, from) {
        this.registers['R'+ Number(this.registers[to] === 0? 0:this.registers[to] || to)] = Number(this.registers[from] === 0? 0: this.registers[from] || from);
    }, 'r|v', 'r|v'),

];
function getOperationByString(input) {
    var string = input.replace(/\/\/.*/, ''),
        i,
        match;
    if (/^ *$/.test(string) || input.length === 0) {
        return function () {
            return null;
        };
    }
    for (i = 0; i < functionsArray.length; i++) {
        match = string.match(functionsArray[i].regExpr);
        if (match !== null) {
            return functionsArray[i].operationClosure(match[1], match[2]);
        }
    }
    return 'error';
}

app.factory('functions', function () {
    return {
        getOperationsData: function (input) {
            var arrayLines,
                i,
                funcToSet,
                hasInvalid,
                invalidFunctions = {},
                instructionSet = [];
            arrayLines = input.split('\n').map(function (lower) {return lower.toUpperCase(); });
            for (i = 0; i < arrayLines.length; i++) {
                funcToSet = getOperationByString(arrayLines[i]);
                if (funcToSet === 'error') {
                    hasInvalid = true;
                    invalidFunctions[i] = funcToSet;
                }
                instructionSet.push(funcToSet);
            }
            if (hasInvalid) {
                return {
                    invalidFunctions: invalidFunctions,
                    instructionSet: instructionSet
                };
            }
            return {
                instructionSet: instructionSet
            };
        }
    };
});