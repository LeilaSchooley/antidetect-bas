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
  //createTableHeader(columnNames.account);

  loadPageData(
    1,
    accountTableId,
    accountColumns,
    accountTableId,
    taskTableId,
    logId
  ); // Load the first page of account data when the page loads
}
