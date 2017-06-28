app.controller('confirmFriendCtrl', ["$scope", "$http", function($scope,$http){
	$scope.$on("showConfirmFriendDialog", function(){
		$scope.confirmInfo=$scope.friendRequests.pop();
		if($scope.confirmInfo){
			alert($scope.confirmInfo.from);
			$scope.getInfoById($scope.confirmInfo.from, function(err, userinfo){
				if(!err){
					$scope.pass='true';
					$scope.group=$scope.groups[0];
					$scope.remark="";
					$('#modal-confirmfriend').modal('show');
				}
			});
		}
	});
	
	$scope.confirmResult=function(){
		$http.post('/confirmFriend',
		{
			id: $scope.confirmInfo.id,
			pass: $scope.pass,
			remark: $scope.remark, 
			groupid: $scope.group.id
		}).success(function(data){
			$('#modal-confirmfriend').modal('hide');
		});
	};
}]);




