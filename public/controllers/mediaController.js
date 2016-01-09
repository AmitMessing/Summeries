angular.module('mediaApp', [])
    .controller('mediaController',['$scope', '$stateParams', '$resource', function ($scope,$stateParams,$resource) {
        var mediaId = $stateParams.mediaId;

        $scope.init = function(){
            $resource('/mediaDetails/:mediaId', { mediaId: mediaId}).get(function(media){
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

            initImdbApi(window.document, 'script', 'imdb-rating-api');

            /*if (window.document.getElementById("btnComment").name === "") {
                window.document.getElementById("btnComment").disabled = true;
            }*/
        };

        var initImdbApi = function (d, s, id) {
            var js, stags = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "http://g-ec2.images-amazon.com/images/G/01/imdb/plugins/rating/js/rating.min.js";
            stags.parentNode.insertBefore(js, stags);
        };
    }]);