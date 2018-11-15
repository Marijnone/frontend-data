require('dotenv').config()
const api = require('./oba-api')
const chalk = require('chalk')

require('util').inspect.defaultOptions.depth = 2
const fs = require('fs')

// Express
const express = require('express')
const app = express()
const port = 8080

const obaApi = new api()

obaApi
	.getMore([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018])
	.then(response => {
		console.log(response)

		return response
			.reduce((total, year) => total.concat(year), [])
			.reduce(
				(total, page) => total.concat(page.aquabrowser.results[0].result),
				[]
			)

	})

	.then(response => {
		// console.log('Tweede', response)

		return response.map(book => {
			return {
				title: book.titles[0].title[0]['_'],
				// description: Number(book.description[0]['physical-description'][0]._.replace(/ .*/, '')),
				publication: Number(book.publication[0].year[0]['_']),
				subject: book.subjects ? book.subjects[0]['topical-subject'][0]._ : 'no subject',
				author: book.authors ? book.authors[0]['main-author'][0]['_'] : 'no author'
			}
		})
	})


	.then(response => {
		console.log(response)
		fs.writeFile('json.json', JSON.stringify(response), 'utf-8', err => {
			if (err) {
				console.error(err)
			}
			console.log('File has been created')
		})
	})
	.catch(err => {
		console.log(err)
	})