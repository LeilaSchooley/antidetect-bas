async function getActiveTab() {
  let activeTabName = document.querySelector(
    ".ui.vertical.menu .item.active"
  ).id;
  return activeTabName;
}

async function loadPageData(
  page,
  tableId,
  columns,
  accountTableId,
  taskTableId,
  logId
) {
  try {
    const allData = await getAllData(tableId, columns);
    const start = (page - 1) * numberPerPage;
    const end = start + numberPerPage;
    const pageData = allData.slice(start, end);

    clearTable(); // Clear existing table data before loading new page data
    if (tableId === accountTableId) {
      pageData.forEach((data) => loadAccountData(data));
    }
  } catch (error) {
    console.log("Error loading page data: " + error);
  }
}

// Event listener for the "Previous Page" button
document.getElementById("prevPage").addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    updatePageNumber();
    let activeTab = await getActiveTab(); // Assume this function returns either 'accounts' or 'tasks'
    //console.log(activeTab);

    const { tableId, columns } = getTableInfo(activeTab);
    let { tableId: accountTableId, columns: accountColumns } =
      getTableInfo("browsers");
    loadPageData(
      currentPage,
      tableId,
      columns,
      accountTableId,
      taskTableId,
      logId
    );
    //console.log("Current Page:", currentPage);
  }
});
// Event listener for the "Next Page" button
document.getElementById("nextPage").addEventListener("click", async () => {
  let activeTab = await getActiveTab(); // Assume this function returns either 'accounts' or 'tasks'
  const { tableId, columns } = getTableInfo(activeTab);

  const allData = await getAllData(tableId, columns);
  const totalPages = Math.ceil(allData.length / numberPerPage);

  let { tableId: accountTableId, columns: accountColumns } =
    getTableInfo("browsers");

  if (currentPage < totalPages) {
    currentPage++;
    updatePageNumber();
    loadPageData(
      currentPage,
      tableId,
      columns,
      accountTableId,
      taskTableId,
      logId
    );
    //console.log("Current Page:", currentPage);
  }
});

// Function to update the displayed page number
function updatePageNumber() {
  document.getElementById("currentPage").textContent = currentPage;
}
