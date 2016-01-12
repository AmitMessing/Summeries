angular.module('mediaApp', [])
    .controller('mediaController',['$scope', '$stateParams', '$resource', '$timeout', function ($scope,$stateParams,$resource,$timeout) {
        var mediaId = $stateParams.mediaId;

        $scope.init = function(){
            $resource('/mediaDetails/:mediaId', { mediaId: mediaId}).get(function(media){
                media.releaseDate = new Date(media.releaseDate);
                $scope.media = media;

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
            $.ajax({
                method   : 'POST',
                url      : '/addMedia',
                data     : $scope.newMedia,
                dataType : 'json',
                success: function() {
                    $state.go('home');
                }
            });
        }
    }]);