var media = global.myDb.collection('media');
var users = global.myDb.collection('users');

const MOVIE = "סרט";
const SERIES = "סדרה";
const CATEGORY = "קטגוריה";
const COMMENTS = "תגובות";
const DIRECTOR = "במאי";

enumMediaType = {
    None: "0",
    Movie: "1",
    Series: "2"
};

exports.searchResult = function(req, res) {
    var path = require('path');
    res.sendFile(path.join(__dirname, '../public/', 'index.html'));
};

exports.searchMedia = function(req,res){
    var searchQuery = req.params.searchQuery;

    if (searchQuery.substring(0,1) == '#'){
        advancedSearch(res, searchQuery.substring(1));
    }
    else{
        simpleSearch(res, searchQuery);
    }
};

var simpleSearch = function(res, searchQuery){
    media.find({$or: [{"hebrewTitle": new RegExp(searchQuery)} ,{"englishTitle": new RegExp(searchQuery, 'i')}]}).toArray(function(err, searchResult){
        if (err) {
            return res.status(500).json({
                error: 'error occured while searching for media'
            });
        }
        res.json(searchResult);
    })
};

var advancedSearch = function(res, searchQuery){
    var tempStrings = searchQuery.split(' ');
    var searchCategory = tempStrings[0];
    var searchResult;

    try
    {
        switch (searchCategory)
        {
            case CATEGORY:
            {
                searchResult = media.find({"categories": tempStrings[1]});
                break;
            }
            case COMMENTS:
            {
                var userName = tempStrings[1];
                searchResult = media.find({"comments": {$elemMatch: {"userName": userName}}});
                break;
            }
            case DIRECTOR:
            {
                var directorName = tempStrings[1];
                searchResult = media.find({"directors": new RegExp(directorName, 'i')});
                break;
            }
            case MOVIE:
            case SERIES:
            {
                var mediaType = searchCategory == MOVIE ? enumMediaType.Movie : enumMediaType.Series;
                var srcQuery = {"mediaType": mediaType};

                // that means we have a category.
                if (tempStrings.length > 1)
                {
                    srcQuery = { $and: [srcQuery,{"categories":tempStrings[1]}]};
                }
                // that means we have a year.
                if (tempStrings.length > 2)
                {
                    var year = tempStrings[2];
                    srcQuery.$and.push({"releaseDate": { "$gte": new Date(year+"-01-01"), "$lte": new Date(year+"-12-31") }})
                }

                searchResult = media.find(srcQuery);
                break;
            }
        }
        searchResult.toArray(function(err, searchResult) {
            if (err) {
                return res.status(500).json({
                    error: 'error occured while searching'
                });
            }
            res.json(searchResult);
        });
    }
    catch(ex){
        return res.status(500).json({
            error: 'error occured while searching'
        });
    }
};