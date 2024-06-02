async function getAllData(tableId, columns, filterCriteria = {}) {
  try {
    // Create an array to hold the data
    var data = [];

    // Get records from the database using async/await with the provided filter criteria
    const records = await Api.DatabaseSelect(
      { Filter: filterCriteria },
      tableId
    );

    // Loop through each record in the table
    for (const record of records) {
      // Create an object to hold the record data
      var obj = { id: record.id }; // Add the record ID to the object
      // Loop through each column and get the value for the current record
      for (const column of columns) {
        obj[column.name] = record.data[column.id];
      }

      // Add the object to the data array
      data.push(obj);
    }

    // Return the data array
    return data;
  } catch (error) {
    // Throw the error to be caught by the caller
    throw error.message;
  }
}

// Usage with async/await
async function loadTaskdata(tableId, columns) {
  try {
    const data = await getAllData(tableId, columns);
    renderTasks(data);
  } catch (error) {
    console.log("Error: " + error);
  }
}

// Usage with async/await
async function loadLogdata(tableId, columns) {
  try {
    const data = await getAllData(tableId, columns);
    renderLog(data);
  } catch (error) {
    console.log("Error: " + error);
  }
}

// Function to introduce a delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTableInfo(tableName) {
  // Get the table id
  var tableId = Api.GetDatabaseStructure().find(function (table) {
    return table.name === tableName;
  }).id;

  // Get the columns
  var columns = Api.GetDatabaseStructure().find(function (table) {
    return table.name === tableName;
  }).columns;

  return { tableId, columns };
}

function extractCookies(line) {
  if (line.includes("domain")) {
    let cookies = line.split(`[`)[1].split("]")[0];
    cookies = `{"cookies":[${cookies}]}`;
    cookies = cookies.replace(/""/g, '"');
    const encodedString = btoa(cookies);
    return encodedString;
  }
  return [];
}

async function getRecordById(tableId, columns, recordId) {
  try {
    console.log("record", recordId);
    const data = await getAllData(
      tableId,
      // your column definitions here
      columns
    );
    console.log(data);

    // Use the Array.prototype.find method to search for the record with the specified id
    const record = data.find((item) => item.id === recordId);

    if (record) {
      return record;
    }
    throw new Error("No record found with the specified ID.");
  } catch (error) {
    console.error(error.message);
  }
}
