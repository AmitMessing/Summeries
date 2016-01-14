mainApp.controller('userController',['$scope','$state','userService', function ($scope, $state, userService) {
    $scope.user = JSON.parse(userService.getLoggedUser());
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

    $scope.login = function (){
        if(validateLoginFields())
        {
            $.ajax({
                method   : 'POST',
                url      : '/login',
                data     : $scope.loginDetails,
                dataType : 'json',
                success: function(user) {
                    userService.setLoggedUSer(user);
                    $state.go('home');
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
                success: function() {
                    userService.setLoggedUSer($scope.user);
                    $state.go('home');
                }
            });
        }
    }
    $scope.userDetails = JSON.parse(userService.getLoggedUser());

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