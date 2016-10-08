app.filter('strNum', function () {
    return function (param) {
        if (param < 10) {
            return '0' + param;
        }
        return param;
    };
});
app.filter('hex', function () {
    return function (param) {
        //var output = parseInt(param, 10).toString(2);
        /*if (param < 16) {
         output = '0' + output;
         }*/
        return parseInt(param, 10).toString(10);
    };
});