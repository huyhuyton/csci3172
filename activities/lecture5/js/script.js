// Create an array of possible answers
const magicEightBall = [
    "It is certain.",
    "Ask again later.",
    "Don't count on it.",
    "Yes, definitely.",
    "Signs point to yes.",
];

const fortuneCookie = [
    "Do not be afraid of competition",
    "You love peace",
    "Get your mind set... confidence will lead you on.",
    "Sell your ideas, they have exceptional merit.",
];
  
// Create a function to fetch the question the user has asked 	
// Our function should also check from an empty value
function getAnswer(){
    const question = document.getElementById("question").value;

    if (question === "") {
        alert("Please enter a question.");
        return;
    }


  
// Select a random answer from your array 
const answerList = Math.floor(Math.random() * 2);
let answer;

if(answerList === 0){
    answer = magicEightBall; 

}else{
    answer = fortuneCookie; 
}

const randomAnswer = Math.floor(Math.random() * answer.length);
const answers = answer[randomAnswer];

	
// Display the question and answer back to the user
// And, log the question and answer to the console
document.getElementById("output").innerText = "Question: " + question + "\nAnswer: " + answers;

console.log("Question:", question);
console.log("Answer:", answers);
return answers; 
}