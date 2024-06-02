document.addEventListener("DOMContentLoaded", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
  });

  const { tableId: accountTableId, columns: accountColumns } =
    getTableInfo("browsers");

  document
    .getElementById("create-profile-btn")
    .addEventListener("click", function () {
      document.getElementById("create-profile-modal").classList.add("show");
    });

  document.querySelectorAll(".edit-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      document.getElementById("edit-profile-modal").classList.add("show");
      var profileName = document.querySelector(
        "input[name='profile-name']"
      ).value;
      var proxyurl = document.querySelector("input[name='proxy-url']").value;

      createProfile(accountTableId, accountColumns);
    });
  });

  document
    .getElementById("create-profile")
    .addEventListener("click", function () {
      createProfile();
    });

  document.querySelectorAll(".delete-btn").forEach(function (button) {
    button.addEventListener("click", function () {
      var profileName = this.dataset.profile;
      document.getElementById("profile-to-delete").textContent = profileName;
      document
        .getElementById("delete-confirmation-modal")
        .classList.add("show");
    });
  });

  document
    .getElementById("confirm-delete-btn")
    .addEventListener("click", function () {
      var profileName =
        document.getElementById("profile-to-delete").textContent;
      console.log("Delete Profile:", profileName);
      document
        .getElementById("delete-confirmation-modal")
        .classList.remove("show");
    });
});
