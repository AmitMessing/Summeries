'use strict';

module.exports = function(app) {
    var search = require('../controllers/search');

    app.route('/searchResult')
        .get(search.searchMedia);

    app.route('/advanceSearchInstructions')
        .get(search.advanceSearchInstructions);

    app.route('/home/searchMedia/:searchQuery')
        .get(search.searchMedia);
}
