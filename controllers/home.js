var fs = require('fs');

var media = global.myDb.collection('media');

exports.render = function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
};

exports.allMedia = function(req, res) {
    media.find({mediaType: "1"}).sort({'_id': -1}).limit(5).toArray(function(err, movies) {
        if (err) {
            return res.status(500).json({
                error: 'error in getting all media'
            });
        }

        media.find({mediaType: "2"}).sort({'_id': -1}).limit(5).toArray(function(err, series) {
            if (err) {
                return res.status(500).json({
                    error: 'error in getting all media'
                });
            }
            res.json(movies.concat(series));
        });
    });
};