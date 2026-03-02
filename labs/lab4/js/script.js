const LAB4KEY = "Lab4";

let usersDB = {
  AuRelionSOl1231: "AuRelionSOl1231&&*%#" 
};

try {
  const saved = localStorage.getItem(LAB4KEY);
  if (saved) usersDB = JSON.parse(saved);
} catch (e) {
  console.log("database loading error");
}

// build map for username and password and set for username existence
let userMap = new Map(Object.entries(usersDB));
let userSet = new Set(userMap.keys());

const rebuildStructures = () => {
  userMap = new Map(Object.entries(usersDB));
  userSet = new Set(userMap.keys());
};

const saveDB = () => {
  localStorage.setItem(LAB4KEY, JSON.stringify(usersDB));
  rebuildStructures();
};

// validation
const emailValidate = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,8}$/.test(email);

const userValidate = (username) => /^[A-Za-z][A-Za-z0-9]*$/.test(username);

const passwordValidate = (password) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/.test(password);

// feedback message
const showMessage = (text, ok) => {
    const box = document.querySelector("#message");
  
    if (!box) {
      return;
    }
  
    box.textContent = text;
  
    if (ok === true) {
      box.style.color = "green";
    } else {
      box.style.color = "red";
    }
  };

const markField = (el, ok) => {
    if (!el) {
      return;
    }
  
    if (ok === true) {
      el.style.borderColor = "green";
    } else {
      el.style.borderColor = "red";
    }
  };

// register function
const setupRegister = () => {
  const form = document.querySelector("#registerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      const { email, username, password, confirmPassword } = form.elements;

      const emailValue = email.value.trim();
      const usernameValue = username.value.trim();
      const passwordValue = password.value.trim();
      const confirmValue = confirmPassword.value.trim();

      [email, username, password, confirmPassword].forEach((x) => markField(x, true));

      if (!emailValue || !emailValidate(emailValue)) {
        markField(email, false);
        throw new Error("invalid email");
      }

      if (!usernameValue || !userValidate(usernameValue)) {
        markField(username, false);
        throw new Error("username invalid");
      }

      if (userSet.has(usernameValue)) {
        markField(username, false);
        throw new Error("username already exists");
      }

      if (!passwordValue || !passwordValidate(passwordValue)) {
        markField(password, false);
        throw new Error("password is weak, pls try again");
      }

      if (passwordValue !== confirmValue) {
        markField(confirmPassword, false);
        throw new Error("passwords do not match");
      }

      usersDB[usernameValue] = passwordValue;
      saveDB();

      console.log("registered:", usernameValue);
      showMessage("registered successfully", true);
      //redirect to login if succeed
      window.location.href = "login.html";
    } catch (err) {
      console.log(err.message);
      showMessage(err.message, false);
    }
  });
};

// login function

const setupLogin = () => {
    const form = document.querySelector("#loginForm");
    if (!form) return;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      try {
        const { loginUsername, loginPassword } = form.elements;
        const usernameVal = loginUsername.value.trim();
        const passwordVal = loginPassword.value.trim();
  
        [loginUsername, loginPassword].forEach((x) => markField(x, true));
  
        if (!usernameVal) {
          markField(loginUsername, false);
          throw new Error("username required");
        }
  
        if (!passwordVal) {
          markField(loginPassword, false);
          throw new Error("password required");
        }
  
        // refresh user storage
        try {
          const saved = localStorage.getItem(LAB4KEY);
          if (saved) usersDB = JSON.parse(saved);
        } catch (e) {}
        rebuildStructures();
  
        if (!userMap.has(usernameVal)) {
          markField(loginUsername, false);
          throw new Error("user not found");
        }
  
        if (userMap.get(usernameVal) !== passwordVal) {
          markField(loginPassword, false);
          throw new Error("wrong password");
        }
  
        console.log("login success:", usernameVal);
        showMessage("login success", true);
        //redirect to dashboard if succeed
        window.location.href = "dashboard.html";
      } catch (err) {
        console.log(err.message);
        showMessage(err.message, false);
      }
    });
  };

setupRegister();
setupLogin();