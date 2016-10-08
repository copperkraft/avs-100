app.controller('consoleInput', function ($scope) {
    $scope.inputText = '';
    $scope.input = function () {
        $scope.proc.input = $scope.inputText;
        $scope.inputText = '';
        $scope.proc.execute();
    };
});