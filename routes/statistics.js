'use strict';

module.exports = function(app) {
    var statistics = require('../controllers/statistics');

    app.route('/donutData')
        .get(statistics.donutData);

    app.route('/barChartData')
        .get(statistics.barChartData);
};
