app.controller('mainCtrl', function ($scope) {
    $scope.themes = ['dark', 'light', 'water', 'elite'];
    $scope.currentTheme = localStorage["theme"] || 0;
    $scope.changeTheme = function () {
        $scope.currentTheme = ($scope.currentTheme + 1) % $scope.themes.length;
        localStorage["theme"] = $scope.currentTheme;
    };
});