// For category page

app.controller('categoryCtrl', function($scope) {
	$scope.items = clientItem;
	$scope.category = clientCat;
	
	
});

var showColor = function(color) {
        alert(color);
    } 