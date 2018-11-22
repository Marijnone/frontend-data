d3.json('./json/data.json').then(function (data) {

    var speceficAuthors = ["Mark Twain", "Stephen King", "Dan Brown", "William Shakespeare"]

    speceficAuthors.forEach(author => {
        const input = document.createElement("input")
        input.type = "checkbox"
        const label = document.createElement("label")
        const div = document.createElement("div")
        label.append(div)

        label.append(input)
        label.append(document.createTextNode(author))
        document.querySelector(".authors").append(label)
    })

    document.querySelectorAll(".authors > label").forEach(label => {
        const className = label.innerText.replace(" ", "")
        label.onchange = function () {

            document.querySelector("." + className).classList.toggle("invisible")
        }
    })

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
    console.log(filtered);


    const maxYear = d3.max(getYearValue(filtered))
    const minYear = d3.min(getYearValue(filtered))
    //grab min and max years form authors to create the timeline
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

    var margin = {
        top: 80,
        right: 50,
        bottom: 100,
        left: 80
    }

    const width = window.innerWidth - margin.left - margin.right
    // const height = window.innerHeight - margin.top - margin.bottom
    height = 260

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
    var axisGroup = svg.append("g")
        .attr('transform', 'translate(0,' + (height + 4) + ')')


    var axis = d3.axisBottom() // v4
        .scale(scale)
        .tickFormat(d3.format("y"))
        .ticks(maxYear - minYear)
    axisGroup.call(axis)

    // Gridlines
    const gridlines = d3.axisTop()
        .scale(scale)
        .tickFormat(d3.format("y"))
        .ticks(maxYear - minYear)
        .tickSize(-290)

    svg.append("g")
        .attr("class", "grid")
        .call(gridlines)
        .attr('transform', 'translate(0,' + (height - 300) + ')')
        // .attr(height, )
        .selectAll("text")
        .style("display", "none")

    filtered.forEach((author, index) => {
        plotValues(author, index)
        if (index === 0) {
            //for each author plot the books
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
        ////Tooltip from udemy
        // console.log(author);

        const tip = d3.tip().attr('class', 'd3-tip')
            .html(function (d) {
                console.log(d);

                var text = "<strong>Boek:</strong> <span style='color:black'>" + d.title.short + "</span><br>";
                text += "<strong>Genre/Onderwerp:</strong> <span style='color:black'>" + d.genres + "</span><br>";
                text += "<strong>Aantal paginas:</strong> <span style='color:black'>" + d.characteristics.pages + "</span><br>";
                text += "<strong>Publicatie Jaar:</strong> <span style='color:black'>" + d.publication.year + "</span><br>";
                return text;
            })
        svg.call(tip)

        svg.append("g")
            .attr("class", author.key.replace(" ", "") + " invisible")
            .selectAll("image")
            .data(author.values)
            .enter()
            .append("svg:image")
            .attr("width", 80)
            .attr("height", 100)
            .attr("y", ((height - (index * 100 + 100))))
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .attr("x", book => {
                // console.log(book.publication.year)
                return scale(book.publication.year) - 7 //small offset for posisition
            }
            )
            .attr('xlink:href', d => {
                // console.log(d.images[0])
                return d.images[1]
            });

    }

})