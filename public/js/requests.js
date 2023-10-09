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
      const res = await fetch("../data/requests.json");
      const requests = await res.json();

      me.redraw(requests);
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
