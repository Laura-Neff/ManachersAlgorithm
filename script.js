function process() {
	const CONTAINER = document.getElementById("container");

	var userInput = document.getElementById("input_string");

	var lps = manachers(userInput.value); // make a next step button?
	var lpsTag = document.createElement("span");
	lpsTag.innerHTML = "The Longest Palindromic Substring is \"" + lps + "\"";
	CONTAINER.appendChild(lpsTag);

	var dottedLine = document.createElement("div");
    dottedLine.innerHTML = "- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -";
    CONTAINER.appendChild(dottedLine);
}

function manachers (s) {
	var origStr = document.createElement("div");
	origStr.innerHTML = "The Original String Entered Is: " + s;

	document.getElementById("container").appendChild(origStr);
	document.getElementById("container").appendChild(document.createElement("br"));

    // Update the string to put hash "#" at the beginning, end and in between each character
    let updatedString = getUpdatedString(s);
    // Length of the array that will store the window of palindromic substring
    const length = 2 * s.length + 1;
    // Array to store the length of each palindrome centered at each element
    let p = new Array(length);
    p.fill(0);
    // Current center of the longest palindromic string
    let c = 0;
    // Right boundary of the longest palindromic string
    let r = 0;
    // Maximum length of the substring
    let maxLength = 0;
    // Position index
    let position = -1;

    for (let i = 0; i < length; i++) {
        // Mirror of the current index
        let mirror = 2 * c - i;
        // Check if the mirror is outside the right boundary of current longest palindrome
        if (i < r) {
            p[i] = Math.min(r - i, p[mirror]);
        }
        // Indices of the characters to be compared
        let a = i + (1 + p[i]);
        let b = i - (1 + p[i]);
        // Expand the window
        while (a < length && b >= 0 && updatedString[a] === updatedString[b]) {
            p[i]++;
            a++;
            b--;
        }
        // If the expanded palindrome is expanding beyond the right boundary of
        // the current longest palindrome, then update c and r
        if (i + p[i] > r) {
            c = i;
            r = i + p[i];
        }
        if (maxLength < p[i]) {
            maxLength = p[i];
            position = i;
        }

        var stepDiv = document.createElement("div");
    	stepDiv.innerHTML = "Step " + (i + 1);
    	stepDiv.appendChild(document.createElement("br"));

    	var textSpan = document.createElement("span");
    	var lengthSpan = document.createElement("span");
    	var blankDiv = document.createElement("div");
    	blankDiv.setAttribute("class", "blank_div");

    	for (let j = 0; j < updatedString.length; j++) {
    		let textSpanChar = document.createElement("span");
    		textSpanChar.innerHTML = updatedString.charAt(j);


    		if (j >= position - maxLength && j <= position + maxLength) { // overall longest palindromic substring
    			textSpanChar.setAttribute("class", "lps");
    		}

    		if (j >= 2 * c - r && j <= r) { // current longest palindromic substring
    			textSpanChar.setAttribute("class", "cur_lps");
    		}

    		textSpan.appendChild(textSpanChar);

    		//textSpan.innerHTML += j;
       		//textSpan.innerHTML += " ";

    	}

    	for (let j of p) {
    		let lengthSpanChar = document.createElement("span");
    		lengthSpanChar.innerHTML = j;
    		lengthSpan.appendChild(lengthSpanChar);

    		//lengthSpan.innerHTML += j;
    		//lengthSpan.innerHTML += " ";
    	}

    	stepDiv.appendChild(textSpan);
    	stepDiv.appendChild(document.createElement("br"));
    	stepDiv.appendChild(lengthSpan);
    	stepDiv.appendChild(document.createElement("br"));
    	stepDiv.appendChild(blankDiv);


    	document.getElementById("container").appendChild(stepDiv);
    }

    let offset = p[position];
    let result = "";
    for (let i = position - offset + 1; i <= position + offset - 1; i++) {
        if (updatedString[i] !== '#') {
            result += updatedString[i];
        }
    }
    return result;
};

function getUpdatedString(s) {
    let sb = "";
    for (let i = 0; i < s.length; i++) {
        sb += "#" + s[i];
    }
    sb += "#";
    return sb;
}

// code source: https://redquark.org/leetcode/0005-longest-palindromic-substring/#javascript