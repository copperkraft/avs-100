/**
 * Created by Владимир on 07.02.2017.
 */
app.controller('singleLevelCtrl', function ($scope, $timeout, coreConstructor, functions) {
    $scope.save = function () {
        localStorage[$scope.localSave] = $scope.codeText;
    };
    $scope.load = function () {
        if (localStorage[$scope.localSave]) {
            $scope.codeText = localStorage[$scope.localSave];
        } else {
            $scope.codeText = "//input code here";
        }
    };
    $scope.localSave = '';
    $scope.changeLocalSave = function(name) {
        $scope.localSave = name;
    };
    $scope.stop = function () {
        if ($scope.proc.started) {
            $scope.proc.reset();
            $scope.played = false;
        } else {
            $scope.codeText = '';
            $scope.updateProgram();
        }
    };
    $scope.step = function () {
        if ($scope.proc.operationsData.invalidFunctions) {return}
        if ($scope.played) {
            $scope.played = false;
        } else {
            if ($scope.proc.locked) {
                return;
            }
            $scope.proc.execute();
        }
    };
    $scope.play = function () {
        if ($scope.proc.operationsData.invalidFunctions) {return}
        if ($scope.proc.locked) {
            return;
        }
        $scope.played = true;
        $scope.proc.execute();
        $timeout($scope.player, 100);
    };

    $scope.player = function () {
        if ($scope.played === true) {
            if ($scope.proc.waiting === true) {
                $scope.played = false;
                return;
            }
            $scope.proc.execute();
            $timeout($scope.player, 100);
        }
    };
    $scope.updateProgram = function () {
        $scope.save();
        $scope.proc.reset();
        $scope.played = false;
        $scope.proc.operationsData = functions.getOperationsData($scope.codeText);
    };
    $scope.isFalse = function (index) {
        if ($scope.proc.operationsData.invalidFunctions) {
            return $scope.proc.operationsData.invalidFunctions[index];
        }
        return false;
    };
    $scope.proc = coreConstructor.processor('intel', 256);
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
});
