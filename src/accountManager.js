$("#add-account").click(() => $("#addAccountModal").addClass("active"));
function getColumnId(tableName, columnName) {
  try {
    const tableStructure = Api.GetDatabaseStructure();
    const table = tableStructure.find((table) => table.name === tableName);
    if (table) {
      const column = table.columns.find((column) => column.name === columnName);
      if (column) {
        return column.id; // This is the ColumnId you would use
      } else {
        console.error(
          `Column "${columnName}" not found in table "${tableName}".`
        );
      }
    } else {
      console.error(`Table "${tableName}" not found.`);
    }
  } catch (error) {
    console.error("Error: " + error);
    // Handle the error as needed
  }
}
const usernameColumnId = getColumnId("browsers", "username");
const statuscolumnId = getColumnId("browsers", "status");

function addAccount(
  accountTableId,
  accountColumns,
  accountTableId,
  taskTableId,
  logId
) {
  let cookies = document.querySelector('input[name="cookies"]').value;
  if (cookies != "") {
    cookies = extractCookies(cookies);
  }

  const accountData = {
    username: document.querySelector('input[name="username"]').value,
    password: document.querySelector('input[name="password"]').value,
    proxy: document.querySelector('input[name="proxy"]').value,
    recovery_email: document.querySelector('input[name="recovery_email"]')
      .value,
    recovery_pass: document.querySelector('input[name="recovery_pass"]').value,
    phone: document.querySelector('input[name="phone"]').value,
    cookies: cookies,
    posts: 0,
    fingerprint: "",
    following: 0,
    followers: 0,
    status: "added",
  };

  insertBrowserRow(accountData);
  removeTable();
  createTableHeader(columnNames.account);

  loadPageData(
    1,
    accountTableId,
    accountColumns,
    accountTableId,
    taskTableId,
    logId
  ); // Load the first page of account data when the page loads
}

// Usage:
// Assume you want to find the ColumnId of a column named "status" in the "browsers" table

async function findAccountByUsername(username) {
  try {
    // Get the table ID for the "browsers" table
    const tableId = Api.GetDatabaseStructure().find(
      (table) => table.name === "browsers"
    ).id;

    // Define the condition for selecting accounts with a matching username
    const condition = {
      Filter: {
        FilterList: [
          {
            ColumnId: usernameColumnId, // Replace with the actual column ID for "username"
            Type: "StringEquals",
            Data: username,
          },
        ],
      },
    };

    // Get the account with the matching username
    const result = await Api.DatabaseSelect(condition, tableId);

    if (result.length > 0) {
      return result[0]; // Return the first matching account
    } else {
      return null; // No matching account found
    }
  } catch (error) {
    console.error("Error finding account by username:", error);
    return null; // Return null in case of an error
  }
}

async function insertBrowserRow(data) {
  // Create an object representing the account data
  const existingAccount = await findAccountByUsername(data.username);

  if (existingAccount) {
    console.log(`An account with username '${data.username}' already exists.`);
    return; // Exit the function without inserting a duplicate
  }

  // Get the table id of the Accounts table
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "browsers";
  }).id;

  // Get the columns for the browsers table
  var columns = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "browsers";
  }).columns;

  // Create an object to hold the data for the new row
  var row = {};

  // Populate the object with the data for the new row

  row[columns.find((column) => column.name === "proxy").id] = data["proxy"];
  row[columns.find((column) => column.name === "name").id] = data["name"];

  // Insert the new row into the table
  Api.DatabaseInsert([], row, tableId)
    .then((InsertedRecordId) => {
      console.log(`browser Row inserted successfully ${InsertedRecordId}`);
    })
    .catch((error) => {
      console.log("Error inserting row:", error);
    });
}

function loadAccountData(accountData) {
  //console.log(accountData); // Log the accountData object to the console

  const tbody = document.querySelector("tbody");
  const row = document.createElement("tr");
  row.setAttribute("id", accountData.id);

  // Create a checkbox element
  const checkboxCell = document.createElement("td");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkboxCell.appendChild(checkbox);

  // Add other data cells
  const usernameCell = document.createElement("td");
  usernameCell.textContent = accountData["username"];
  row.appendChild(checkboxCell);

  row.appendChild(usernameCell);

  row.appendChild(document.createElement("td")).textContent =
    accountData["proxy"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["posts"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["following"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["followers"];
  row.appendChild(document.createElement("td")).textContent =
    accountData["status"];

  tbody.appendChild(row);
  return row;
}

async function removeBannedAccounts() {
  try {
    // Get the table ID for the "browsers" table
    const tableId = Api.GetDatabaseStructure().find(
      (table) => table.name === "browsers"
    ).id;

    // Define the condition for selecting accounts with status "banned"
    const condition = {
      Filter: {
        FilterList: [
          {
            ColumnId: statuscolumnId, // Replace with the actual column ID for "status"
            Type: "StringEquals",
            Data: "banned",
          },
        ],
      },
    };

    // Get the IDs of accounts with status "banned"
    const result = await Api.DatabaseSelect(condition, tableId);

    if (result.length === 0) {
      console.log("No accounts with status 'banned' found.");
      return;
    }

    const accountIdsToDelete = result.map((record) => record.id);

    // Delete the accounts with status "banned"
    await Api.DatabaseDelete(accountIdsToDelete, tableId);

    console.log(
      `Deleted ${accountIdsToDelete.length} accounts with status 'banned'.`
    );
  } catch (error) {
    console.error("Error removing banned accounts:", error);
  }
}
