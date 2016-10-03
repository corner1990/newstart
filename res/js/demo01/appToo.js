(function(angular){
	/*
	*应用程序主要模块
	*/
	var myApp = angular.module('MyTodoMvc',['ngRoute']);
	// 路由的配置
	myApp.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/:status?',{
				controller: 'MainController',
				templateUrl:'mainTemplate'
			})
			.otherwise({ redirectTo: '/' });
	}]);
	// // 路由配置
	//   myApp.config(['$routeProvider', function($routeProvider) {
	//     $routeProvider
	//     // /asdasda {status:asdasda}
	//       .when('/:status?', {
	//         controller: 'MainController',
	//         templateUrl: 'main_tmpl'
	//       })
	//       .otherwise({ redirectTo: '/' });
	//   }]);
	// 注册一个主要控制器
	myApp.controller('MainController',['$scope','$routeParams','$route',function($scope,$routeParams,$route){
		
		// 文本框需要一个模型

		$scope.text = '';
		// 用来判断是否显示编辑框
		$scope.currentEditingId = -1;
		// 任务列表也需要一个
		//每一个任务的结构{id ：，1text：‘学习’。completed：true} 做程序，每个数据都要加一个ID
		$scope.todos= [
			{id:getId(),text:'学习',completed:false},
			{id:getId(),text:'睡觉',completed:false},
			{id:getId(),text:'打豆豆',completed:true}
		];

		//添加todo
		$scope.add = function(){
			if(!$scope.text){
				return;
			}
			$scope.todos.push({
				// 让id自动增长
				id : getId(),
				// 由于$scope是双向数据绑定 可以通过他拿到页面上的输入值
				text : $scope.text,
				completed : false 
			});
			// 清空一下文本框
			$scope.text = '';
		}
		// 删除
		$scope.remove = function(id){console.log(id)
			// 删除谁
			for(var i=0;i<$scope.todos.length;i++){
				if($scope.todos[i].id === id){
					//$scope.todos.splice(i,1);
					$scope.todos.splice(i,1);
					break;
				}
			}
		}

		// [1,2,3,4,5]
	    function getId() {
	      var id = Math.random(); 
	      return id;
	    }

	    // 清除已完成
	    $scope.clear=function(){
	    	for(var i = $scope.todos.length-1;i>-1;i--){
	    		if($scope.todos[i].completed){
					$scope.todos.splice(i,1);
				}
	    	}
	    }
	    //按钮显示隐藏判断
	    $scope.existCompleted=function(){
	    	for(var i=0;i<$scope.todos.length;i++){
	    		if($scope.todos[i].completed){
					return true;
				}
	    	}
			return false;
	    }

	    //双击实现编辑
	    // $scope.editing=function(id){
	    // 	$scope.currentEditingId = id;
	    // }
	    $scope.editing = function(id) {
	      $scope.currentEditingId = id;
	    };

	    $scope.save = function() {
	      $scope.currentEditingId = -1;
	    };

	    // 实现全选功能
	    var now = true;
	    $scope.toggleAll = function(){
	    	for(var i=0;i<$scope.todos.length;i++){
	    		$scope.todos[i].completed = now;
	    	}
			now =!now ;
	    }

	    // 实现选择性内容呈现
	    $scope.selected = {};
	    //点击事件的方式不合适，有DOM操作
	    var status = $routeParams.status;
	    	switch(status){
	    		case 'active':
	    			$scope.selected = {completed:false};
	    		break;
	    		case 'completed':
	    			$scope.selected = { completed: true};
	    		break;
	    		case '':
	    			$route.updateParams({ status: '' });
          			$scope.selector = {};
	    		break;
	    	}
	    // 自定义比较函数
	    $scope.equalComplare = function(source,target){
	    	// angular自带的匹配是模糊匹配 有时候需要我们自定义匹配规则
	    	return source === target;
	    }
	}])

})(angular)