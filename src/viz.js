d3.json('./json/data.json').then(function (data) {

    var speceficAuthors = ["Charles Dickons", "Mark Twain", "Stephen King"]

    const filteredByAuthors = d3.nest().key(book => {
        return book.author.fullname
    }).entries(data)

    const filtered = filteredByAuthors.filter(author => {
        if (speceficAuthors.indexOf(author.key) > -1) {
            console.log('GEVONDEN')
            return author
        }
        return
    })

    console.log(filtered);

    let filteredBooks = filtered.map(filtered => {
        // console.log(filtered);

        return {
            year: books.publication.year,
            author: filteredAuthors,
            gender: books.author.gender,
            pages: books.characteristics.pages

        }

    })

    return dataStore


    //Make the SVG
    const width = 900

    const svg = d3.select("#chart-area")
        .append("svg")
        .attr("width", "900")
        .attr("height", "400");

    const maxValue = d3.max(data)
    const minValue = d3.min(data)
    // console.log(data);


    // console.log(d.publication);


    const scale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, width])

    const axisGroup = svg.append("g")
    const axis = d3.axisBottom()
        .scale(scale)
    axisGroup.call(axis)



})

// const rects = svg.selectAll("rect")
//     .data(data)
//     .enter().append("rect")
//     .attr("y", 0)
//     .attr("x", function (d, i) {
//         return (i * 40);
//     })
//     //return the width of the books with d.description = nummber of pages
//     .attr("width", function (d, i) {
//         return x(d.description)
//     })
//     .attr("height", function (d) {
//         return 60;
//     })
//     .attr("fill", function (d) {
//         // return "grey";
//     })
//     .on('mouseover', tip.show)
//     .on('mouseout', tip.hide)