myApp.controller('RegistrationController', ['$scope', 'Authentication',
    function($scope, Authentication){
    
   
    $scope.login = function (){
         console.log('login')
       Authentication.login($scope.user);
    }
    $scope.logout = function (){
         console.log('logout')
       Authentication.logout();
    }
    $scope.register = function (){
       Authentication.register($scope.user);
    };
}]);