app.controller("consoleInput", function ($scope) {
    "use strict";
    $scope.inputText = "";
    $scope.awaitingInput = false;
    $scope.proc.resetEvents.push(function () { //в случае перезапуска необходимо очистить поле ввода
        $scope.inputText = "";
    });
    $scope.input = function () {    //передаем переменной ввода значение поля ввода из представления и запускаем процессор
        $scope.proc.input = $scope.inputText; //TODO реализовать запоминание процессором состочния до остановки
        $scope.inputText = "";
        $scope.awaitingInput = false;
        $scope.step();
    };
    $scope.proc.inputEvents.push(function () { //событие ввода останавливает процессор до ввода числа пользователем
        $scope.proc.waiting = true;
        $scope.awaitingInput = true;
    });
    $scope.changeLocalSave('sandbox');
    $scope.load();
    $scope.updateProgram();
});
