d3.json('./json/json.json').then(function (data) {

    var speceficAuthors = ["Charles Dickons", "Mark Twain", "Stephen King"]


    const lessBooks = d3.shuffle(data).slice(0, 15)

    const filteredByAuthors = d3.nest().key(book => {
        return book.author.fullname
    }).entries(data)

    const filtered = filteredByAuthors.filter(author => {
        if (speceficAuthors.indexOf(author.key) > -1) {
            console.log('GEVONDEN')
            return {
                author
            }
        }
        return
    })

    const maxYear = d3.max(lessBooks, d => d.publication)
    const minYear = d3.min(lessBooks, d => d.publication)

    console.log(filtered)

    var margin = {
        top: 80,
        right: 50,
        bottom: 80,
        left: 50
    }

    const width = window.innerWidth - margin.left - margin.right
    const height = window.innerHeight - margin.top - margin.bottom

    d3.select("body")
        .append("svg")
    const svg = d3.select('svg')

    svg
        .attr('width', width)
        .attr('height', height)
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


    var scale = d3.scaleLinear() // v4
        .domain([minYear, maxYear])
        .range([0, width])
    // clipped
    var axisGroup = svg.append("g");
    var axis = d3.axisBottom() // v4
        .scale(scale)
        .tickFormat(d3.format('y'))
        .ticks(maxYear - minYear)
    axisGroup.call(axis);

    svg.selectAll("rects")
        .data(lessBooks)
        .enter()
        .append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("y", -15)
        .attr("x", book => {
            return scale(book.publication)
            console.log(book.publication);

        })
        .style("fill", "red")






    let filteredBooks = filtered.map(filtered => {
        console.log(filteredBooks);

        return {
            year: books.publication.year,
            author: filteredAuthors,
            gender: books.author.gender,
            pages: books.characteristics.pages

        }

    })

    return


    //Make the SVG




    // const maxValue = d3.max(data)
    // const minValue = d3.min(data)
    // // console.log(data);


    // // console.log(d.publication);


    // const scale = d3.scaleLinear()
    //     .domain([0, maxValue])
    //     .range([0, width])

    // const axisGroup = svg.append("g")
    // const axis = d3.axisBottom()
    //     .scale(scale)
    // axisGroup.call(axis)



})