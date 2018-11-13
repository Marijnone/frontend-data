const svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", "900")
    .attr("height", "400");

d3.json('./json/numberOfPages.json').then(function (data) {


    let t = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);

    const tip = d3.tip().attr('class', 'd3-tip')
        .html(function (d) {
            // console.log(d)

            var text = "<strong>Boek:</strong> <span style='color:red'>" + d.title + "</span><br>";
            text += "<strong>Genre/Onderwerp:</strong> <span style='color:red'>" + d.subject + "</span><br>";
            text += "<strong>Aantal paginas:</strong> <span style='color:red'>" + d.description + "</span><br>";
            text += "<strong>Publicatie Jaar:</strong> <span style='color:red'>" + d.publication + "</span><br>";
            return text;
        });
    svg.call(tip)

    data.forEach(function (d) {});
    const x = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
                return +d.description;
            }),
            d3.max(data, function (d) {
                return +d.description;
            })
        ]) // the min and max of the bookpage using de.min d3.max
        .range([0, 24]) //the range of the svg in this case the book on the shelf

    // const xBand = d3.scaleBand()
    //     .paddingInner(0.2)
    //     .paddingOuter(0.2)
    //     .domain([d3.min(data, function (d) {
    //             return +d.description;
    //         }),
    //         d3.max(data, function (d) {
    //             return +d.description;
    //         })
    //     ])
    //     .range([0, 80])

    // console.log(xBand(10))
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
    // .on('mouseover', function () {
    //     d3.selectAll(svg)
    //         .selectAll("rect")
    //         .style("height", '3em')
    // })
    // .on('mouseout', function () {
    //     d3.selectAll(svg)
    //         .selectAll("rect")
    //         .style("height", '1em')
    // })




})