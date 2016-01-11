'use strict';

module.exports = function(app) {
    var user = require('../controllers/user');

    app.route('/register/:first/:last/:userName/:password/:email')
        .post(user.addUser);
};
