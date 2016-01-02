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

        .state('recipes', {
            url: '/recipes',
            views: {
                header: {
                    templateUrl: '/templates/_common/templates/header.tmpl.html',
                },
                content: {
                    templateUrl: '/templates/recipes/recipes.view.html',
                },
                footer: {
                    templateUrl: '/templates/_common/templates/footer.tmpl.html',
                }
            },
            redirectTo: 'recipes.index'
        })

            .state('recipes.index', {
                url: '',
                views: {
                    recipes: {
                        templateUrl: '/templates/recipes/index/index.view.html',
                        controller: 'RecipesController',
                        controllerAs: 'recipes',
                        resolve: {
                            categoryName: function() {
                                return '';
                            }
                        }
                    }
                }
            })

            .state('recipes.categories', {
                url: '/category/:categoryName',
                views: {
                    recipes: {
                        templateUrl: '/templates/recipes/index/index.view.html',
                        controller: 'RecipesController',
                        controllerAs: 'recipes',
                        resolve: {
                            categoryName: ['$stateParams', '$state', function($stateParams, $state){
                                if(!$stateParams.categoryName) {
                                    $state.go('recipes');
                                }  else {
                                    return $stateParams.categoryName;
                                }                               
                            }]
                        }
                    }
                }
            })

            .state('recipes.create', {
                url: '/create',
                views: {
                    recipes: {
                        templateUrl: '/templates/recipes/create/create.view.html',
                        controller: 'RecipesCreateController',
                        controllerAs: 'createrecipe'
                    }
                },
                sp: {
                    authenticate: true
                }
            })

            .state('recipes.view', {
                url: '/view/:recipeId',
                views: {
                    recipes: {
                        templateUrl: '/templates/recipes/view/view.view.html',
                        controller: 'RecipesViewController',
                        controllerAs: 'viewrecipe',
                        resolve: {
                            recipeId: ['$stateParams', '$state', function($stateParams, $state){
                                if(!$stateParams.recipeId) {
                                    $state.go('recipes');
                                }  else {
                                    return $stateParams.recipeId;
                                }                               
                            }]
                        }
                    }
                }
            })

            .state('recipes.edit', {
                url: '/edit/:recipeId',
                views: {
                    recipes: {
                        templateUrl: '/templates/recipes/edit/edit.view.html',
                        controller: 'RecipesEditController',
                        controllerAs: 'editrecipe',
                        resolve: {
                            recipeId: ['$stateParams', '$state', function($stateParams, $state){
                                if(!$stateParams.recipeId) {
                                    $state.go('recipes');
                                }  else {
                                    return $stateParams.recipeId;
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