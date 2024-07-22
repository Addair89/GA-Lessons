<img src="https://i.imgur.com/PMyzlb1.png">

# JavaScript Promises

## Learning Objectives

| Students Will Be Able To: |
|---|
| Describe the Use Case for Promises |
| Create a Promise |
| Run code when a Promise resolves |
| Run code when a Promise is rejected |
| Chain Promises |
| Using `async`/`await` for cleaner code |

## Road Map

1. Setup
2. The Use Case of Promises
3. What's a Promise?
4. Making Promises
5. Resolving Promises
6. Rejecting Promises
7. Chaining Promises
8. Using `async`/`await`
9. Further Study

## 1. Setup

We'll be experimenting with promises in [replit.com](https://replit.com/).

Create a new Node-based Repl and name it something like "Promises".

## 2. The Use Case of Promises

**[Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) provide another way to work with _asynchronous_ operations.**

**❓ Take a minute to answer the following review questions:**

<details>
<summary>
(1) What functions/methods have we used that execute <em>asynchronously</em>?
</summary>
<hr>

<p>Client-Side:</p>
<code>setTimeout</code> & <code>setInterval</code>

<hr>
</details>

<details>
<summary>
(2) What code "mechanism" have we used that enables code to be run after an asynchronous operation is complete?<br>
Hint: c_______ f________
</summary>
<hr>

callback functions

<hr>
</details>

In JavaScript, the functions/methods that implement asynchronous operations must be crafted to either:
	
- Accept a callback
- Return a promise
- Although rare, an asynchronous function/method can be written to do both.

👉 Cool, so as an alternative to callback functions, **we use a promise to run code after the completion of an asynchronous operation**.

## 3. What's a Promise?

A [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is a special JavaScript object.

An asynchronous function/method designed to work with promises will return a promise instead of accepting a callback function.

For example, very soon, you will be using a library called Mongoose to query for data in a MongoDB database...

Mongoose, prior to version 7, used to work with either promises or callbacks, for example, here's how we might have retrieved data using the callback approach:

```js
Movie.find({}, function(err, movies) {
  console.log(movies);
});
```

However, instead of providing a callback function like above, the `find()` method can return a promise object which ultimately "resolves" to the movies data which we can access using the `.then()` method as follows:

```js
const promiseObject = Movie.find({});
promiseObject.then(function(movies) {console.log(movies)};
```

**👉 A promise represents the eventual completion, or failure, of the asynchronous operation performed by the function/method that returned the promise.**

Although we more commonly use promises returned by methods like `find()` above, we can better learn about promises in general by creating our own...

## 4. Making Promises

Let's make a promise using the `Promise` class:

```js
const p = new Promise();
```

Running the Repl will generate an error because a function argument must be passed when instantiating the Promise class.

Let's give `new Promise()` a callback function that has two parameters as an argument:

```js
const p = new Promise(function(resolve, reject) {
  console.log(resolve, reject);
});
console.log(p);

// -> [Function (anonymous)] [Function (anonymous)]
// -> Promise {<pending>}
```

**Observations:**

- The callback function (known as the _executor_) is immediately called by the Promise class's constructor method.
- When the callback is called, it will be passed two functions as args for the `resolve` and `reject` parameters.
- The created promise object has an initial state of `<pending>`.

A promise is always in one of three states:

- `pending`: Initial state, neither fulfilled nor rejected.
- `fulfilled`: The async operation completed successfully. This state is also commonly referred to as "resolved". 
- `rejected`: The async operation failed.

Once a promise has been settled, i.e., it's no longer _pending_, its state will never change again.

## 5. Resolving Promises

So, how does a promise become `fulfilled`?

By calling the `resolve` function...

```js
const p = new Promise(function(resolve, reject) {
  let value = 42;
  resolve(value);
});
```

The promise, `p`, has been _resolved_ with the value `42` and is now in the state of `fulfilled`.

Note that promises can only be resolved with a single JS expression (value/thing), however a "thing" can an object, etc.

### Obtaining the Resolved Value from a Promise

How do we get the value of a resolved promise?

By calling the promise's `.then()` method...

```js
const p = new Promise(function(resolve, reject) {
  const value = 42;
  resolve(value);
});

p.then(function(result) {
  console.log(result);
});
```

The `.then()` method will execute the provided callback after the promise moves to the `fulfilled` state (is resolved).

If need be, the `.then()` method can be called multiple times and will always return the same resolved value/thing.

### Let's Make the Promise Asynchronous

So far our code is synchronous.

To make it a bit more interesting let's use a `setTimeout()` to resolve it asynchronously:

```js
const p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('Timed out!');
  }, 2000);
});

p.then(function(result) {
  console.log(result);
});
```

Nice, we've seen how to successfully `resolve` a promise, but what if the asynchronous operation fails...

## 6. Rejecting Promises

If an asynchronous operation fails, it calls the `reject` function instead of `resolve`:

```js
const p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    reject('Something went wrong!');
  }, 2000);
});
```

After 2 seconds, we'll see an `UnhandledPromiseRejection: ...` error.

Reading the error more closely reveals that we need a `.catch()` to handle the promise rejection...  

### Handling Rejected Promises

In Node, the callback functions provided to an asynchronous operation have the familiar "error first signature":

```js
Movie.find({}, function(err, movies) {
  if (err) ... // Async op failed
});
```

However, when a promise-based asynchronous function/method calls `reject`, we handle the error using `.catch()`.

For example:

```js
Movie.find({}).then(function(movies) {
  // Promise was resolved
}).catch(function(err) {
  // // Async op failed thus the promise was rejected
});
```

Let's chain on a `.catch()` method call to handle when `p` is rejected:

```js
p.then(function(result) {
  console.log(result);
}).catch(function(err) {
  console.log(err);
});

// -> Something went wrong!
```

That's better!

In summary...

<img src="https://i.imgur.com/B0nzUpC.png">

### ❓ Promises - Review Questions (1 min)

<details>
<summary>
(1) In JS, asynchronous functions/methods are designed to work with callbacks and/or _________.
</summary>
<hr>

promises

<hr>
</details>

<details>
<summary>
(2) What three states can a promise be in?
</summary>
<hr>

<code>pending</code>, <code>fulfilled</code> or <code>rejected</code>

<hr>
</details>

<details>
<summary>
(3) What method do we call on a promise to obtain its resolved value?
</summary>
<hr>

<code>.then()</code>

<hr>
</details>

## 7. Chaining Promises

Do you remember having to nest callback functions?

It can get ugly...

<img src="https://i.imgur.com/Zyq5zZU.png">

The advantage of promises is that they "flatten" the async flow and thus avoid the so-called "pyramid of doom".

By chaining one `.then()` after another we can keep the code "flat" and avoid nested callback functions:

```js
const p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('hello');
  }, 2000);
});

p.then(function(result) {
  console.log(result);  // -> hello
  return 42;
}).then(function(result) {
  console.log(result);  // -> 42
  return 'Done!'
}).then(function(result) {
  console.log(result);  // -> Done!
});
```

👉 Note that although we are returning primitive values from the callback functions, the `.then()` method **always** returns a promise that resolves to the value we returned.

Let's see what happens if we return promises instead of primitives...

First we need a cool asynchronous function that returns a promise:

```js
function asyncAdd(a, b, delay) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(a + b);
    }, delay);
  });
}
```

As you can see, the above function returns a promise that resolves to the result of adding two numbers after a delay (ms).

Here's some code that demonstrates promise chaining:

```js
asyncAdd(5, 10, 2000)
  .then(function(sum) {
    console.log(sum);
    return asyncAdd(sum, 100, 1000);
  })
  .then(function(sum) {
    console.log(sum);
    return asyncAdd(sum, 1000, 2000);
  })
  .then(function(sum) {
    console.log(sum);
  });
```

Note that when the `.then()` callback returns a promise, the next `.then()` is called when _that_ promise resolves.

Nice, we've made our own promises, resolved them, and chained them!

More commonly though, we'll be using/consuming promises returned by libraries such as Mongoose in the near future.

## 8. Using `async`/`await`

JavaScript became more awesome when Promises were added to the language in ES2015.

However, it was made super awesome when [async](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) and [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) were added with ES2017.

`async`/`await` provide a way to consume promises that make it seem like we're working with synchronous instead of asynchronous code.

### Express/Mongoose Example - With & Without `async`/`await`

As an example, let's again preview how you'll be using Mongoose to retrieve data in a controller function...

First, using `.then()` instead of `async`/`await`:

```js
// controllers/movies.js

function index(req, res) {
  Movie.find({}).then(function(movies) {
    res.render('movies/index', { movies });
  });
}
```

Now, let's take advantage of `async`/`await`:

```js
// controllers/movies.js

// To use await within a function, we declare it as an async function
async function index(req, res) {
  // await the find() method's promise to resolve
  const movies = await Movie.find({});
  res.render('movies/index', { movies });
}
```

As you can see above:
- The `await` keyword basically pauses the function's execution until the provided promise is fulfilled
- The resolved value is returned, allowing us to assign the resolved data to a variable

### Convert our `asyncAdd` Code to Use `async`/`await`

Instead of chaining the `.then()` methods, here's how we can use `async`/`await` instead:

```js
function asyncAdd(a, b, delay) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(a + b);
    }, delay);
  });
}

// asyncAdd(5, 10, 2000)
//   .then(function(sum) {
//     console.log(sum);
//     return asyncAdd(sum, 100, 1000);
//   })
//   .then(function(sum) {
//     console.log(sum);
//     return asyncAdd(sum, 1000, 2000);
//   })
//   .then(function(sum) {
//     console.log(sum);
//   });

// Wrap the code in an IIFE (Immediately Invoked Function Expression)
// so that we can use await
(async function() {
  let sum = await asyncAdd(5, 10, 2000);
  console.log(sum);
  sum = await asyncAdd(sum, 100, 1000);
  console.log(sum);
  sum = await asyncAdd(sum, 1000, 2000);
  console.log(sum);
})();
```

Although in Replit.com we have to use an IIFE so that `await` is used within an `async` function, it's now possible to use [top-level await](https://v8.dev/features/top-level-await)!

The simple examples above do not fully illustrate the convenience provided by `async`/`await` - they truly are a game changer!

## 9. Further Study

Check out more about `async`/`await` [here](https://javascript.info/async-await).

## References

- [MDN - Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

