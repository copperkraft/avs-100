app.controller('editorCtrl', function ($scope, $timeout, coreConstructor, functions, $http) {
    $scope.localSave = '';
    $scope.lastDBSave = new Date();
    $scope.save = function (force) {

        localStorage[$scope.localSave] = $scope.codeText;
        var currentTime = new Date();


        if (force || currentTime.getTime() - $scope.lastDBSave.getTime() > 1000) {
            $http.post("php/AJAX_save_solution.php", {text: $scope.codeText, level: $scope.localSave}).success(function (answer) {
                $scope.response = answer;
                console.log(answer);
            });
            $scope.lastDBSave = new Date();
        }
    };
    $scope.load = function () {
        if (localStorage[$scope.localSave]) {
            $scope.codeText = localStorage[$scope.localSave];
        } else {
            $scope.codeText = "//input code here";
        }
        $http.post("php/AJAX_save_solution.php", {text: $scope.codeText, level: $scope.localSave}).success(function (answer) {
            $scope.response = answer;
            console.log(answer);
        });
    };
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
    $scope.proc = coreConstructor.processor('intel', 16);
});
