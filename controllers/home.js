var fs = require('fs');

var media =  global.myDb.collection('media');

exports.render = function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
};

exports.allMedias = function(req, res) {
    media.find().aggregate('Media').exec(function(err, media) {
        if (err) {
            return res.status(500).json({
                error: 'error in getting all media'
            });
        }
        res.json(media);

    });
};