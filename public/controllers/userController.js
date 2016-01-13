app.controller('userController',['$scope', '$stateParams', '$resource','$state','userService', function ($scope, $stateParams, $resource, $state, userService) {
    $scope.user = userService.getLoggedUser();
    $scope.error = "";

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
app.service('userService', ['$resource', function($resource) {
        var user = {};

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
    }]
);