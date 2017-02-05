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
        "1": {
            codename: "simple output",
            inputArray: [],
            expectations: [55, 44, 23],
            description: "Первое задание предельно простое. Достаточно вывести три числа. Для этого вам понадобится команда OUT. Для того, чтобы вывести число 12 достаточно написать 'OUT 12' ",
            specification: "Выведите три числа с помощью команды OUT"
        },
        "2": {
            codename: "repeat output",
            inputArray: [],
            expectations: [55, 44, 23, 55, 44, 23, 55, 44, 23],
            description: "Одной из особенностей этого симулятора является то, что когда счетчик команд доходит до последней строки, выполнение программы продолжается с первой строки. Поэтому для выполения этого задания подойдет код, написанный к предыдущему.",
            specification: "Выведите три числа по три раза"
        },
        "3": {
            codename: "input output",
            inputArray: generateRandomArray(10),
            expectations: inputArray,
            description: "Настало время познакомиться с командой INP. Эта команда принимает один параметр - регистр памяти, в который она запишет значение, подаваемое на вход. Например, для того чтобы записать входное значение в регист R0 достаточно написать 'INP R0'. Для того, чтобы вывести число из регистра используйте 'OUT R0'",
            specification: "Выведите числа поданные на вход"
        },
        "4": {
            codename: "add",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2] + input[i*2+1]);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Одной из простейших арифметических операций является операция сложения. В симуляторе за сложение отвечает команда ADD. Она принимает 2 аргумента. В первый аргумент будет записана сумма двух аргументов. Например чтобы получить сумму R0 и R1 используйте 'ADD R0 R1'. ВНИМАНИЕ! ADD перезаписывает значение первого аргумента их суммой. Вы можете потерять данные первого аргумента.",
            specification: "Выведите сумму двух чисел, поданных на вход, по парам"
        },
        "5": {
            codename: "double",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 10; i++) {
                    output.push(input[i]*2);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Удваивать числа можно с помощью команды ADD с одинаковыми первым и вторым аргументом.",
            specification: "Выведите удвоенное число, поданное на вход"
        },
        "6": {
            codename: "add ten",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 10; i++) {
                    output.push(input[i] + 10);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Второй аргумент ADD может быть не только регистром, но и числом. Например, чтобы прибавить к R0 еденицу можно использовать 'ADD R0 1'",
            specification: "Выведите число, поданное на вход, увеличенное на 10"
        },
        "7": {
            codename: "mov as copy",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2] + input[i*2+1]);
                    output.push(input[i*2]);
                    output.push(input[i*2+1]);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Иногда необходимо скопировать значение из регистра в регистр. Для этих целей также используется команда MOV. Эта команда принимает два аргумента: куда копируем и откуда копируем. Так же с помощью этой команды в регистр можно записать число (в таком случае число пишется вместо второго аргумента)",
            specification: "Выведите сумму двух чисел, поданных на вход, по парам, а затем сами эти числа"
        },
        "8": {
            codename: "sub",
            inputArray: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2] + input[i*2+1]);
                    output.push(input[i*2+1]);
                }
                return output;
            }(generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }))),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2]);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Второй из простейших арифметических операций является операция вычитания. В симуляторе за вычитание отвечает команда SUB. Она принимает 2 аргумента. В первый аргумент будет записана разница первого и второго аргументов. Например чтобы разницу R0 и R1 используйте 'SUB R0 R1'. ВНИМАНИЕ! SUB перезаписывает значение первого аргумента. Вы можете потерять записанные там данные.",
            specification: "Выведите разницу двух чисел, поданных на вход, по парам"
        },
        "9": {
            codename: "jmp",
            inputArray: generateRandomArray(1),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 10; i++) {
                    output.push(input[0] + i);
                }
                return output;
            }(inputArray)),
            description: "До этого момента ваши программы (скорее всего) выполнялись линейно от начала до конца. Для того, чтобы переходить от одной строчки программы к другой можно использовать команду JMP. Например для того, чтобы перейти на третью строчку нужно использовать JMP 3. Если использовать команду JMP 3 последней строкой в программе, то 0, 1 и 2 строчки выполнятся по разу, а для остальных настанет 2 февраля. Кстати, аргументом JMP может быть не только число но и регистр.",
            specification: "Выведите десять последовательных чисел начиная от поданного на вход."
        },
        "10": {
            codename: "jez",
            inputArray: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2] + input[i*2+1]%2);
                    output.push(input[i*2]);
                }
                return output;
            }(generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }))),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2+1] % 2 == 0 ? 1 : 0);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Для того, чтобы реализовать условные переходы (переходы в зависимости от каких-либо условий) можно использовать команду JEZ. Ее название расшифровывается как \"jump equal zero\". У команды два аргумента. Первый аргумент - число, являющееся условием. Второй эквивалентен первому аргументу в команде JMP. Однако переход происходит только в том случае если оцениваемое число (условие) равняется 0.",
            specification: "Требуется оценить полученные числа попарно. Если числа равны, вывести 1, если не равны, вывести 0"
        },
        "11": {
            codename: "jez as cycle",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/15);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push(input[i*2] * input[i*2+1]);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/15);
            }))),
            description: "Кроме условных переходов команда JEZ позволяет реализовать циклы. Для этого необходимо число повторений цикла проверять на равенство нулю и каждый раз при выполнении отнимать единицу. В этом задании необходимо реализовать умножение используя только циклы и сложение.",
            specification: "Выведите произведение двух чисел, поданных на вход попарно"
        },
        "12": {
            codename: "sub2",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push((256+(input[i*2] - input[i*2+1]))%256);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "В предыдущем задании на вычитание первое число было всегда больше второго. Однако что будет в случае, если мы отнимем от меньшего большее? В симуляторе числа не могут хранить отрицательные числа (а также числа большие 255). Если результат получается меньше нуля, то к числу добавляется 256, а также в регистр CF заносится значение 1 на следующий ход.",
            specification: "Выведите результат выполнения команды SUB для двух чисел, поданных на вход попарно. Во время выполнения обращайте внимание на значение регистра CF"
        },
        "13": {
            codename: "jcf",
            inputArray: generateRandomArray(10).map(function (inp) {
                return Math.floor(inp/2);
            }),
            expectations: (function (input) {
                var output = [];
                for (var i = 0; i < 5; i++) {
                    output.push((256+(input[i*2] - input[i*2+1]))%256);
                }
                return output;
            }(inputArray.map(function (inp) {
                return Math.floor(inp/2);
            }))),
            description: "Команда JCF похожа по синтаксису на команду JMP за исключением того, что переход происходит в случае если значение CF равно еденице. Так как это значение сохраняется только на один ход, стоит использовать эту команду сразу после команды, способной изменить значение CF",
            specification: "Выведите абсолютную разницу двух чисел поданых на вход."
        },
        "18": {
            codename: "fibonacci",
            inputArray: [2, 3, 6, 4, 7],
            expectations: [1, 2, 8, 3, 13],
            description: "Числа фибоначчи - линейная рекуррентная последовательность натуральных чисел, где первое и второе равно единице, а каждое последующее — сумме двух предыдущих: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377… Выведите число фибоначчи, соответсвующее порядковому номеру в последовательности."
        }
    };
});