d3.json("./json/data.json").then(function (data) {
	console.log(data)



	let dataStore = data.map(books => {
		return {
			year: books.publication.year,
			gender: books.author.gender,
			pages: books.characteristics.pages
		}
	})
	console.log(dataStore)
	console.log(books);

	return dataStore
})