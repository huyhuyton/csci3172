Name : Huy Ton
Banner: B00938789

timberlea: https://web.cs.dal.ca/~ton/csci3172/labs/lab2/
gitlab: https://git.cs.dal.ca/ton/csci3172


(a) What is the scope of a const variable?
A const variable has block scope, which means it can only be used inside the block where it is declared, such as within a loop, function, or conditional statement. It must be assigned a value when it is created and cannot be reassigned later in the program.


(b) When were the let and const keywords added to JavaScript?
The let and const keywords were introduced in 2015 as part of the ECMAScript 2015 (ES6) update to JavaScript.

(c) If you were to change let to var in your script(s), would your script still work? Why or why not?
The script would likely still run, but it could cause unexpected behavior. This is because var is function-scoped rather than block-scoped, which can lead to variables being reused or overwritten unintentionally. Using let helps avoid these issues and makes the code easier to manage and understand.

