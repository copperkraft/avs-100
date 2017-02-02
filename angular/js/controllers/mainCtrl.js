app.controller('mainCtrl', function ($scope) {
    $scope.themes = ['dark', 'light', 'water', 'elite'];
    $scope.currentTheme = 3;
    $scope.changeTheme = function () {
        $scope.currentTheme = ($scope.currentTheme + 1) % $scope.themes.length;
    };
});