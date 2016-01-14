angular.module('mediaApp', [])
    .controller('mediaController',['$scope','$window','$stateParams', '$resource', '$timeout','userService', function ($scope,$window, $stateParams, $resource, $timeout, userService) {

        $scope.allMovies = [];
        $scope.getAllMovies = function() {
            $resource('/getAllMovies').query(function (allMedia) {
                allMedia.map(function(media){
                    media.releaseDate = new Date(media.releaseDate);
                    $scope.allMovies.push(media);
                });
            });
        };

        $scope.allSeries = [];
        $scope.getAllSeries = function() {
            $resource('/getAllSeries').query(function (allMedia) {
                allMedia.map(function(media){
                    media.releaseDate = new Date(media.releaseDate);
                    $scope.allSeries.push(media);
                });
            });
        };


        $scope.user = userService.getLoggedUser();
        var mediaId = $stateParams.mediaId;
        $scope.media = {};

        $scope.addComment = function(){
            if($scope.comment.title != "" && $scope.comment.content) {
                $scope.comment.mediaId = mediaId;
                $scope.comment.userId = $scope.user._id;
                $scope.comment.userName = $scope.user.userName;
                $scope.comment.date = new Date();


                $.ajax({
                    method: 'POST',
                    url: '/addComment',
                    data: $scope.comment,
                    dataType: 'json',
                    success: function () {
                        $window.location.reload();
                    }
                });
            }
        };

        $scope.init = function(){
                $resource('/mediaDetails/:mediaId', {mediaId: mediaId}).get(function (media) {
                    media.releaseDate = new Date(media.releaseDate);
                    $scope.media = media;

                    $scope.comment = {
                        title: "",
                        content: "",
                        date: "",
                        mediaId: "",
                        userId: "",
                    };
                    $.ajax({
                        dataType: "json",
                        url: "http://www.omdbapi.com/?t=" + media.englishTitle,
                        success: function (result) {
                            $('#imdbRating')[0].innerHTML = '<span class="imdbRatingPlugin" data-user="ur62979138" data-title="' + result.imdbID + '" data-style="p3">' +
                                '<a href="http://www.imdb.com/title/' + result.imdbID + '/?ref_=plg_rt_1">' +
                                '<img src="http://g-ecx.images-amazon.com/images/G/01/imdb/plugins/rating/images/imdb_37x18.png"/>' +
                                '</a>' +
                                '</span>';

                            initImdbApi(window.document, 'script', 'imdb-rating-api');
                        }
                    });

                    var canvas = window.document.getElementById('mediaPic');
                    var context = canvas.getContext('2d');
                    var imageObj = new Image();

                    imageObj.onload = function () {
                        context.drawImage(imageObj, 0, 0, 400, 494);
                    };
                    imageObj.src = media.image;
                });

            /*if (window.document.getElementById("btnComment").name === "") {
                window.document.getElementById("btnComment").disabled = true;
            }*/
        };

        var initImdbApi = function (d, s, id) {
            $('[id='+id+']').remove();

            var js, stags = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "http://g-ec2.images-amazon.com/images/G/01/imdb/plugins/rating/js/rating.min.js";
            stags.parentNode.insertBefore(js, stags);
        };
    }])
    .controller('addMediaController',['$scope', '$state', function ($scope,$state) {
        $scope.enumMediaType = {
            "בחר סוג": 0,
            "סרט": 1,
            "סדרה": 2
        };
        $scope.categories = ["קומדיה","דרמה","פעולה","רומנטיקה","אימה","אנימציה","פשע","מתח","פנטזיה","מדע בדיוני"];
        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };
        $scope.newMedia = {
            releaseDate: new Date(),
            mediaType: 0,
            length: 0,
            categories: []
        };

        function validateImageType() {
            $file = $("#Image");
            var $filePath = $.trim($file.val());

            if ($filePath == "") {
                $('#errorMsg').text("אנא בחר תמונה");
                $('#image-error').show();
                return false;
            }

            return true;
        }

        var validateFields = function(){
            if($scope.newMedia.mediaType === "" || $scope.newMedia.mediaType === undefined ||
                $scope.newMedia.hebrewTitle === "" || $scope.newMedia.hebrewTitle === undefined ||
                $scope.newMedia.englishTitle === "" ||  $scope.newMedia.englishTitle === undefined ||
                $scope.newMedia.releaseDate === "" || $scope.newMedia.releaseDate ===  undefined||
                $scope.newMedia.categories === "" || $scope.newMedia.categories === undefined ||
                $scope.newMedia.length === "" || $scope.newMedia.length === undefined ||
                $scope.newMedia.directors === "" || $scope.newMedia.directors === undefined ||
                $scope.newMedia.producers === "" || $scope.newMedia.producers === undefined ||
                $scope.newMedia.actors === "" || $scope.newMedia.actors === undefined ||
                !validateImageType())
            {
                $scope.error = "נא למלא את כל השדות";
                return false;
            }
            $scope.error = null;
            return true;
        };

        $scope.toggleCategoriesSelection = function(categoryName){
            var idx = $scope.newMedia.categories.indexOf(categoryName);

            // is currently selected
            if (idx > -1) {
                $scope.newMedia.categories.splice(idx, 1);
            }

            // is newly selected
            else {
                $scope.newMedia.categories.push(categoryName);
            }
        };
        $scope.file_changed = function(element) {
            $scope.$apply(function(scope) {
                var photofile = element.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    $scope.newMedia.image = e.srcElement.result;
                };
                reader.readAsDataURL(photofile);
            });
        };
        $scope.submitForm = function(){

            if(validateFields()) {
                $.ajax({
                    method: 'POST',
                    url: '/addMedia',
                    data: $scope.newMedia,
                    dataType: 'json',
                    success: function () {
                        $state.go('home');
                    }
                });
            }
        }
    }]);