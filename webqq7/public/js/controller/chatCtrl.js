app.controller('chatCtrl', function($scope, $http, $filter) {
	$scope.$parent.newMessagesCache = {}; //未读消息缓存
	$scope.$parent.localMemeryHistroyCache = {}; //聊天历史记录缓存
	$scope.$parent.chatList = []; //会话列表 ，用作前台会话列表展示，其中项数据格式{t:最后聊天时间，m：最后一条信息内容，i:好友id}
	$scope.chatPanels = []; //聊天窗口数组，其中项数据格式{id：好友id，showingMessages：当前展示的聊天记录,skip:当前展示跳过多少条历史记录,hr:在哪条记录后面插入以上是历史纪录的分割线}
	/**
	 * 检查按键
	 * @param {KeyEvent} $event 按键事件
	 * @param {Object} panel  聊天窗口
	 */
	$scope.checkKey = function($event, panel) {
		if(($event.ctrlKey||$event.altKey)&& $event.keyCode == 13) {
			$scope.chatManager.say(panel)
		}
	}
	
	/**
	 * 聊天管理对象
	 */
	$scope.chatManager = {
		/**
		 * 每次加载历史记录的条数
		 */
		pageSize: 10,
		/**
		 * 获取本地历史记录缓存
		 * 优先从内存中取，内存中没有从浏览器的localStorage中取，还没有就返回空数组
		 * @param {Number} id 要查找本地历史记录的好友编号
		 */
		getLocalMemeryHistroy: function(id) {
			if($scope.localMemeryHistroyCache[id] == undefined) {
				//没有找到对应好友的聊天记录就去浏览器存储中查找，还是没有则初始化
				if(localStorage[$scope.mine.id + '_' + id]) {
					$scope.localMemeryHistroyCache[id] = JSON.parse(localStorage[$scope.mine.id + '_' + id]);
				} else {
					$scope.localMemeryHistroyCache[id] = [];
				}

			}
			return $scope.localMemeryHistroyCache[id];
		},
		/**
		 * 根据好友id获取新消息列表
		 * @param {Number} id 
		 */
		getNewMessage: function(id) {
			if($scope.newMessagesCache[id] == undefined) {
				$scope.newMessagesCache[id] = [];
			}
			return $scope.newMessagesCache[id];
		},
		/**
		 * 更新会话列表
		 * @param {Number} friendid   好友编号
		 * @param {String} message    最后一条消息内容
		 * @param {Number} time       时间戳
		 */
		updateCahtList: function(friendid, message, time) {
			//根据好友id查找会话列表，找到会话对象后更新，没有找到的话加入一个会话项
			var filterResult = $filter('filter')($scope.chatList, {
				i: friendid
			}, true); //调用angular过滤器的filter方法查找数组中所有匹配的
			if(filterResult.length > 0) {
				filterResult[0].m = message;
				filterResult[0].t = time;
			} else {
				$scope.chatList.push({
					t: time,
					m: message,
					i: friendid
				});
			}
		},
		/**
		 * 根据索引值删除聊天面板
		 * @param {Object} index
		 */
		deletePanel: function(index) {
				$scope.chatPanels.splice(index, 1); //splice函数用来处理数组，详见：http://www.w3school.com.cn/jsref/jsref_splice.asp
				//删除后，将当前聊天面板指定为剩下的第一个，没有就设为undefined
				if($scope.chatPanels.length > 0) {
					$scope.nowChatPanel = $scope.chatPanels[0];
				} else {
					$scope.nowChatPanel = undefined;
				}

		},
		/**
		 * 打开聊天窗
		 * @param {Number} friendid
		 * @param {Boolean} noNeedLoad   时候需要加载历史数据，不需要可以指定为true，未指定会在新打开聊天框是加载历史数据
		 */
		openChat: function(friendid, noNeedLoad) {
			var histroies = $scope.chatManager.getLocalMemeryHistroy(friendid); //获取该好友所有历史记录
			/**
			 * 前端写法: chatPanels|filter:{id:friendid}:true
			 */
			var filterResult = $filter('filter')($scope.chatPanels, {
				id: friendid
			}, true); //从聊天框数组中查找该好友的聊天框，没有找到的话在下面会做判断，创建一个。
			var created = false;
			var panel;
			if(filterResult.length == 0) {
				created = true;
				//判断没有找到，创建一个新的聊天窗口，created标志设为true
				panel = {
					id: friendid,
					skip: histroies.length,
					showingMessages: [],
					hr: $filter('orderBy')(histroies, ['s'])[histroies.length - 1]
				};
				$scope.chatPanels.push(panel);
				$scope.getInfoById(friendid, function() {}); //调用main中的获取好友信息方法更新好友信息
			} else {
				//找到了就把旧的拿来用
				panel = filterResult[0];
			}
			$scope.nowChatPanel = panel; //当前聊天面板指定为这个panel
			var hasnew = $scope.chatManager.LoadNewMessageToHistory(panel);//将新消息放入到该好友的聊天记录中
			if(!noNeedLoad&&created) {
				//首次打开，加载历史记录，该函数自带RefreshShowingMessages
				$scope.chatManager.setSkip(panel);
			}else{
				$scope.chatManager.RefreshShowingMessages(panel)
			}
			
		},
		/**
		 * 设置新的历史记录跳过条数，根据分页数累减到0为止
		 * @param {Object} panel
		 */
		setSkip: function(panel) {
			if(panel.skip - $scope.chatManager.pageSize >= 0) {
				panel.skip = panel.skip - $scope.chatManager.pageSize;
			} else {
				panel.skip = 0;
			}
			$scope.chatManager.RefreshShowingMessages(panel);
			//下面处理加载历史记录后滚动条回到之前内容的位置
			if($('#chatbox_' + panel.id).scrollTop() + $('#chatbox_' + panel.id).height() != $('#chatbox_' + panel.id).find('.message-wrap').innerHeight()) {
				var oldScrollTop=$('#chatbox_' + panel.id).scrollTop();
				var oldInnerHeight=$('#chatbox_' + panel.id).find('.message-wrap').innerHeight();
				setTimeout(function() {
					var newInnerHeight=$('#chatbox_' + panel.id).find('.message-wrap').innerHeight();
					var diff=newInnerHeight-oldInnerHeight;
					$('#chatbox_' + panel.id).scrollTop(oldScrollTop+diff);
				}, 1)
			}
		},
		/**
		 * 根据跳过条数，更新显示的消息列表
		 * @param {Object} panel
		 */
		RefreshShowingMessages: function(panel) {
			var histroies = $scope.chatManager.getLocalMemeryHistroy(panel.id);
			panel.showingMessages = $filter('orderBy')(histroies, ['s']).slice(panel.skip);//根据时间戳排序然后slice返回指定元素，slice详细见http://www.w3school.com.cn/jsref/jsref_slice_array.asp
			$scope.chatManager.scrollToBottom(panel);
		},
		/**
		 * 将新消息放入历史记录
		 * @param {Object} panel
		 */
		LoadNewMessageToHistory: function(panel) {
			
			var newMessages = $scope.chatManager.getNewMessage(panel.id); //获取该好友所有新消息
			var histroies = $scope.chatManager.getLocalMemeryHistroy(panel.id);
			var hasnew = newMessages.length > 0;
			var popitem = newMessages.pop();
			while(popitem) {
				histroies.push(popitem);
				popitem = newMessages.pop();
			}
			return hasnew;
		},
		/**
		 * 判断如果来消息的聊天框正好是当前聊天框，立即加载消息
		 * @param {Object} friendid
		 */
		LoadNewMessageIfActive: function(friendid) {
			if($scope.nowChatPanel && $scope.nowChatPanel.id == friendid) {
				$scope.chatManager.LoadNewMessageToHistory($scope.nowChatPanel);
				$scope.chatManager.RefreshShowingMessages($scope.nowChatPanel);
			}
		},
		/**
		 * 如果当前滚动条位于底部，1ms后再次滚动到底部
		 * @param {Object} panel
		 * @param {Boolean} awaly [true|false|undefined] 可选，true时强制滚动到底部
		 */
		scrollToBottom: function(panel, awaly) {
			//处理时使用setTimeout延迟1ms再设置滚动位置，要不内容还没生成，高度没变
			if(awaly) {
				setTimeout(function() {
					$('#chatbox_' + panel.id).scrollTop($('#chatbox_' + panel.id).find('.message-wrap').innerHeight())
				}, 1)
			} else if($('#chatbox_' + panel.id).scrollTop() + $('#chatbox_' + panel.id).height() >= $('#chatbox_' + panel.id).find('.message-wrap').innerHeight()) {
				setTimeout(function() {
					$('#chatbox_' + panel.id).scrollTop($('#chatbox_' + panel.id).find('.message-wrap').innerHeight())
				}, 1)
			}
		},
		/**
		 * 发送消息
		 * @param {Object} panel
		 */
		say: function(panel) {
			if(panel.message) {
				$scope.socket.emit('clientSay', {
					to: panel.id,
					message: panel.message
				});
				panel.message = '';
				$scope.chatManager.scrollToBottom(panel, true)
			}
		}
	};
	$scope.$on('openChat', function(event, data) {
		$scope.chatManager.openChat(data.id);
	})
	$scope.$on('reciveMessage', function(event, data) {
		var friendNewMessagePool = $scope.chatManager.getNewMessage(data.friend);
		friendNewMessagePool.push({
			s: data.time,
			m: data.message,
			t: data.type
		});
		$scope.getInfoById(data.friend, function() {});//调用main中的获取好友信息方法更新好友信息
		$scope.chatManager.updateCahtList(data.friend, data.message, data.time);
		$scope.chatManager.LoadNewMessageIfActive(data.friend);
	});
	/**
	 * 关闭窗口时，将历史记录重新下入浏览器存储中
	 */
	$scope.$on('unload', function(event, data) {
		try {
			for(var i in $scope.$parent.localMemeryHistroyCache) {
				localStorage[$scope.mine.id + '_' + i] = $filter('json')($scope.$parent.localMemeryHistroyCache[i]);
			}
		} catch(e) {
			for(var i in localStorage) {
				delete(localStorage[i]);
			}
		}

	});
});