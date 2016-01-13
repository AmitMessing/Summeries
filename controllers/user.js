var userCollection = global.myDb.collection('users');
ObjectID = require('mongodb').ObjectID;

exports.login = function(req, res){
     userCollection.findOne({$and:[{'userName': req.body.userName},{'password': req.body.password}]},
         function(err, user){
         if (err) {
             return res.status(500).json({
                 error: 'error occured while searching for media'
             });
         }
         res.json(user);
     })
};

exports.register = function(req, res) {
    var user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    };

    userCollection.insertOne(user, function(err, result) {
        if (err) {
            return res.status(500).json({
                error: 'error occured while adding the new media'
            });
        }
        res.end('{"success" : "Added Successfully", "status" : 200}');
    });
};