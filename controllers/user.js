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

exports.updateUser = function(req,res){
    var id = req.body._id;
    var o_id = new ObjectID(id);

    userCollection.findOne({$and:[{'userName': req.body.userName},{'_id':{$ne: o_id}}]},
        function(err, user){
            if (err) {
                return res.status(500).json({
                    error: 'error occured while searching for media'
                });
            }
            else if(user != null)
            {
                res.json({error: "userAllreadyExists", user: user})
            }
            else if(user === null){
                userCollection.update({'_id': o_id},
                    {
                        userName: req.body.userName,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        type: req.body.type
                    }, function(err, user){
                    if (err) {
                        return res.status(500).json({
                            error: 'error occured while searching for media'
                        });
                    } else {
                      userCollection.findOne({'_id': o_id},function(err, user){
                          if (err) {
                              return res.status(500).json({
                                  error: 'error occured while searching for media'
                              });
                          }
                           res.json(user)
                      });
                    }
                });
            }
        });
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