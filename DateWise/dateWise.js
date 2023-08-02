async function getDataDateWise(event) {
  event.preventDefault();
  // Display the spinner
  const spinner = document.getElementById("loadingSpinner");
  spinner.classList.remove("d-none");

  // Clear previous results
  const table = document.getElementById("results");
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  const date = document.getElementById("date").value;

  let url = "https://data.covid19india.org/data.json";
  let myobject = await (await fetch(url)).json();
  const casesTimeSeries = myobject["cases_time_series"];

  const dataHeader = document.getElementById("dataHeader");
  dataHeader.innerHTML = `
      <tr>
        <th scope="col">Daily confirmed</th>
        <th scope="col">Daily deceased</th>
        <th scope="col">Daily recovered</th>
        <th scope="col">Total confirmed</th>
        <th scope="col">Total deceased</th>
        <th scope="col">Total recovered</th>
      </tr>
    `;

  const dataRows = document.getElementById("dataRows");
  for (const i in casesTimeSeries) {
    if (casesTimeSeries[i]["dateymd"] === date) {
      let dailyConfirmed = casesTimeSeries[i]["dailyconfirmed"];
      let dailyDeceased = casesTimeSeries[i]["dailydeceased"];
      let dailyRecovered = casesTimeSeries[i]["dailyrecovered"];
      let totalConfirmed = casesTimeSeries[i]["totalconfirmed"];
      let totalDeceased = casesTimeSeries[i]["totaldeceased"];
      let totalRecovered = casesTimeSeries[i]["totalrecovered"];

      let row = `
          <tr>
            <td>${dailyConfirmed}</td>
            <td>${dailyDeceased}</td>
            <td>${dailyRecovered}</td>
            <td>${totalConfirmed}</td>
            <td>${totalDeceased}</td>
            <td>${totalRecovered}</td>
          </tr>
        `;

      dataRows.innerHTML = row;
      break;
    }
  }

  // Hide the loading spinner after the fetch is complete
  spinner.classList.add("d-none");
}
