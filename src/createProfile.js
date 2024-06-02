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
async function removeBannedAccounts() {
  try {
    // Get the table ID for the "accounts" table
    const tableId = Api.GetDatabaseStructure().find(
      (table) => table.name === "accounts"
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
