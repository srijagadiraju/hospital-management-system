function login() {
  const form = document.getElementById("login-form");
  let signupButton = document.getElementById("signupButton");
  let signinButton = document.getElementById("signinButton");
  let nameField = document.getElementById("nameField");
  let title = document.getElementById("title");

  function isValidEmail(email) {
    // This is a simple regex pattern for email validation. You can make it more complex if needed.
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

    console.log(userData); // Here, you can send this data to your server or do other processing
    return userData;
  }

  signinButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = handleSignIn();
    console.log(JSON.stringify(data));
    try {
      let res = await fetch("./login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: new URLSearchParams(data),
      });
      if (res.status === 200) {
        sessionStorage.setItem("email", data.email);
        window.location.href = "./request.html";
      } else {
        alert("You have logged in wrong email or password!");
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(data);
  });
}

login();
