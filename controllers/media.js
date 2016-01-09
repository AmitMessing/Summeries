var mediaDb = global.myDb.collection('media');
ObjectID = require('mongodb').ObjectID;

exports.mediaDetails = function(req, res) {
    var id = req.params.mediaId;
    var o_id = new ObjectID(id);

    mediaDb.findOne({'_id': o_id},function(err, media){
        if (err) {
            return res.status(500).json({
                error: 'error occured while searching for media'
            });
        }
        res.json(media);
    });
};