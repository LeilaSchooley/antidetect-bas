function createProfile(
  accountTableId,
  accountColumns,
  accountTableId,
  taskTableId,
  logId
) {
  const accountData = {
    name: document.querySelector("input[name='profile-name']").value,
    proxyurl: document.querySelector("input[name='proxy-url']").value,
  };

  insertAccountRow(accountData);
  //removeTable();
  //createTableHeader(columnNames.account);
}
async function insertAccountRow(data) {
  // Create an object representing the account data

  // Get the table id of the Accounts table
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name == "browsers";
  }).id;

  // Get the columns for the Accounts table
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
