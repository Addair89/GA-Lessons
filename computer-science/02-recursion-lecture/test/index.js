const expect = require('chai').expect;
const {
	findMax,
	factorial,
	fibonacci,
	coinFlips,
	isPalindrome,
	changeXY,
} = require('../recursion');

describe('factorial', () => {
	it('should accurately calculate factorials', () => {
		expect(factorial(3)).to.equal(6);
		expect(factorial(5)).to.equal(120);
	});
});

describe('fibonacci', () => {
	it('should accurately return base cases', () => {
		expect(fibonacci(1)).to.equal(1);
		expect(fibonacci(2)).to.equal(1);
	});
	it('should accurately calculate subsequent numbers', () => {
		expect(fibonacci(3)).to.equal(2);
		expect(fibonacci(4)).to.equal(3);
		for (let i = 3; i < 10; i++) {
			expect(fibonacci(i)).to.equal(fibonacci(i - 1) + fibonacci(i - 2));
		}
	});
});

describe('isPalindrome', () => {
	it('should determine a string on 1 letter is a palindrome', () => {
		expect(isPalindrome('z')).to.be.true;
	});
	it('should accurately identify a non palindrome', () => {
		expect(isPalindrome('abcd')).to.be.false;
	});
});

describe('changeXY', () => {
	it('should not modify a string with no Xs', () => {
		let testString = 'abdscea';
		expect(changeXY(testString)).to.equal(testString);
	});
	it('should turn a string of only Xs into a string of only Ys', () => {
		expect(changeXY('xxxxx')).to.equal('yyyyy');
	});
	it('should turn Xs at start and end of string into Ys', () => {
		expect(changeXY('xabcx')).to.equal('yabcy');
	});
});

describe('findMax', () => {
	it('should find the largest number in an array', () => {
		let testArray = [3, 4, 2, 1, 2];
		expect(findMax(testArray)).to.equal(4);
	});
	it('should work for negative numbers', () => {
		let testNegatives = [-1, -4, -2];
		expect(findMax(testNegatives)).to.equal(-1);
	});
});

describe('coinFlips', () => {
	it('should return an array', () => {
		expect(Array.isArray(coinFlips(2))).to.equal(true);
	});
	it('should include all possibilities', () => {
		let results = coinFlips(4);
		expect(results.includes('HHHH')).to.equal(true);
		expect(results.includes('HTHT')).to.equal(true);
		expect(results.includes('TTTT')).to.equal(true);
		expect(results.length).to.equal(16);
	});
});
