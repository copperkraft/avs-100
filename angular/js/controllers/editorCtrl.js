app.controller('sandboxCtrl', function ($scope, $timeout, coreConstructor, functions) {
    $scope.test = 0;
    $scope.saveAs = function (saveName) {
        localStorage.saves = localStorage.saves || [];
        localStorage.saves[saveName] = $scope.codeText;
    };
    $scope.loadSave = function (saveName) {
        localStorage.saves = localStorage.saves || [];
        $scope.codeText = localStorage.saves[saveName] || '//код суда';
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
        if ($scope.proc.locked) {
            return;
        }
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
    $scope.proc = coreConstructor.processor('intel', 16);
    if (window.localStorage) {
        $scope.codeText = window.localStorage.textArea || '//код писать сюда';
        $scope.updateProgram();
    } else {
        $scope.codeText = '';
        $scope.updateProgram();
    }
});