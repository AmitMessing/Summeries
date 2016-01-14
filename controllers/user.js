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

exports.deleteUser = function(req, res){
    var id = req.params.id;
    var o_id = new ObjectID(id);
    userCollection.remove({'_id': o_id},true ,
        function(err, result) {
            if (err) {
                return res.status(500).json({
                    error: 'error occured while searching for media'
                });
            }
            res.json({status: "success"});
    });
};

exports.updateUser = function(req,res){
    var id = req.body._id;
    var o_id = new ObjectID(id);

    userCollection.findOne({$and:[{'userName': req.body.userName},{'_id':{$ne: o_id}}]},
        function(err, result) {
            if (err) {
                return res.status(500).json({
                    error: 'error occured while searching for media'
                });
            }
            else if (result != null) {
                return res.json({error: "userAllreadyExists", user: result})
            }
        });

        userCollection.update({'_id': o_id}, {userName: req.body.userName, firstName: req.body.firstName, lastName: req.body.lastName,
                email: req.body.email, password: req.body.password, type: req.body.type}, function(err, result){
                if (err)
                {
                    return res.status(500).json({
                        error: 'error occured while searching for media'
                    });
                }
            });

              userCollection.findOne({'_id': o_id},function(err, result){
                  if (err) {
                      return res.status(500).json({
                          error: 'error occured while searching for media'
                      });
                  }
                   res.json(result)
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
    userCollection.findOne({'userName': req.body.userName},
        function(err, result) {
            if (err) {
                return res.status(500).json({
                    error: 'error occured while searching for media'
                });
            }
            if(result != null)
            {
                return res.json({error: "userAllreadyExists", user: user})
            }
        });

    userCollection.insertOne(user, function(err, result) {
        if (err) {
            return res.status(500).json({
                error: 'error occured while adding the new media'
            });
        }
    });
    userCollection.findOne({'userName': req.body.userName},
        function(err, result) {
            if (err) {
                return res.status(500).json({
                    error: 'error occured while searching for media'
                });
            }
            return res.json(result);
        });
};