//var app=angular.module('myApp',[]);
		/*app.controller("userlistCtrl",["$scope",function($scope){
			setTimeout(function(){
				$scope.groups=[{id:22, name:"我的好友"}, {id:2, name:"我的同事"}];
				setTimeout(function(){
					$scope.friends=[
						{id:1,groupid:22,nickname:"瓜皮",signature:"我是某某"},
						{id:2,groupid:22,nickname:"小叶子",signature:"我是某某"},
						{id:3,groupid:22,nickname:"刘小刀",signature:"我是某某"},
						{id:4,groupid:22,nickname:"大白",signature:"我是某某"},
						{id:5,groupid:2,nickname:"志玲姐姐",signature:"我是某某"},
						{id:6,groupid:2,nickname:"老李头",signature:"我是某某"},
						{id:7,groupid:2,nickname:"周老板",signature:"我是某某"}
					];
					$scope.$apply();
				});
			}, 100);
		}]);
		 */
		
app.controller("userlistCtrl", function($scope) {
	$.get('/groups', {}, function(data){
		if(data.success){
			console.log(data.result);
			$scope.$parent.groups=data.result;
			$scope.$apply();//异步设置作用域数据后调用$apply()让他生效
			//获取好友
			$.get('/friends', {}, function(fdata){
				if(fdata.success){
					$scope.friends=fdata.result;
					$scope.$apply();//异步设置作用域数据后调用$apply()让他生效
				}
			});
		}else{
			location.href="/login";
		}
	});
	$scope.dbclick=function(){
		$event.preventDefault();
		alert();
	}
	$scope.showGroupContextMenu=function(event,group){
		if(group==$scope.editingGroup){
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		$scope.$parent.selectGroup=group;
		event.preventDefault();
		event.stopPropagation();
		$('#groupdropdown').show().offset({top:event.pageY,left:event.pageX});
		$('#addgroupdropdown').hide();
	}
	$scope.showAddGroupContextMenu=function(event){
		event.preventDefault();
		event.stopPropagation();
		if(!$scope.editingGroup){
			event.preventDefault();
			event.stopPropagation();
			$('#addgroupdropdown').show().offset({top:event.pageY,left:event.pageX});
			$('#groupdropdown').hide();
		}
 	}
	$scope.$on('editGroup',function(data){
		
		if(!$scope.editingGroup){
			if($scope.selectGroup){
				$scope.editingGroup=$scope.selectGroup;
			}
		}
	})
});







