'use strict';

module.exports = function(app) {
    var user = require('../controllers/user');

    app.route('/register')
        .post(user.register);
};
