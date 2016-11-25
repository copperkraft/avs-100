app.controller('tasksInputOutput', function ($scope, levelSRV, $progress) {
    $scope.levels = levelSRV; //добавляем объект, полученный из сервиса выдачи уровней в область видимости
    $scope.complete = $progress;

    $scope.currentInput = 0;  //стартовое значение "указателя" ввода
    $scope.proc.resetEvents.push(function () { //подписываем обнуление указателя ввода на событие перезагрузки
        $scope.currentInput = 0;
    });
    $scope.proc.inputEvents.push(function () { //подписываем ввод из задания на событие ввода
        if (levelSRV[$progress.level].inputArray.length <= $scope.currentInput) { //превышение ввода
            $scope.proc.waiting = true;
            $scope.proc.locked = true;
            return;
        }
        $scope.proc.waiting = false; //выключаем ожидание процессора (оно было включено непосредственно в INP)
        $scope.proc.input = levelSRV[$progress.level].inputArray[$scope.currentInput];
        $scope.currentInput += 1;
    });
    $scope.proc.outputEvents.push(function () { //добавляем в событие вывода проверкку на совпадение с ожиданиями
        var i, len;
        if (levelSRV[$progress.level].expectations.length === $scope.proc.output.length) {
            for (i = 0, len = $scope.proc.output.length; i < len; i++) {
                if (levelSRV[$progress.level].expectations[i] !== $scope.proc.output[i]) {
                    $scope.proc.waiting = true;
                    $scope.proc.locked = true;
                    return;
                }
            }
            $progress.complete[$progress.level] = true;
            $progress.save();
        }
    });
})
    .factory('$progress', function () {
        var progress = 1;

        return  {level: 1};
    })
    .controller('levelator', function ($scope, $progress, levelSRV) {
        $scope.levels = levelSRV; //добавляем объект, полученный из сервиса выдачи уровней в область видимости
        $scope.progress = $progress;
        $scope.decrease = function () {
            $scope.proc.reset();
            $progress.level--;
            $scope.currentInput = 0;
        };
        $scope.increase = function () {
            $scope.proc.reset();
            $progress.level++;
            $scope.currentInput = 0;
        };
    });