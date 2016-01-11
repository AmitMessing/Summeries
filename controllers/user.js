var userCollection = global.myDb.collection('users');
ObjectID = require('mongodb').ObjectID;

exports.addUser = function(req, res) {
    var firstName = req.params.first;
    var lastName = req.params.last;
    var userName = req.params.userName;
    var password = req.params.password;
    var email = req.params.email;
    userCollection.insertOne(
        {
            firstName: firstName,
            lastName: lastName,
            password: password,
            userName: userName,
            email: email,
            type: 0
        }, function(err, result) {
            if (err) {
                return res.status(500).json({
                    error: 'error in getting all media'
                });
            }
        });
};