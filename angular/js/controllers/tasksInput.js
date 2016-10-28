app.controller('tasksInputOutput', function ($scope) {
    $scope.level = 1;
    $scope.inputArray = [4, 0, 5, 3];
    $scope.expectations = [0, 15];
    $scope.description = 'Смотрите, тут описание задания. Самые первые изучаемые команды это INP и OUT.' +
        'Они отвечают за получение и вывод информации. В первом задании необходимо прочитать бла бля...';
    $scope.reality = [];
    $scope.currentInput = 0;
    $scope.inputText = '';
    $scope.stop.stopEvents.push(function () {
        $scope.currentInput = 0;
    });
    $scope.proc.inputEvents.push(function () {
        if ($scope.inputArray.length <= $scope.currentInput) {
            $scope.proc.waiting = true;
            return;
        }
        $scope.proc.waiting = false;
        $scope.proc.input = $scope.inputArray[$scope.currentInput];
        $scope.currentInput += 1;
    });
    $scope.proc.outputEvents.push(function () {

    });
});