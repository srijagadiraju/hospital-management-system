function isLoggedIn() {
  console.log(sessionStorage);
  console.log(sessionStorage.getItem("email"));

  // implement your own logic to check if the user is logged in.

  return localStorage.getItem("email") !== null;
}

// Function to redirect to the login page if the user is not logged in

function redirectToLogin() {
  if (!isLoggedIn()) {
    // redirect the user to the login page

    return;
  }
}

// call this function to check and redirect if necessary on page load

redirectToLogin();
