/**
 * Created by sunhangye on 17/5/18.
 */
define(['app','jquery','goTop','wow','focusimg'],function(app,$,goTop,wow) {
    /*首页*/
    app.controller('homeController', function($scope, $rootScope) {

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        $(document).ready(function() {
             $(".slides").focusimg()
            picAutoHeight();
        })

        resize()
        function picAutoHeight(){
            var w = $('body').width();
            if (w>=1000){
                var h = Math.ceil(532*(w/1920))
            }else{
                var h = Math.ceil(700*(1000/1920))
            }
            $('#pic-scroll').height(h);
        };
        function resize(){
            $(window).resize(function(){
                picAutoHeight();
            });
        };

    });
    /*游戏中心*/
    app.controller('gameController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });


    });
    /*关于我们*/
    app.controller('aboutController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    });
    /*新闻活动*/
    app.controller('newsController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });


    });

    /*新闻详情*/
    app.controller('detailController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    });
    /*加入我们*/
    app.controller('joinController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });

        var li = $(".menu li")
        li.click(function() {
            $(this).addClass('choose').siblings().removeClass('choose');
            var index = li.index(this);
            $('.list>div').eq(index).removeClass('hide').siblings().addClass('hide');
        })


    });
    /*下载页*/
    app.controller('downloadController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
    });
    /*家长监护*/
    app.controller('parentController',function($scope,$rootScope) {
        new WOW().init();

        $rootScope.$on('$stateChangeSuccess', function() {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        var li = $(".menu li")
        li.click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            var index = li.index(this);
            $('.list>article').eq(index).removeClass('hide').siblings().addClass('hide');
        })

    });


});
