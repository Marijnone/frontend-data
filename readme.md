# Front-end data

## Table of contents
* [Concept & sketches 💭](#Concept-&-Sketches)
* [Process 🔁](#process)
* [Challenges ⚔](#Challenges)
* [To do's 📜](#To-do's)
* [The cool stuff 🧙‍](#Challenges)



### Concepts & Sketches 💭

My initial idea was to create a timeline chart 
Where people can click on an author and see their live timeline. On the x it plots their books and their life events like their first child or the year they we're born. On the y it plots the authors face so you can easily see who's timeline you're looking at.


This was the first sketch 

![Wireframe](./img/sketch.jpg "Sketch")


And a more designed wireframe

![Wireframe](./img/wireframe.png "Wireframe")

### Process 🔁

For me D3 had a very high learning curve i still find some concepts pretty complex. The first challenges was to create an chart that looked like a timechart. Where the x line would have the years this is a quite common chart so making this was not so hard. But a mistake i often make is to not write out the process of what needs to happen. This resulted in being stuck on building the grid to plot the books on. After asking for help i, with some help started to build a function that filters the books from the specific authors array. And then plots the books on the correct year. After that i needed a function that displays the correct books when the author is clicked. To do this i wrote down the steps needed to accomplish this:

Stappen what to do (dutch)

- Maak een lijst met de authors die ik wil laten zien 

- Elke author moet aan en uitzet baar gemaakt worden

- Plot de tijdlijn van elke author

- Link elk item in de lijst van authors met het aan en uitzetten van de tijdlijn per author

- Maak de g class van de geselecteerde waarde visible

This method of writing the steps down really helped me to build the function.

### Challenges ⚔

When i started to sketch this idea i never thought it would be so hard to realize this in code. This is something that i always find hard because you want to build something that you find cool and interesting. But at the end it need to be accomplished, i think this has to do with the lack of experience and probably skill.

But after all the headache and frustration its gives a great feeling when it finally works 😁. Its not perfect but still pretty happy with the result.


### To do's 📜 

- I wanted to add a feature that people can type in their favorite author push this to the array. And then plot the author to the timeline.
- One of the features that the initial idea had was showing life events of the author i've got started with. [Wikijs](https://www.npmjs.com/package/wikijs). It grabbed the information about the author from Wikipedia. But did not managed to implement it on time.

### The cool stuff 🧙‍
This is the function that filters out the authors by the specific author array. Using ```D3.nest()```
```javascript
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
```



### Resources

https://stackoverflow.com/questions/14567809/how-to-add-an-image-to-an-svg-container-using-d3-js

https://jsfiddle.net/q51ok9jc/46/ on adding image to the x 

https://www.udemy.com/masteringd3js/ main source of D3 information
