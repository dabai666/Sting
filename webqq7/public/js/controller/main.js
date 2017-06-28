var app = angular.module("myApp", []);

//添加分组
app.directive('myContextmenu',function($parse){
	return {
		link:function(scope,element,attrs){
			element.on('contextmenu',function(event){
				var fn=$parse(attrs.myContextmenu);
				fn(scope,{event:event});
			});	
		}
	}
});
app.filter('jdate', function () {
    return function (input) {
        var out = "";
        try {
            var date = new Date(parseInt(input, 10));
            out = date;
        } catch (e) {
        }
        return out;
    }
})
app.filter('newmessagecount', function () {
    return function (input) {
        var count=0;
       for(var i in input){
    	  count+=input[i].length;
       }
       return count;
    }
})
app.filter('getDate', function () {
    return function (input) {
        var out = "";
        try {
                out = input.getDate();
        } catch (e) {
        }
        return out;
    }
})
app.controller("mainCtrl",["$scope","$http","$filter",function($scope,$http,$filter){
	window.onbeforeunload=function(){
		$scope.$broadcast('unload');
	}
	$(document).bind('click',function(){
		$('#groupdropdown,#addgroupdropdown').hide();
	})
	
	$scope.friendRequests=[];
	$scope.infoCache={};
	$scope.updateMine=function(){
		$.ajax({
			url:'/mine',
			async:false,//阻塞后面代码
			type:'post',
			success:function(data){
				$scope.mine=data.result;
			}
		})
	}
	$scope.updateMine();
	$scope.showConfirmFriendDialog=function(){
		$scope.$broadcast('showConfirmFriendDialog');
	}
	$scope.showAddFriendDialog=function(){
		$scope.$broadcast('showAddFriendDialog');
	}
	$scope.showEditInfoModal=function(){
		$scope.$broadcast('showEditInfoDialog');
	}
	$scope.removegroup=function(){
		$scope.$broadcast('removeGroup');
	}
	$scope.editgroup=function(){
		$scope.$broadcast('editGroup');
	}
	$scope.addgroup=function(){
		$scope.$broadcast('addGroup');
	}
	$scope.openChat=function(id){
		
		$scope.$broadcast('openChat',{id:id});
	}
	var socket=io.connect('/connect');
    $scope.socket=socket;
	socket.on('friendRequest',function(data){
		$scope.friendRequests.push(data);
		$scope.$apply();
	});
	
	socket.on('addFriend',function(data){
		$scope.friends.push(data);
		$scope.$apply();
	})
	socket.on('say',function(data){
		$scope.$broadcast('reciveMessage', data);
		$scope.$apply();
	})
	socket.on('nologin',function(data){
	location.href="/login"
	})
	$scope.getInfoById=function(id,callback){
		if($scope.infoCache[id]){
			//缓存中有数据，直接调用回掉函数
			callback(undefined,$scope.infoCache[id]);
		}else{
			//没有则异步获取，加入缓存后回调
			$http.post('/getUserInfoById',{id:id},'json').success(function(data){
				if(data.success&&data.result.length>0){
					$scope.infoCache[id]=data.result[0];
					callback(undefined,$scope.infoCache[id]);
				}else{
					callback({messge:'没有找到对应的用户数据'},undefined);
				}
				
			})
		}
	}
}])
