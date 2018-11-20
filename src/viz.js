d3.json('./json/data.json').then(function (data) {

    var speceficAuthors = ["Charles Dickons", "Mark Twain", "Stephen King", "Dan Brown", "Stieg Larsson"]


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
    // filtered.filter(function (d) { return d.publication, console.log(d.publication) });
    console.log(filtered);


    const maxYear = d3.max(getYearValue(filtered))
    const minYear = d3.min(getYearValue(filtered))

    function getYearValue(d) {
        let years = []
        d.map(d => {
            if (d.values.length > 1) {
                d.values.map(books => years.push(books.publication.year))
            } else {
                years.push(d.values[0].publication.year)
            }

        })

        return years
    }

    // console.log(maxYear, minYear)

    // console.log(minYear)
    // const minYear = (filtered, d => d.values.length <= 1 ?  d.values[0].publication.year :  d.values.map(books> books.publication.year))



    var margin = {
        top: 80,
        right: 50,
        bottom: 100,
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
        .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')')


    var scale = d3.scaleLinear() // v4
        .domain([minYear, maxYear])
        .range([0, width])
    // clipped
    var axisGroup = svg.append("g").attr('transform', 'translate(0,' + (height + 4) + ')')


    var axis = d3.axisBottom() // v4
        .scale(scale)
        .tickFormat(d3.format("y"))
        .ticks(maxYear - minYear)
    axisGroup.call(axis)

    // Gridline
    const gridlines = d3.axisTop()
        .scale(scale)
        .tickFormat(d3.format("y"))
        .ticks(maxYear - minYear)
        .tickSize(-height)


    svg.append("g")
        .attr("class", "grid")
        .call(gridlines)
        .selectAll("text")
        .style("display", "none")

    filtered.forEach((author, index) => {
        plotValues(author, index)
        if (index === 0) {

        } else {
            svg.append("g")
                .attr('transform', 'translate(0,' + (height - (index * 100)) + ')')
                .call(d3.axisBottom() // v4
                    .scale(scale)
                    .ticks(0)
                )
        }

    })

    function plotValues(author, index) {
        // console.log(author.values)

        svg.selectAll("rects")
            .data(author.values)
            .enter()
            .append("rect")
            .attr("width", 15)
            .attr("height", 20)
            .attr("y", ((height - (index * 100))))
            .attr("x", book => {
                // console.log(book.publication.year)
                return scale(book.publication.year)
            }
            )

            .style("fill", "red")

    }
    // let filteredBooks = filtered.map(filtered => {
    //     // console.log(filteredBooks);

    //     return {
    //         year: books.publication.year,
    //         author: filteredAuthors,
    //         gender: books.author.gender,
    //         pages: books.characteristics.pages

    //     }

    // })

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