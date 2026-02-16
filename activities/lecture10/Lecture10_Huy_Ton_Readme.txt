Name: Ton That Quang Huy
Number: B00938789

gitlab: https://git.cs.dal.ca/ton/csci3172

Regex

First Name:
^\s*[a-z]+(?:\s[a-z]+)?\s*$ with flag gim

Last Name:
^\s*[a-z]+(?:['-][a-z]+)*\s*\r?$  with flag gim 

Email:
^[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,6}$ with flag gim

Password
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{12,}$ with flag gm



Test Case Results

First Name
Passed: All test cases
Failed: None

Last Name
Passed: All test cases
Failed: None

Email
Passed: All test cases
Failed: None

Password
Passed: All test cases
Failed: None


Reflection

The first one is quite simple, and the only problem i got is choosing the flags. However the second one is a bit tricky, because it has some weird character in the end of the each name that i have to focus really carefully 
to notice. The solution is matching the ' and - character. Email is easier and just adding the appear character and we're all good, and also remember to use the gim flag. After struggle with the first two, the last two seems quite simple 
and the important thing to remember is to pay attention on different character, and remember to mention it in regex. 


