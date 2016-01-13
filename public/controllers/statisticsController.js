angular.module('statisticsApp', [])
    .controller('statisticsController',['$scope', '$resource', function ($scope,$resource) {
        $scope.init = function(){
            $resource('/donutData').query(function (data) {
                $scope.donutData = data;

                var svg = d3.select("#donut").append("svg").attr("width",300).attr("height", 340);

                svg.append("g").attr("id", "salesDonut");

                Donut3D.draw("salesDonut", randomData(), 150, 150, 150, 150, 20, 0.4);

                function changeData() {
                    Donut3D.transition("salesDonut", randomData(), 130, 100, 30, 0.4);
                }

                function randomData() {
                    return $scope.donutData.map(function(d) {
                        return { label: d.categoryName, value: d.count, color: d.color };
                    });
                }
            });

            $resource('/barChartData').query(function(data) {
                var maxCountValue = Math.max.apply(Math,data.map(function(o){return o.count;}));

                var margin = {top: 40, right: 20, bottom: 50, left: 40},
                    width = 700 - margin.left - margin.right,
                    height = 400 - margin.top - margin.bottom;

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left")
                    .ticks(maxCountValue);

                var svg = d3.select("#barChart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                x.domain(data.map(function(d) { return d._id; }));
                y.domain([0, d3.max(data, function(d) { return d.count; })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")
                    .attr("class", "y axis")
                    .call(yAxis)
                    .append("text")
                    .attr("y", -20)
                    .attr("dy", ".71em")
                    .text("כמות");

                svg.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d._id); })
                    .attr("width", x.rangeBand())
                    .attr("y", function(d) { return y(d.count); })
                    .attr("height", function(d) { return height - y(d.count); });

                function type(d) {
                    d.count = +d.count;
                    return d;
                }
            })
        }
    }]);