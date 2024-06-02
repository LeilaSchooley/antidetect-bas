function switchTab(tabName) {
  $(".ui.tab.segment").hide();
  $(".ui.tabular.menu .item").removeClass("active");
  $(`.ui.tab.segment[data-tab="${tabName}"]`).show();
  $(`.ui.tabular.menu .item[data-tab="${tabName}"]`).addClass("active");
}

// Function to close modal
function closeModal() {
  const modal = document.querySelector(".ui.modal.active");
  if (modal) {
    modal.classList.remove("active");
    document.body.classList.remove("modal-open");
    clearInputFields();
  }
}

// Function to create table header
function createTableHeader(columnNames) {
  let table = document.querySelector("table");
  let tableHeader = document.querySelector("thead");
  if (!tableHeader) {
    tableHeader = document.createElement("thead");
    table.appendChild(tableHeader);
  }

  tableHeader.innerHTML = "";

  const headerRow = document.createElement("tr");
  columnNames.forEach((columnName) => {
    const headerCell = document.createElement("th");
    headerCell.textContent = columnName;
    headerRow.appendChild(headerCell);
  });
  tableHeader.appendChild(headerRow);
}

async function updateTableRowCount(accountTableId, accountColumns) {
  try {
    // Fetch all accounts using the getAllData function
    const allAccounts = await getAllData(accountTableId, accountColumns);
    
    // Get the count of all accounts
    const accountCount = allAccounts.length;

    // Create an h1 element
    const h1Element = document.createElement('h1');
    
    // Style the h1 element
    h1Element.style.fontSize = '1rem';  // Set a smaller font size
    h1Element.style.margin = '10px 0';  // Add some margin above and below
    h1Element.style.paddingLeft = '10px';  // Add some padding to the left
    h1Element.style.position = 'relative';  // Set position to relative to place it correctly

    // Set the text content of the h1 element
    h1Element.textContent = `Accounts: ${accountCount}`;

    // Get the table element
    const tableElement = document.querySelector('table');

    // Insert the h1 element into the DOM just before the table
    tableElement.parentNode.insertBefore(h1Element, tableElement);

  } catch (error) {
    console.error("Error: " + error);
    // Handle the error as needed
  }
}



function removeTable(page = false) {
  const tableBody = document.querySelector("tbody");
  const tableHeader = document.querySelector("thead");
  const body = document.getElementById("content");
  if (tableBody) {
    tableBody.innerHTML = "";
  }
  if (tableHeader) {
    tableHeader.innerHTML = "";
  }

  if (page) {
    body.innerHTML = "";
  }
}

// Function to clear input fields
function clearInputFields() {
  bulkImportAccountsFileInput.value = "";
  bulkImportProxyFileInput.value = "";
  fileDisplay.value = "";
  proxyFileDisplay.value = "";
}

function clearTable() {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  rowIdCounter = 1; // Reset the row ID counter when the table is cleared
}
