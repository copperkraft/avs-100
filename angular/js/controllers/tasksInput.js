app.controller('tasksInputOutput', function ($scope) {
    $scope.inputArray = [ 12, 10, 4, 10, 12, 9, 0];
    $scope.currentInput = 0;
    $scope.inputText = '';
    $scope.stop.stopEvents.push(function () {
        $scope.currentInput = 0;
    });
    $scope.proc.inputEvent.push(function () {
        if ($scope.inputArray.length <= $scope.currentInput) {
            $scope.step();
        }
        $scope.proc.input = $scope.inputArray[$scope.currentInput];
        $scope.currentInput += 1;
    });
});