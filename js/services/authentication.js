myApp.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL',
  function($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL){
   
    var ref = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(ref);
    auth.$onAuth(function(authUser) {
        if (authUser) {
            var userRef = new Firebase(FIREBASE_URL + 'users/' + 
            authUser.uid);
            var userObj = $firebaseObject(userRef);
            $rootScope.currentUser = userObj;
        } else {
            $rootScope.currentUser = '';
        }
    }) ; 
      
    var myObject =  {
     login: function(user) {
        auth.$authWithPassword({
            email: user.email,
            password: user.password
        }).then(function(regUser){
            console.log('success')
            $location.path('/success');
        }).catch(function(error){
            $rootScope.message = error.message;
        });
     },
     
     logout: function(){
         return auth.$unauth();              
     },
     
     requireAuth: function(){
       return auth.$requireAuth();  
     },
     
     register:function(user) {
        auth.$createUser({
        email: user.email,
        password: user.password
    }).then(function(regUser){
        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
         regUser: regUser.uid,
         date: Firebase.ServerValue.TIMESTAMP,
         firstname: user.firstname,
         lastname: user.lastname ,
         email: user.email
         
        }); //user info
        myObject.login(user);
    }).catch(function(error){
        $rootScope.message = error.message; 
    });
     }  
    }; 
    return myObject;
  }]);



