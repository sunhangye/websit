define([], function () {
    return {
        /*重定向*/
        defaultRoute: '/index',
        routes: {
            'home': {
                templateUrl: 'views/home.html',
                url: '/index',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'gemeCenter': {
                templateUrl: 'views/game_center.html',
                url: '/gameCenter',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'newsActivity': {
                templateUrl: 'views/news_activity.html',
                url: '/newsActivity',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'joinUs': {
                templateUrl: 'views/join_us.html',
                url: '/joinus',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'aboutus': {
                templateUrl: 'views/about_us.html',
                url: '/aboutus',
                dependencies: [],
                allowAnonymous: true
            },
            
            'download_hn': {
                templateUrl: 'views/download/download_hn.html',
                url:'/download_hn',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'download_gd': {
                templateUrl: 'views/download/download_gd.html',
                url:'/download_gd',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'download_sx': {
                templateUrl: 'views/download/download_sx.html',
                url:'/download_sx',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'download_pdk': {
                templateUrl: 'views/download/download_pdk.html',
                url:'/download_pdk',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'download_hain': {
                templateUrl: 'views/download/download_hain.html',
                url:'/download_hain',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'news_green': {
                templateUrl: 'views/news/news_green.html',
                url:'/news_green',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'news_joy': {
                templateUrl: 'views/news/news_joy.html',
                url:'/news_joy',
                dependencies: ['controller/homeController'],
                allowAnonymous: true
            },
            'loseinself': {
                templateUrl: 'views/loseinself.html',
                    url:'/loseinself',
                    dependencies: [],
                    allowAnonymous: true
            }
        }
    };
});


