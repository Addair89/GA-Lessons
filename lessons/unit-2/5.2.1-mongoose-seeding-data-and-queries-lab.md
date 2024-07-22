<img src="https://i.imgur.com/PMyzlb1.png">

# Mongoose Queries Lab

## Intro

This lab will provide you with practice using the promise syntax of Mongoose queries and seeding a database.

## Road Map

1. Seeding a Database
2. Practice Querying Using Mongoose Lab

## 1. Seeding a Database

We need to seed mongoose-movies database with consistent data so that we can practice querying it using Mongoose...

**Seeding** a database is the process of initializing a database with some configuration-oriented data.

Use cases for seeding a database include:

- Creating an initial _admin_ user
- Providing data for lookup tables/collections. For example, in a inventory app for a grocery store, you might seed a _departments_ table/collection with values like `Deli`, `Dairy`, `Bakery`, `Meat & Seafood`, etc.

Note that the process of seeding a database is not part of the application that uses the database and is executed separately - usually only once when the application is first put into production.

### Create a **data.js** Module

The data we're going to use to seed the mongoose-movies database will be held in a module named **data.js**.

Let's create it in the root of the project:

```
touch data.js
```

<details>
<summary>
👉 Now let's copy the contents within this dropdown into <strong>data.js</strong>
</summary>

<pre>
exports.performers = [
  {name: 'Natalie Portman', born: '06-09-1981'},
  {name: 'Kevin Bacon', born: '07-08-1958'},
  {name: 'Tom Cruise', born: '07-03-1962'},
  {name: 'Brad Pitt', born: '12-18-1963'},
  {name: 'Emma Watson', born: '04-15-1990'},
  {name: 'Carrie Fisher', born: '10-21-1956'},
  {name: 'Mark Hamill', born: '09-25-1951'},
  {name: 'Harrison Ford', born: '07-13-1942'},
  {name: 'Jodie Foster', born: '11-19-1962'},
  {name: 'Matthew McConaughey', born: '11-04-1969'},
  {name: 'James Woods', born: '04-18-1947'},
  {name: 'Anne Hathaway', born: '11-12-1982'},
  {name: 'Bill Murray', born: '09-21-1950'},
  {name: 'Chevy Chase', born: '10-08-1943'},
  {name: 'Rami Malek', born: '05-12-1981'}
];

exports.movies = [
  {title: 'Contact', releaseYear: 1997, mpaaRating: 'PG', nowShowing: false},
  {title: 'Star Wars - A New Hope', releaseYear: 1977, mpaaRating: 'PG', nowShowing: false,
    reviews: [{content: 'The one that started it all!', rating: 5}]
  },
  {title: 'Interstellar', releaseYear: 2014, mpaaRating: 'PG-13', nowShowing: true,
    reviews: [{content: 'A fantastic sci-fi mind blower!', rating: 5}]
  },
  {title: 'Caddyshack', releaseYear: 1980, mpaaRating: 'R', nowShowing: false,
    reviews: [{content: 'Low-budget senseless comedy', rating: 4}, {content: 'Should not be the classic it is.', rating: 2}]
  },
  {title: 'Bohemian Rhapsody', releaseYear: 2018, mpaaRating: 'PG-13', nowShowing: true}
];
</pre>

</details>

As you can see, there are two exported arrays, one an array of _performer_ objects, the other an array of _movie_ objects.

### Create a **seed.js** Module

Within the same **mongoose-movies** project we've been coding, create a **seed.js** module in the root of the project:

```
touch seed.js
```

At the top of **seed.js**, let's connect to the database, require the models and load the `data.js` arrays into a `data` variable:

```js
// seed.js (a utility to seed/initialize the database)

require('dotenv').config();
require('./config/database');

const Movie = require('./models/movie');
const Performer = require('./models/performer');

// For better organization, the seed data is being stored in a separate data.js module
const data = require('./data');
```

### Seeding the Database

To avoid duplicates when seeding a database, we first need to delete all data from the collections we'll be inserting data into.

The following code deletes all movie and performer documents and properly ends the program:

```js
...
const data = require('./data');

// await needs an async function - use an async IIFE!
(async function() {
  let results = await Movie.deleteMany({});
  // results will be whatever the promise
  // returned by the deleteMany method resolves to
  console.log(results);
  results = await Performer.deleteMany({});
  console.log(results);
  


  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();
```

Running `node seed` will result in the `results` objects being logged out:

```
mongoose-movies % node seed
Connected to MongoDB mongoose-movies at ac-xkaer8i-shard-00-00.azt0vdr.mongodb.net:27017
{ acknowledged: true, deletedCount: 7 }
{ acknowledged: true, deletedCount: 15 }
```

The above works fine, but it provides an opportunity to learn about a more performant approach... 

### Performing Asynchronous Operations in Parallel

There's nothing wrong with the code as written - it works.

However, the code first waits for the database to finish deleting the movies before it begins to delete the performers.

Because they are not dependent upon each other, it would be more efficient to perform both operations **in parallel** and we can use the static [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method to make it happen!

`Promise.all()` accepts an array of promises and returns a **single** promise in their place:

```js
// seed.js
...
(async function() {
  // Save the promises (or call right in the array if feeling frisky)
  const p1 = Movie.deleteMany({});
  const p2 = Performer.deleteMany({});
  
  // Promise.all will return a single promise that resolves
  // only after all of the array's promises resolve
  let results = await Promise.all([p1, p2]);
  // results will be an array of result objects!
  console.log(results);



  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();
```

The above code now removes documents from the _movies_ & _performers_ collections in **parallel**!

### Let's Seed Some Data!

Finally, let's create some data.

Since creating movies and performers don't depend on each other, we can create both in parallel as well:

```js
...
  console.log(results);

  // This time, provide the array of promises in-line
  results = await Promise.all([
    Movie.create(data.movies),
    Performer.create(data.performers)
  ]);
  console.log('Created movies:', results[0]);
  console.log('Created performers:', results[1]);
...
```
	
Try it out using `node seed` again!

Although assigning performers to a movies using the application is fun, let's take a look at how you might do it in **seed.js**.  

### Associating `movies` & `performers` When Seeding

👀 **Important:** You should never refer to an actual `_id` when seeding!

For example, **don't** write code like:

```js
// Don't do this in a seed 
const movie = await Movie.findById('5c609ac7641fdd63f6b8b71d');
```

Instead, we can query for documents based on properties other than their `_id`.

Let's say we want to assign the performer, **Mark Hamill**, to **Star Wars - A New Hope**...

```js
...
  console.log('Created performers:', results[1]);

  // Associate Mark Hamill with Star Wars - A New Hope
  results = await Promise.all([
    // Using regular expressions allows a partial match
    Movie.findOne({ title: /Star / }),
    Performer.findOne({ name: /Mark / })
  ]);
  // One day we'll destructure results like this:
  // const [starWars, mark] = results;
  const starWars = results[0];
  const mark = results[1];
  starWars.cast.push(mark._id);
  await starWars.save();
  console.log('Star Wars with Mark Hamill', starWars);

  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();
```

Seed one last time with `node seed` - now on to practicing practice querying...

## 2. Practice Querying Using Mongoose Lab

### Setup

Within the same **mongoose-movies** project we've been coding, create a **query-practice.js** module in the root of the project:

```
touch query-practice.js
```

<details>
<summary>
👉 Copy the code and exercises within this dropdown into <strong>query-practice.js</strong>
</summary>

<pre>
require('dotenv').config();
require('./config/database');

const Movie = require('./models/movie');
const Performer = require('./models/performer');

(async function() {

  /*-- Write the code for each exercise below --*/

  let result;

  console.log('BEGIN EXERCISES...')
  
  // 1) Find all movie docs (solution provided as an example)
  result =  await Movie.find({});
  console.log('1): ', result);
  

  // 2) Find all performer docs
  // Be sure to assign to result, e.g.:
  // result = await ...

  console.log('2): ', result);
  
  
  // 3) Find all movies with an MPAA Rating of 'PG'
  
  console.log('3): ', result);
  
  
  // 4) Find all movies that are still showing
  
  console.log('4): ', result);

  
  // 5) Find all movies with an MPAA Rating of 'PG' or 'PG-13'
  // Hint: Google "MongoDB $in operator" or use Mongoose's .where & .in Query Builder methods using this syntax:
  // Model.where('property').in(['val1', 'val2', etc.]).then(...)
  
  console.log('5): ', result);

  
  // 6) Find the first movie found with a releaseYear of 2018
  
  console.log('6): ', result);

  
  // 7) Find all movies released after 1980
  
  console.log('7): ', result);

  
  // 8) Find all movies whose titles start with a 'C'
  // Hint: StackOverflow will show how to use a regular expression
  
  console.log('8): ', result);

  
  // 9) Find the performer named 'Rami Malek'
  
  console.log('9): ', result);

  
  // 10) Find all performers born before 1980
  
  console.log('10): ', result);

  
  // 11) Find all performers whose name starts with a 'J'
  // Hint: Regular Expressions strike again!
  
  console.log('11): ', result);

  
  // 12) Add the ObjectId of performer 'Bill Murray' to
  //     the movie Caddyshack's cast property and save.
  //     console.log the updated movie.
  
  console.log('12): ', result);
  
  
  // Lastly, use process.exit() to "cleanly" shut down the Node program
  process.exit();
})();
</pre>

</details>

### Complete the 12 Exercises

Complete each of the 12 exercises.

Note that exercise 1's solution has been provided as an example.

Test and observe the log in Terminal by running:

```
node query-practice
```

### Hints

[The official docs for Mongoose Queries](https://mongoosejs.com/docs/queries.html) and StackOverflow results are your best friend.

Note that Mongoose can use **query objects** with the same syntax you'll find in **MongoDB** StackOverflow examples.

[Try Not to Peek](https://gist.github.com/jim-clark/42d90e5c5f494f5f00b61edadb242240)

<details>
<summary>
👀 Do you need to sync your code?
</summary>
<hr>

<code>git reset --hard origin/sync-15-finish-seeding-query-lab</code>

<hr>
</details>

## Deliverable?

#### This lab is not a deliverable.
