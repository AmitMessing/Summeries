'use strict';

module.exports = function(app) {
    var media = require('../controllers/media');

    app.route('/mediaDetails/:mediaId')
        .get(media.mediaDetails);

    app.route('/addMedia')
        .post(media.addMedia);

    app.route('/addComment')
        .post(media.addComment);

    app.route('/getAllMovies')
        .get(media.getAllMovies);

    app.route('/getAllSeries')
        .get(media.getAllSeries);
};
