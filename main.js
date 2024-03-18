import { fetchData } from "./modules.js";

const tblRecords = document.getElementById("tblRecords");

let arrRecords = [];
const tblTHsLabels = ["User ID", "Task ID", "Title", "Status"];

//get data from api
document.getElementById("btnload").addEventListener("click", async () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/todos/";
  const fetchedData = await fetchData(apiUrl);
  arrRecords = fetchedData.map((item) => ({
    userId: item.userId,
    taskId: item.id,
    title: item.title,
    completed: item.completed ? "Completed" : "Not Yet Completed",
  }));
  iterateRecords(arrRecords);
});

document.getElementById("btnclear").addEventListener("click", () => {
  tblRecords.innerHTML = "";
});

function iterateRecords(records) {
  tblRecords.innerHTML = ""; //clear sa
  const tblHeaderRow = document.createElement("tr");
  const tblHeader = document.createElement("thead");

  // Generate Table Headers
  tblTHsLabels.forEach((label) => {
    const tblTH = document.createElement("th");
    tblTH.textContent = label;
    tblHeaderRow.appendChild(tblTH);
  });

  tblHeader.appendChild(tblHeaderRow);
  tblRecords.appendChild(tblHeader);

  // Generate Table Body
  const tblBody = document.createElement("tbody");
  records.forEach((record) => {
    const tblRow = document.createElement("tr");
    for (const key in record) {
      const tblData = document.createElement("td");
      tblData.textContent = record[key];
      if (key === "completed") {
        if (record[key] === "Completed") {
          tblData.style.color = "green";
        } else {
          tblData.style.color = "red";
        }
      }
      tblRow.appendChild(tblData);
    }
    tblBody.appendChild(tblRow);
  });

  tblRecords.appendChild(tblBody);
}