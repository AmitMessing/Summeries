var mediaCollection = global.myDb.collection('media');
//var dict = require("dict");

exports.donutData = function(req, res){
    mediaCollection.find({"comments.0":{"$exists":true}}).toArray(function(err, searchResult){
        if (err) {
            return res.status(500).json({
                error: 'error occured while getting donut statistic data'
            });
        }

        var donutData = {};
        searchResult.forEach(function(currItem){
            currItem.categories.forEach(function(category){
                if (donutData[category]){
                    donutData[category].count += 1;
                }
                else{
                    donutData[category] = {categoryName: category, color: randomColor(), count: 1};
                }
            })
        });

        var dataArray = [];
        for(var curr in donutData) {
            dataArray.push(donutData[curr]);
        }

        res.json(dataArray);
    });
};

exports.barChartData = function(req, res) {
    mediaCollection.aggregate([
        {$project: { _id: 0, categories: 1, count: 2 } },
        {$unwind: "$categories" },
        {$group: { _id: "$categories", "count": { $sum: 1 } }}
    ]).toArray(function(err, result) {
        if (err) {
            return res.status(500).json({
                error: 'error occured while getting bar chart statistic data'
            });
        }
        res.json(result);
    });
};

var randomColor = function() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}