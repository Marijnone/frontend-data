const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "900")
    .attr("height", "400");

d3.json('./json/json.json').then(function (data) {



    const maxValue = d3.max(data)
    const width = 500,
        height = 500
    const bottomAxis = d3.axisBottom()





    const rects = svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("y", 0)
        .attr("x", function (d, i) {
            return (i * 40);
        })
        //return the width of the books with d.description = nummber of pages
        .attr("width", function (d, i) {
            return x(d.description)
        })
        .attr("height", function (d) {
            return 60;
        })
        .attr("fill", function (d) {
            // return "grey";
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)





})