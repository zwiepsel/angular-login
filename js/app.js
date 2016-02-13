var myApp = angular.module('myApp',['ngRoute','firebase'])
.constant('FIREBASE_URL', 'http://login-angular.firebaseio.com/');

myApp.run(['$rootScope','$location', function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(event, next, previous, error){
        if(error='AUTH_REQUIRED') {
            $rootScope.message = 'You must to be logged in to view this';
            $location.path('/login')
        }
    })
}]);

myApp.config(['$routeProvider', function($routeProvider){
    
    $routeProvider.
        when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        }).
        when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        }).
        when('/success', {
            templateUrl: 'views/success.html',
            controller: 'SuccessController',
            resolve: {
                currentAuth: function(Authentication){
                    return Authentication.requireAuth();
                }
            }
        }).
        otherwise({
            redirectTo:'/login'
        });
}]);

