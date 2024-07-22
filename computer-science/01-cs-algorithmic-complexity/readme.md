# Introduction to Computer Science, Algorithms, and Big-O 

For today's morning exercise, we will start our foray into the basic fundamentals of computer science, starting with big-o notation.

### Learning Objectives 

- Find out how we will tackle computer science topics throughout the course 
- Define "algorithm" in simple terms 
- Identify what Big-O notation measures 
- Be able to determine the Big-O notation of any given function 

## Computer Science 

### What is it? 

> "Computer science is a discipline that involves the understanding and design of computers and computational processes. In its most general form it is concerned with the understanding of information transfer and transformation. Particular interest is placed on making processes efficient and endowing them with some form of intelligence. The discipline ranges from theoretical studies of algorithms to practical problems of implementation in terms of computational hardware and software."
>
> ([Source](https://www.cs.mtu.edu/~john/whatiscs.html))

Big-picture-wise, computer science is the study of problem solving, or the study of computing. But it covers many fields, such as: 

- Algorithms
- Data structures
- Mathematical logic
- Networking
- Computer Architecture
- Theory (Coding, Game, Graph)
- Artificial intelligence

Many think of computer science as a necessary prerequisite to do anything programming-related with a computer and *really know what you are doing*, or that knowing a certain amount of computer science is some kind of litmus test for a *true programmer*. This attitude perhaps unnecessarily mystifies an already difficult subject and field of study and, at worst, makes the learning curve seem so steep that it is like a learning barrier.

Decades ago, it was absolutely necessary to have an understanding of computer science to do anything with a computer. In the beginning of consumer computing, home computers were essentially electronics projects for enthusiasts and hardcore hobbyists. The types of things you could do with a computer were very limited, and of interest to people with specific interests. Computers have come a long way since then, and are equipped with operating systems that attempt to make it as easy as possible for anyone to use a computer.

**Something similar is true for programming, namely that not knowing any computer science is no longer a barrier to entry.**

### Our Approach to Computer Science in this Course

Our main focus in the Software Engineering Course is to help students build skills and create projects that can be shown to potential employers. This learning strategy has been successful for our graduates.

That said, we do understand the importance of basic CS concepts when it comes to approaching interviews in the field. This is why we will be occasionally introducing the fundamentals throughout the remainder of the course during morning exercises and so forth. 

In addition, by looking at market trends and gathering our top instructors we developed a series of lessons and activities available on our platform [myGA](http://my.generalassemb.ly/) that would best suit your learning paths. You will have access to the videos and slides developed by said instructors on myGA both during the course and after. This allows you to self-pace with the topics and review any topic at any time. 

### Intro to Algorithms 

> algorithm (n.) - a process or set of rules to be followed to attain a goal

Algorithm is a fancy word for recipe. When we have a problem, we take a **series
of steps to solve that problem**. Say I want a peanut butter and jelly sandwich,
and Andy has agreed to make it for me. The problem is, he doesn't know how.
Assuming an otherwise-adult set of knowledge, how might we tell Andy to make me
a sandwich?

> 1.  Go to the kitchen
> 1.  Find the bread, toaster, utensils, peanut butter, and jelly
> 1.  Toast the bread
> 1.  Using a knife or spoon, spread one slice of toast with peanut butter
> 1.  Spread the other slice of toast with jelly
> 1.  Place the two pieces of bread together
> 1.  Return to me with the sandwich (most important step)

That series of steps could be considered the algorithm to making a pb&j. 

## Big-O Notation 

Now that we have a general overview of computer science and algorithms, let's talk about how we can measure an algorithm's efficiency. As you'll soon find out the more you program, there are many many ways to solve one problem. Or, in other words, there can be many algorithms to solve the same issue. In small scale settings like ours and when you're just starting out, that is perfectly fine and we will constantly harp on "as long as it works, that's good!" But in larger production scale apps, say for example Twitter, determining the efficiency of algorithms become very important. 

This is where Big-O comes into play.

### What is Big-O Notation?

Essentially, a simplified analysis of an algorithm's efficiency. This notation standardizes how we discuss the efficiency of algorithms. **What Big-O really tells us is how quickly the runtime grows as the input becomes arbitrarily large.** Most of the time, we use Big-O notation to describe _time complexity_ as we'll be focusing on, but it can also be used to describe memory efficiency.

### General Rules for Determining the Big-O of an Algorithm 

1. When we calculate the Big-O of the function, we are calculating the _worst possible runtime case_ for a given function.
1. We always ignore constants / coefficients in order to _generalize_ the efficiency 

For time complexity, we want to count how many times the code is run in context of how large the input to the code is. For example, O(1) is a very efficient piece of code, O(N!) is very inefficient. Let's break this down into categories of Big-O.

## `O(1)` Complexity AKA Constant Complexity 

O(1) means that an algorithm's runtime is static or constant. The complexity stays the same no matter the input.

```js
function helloWorld(n) {
	console.log('hello world');
}

function addFive(n) {
	return 5 + n;
}
```

In both of the above examples, no matter what size the `n` argument is, the functions will only run once. This is considered a highly efficient algorithm as it is independent of the input size.

<details><summary><strong>Click to see a graph charting the complexity</strong></summary><p>
	
![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/8-Input-Size-Run-Time-Graph.png)

</p></details>

## `O(N)` Complexity AKA Linear Complexity 

O(N) complexity means that, as the input sizes increase, the processing time increases linearly. Or, more simply, the code runs once for each input.

```js
function iterateLoop(n) {
  for(let i =0; i < n; i++) {
    console.log(i)
  }
}
```

In the above example, if n is 1, the function will run 1 time. If n is 1000, the function will run 1000 times. The runtime grows linearly along with the input size. This type of complexity is considered decent efficiency.

<details><summary><strong>Click to see a graph charting the complexity</strong></summary><p>
	
![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/6-Input-Size-Run-Time-Graph.png)

</p></details>

## `O(N^2)` Complexity AKA Quadratic Complexity 

O(N^2) complexity means that, the amount of time the algorithm takes to complete is increased by n * n! Hence, it is quadratic. 

```js
function consoleLogLots (arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j])
    }
  }
}
```
For the array `[1, 3]`, this function will print:
```js
[1, 1]
[1, 3]
[3, 1]
[3, 3]
```

For a 2 item array, the code executes 4 times. For 3 items, the code executes 9 times.  This scales pretty fast -- for an array with 100 items this code will `console.log` 10,000 times! Unsurprisingly, this type of complexity is considered inefficient as its runtime grows quickly.

<details><summary><strong>Click to see a graph charting the complexity</strong></summary><p>
	
![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/10-Input-Size-Run-Time-Graph.png)

</p></details>

## `O(log n)` and `O(n log n)` Complexity AKA Logarithmic Complexity 

O(log n) refers to algorithms which cut the problem in half each time. We don't actually have to calculate logs or anything like that, but let's have a quick refresher on logarithms to understand what we mean by "cutting in half". 

### Refresher on Logarithms 

Logarithms essentially ask us a question. 

Take for example: log2(32) 

The question it's asking us is: what would I need to raise 2 to the power of in order to get the number in the parentheses? Or, mathematically written: 2^n = 32, what is n? 

How would we find this? We would need to continuously divide our end result 32 by our base 2 and count the amount of times it takes to get all the way down to 1. In other words, we need to keep halving our end result until we get the solution.

32 => 16 => 8 => 4 => 2 => 1

How many times did we have to halve until we got down to 1? 5 times, therefore n = 5, which we can easily prove by taking 2^5. 

This is where the "cutting in half" comes from. In computer science, we usually work with logs with a base of 2. 

### An Example 

One example of an O(log n) algorithm is a binary search. In an unsorted array, if we want to find the index of an item with a given value, we have to iterate through it and check if each item is equal to the item we are searching for. However, if we know that we have a _sorted array_, we can do this a lot easier!

For example, say we have an array `[1, 3, 5, 7, 9, 11, 13]` and we want to find the index of 5. We can do so like this: 

- Find the item at the midpoint of the array. This ends up being 7.
- Our item is below 7, so then, since our array is sorted, we only have to search the half of the array before the 7.
- The midpoint of the sub array from 1-7 or [1, 3, 5] is 3.
- This time, 5 is larger than 3, so we search the sub-array [5]. Since the midpoint of that array 5 is equal to the number we are searching for, we just return that number.

That sort of algorithm has a complexity of O(log n) as it cuts the problem in half each time until it finds the answer. This type of complexity is considered very efficient. The process might seem more complicated than a linear one, but it greatly reduces the time. 

<details><summary><strong>Click to see a graph charting the complexity</strong></summary><p>
	
![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/9-Input-Size-Run-Time-Graph.png)

</p></details>

## `O(N!)` Complexity AKA Factorial Complexity 

A refresher on factorials: a factorial of a number is product of all positive integers less than or equal to that number. 

For example: 3! = 3 * 2 * 1 = 6 

Another example, just a few numbers up from 3: 7! = 7 * 6 * 5 * 4 * 3 * 2 * 1 = 5040 

One example of an O(n!) algorithm is the brute force approach to the [Traveling Salesman Problem](https://en.wikipedia.org/wiki/Travelling_salesman_problem) -  "Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city exactly once and returns to the origin city?".

![URL section](https://upload.wikimedia.org/wikipedia/commons/2/2b/Bruteforce.gif)
An algorithm to try all possible combinations of paths will have a complexity of O(n!)!

As you can see, factorials grow very quickly, and so an algorithm with this complexity is considered highly efficient and should be avoided when possible. 

<details><summary><strong>Click to see a graph charting the complexity</strong></summary><p>
	
![](https://ga-instruction.s3.amazonaws.com/assets/tech/computer-science/big-o/english/7-Input-Size-Run-Time-Graph.png)

</p></details>

## Chart Summary of the Complexities 

![](https://i.stack.imgur.com/jIGhf.png)

## How to Determine Big-O 

Now that we know the types of Big-O notation there are, how do we actually determine the type for any given function? 

Remember the general from earlier: 

1. When we calculate the Big-O of the function, we are calculating the _worst possible runtime case_ for a given function.
1. We always ignore constants / coefficients in order to _generalize_ the efficiency 

For these types of problems, ask yourself: 
- Does the function have to go through an entire list? If so, there's an N in that Big O class somewhere.
- Are there nested loops? That might give you O(N^2) (or worse).
- Does the function break the list into smaller chunks? You could have O(log(N)).
- Is the amount of work the same, regardless of the size of the dataset? That means it's O(1).

### Let's do some examples: 

What is the Big-O of this helloWord function?

```js
function helloWorld(n) {
  console.log(‘hello’);
  console.log(‘world’);
}
```

What is the Big-O of this bigO function? 

```js
function bigO(n) {
  x = 5 + 1; 
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

## Your Turn 

Ready to work through figuring out some Big O on your own?

- [See the big-o-activity markdown](big-o-exercise.md)
