/**
 * Created by sunhangye on 17/5/18.
 */
define(['app','jquery','goTop','wow'],function(app,$,goTop,wow) {
    /*首页*/
    app.controller('homeController', function($scope, $location) {
        
        });
    /*游戏中心*/
    app.controller('gameController',function($scope) {
       
    });
    /*新闻活动*/
    app.controller('newsController',function($scope) {
        new WOW().init();
    });
    /*新闻详情*/
    app.controller('detailController',function($scope) {
        new WOW().init();
    });
    /*加入我们*/
    app.controller('joinController',function($scope) {
        new WOW().init();
    });
    /*下载页*/
    app.controller('downloadController',function($scope) {
        new WOW().init();
    });
    
    
});
