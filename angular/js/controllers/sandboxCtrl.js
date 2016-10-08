app.controller('sandboxCtrl', function ($scope, $timeout, coreConstructor, functions) {

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
        if ($scope.played) {
            $scope.played = false;
        } else {
            $scope.proc.execute();
        }
    };
    $scope.play = function () {
        $scope.played = true;
        $scope.proc.execute();
        $timeout($scope.player, 200);
    };

    $scope.player = function () {
        if ($scope.played === true) {
            if ($scope.proc.waiting === true) {
                $scope.played = false;
                return;
            }
            $scope.proc.execute();
            $timeout($scope.player, 200);
        }
    };
    $scope.updateProgram = function () {
        window.localStorage.textArea = $scope.codeText;
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
    $scope.proc = coreConstructor.processor('intel', 8);
    if (window.localStorage) {
        $scope.codeText = window.localStorage.textArea;
        $scope.updateProgram();
    } else {
        $scope.codeText = '';
        $scope.updateProgram();
    }
});