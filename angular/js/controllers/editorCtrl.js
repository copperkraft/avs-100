app.controller('editorCtrl', function ($scope, $timeout, coreConstructor, functions) {
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
    $scope.textAreaScroll = function() {
        alert(111);
        document.querySelector('textarea').scrollTo( 0, 1000 );
    };
    $scope.proc = coreConstructor.processor('intel', 16);
    $scope.load();
    $scope.updateProgram();
});
