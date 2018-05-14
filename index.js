var assert = require("assert");

// Assumptions: words are delimited by one space, punctuation is at
// End of words


// Check if parameter is a vowel except U and u (piglatin rules)
const isvowel = (char) => {
	if(char.match(/[AaEeIiOo]/)){
		return true;
	}
	return false;
};

// Check for punctuation
const punctuate = (word) => {
	let end = word.length-1;
	while (word[end].match(/\W/) ){
		end--;
	}
    
	return end; // Return index of last of alphabetical char
};

// Check for consonants at the beginning of the word
const findConsonants = (word) => {
	let start = 0;
	while (!isvowel(word[start]) ){
		start++;
	}
    
    
	return start; // Return index of last of consonants char
};

// Apply piglatin to one word
const piglatinword = (word) => {
	// Check if first letter is a capital letter:
	let capped = word[0].match(/[A-Z]/) ? true : false; 
	let end = punctuate(word); // Store end of alphabetical string index
	let start = findConsonants(word); // Store start of vowels in string
	let c = word.slice(0, start).toLowerCase(); // Consonants at start of string
    
	// If there is punctuation, store it in p
	let p = (end === word.length-1) ? "" : word.slice(end+1, word.length).toLowerCase();
	// Construct new word:
	word = word.slice(start, end+1).toLowerCase() + c + "ay" + p; 
	// If first letter was capped, cap first letter of new word
	word = capped ? word[0].toUpperCase() + word.slice(1, word.length) : word;
    

	return word;       
};

const piglatin = (string) => {

	let arr = string.split(" "); // Split into array delimited by 
	for (let i = 0; i < arr.length; i++) {
		arr[i] = piglatinword(arr[i]); // Replace word with piglatin of itself
	}    
	return arr.join(" "); // Return new sentence
};


assert.equal(piglatin("hello world"), "ellohay orldway");
assert.equal(piglatin("Hello, world!!"), "Ellohay, orldway!!");
assert.equal(piglatin("eat apples"), "eatay applesay");
assert.equal(piglatin("Allo, world!!"), "Alloay, orldway!!");
assert.equal(piglatin("quick brown fox"), "ickquay ownbray oxfay");


