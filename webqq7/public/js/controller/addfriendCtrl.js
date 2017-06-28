app.controller('addFriendCtrl', function($scope, $http){
	$scope.step=1;
	$scope.kw="";
	
	var resetStaus=function(){
		$scope.selectItem=undefined;
		$scope.step=1;
		$scope.items=undefined;
		$scope.kw="";
	};
	
	$scope.$on('showAddFriendDialog',function(event){
		resetStaus();
		$('#modal-searchfriend').modal("show");
	});
	
	$scope.setInfo=function(){
		$scope.step=2;
		$scope.group=$scope.groups[0];
		$scope.remark=undefined;
		$scope.message=undefined;
	};
	
	$scope.select=function(item){
		console.log(item);
		$scope.selectItem=item;
	};
	
	$scope.search=function(){
		$http.post('/searchFriends', {kw: $scope.kw}).success(function(data){
			$scope.items=data.result;
		});
	};
	
	$scope.send=function(){
		$http.post('/addFriend',
			{remark: $scope.remark,
			groupid: $scope.group.id,
			message: $scope.message,
			to: $scope.selectItem.id}).success(function(data){
				if(data.success){
					alert(data.message);
				}
				$("#modal-searchfriend").modal("hide");
			});
	};
});