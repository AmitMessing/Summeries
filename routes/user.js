'use strict';

module.exports = function(app) {
    var user = require('../controllers/user');

    app.route('/register')
        .post(user.register);

    app.route('/login')
        .post(user.login);

    app.route('/updateUser')
        .post(user.updateUser);
};
