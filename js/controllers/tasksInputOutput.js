app.controller('tasksInputOutput', function ($scope, levelSRV, $progress) {
    $scope.levels = levelSRV; //добавляем объект, полученный из сервиса выдачи уровней в область видимости
    $scope.levelProgress = $progress;

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
                if (levelSRV[$progress.level].expectations[i] !==  Number($scope.proc.output[i])) {
                    $scope.proc.waiting = true;
                    $scope.proc.locked = true;
                    return;

                }
            }
            $progress.finished[$progress.level] = true;
            console.log( $progress.finished[$progress.level]);
            localStorage.progress = JSON.stringify($progress); //запись в локальный прогресс. перенести бы его в серивис
            console.log(localStorage.progress);
            // TODO пользователи
            $scope.proc.waiting = true;
            $scope.proc.locked = true;
        }
    });
})
    .factory('$progress', function () {  //объект медиатор, хранящий прогресс
        var progress =  {level: 1, finished: {}}; //загрузка объекта по умолчанию
        if (localStorage.progress) { //если у нас есть сохраненный прогресс, то загружаем его
            progress = JSON.parse(localStorage.progress);
        }
        return progress;
    })
    .controller('levelator', function ($scope, $progress, levelSRV) {
        $scope.levels = levelSRV; //добавляем объект, полученный из сервиса выдачи уровней в область видимости
        $scope.progress = $progress;
        $scope.changeLocalSave("tutorial-" + $progress.level);
        $scope.load();
        $scope.updateProgram();
        $scope.decrease = function () {
            $scope.save(true);
            $scope.proc.reset();
            $progress.level--;
            localStorage.progress = JSON.stringify($progress);
            $scope.currentInput = 0;
            $scope.changeLocalSave("tutorial-" + $progress.level);
            $scope.load();
            $scope.updateProgram();
        };
        $scope.increase = function () {
            $scope.save(true);
            $scope.proc.reset();
            $progress.level++;
            localStorage.progress = JSON.stringify($progress);
            $scope.currentInput = 0;
            $scope.changeLocalSave("tutorial-" + $progress.level);
            $scope.load();
            $scope.updateProgram();
        };
    });