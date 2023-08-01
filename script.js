async function load() {
  let url = "https://data.covid19india.org/data.json";
  let myobject = await (await fetch(url)).json();
  const casesTimeSeries = myobject["statewise"];
  const dataRows = document.getElementById("dataRows");
  const firstData = casesTimeSeries.shift();
  // casesTimeSeries.push(firstData);
  let totalConfirmedCase = firstData["confirmed"];
  let totalNewConfirmedCase = firstData["deltaconfirmed"];
  document.getElementById("totalConfirmed").innerHTML = totalConfirmedCase;
  document.getElementById("totalNewConfirmed").innerHTML =
    "[+" + totalNewConfirmedCase + "]";

  let totalActiveCase = firstData["active"];
  document.getElementById("totalActive").innerHTML = totalActiveCase;

  let totalRecoveredCase = firstData["recovered"];
  let totalNewRecoveredCase = firstData["deltarecovered"];
  document.getElementById("totalRecovered").innerHTML = totalRecoveredCase;
  document.getElementById("totalNewRecovered").innerHTML =
    "[+" + totalNewRecoveredCase + "]";

  let totalDeathsCase = firstData["deaths"];
  let totalNewDeathsCase = firstData["deltadeaths"];
  document.getElementById("totalDeaths").innerHTML = totalDeathsCase;
  document.getElementById("totalNewDeaths").innerHTML =
    "[+" + totalNewDeathsCase + "]";

  let lastUpdatedDate = firstData["lastupdatedtime"];
  document.getElementById("lastUpdatedTime").innerHTML = lastUpdatedDate;

  for (const i in casesTimeSeries) {
    let statename = casesTimeSeries[i]["state"];
    let confirmedCases = casesTimeSeries[i]["confirmed"];
    let newConfirmedCases = casesTimeSeries[i]["deltaconfirmed"];
    let recoveredCases = casesTimeSeries[i]["recovered"];
    let newrecoveredCases = casesTimeSeries[i]["deltarecovered"];
    let deaths = casesTimeSeries[i]["deaths"];
    let newdeaths = casesTimeSeries[i]["deltadeaths"];
    let activeCases = casesTimeSeries[i]["active"];

    let row = `
            <tr>
              <td>${statename}</td>
              <td>${confirmedCases}  <em style='color:red;'>( ${newConfirmedCases}) </em></td>
              <td>${activeCases}</td>
              <td>${recoveredCases}  <em style='color:darkgreen;'>( ${newrecoveredCases} )</em></td>
              <td>${deaths} ( ${newdeaths} )</td>
            </tr>
          `;
    dataRows.innerHTML += row;
  }

  // Chart
  const dataChart = myobject["cases_time_series"];
  const casesData = dataChart.map((item) => ({
    date: item.dateymd,
    recovered: parseInt(item.totalrecovered),
    confirmed: parseInt(item.totalconfirmed),
    active: parseInt(item.dailyconfirmed),
  }));

  // Extract dates and counts from the data array
  const dates = casesData.map((item) => item.date);
  const confirmedCounts = casesData.map((item) => item.confirmed);
  const recoveredCounts = casesData.map((item) => item.recovered);
  const activeCounts = casesData.map((item) => item.active);

  // Get the canvas elements and create individual charts
  const confirmedCanvas = document
    .getElementById("confirmedGraph")
    .getContext("2d");
  const confirmedChart = new Chart(confirmedCanvas, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Confirmed Cases",
          data: confirmedCounts,
          borderColor: "red",
          backgroundColor: "rgba(255, 0, 0, 0.1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });

  const recoveredCanvas = document
    .getElementById("recoveredGraph")
    .getContext("2d");
  const recoveredChart = new Chart(recoveredCanvas, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Recovered Cases",
          data: recoveredCounts,
          borderColor: "blue",
          backgroundColor: "rgba(0, 0, 255, 0.1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });

  const activeCanvas = document.getElementById("activeGraph").getContext("2d");
  const activeChart = new Chart(activeCanvas, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          label: "Active Cases",
          data: activeCounts,
          borderColor: "orange",
          backgroundColor: "rgba(255, 165, 0, 0.1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
    },
  });
}

load();
