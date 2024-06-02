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
`const usernameColumnId = getColumnId("browsers", "username");
const statuscolumnId = getColumnId("browsers", "status");

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
`
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

function loadBrowserData(accountData) {
  //console.log(accountData); // Log the accountData object to the console

  var parentElement = document.querySelector("tbody");

  // Assuming you have a parent element (e.g., tbody) with the id "profile-table-body"

  // Create a new table row
  var newRow = document.createElement("tr");
  newRow.setAttribute("id", "accountData.id");

  // Populate the table row with data
  var profileNameCell = document.createElement("td");
  profileNameCell.textContent = accountData["name"];
  newRow.appendChild(profileNameCell);

  var statusCell = document.createElement("td");
  statusCell.textContent = "Active";
  newRow.appendChild(statusCell);

  var proxyUrlCell = document.createElement("td");
  proxyUrlCell.textContent = accountData["proxy"];
  newRow.appendChild(proxyUrlCell);

  var buttonCell = document.createElement("td");

  var editButton = document.createElement("button");
  editButton.classList.add("ui", "blue", "button", "edit-btn");
  editButton.textContent = "Edit";
  buttonCell.appendChild(editButton);

  var deleteButton = document.createElement("button");
  deleteButton.classList.add("ui", "red", "button", "delete-btn");
  deleteButton.textContent = "Delete";
  buttonCell.appendChild(deleteButton);

  var statusButton = document.createElement("button");
  statusButton.classList.add("ui", "yellow", "button", "status-btn");
  statusButton.textContent = "Stop";
  buttonCell.appendChild(statusButton);

  newRow.appendChild(buttonCell);

  // Append the new row to the parent element
  parentElement.appendChild(newRow);
  return newRow;
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
