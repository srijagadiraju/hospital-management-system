function loginSignUp() {
  let signupButton = document.getElementById("signupButton");
  let signinButton = document.getElementById("signinButton");

  function isValidEmail(email) {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return pattern.test(email);
  }
  function handleSignIn() {
    const emailInput = document.querySelector('#login-form input[type="text"]');
    const idInput = document.querySelector('#login-form input[type="id"]');
    const passwordInput = document.querySelector(
      '#login-form input[type="Password"]'
    );

    if (!isValidEmail(emailInput.value)) {
      alert("Please Enter a valid email address");
      return null;
    }

    const userData = {
      email: emailInput.value,
      ID: idInput.value,
      password: passwordInput.value,
    };

    console.log(userData);
    return userData;
  }

  signupButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = await handleSignIn();

    try {
      const res = await fetch("/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        alert("You have successfully signed up! Please log in now");
        window.location.href = "./login.html";
      } else {
        alert("Please try again with valid email addresss");
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(data);
  });

  signinButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = await handleSignIn();

    try {
      const res = await fetch("/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 200) {
        sessionStorage.setItem("email", data.email);
        window.location.href = "./posts.html";
        alert("You have logged in successfully");
      } else {
        alert("You have logged in wrong email or password!");
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(data);
  });
}

loginSignUp();
