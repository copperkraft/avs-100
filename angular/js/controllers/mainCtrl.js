app.controller('mainCtrl', function ($scope) {
    $scope.themes = ['dark', 'light', 'water'];
    $scope.currentTheme = 0;
    $scope.changeTheme = function () {
        $scope.currentTheme = ($scope.currentTheme + 1) % $scope.themes.length;
    };
});