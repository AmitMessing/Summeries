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

exports.addMedia = function(req,res){
    var newMedia = {
        actors: req.body.actors,
        categories: req.body.categories,
        directors: req.body.directors,
        englishTitle: req.body.englishTitle,
        hebrewTitle: req.body.hebrewTitle,
        length: req.body.length,
        mediaType: req.body.mediaType,
        producers: req.body.producers,
        releaseDate: req.body.releaseDate,
        image: req.body.image,
        summery: req.body.summery
    };

    mediaDb.insertOne(newMedia, function(err, result) {
        if (err) {
            return res.status(500).json({
                error: 'error occured while adding the new media'
            });
        }
        res.end('{"success" : "Added Successfully", "status" : 200}');
    });
};