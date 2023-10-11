function RequestsModule(requestsID = "#requests") {
  const me = {};

  const requestsElement = document.querySelector(requestsID);
  const updateForm = document.querySelector(".form-box");
  const overlay = document.querySelector(".overlay");
  const btnCloseModal = document.querySelector(".btn--close-modal");
  const submitBtn = document.getElementById("submitRequest");

  function createRequestCard(request) {
    return `<div class="col-4">
          <div class="request card request-card" data-id="${request.id}">
              <div class="card-body">
                  <h5 class="card-title">${request.name}</h5>
                  <p><strong>ID:</strong> ${request.id}</p>
                  <p><strong>Department:</strong> ${request.department}</p>
                  <p><strong>Item:</strong> ${request.item}</p>
                  <div class="card-buttons">
                      <button class="btn-update">Update Request</button>
                      <button class="btn-delete">Remove Request</button>
                  </div>
              </div>
          </div>
      </div>`;
  }

  function handleRequest() {
    // 1. Retrieve the input values.
    const name = document.querySelector(
      ".request-form input[placeholder='Name']"
    ).value;
    // const id = document.querySelector(
    //   ".request-form input[placeholder='ID']"
    // ).value;
    const department = document.querySelector(
      ".request-form input[placeholder='Department']"
    ).value;
    const item = document.querySelector(
      ".request-form input[placeholder='Item']"
    ).value;

    // 2. Create a JSON object.
    const requestData = {
      name: name,
      // id: id,
      department: department,
      item: item,
    };
    return requestData;
  }
  function redraw(requests) {
    requestsElement.innerHTML = "";
    requestsElement.innerHTML = requests.map(createRequestCard).join("\n");
  }
  function openModal() {
    updateForm.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }

  const closeModal = function () {
    updateForm.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  btnCloseModal.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  async function clickForUpdate(dataID) {
    submitBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      data = await handleRequest();
      data.id = dataID;
      console.log("being clicked", data);
      try {
        const res = await fetch("/request", {
          method: "put",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        if (res.status === 200) {
          alert("The request has been updated");
          window.location.href = "./posts.html";
        } else {
          alert("Failed to update!");
        }
      } catch (err) {
        console.log(err.message);
      }
    });
  }

  async function loadRequests() {
    const res = await fetch("/request", {
      method: "get",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const responseJson = await res.json();
    const requestData = responseJson.data.requests;

    me.redraw(requestData);
  }

  async function delAndUpdateRequest(request) {
    let dataID = "";
    requestsElement.addEventListener("click", async function (e) {
      e.preventDefault();

      console.log(e.target);
      if (e.target.classList.contains("btn-update")) {
        const clickedRequestID = e.target.closest(".request-card");
        console.log("hello, ", updateForm);

        openModal();

        dataID = clickedRequestID.getAttribute("data-id");
      }

      clickForUpdate(dataID);

      if (e.target.classList.contains("btn-delete")) {
        const clickedRequestID = e.target.closest(".request-card");
        const requestID = { id: clickedRequestID.getAttribute("data-id") };
        console.log(requestID);
        try {
          const res = await fetch("/request", {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestID),
          });
          if (res.status === 204) {
            alert("The request has been deleted");
            window.location.href = "./posts.html";
          } else {
            alert("Failed to delete!");
          }
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  }
  me.delAndUpdateRequest = delAndUpdateRequest;
  me.redraw = redraw;
  me.loadRequests = loadRequests;

  return me;
}

document.addEventListener("DOMContentLoaded", function () {
  const requestsModule = RequestsModule("#requests");
  requestsModule.loadRequests();
  requestsModule.delAndUpdateRequest();
});
