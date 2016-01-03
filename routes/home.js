'use strict';

module.exports = function(app) {
    var home = require('../controllers/home');
    app.route('/')
        .get(home.render);

    app.route('/home')
        .get(home.render);
}
