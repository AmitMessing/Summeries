'use strict';

module.exports = function(app) {
    var media = require('../controllers/media');

    app.route('/mediaDetails/:mediaId')
        .get(media.mediaDetails);
};
