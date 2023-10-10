function createRequestModule() {
  const submitBtn = document.getElementById("submitRequest");

  function handleRequest() {
    // 1. Retrieve the input values.
    const name = document.querySelector(
      ".request-form input[placeholder='Name']"
    ).value;
    const id = document.querySelector(
      ".request-form input[placeholder='ID']"
    ).value;
    const department = document.querySelector(
      ".request-form input[placeholder='Department']"
    ).value;
    const item = document.querySelector(
      ".request-form input[placeholder='Item']"
    ).value;

    // 2. Create a JSON object.
    const requestData = {
      name: name,
      id: id,
      department: department,
      item: item,
    };
    return requestData;
  }

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = await handleRequest();
    try {
      const res = await fetch("/request", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 201) {
        window.location.href = "./posts.html";
      } else {
        alert("You have logged in wrong email or password!");
      }
    } catch (err) {
      console.log(err.message);
    }
    console.log(data);
  });
}

createRequestModule();
