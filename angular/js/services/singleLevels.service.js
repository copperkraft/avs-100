app.factory("levelSRV", function () { //TODO переписать на получение JSON или генерацию в
    "use strict";
    var inputArray = [];
    function generateRandomArray(count) {
        inputArray = [];
        for (var i = 0; i < count; i++) {
            inputArray[i] = Math.floor(Math.random()*250);
        }
        return inputArray;
    }

    return {
        "fibonacci": {
            name: "Числа фибоначчи по порядку",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/13);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 10; i++) {
                    output.push([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233][input[i]]);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/13);
            }))),
            description: "Числа фибоначчи - линейная рекуррентная последовательность натуральных чисел, где первое и второе равно единице, а каждое последующее — сумме двух предыдущих: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377…",
            specification: "Выведите число фибоначчи, соответсвующее порядковому номеру в последовательности, поданному на вход."
        }
    };
});