app.controller('consoleInput', function ($scope) {
    $scope.inputText = '';
    $scope.awaitingInput = false;
    $scope.proc.resetEvents.push(function () {
        $scope.inputText = '';
    });
    $scope.input = function () {
        $scope.proc.input = $scope.inputText;
        $scope.inputText = '';
        $scope.awaitingInput = false;
        $scope.step();
    };
    $scope.proc.inputEvents.push(function () {
        $scope.proc.waiting = true;
        $scope.awaitingInput = true;
    });
});
