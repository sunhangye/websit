require.config({
	//配置总路径
	baseUrl : "js/scripts",

	paths : {
		// 其他模块会依赖他
		'ui.route':'../lib/angular-ui-router.min',
		'angular' : '../lib/angular.min',
		'angular-route' : '../lib/angular-route.mim',
		'angularAMD' : '../lib/angularAMD',
		
		'jquery' : '../lib/jquery-3.1.1.min',
		
		'ngload':'../lib/angular-plugins/ngload',
		 
		'focusimg':'../lib/focusimg',
		'goTop': '../lib/goTop',
		'wow':'../lib/wow'
		
	},

	shim : {
		// 表明该模块依赖angular
		'angularAMD' : [ 'angular'],
		'angular-route' : [ 'angular'],
		'ui.route':['angular'],
		
        'focusimg':{
            deps: ["jquery"],
            exports: 'focusimg'
        },
        'goTop':{
            deps: ["jquery"],
            exports: 'goTop'
        },
		'wow':{
            deps: ["jquery"],
			exports: 'wow'
		}
		
	},
	urlArgs : "v=" + new Date().getTime(),
	// 启动程序 js/scripts/app.js
	deps : [ 'app' ]
});



