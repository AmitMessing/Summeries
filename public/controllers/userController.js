app.controller('userController',['$scope', '$stateParams', '$resource','userService', function ($scope, $stateParams, $resource, userService) {
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

    $scope.addUser = function(){
        if(validateFields())
        {
            $resource('/register/:first/:last/:userName/:password/:email',
                {
                    first: $scope.user.firstName,
                    last: $scope.user.lastName,
                    userName: $scope.user.userName,
                    password: $scope.user.password,
                    email: $scope.user.email
                }, {
                    'save': { method:'POST' }
                }
            ).query(function(usr) {
                userService.setLoggedUSer($scope.user);
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