app.controller('editInfoCtrl', ['$scope', '$http', function($scope,$http){
	
	/**
	 * 现代浏览器和iE10及以上使用构建FormData方式，IE10以下不支持FormData对象
	 */
	$scope.modensave=function(){
		var fd=new FormData();
		var file=document.querySelector('input[type=file]').files[0];
		fd.append("headshot",file);
		fd.append('nickname',$scope.copymine.nickname);
		fd.append('signature',$scope.copymine.signature);
		$http({
			method: "POST",
			url: '/editInfo',
			data: fd,
			headers: {'Content-Type': undefined}
		}).success(function(response){
			alert(response.result);
			$scope.updateMine();
			$("#modal-editinfo").modal('hide');
		})
	}
	
	
	/**
	 * 使用jquery.form插件，兼容IE
	 */
	$scope.save=function(){
		$('#form-editinfo').ajaxSubmit({
			url: '/editInfo',
			type: 'post',
			dataType: 'json',
			success: function(data){
				alert(data.result);
				$scope.updateMine();
				$("#modal-editinfo").modal('hide');
			}
		});
	}
	
	$scope.$on('showEditInfoDialog', function(){
		$scope.resetHeadshot=false;
		setTimeout(function(){
			$scope.resetHeadshot=true;//配合前台ng-if重新生成头像预览
			$scope.$apply();
		},1);
		$.extend($scope.copymine, $scope.mine);
		$("#modal-editinfo").modal('show');
	});
}]);
