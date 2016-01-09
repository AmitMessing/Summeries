'use strict';

module.exports = function(app) {
    var search = require('../controllers/search');

    app.route('/searchResult')
        .get(search.searchResult);

    app.route('/searchMedia/:searchQuery')
        .get(search.searchMedia);
};
