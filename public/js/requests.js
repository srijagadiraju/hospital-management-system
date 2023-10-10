function RequestsModule(requestsID = "#requests") {
  const me = {};

  const requestsElement = document.querySelector(requestsID);

  function createRequestCard(request) {
    return `<div class="col-4">
          <div class="request card">
              <div class="card-body">
                  <h5 class="card-title">${request.name}</h5>
                  <p><strong>ID:</strong> ${request.id}</p>
                  <p><strong>Department:</strong> ${request.department}</p>
                  <p><strong>Item:</strong> ${request.item}</p>
                  <div class="card-buttons">
                      <button class="btn-accept">Update Request</button>
                      <button class="btn-delete">Remove Request</button>
                  </div>
              </div>
          </div>
      </div>`;
  }

  function redraw(requests) {
    requestsElement.innerHTML = "";
    requestsElement.innerHTML = requests.map(createRequestCard).join("\n");
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

  me.redraw = redraw;
  me.loadRequests = loadRequests;

  return me;
}

// Initialize the RequestsModule and load requests
document.addEventListener("DOMContentLoaded", function () {
  const requestsModule = RequestsModule("#requests");
  requestsModule.loadRequests();
});
