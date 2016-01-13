mainApp.controller('userController',['$scope','$state','userService', function ($scope, $state, userService) {
    $scope.user = userService.getLoggedUser();
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
}]);

mainApp.service('userService', function() {
        var user = null;

        var setLoggedUSer = function(usr){
            user = usr;
        };

        var getLoggedUser = function(){
            if(user) {
                return user;
            }
        };

        return {
            setLoggedUSer: setLoggedUSer,
            getLoggedUser: getLoggedUser
        };
    }
);