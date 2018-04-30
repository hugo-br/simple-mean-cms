// angular app

var app = angular.module('app', []);

app.controller('menu', function($scope, $http) {
    $http.get("/api/categories/all/active")
    .then(function(response) {
        $scope.myCategories = response.data;
    });
});