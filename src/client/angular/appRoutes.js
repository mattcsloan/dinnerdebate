angular.module('appRoutes', []).config(['$stateProvider', '$locationProvider', '$urlRouterProvider', function($stateProvider, $locationProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider

        .state('home', {
            url: '/',
            views: {
                header: {
                    templateUrl: '/templates/_common/templates/header.tmpl.html',
                },
                content: {
                    templateUrl: '/templates/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                },
                footer: {
                    templateUrl: '/templates/_common/templates/footer.tmpl.html',
                }
            }
        })

        .state('dashboard', {
            url: '/dashboard',
            views: {
                header: {
                    templateUrl: '/templates/_common/templates/header.tmpl.html',
                },
                content: {
                    templateUrl: '/templates/dashboard/dashboard.view.html',
                    controller: 'DashboardController',
                    controllerAs: 'dashboard'
                },
                footer: {
                    templateUrl: '/templates/_common/templates/footer.tmpl.html',
                }
            },
            sp: {
                authenticate: true
            }
        })

        .state('posts', {
            url: '/posts',
            views: {
                header: {
                    templateUrl: '/templates/_common/templates/header.tmpl.html',
                },
                content: {
                    templateUrl: '/templates/posts/posts.view.html',
                },
                footer: {
                    templateUrl: '/templates/_common/templates/footer.tmpl.html',
                }
            },
            redirectTo: 'posts.index'
        })

            .state('posts.index', {
                url: '',
                views: {
                    posts: {
                        templateUrl: '/templates/posts/index/index.view.html',
                        controller: 'PostsController',
                        controllerAs: 'posts'
                    }
                }
            })

            .state('posts.create', {
                url: '/create',
                views: {
                    posts: {
                        templateUrl: '/templates/posts/create/create.view.html',
                        controller: 'PostsCreateController',
                        controllerAs: 'createpost'
                    }
                },
                sp: {
                    authenticate: true
                }
            })

            .state('posts.view', {
                url: '/view/:postId',
                views: {
                    posts: {
                        templateUrl: '/templates/posts/view/view.view.html',
                        controller: 'PostsViewController',
                        controllerAs: 'viewpost',
                        resolve: {
                            postId: ['$stateParams', '$state', function($stateParams, $state){
                                if(!$stateParams.postId) {
                                    $state.go('posts');
                                }  else {
                                    return $stateParams.postId;
                                }                               
                            }]
                        }
                    }
                }
            })

            .state('posts.edit', {
                url: '/edit/:postId',
                views: {
                    posts: {
                        templateUrl: '/templates/posts/edit/edit.view.html',
                        controller: 'PostsEditController',
                        controllerAs: 'editpost',
                        resolve: {
                            postId: ['$stateParams', '$state', function($stateParams, $state){
                                if(!$stateParams.postId) {
                                    $state.go('posts');
                                }  else {
                                    return $stateParams.postId;
                                }                               
                            }]
                        }
                    }
                },
                sp: {
                    authenticate: true
                }
            })

        .state('login', {
            url: '/login',
            views: {
                header: {
                    templateUrl: '/templates/_common/templates/header.tmpl.html',
                },
                content: {
                    templateUrl: '/templates/login/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                },
                footer: {
                    templateUrl: '/templates/_common/templates/footer.tmpl.html',
                }
            }
        })

        .state('register', {
            url: '/register',
            views: {
                header: {
                    templateUrl: '/templates/_common/templates/header.tmpl.html',
                },
                content: {
                    templateUrl: '/templates/register/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'register'
                },
                footer: {
                    templateUrl: '/templates/_common/templates/footer.tmpl.html',
                }
            }
        })

        .state('logout', {
            url: '/logout',
            external: true
        })

        ;

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);