// Write code inside the functions
// You will have to figure out what parameters to include
// All functions must use recursion
// You may find the string method slice helpful: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice

function factorial(n){
    // This function returns the factorial of a given number.
}

function fibonacci(){
    // This function returns the Nth number in the fibonacci sequence.
    // https://en.wikipedia.org/wiki/Fibonacci_number
    // For this function, the first two fibonacci numbers are 1 and 1
}

function isPalindrome() {
    // This function returns True if the provided string is a palindrome and returns false if it is not.
}
        

function changeXY() {
    // This function is given a string and returns a new string where all the lowercase 'x' chars have been changed to 'y' chars. No loops!
    // For example
    // changeXY("codex") → "codey"
    // changeXY("xxhixx") → "yyhiyy"
    // changeXY("xhixhix") → "yhiyhiy"
}


function findMax(){
    // This function returns the largest number in a given array.
}


// coinFlips is a hungry for more challenging recursion problem! Not required as part of the deliverable.
function coinFlips(){
    // This function returns an array of all possible outcomes from flipping a coin N times.
    // Input type: Integer
    // For example, coinFlips(2) would return the following:
    // ["HH", "HT", "TH", "TT"]
    // H stands for Heads and T stands for tails
    // Represent the two outcomes of each flip as "H" or "T"
}


module.exports = {
    factorial,
    fibonacci,
    isPalindrome,
    changeXY,
    findMax,
    coinFlips,
}
