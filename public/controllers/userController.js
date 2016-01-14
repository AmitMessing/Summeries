mainApp.controller('userController',['$scope','$state','$resource','userService', function ($scope, $state,$resource, userService) {
    var user = userService.getLoggedUser();
    if(user != null)
    {
        $scope.user = JSON.parse(user);
    }else {
        $scope.user = undefined;
    }
    $scope.error = "";
    $scope.loginDetails = {
        userName: "",
        password: ""
    };
    var validateLoginFields = function(){
        if($scope.loginDetails.userName === "" || $scope.loginDetails.userName === undefined ||
            $scope.loginDetails.password === "" || $scope.loginDetails.password === undefined)
        {
            $scope.error = "נא למלא את כל השדות";
            return false;
        }
        return true;
    };
    var validateFields = function(){
      if($scope.user.userName === "" || $scope.user.userName === undefined ||
          $scope.user.firstName === "" || $scope.user.firstName === undefined ||
          $scope.user.lastName === "" ||  $scope.user.lastName === undefined ||
          $scope.user.email === "" || $scope.user.email === undefined ||
          $scope.user.password === "" || $scope.user.password === undefined)
      {
         $scope.error = "נא למלא את כל השדות";
          return false;
      }
        return true;
    };

    $scope.deleteUser = function(){
       var query = $resource('/deleteUser/:id', {id:$scope.user._id},
            {
                deleteUser:
                {
                    method: 'DELETE'
                }
            });
        query.deleteUser(function(){
            userService.setLoggedUSer(null);
            $state.go('home')
        },function(){

        });
    };

    $scope.login = function (){
        if(validateLoginFields())
        {
            $.ajax({
                method   : 'POST',
                url      : '/login',
                data     : $scope.loginDetails,
                dataType : 'json',
                success: function(user) {
                    if(user)
                    {
                        userService.setLoggedUSer(user);
                        $state.go('home');
                    }
                    else {
                        $scope.error = "שם משתמש או סיסמא שגויים, נסה שנית";
                        $scope.$apply();
                    }
                }
            });
        }
    };

    $scope.register = function(){
        if(validateFields())
        {
            $.ajax({
                method   : 'POST',
                url      : '/register',
                data     : $scope.user,
                dataType : 'json',
                success: function(result) {
                    if(result.error != null || result.error != undefined)
                    {
                        $scope.error = "שם משתמש כבר קיים";
                        $scope.$apply();
                    }else {
                        userService.setLoggedUSer(result);
                        $state.go('home');
                    }
                }
            });
        }
    }
    if($scope.user != null)
    {
        $scope.userDetails = $scope.user;
    }
    else
    {
        $scope.userDetails = {};
    }

    $scope.updateUserDetails = function(){
        if(validateFields())
        {
            $.ajax({
                method   : 'POST',
                url      : '/updateUser',
                data     : $scope.userDetails,
                dataType : 'json',
                success: function(result) {
                    if(result.error != null || result.error != undefined)
                    {
                        $scope.error = "שם משתמש כבר קיים";
                        $scope.$apply();
                    }
                    else {
                        userService.setLoggedUSer(result);
                        $state.go('home');
                    }
                }
            });

        }
    };
}]);

mainApp.service('userService',['$cookies', '$state', function($cookies,$state) {
        var setLoggedUSer = function(usr){
            $cookies.put("loggedUser", JSON.stringify(usr));
        };

        var getLoggedUser = function(){
            return $cookies.get("loggedUser");
        };

        var logout = function(){
            $cookies.remove("loggedUser");
            $state.go('home');
        };

        return {
            setLoggedUSer: setLoggedUSer,
            getLoggedUser: getLoggedUser,
            logout: logout,
        };
    }]
);