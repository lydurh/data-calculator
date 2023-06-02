document.addEventListener("DOMContentLoaded", function () {
  var growArea = document.getElementById("growArea");
  var growAreaRange = document.getElementById("growAreaRange");
  var totalOutput = document.getElementById("totalOutput");
  var totalOutputRange = document.getElementById("totalOutputRange");
  var revenuePerKg = document.getElementById("revenuePerKg");
  var revenuePerKgRange = document.getElementById("revenuePerKgRange");
  var percentageInputOutput = document.getElementById("percentageInputOutput");
  var percentageInputOutputRange = document.getElementById(
    "percentageInputOutputRange"
  );
  var hourlyCost = document.getElementById("hourlyCost");
  var hourlyCostRange = document.getElementById("hourlyCostRange");
  var timeSpentWeekly = document.getElementById("timeSpentWeekly");
  var timeSpentWeeklyRange = document.getElementById("timeSpentWeeklyRange");
  var daysPerWeek = document.getElementById("daysPerWeek");
  var daysPerWeekRange = document.getElementById("daysPerWeekRange");
  var weeksPerYear = document.getElementById("weeksPerYear");
  var weeksPerYearRange = document.getElementById("weeksPerYearRange");
  var percentageInputLabor = document.getElementById("percentageInputLabor");
  var percentageInputLaborRange = document.getElementById(
    "percentageInputLaborRange"
  );

  var inputs = [
    growArea,
    growAreaRange,
    totalOutput,
    totalOutputRange,
    revenuePerKg,
    revenuePerKgRange,
    percentageInputOutput,
    percentageInputOutputRange,
    hourlyCost,
    hourlyCostRange,
    timeSpentWeekly,
    timeSpentWeeklyRange,
    daysPerWeek,
    daysPerWeekRange,
    weeksPerYear,
    weeksPerYearRange,
    percentageInputLabor,
    percentageInputLaborRange,
  ];

  inputs.forEach(function (input) {
    input.addEventListener("input", calculate);
  });

  function calculate() {
    var growAreaValue = parseFloat(growArea.value);
    var totalOutputValue = parseFloat(totalOutput.value);
    var revenuePerKgValue = parseFloat(revenuePerKg.value);
    var percentageInputOutputValue = parseFloat(percentageInputOutput.value);
    var hourlyCostValue = parseFloat(hourlyCost.value);
    var timeSpentWeeklyValue = parseFloat(timeSpentWeekly.value);
    var daysPerWeekValue = parseFloat(daysPerWeek.value);
    var weeksPerYearValue = parseFloat(weeksPerYear.value);
    var percentageInputLaborValue = parseFloat(percentageInputLabor.value);

    var totalTurnover = totalOutputValue * revenuePerKgValue;

    var outputPerM2 = totalOutputValue / growAreaValue;

    var outputResultsElement = document.getElementById("outputResults");
    outputResultsElement.innerHTML =
      "Total Turnover: $" + totalTurnover.toFixed(2) + "<br>";
    outputResultsElement.innerHTML +=
      "Output per m<sup>2</sup>: " +
      outputPerM2.toFixed(2) +
      " kg/m<sup>2</sup>";

    var percentageOfTurnover =
      (totalTurnover * percentageInputOutputValue) / 100;
    outputResultsElement.innerHTML +=
      "<br>Percentage of Turnover (" +
      percentageInputOutputValue +
      "%): $" +
      percentageOfTurnover.toFixed(2);

    var totalYearlyCost =
      hourlyCostValue *
      timeSpentWeeklyValue *
      daysPerWeekValue *
      weeksPerYearValue;

    var laborResultsElement = document.getElementById("laborResults");
    laborResultsElement.textContent =
      "Total Yearly Cost: $" + totalYearlyCost.toFixed(2);

    var percentageOfCost = (totalYearlyCost * percentageInputLaborValue) / 100;
    laborResultsElement.innerHTML +=
      "<br>Percentage of Yearly Cost (" +
      percentageInputLaborValue +
      "%): $" +
      percentageOfCost.toFixed(2);

    calculateTotalOpportunity();
  }

  function calculateTotalOpportunity() {
    var outputResults = document.getElementById("outputResults");
    var laborResults = document.getElementById("laborResults");
    var totalTurnover = 0;
    var totalYearlyCost = 0;

    if (outputResults) {
      var totalTurnoverText =
        outputResults.querySelector("br").nextElementSibling.textContent;
      totalTurnover = parseFloat(
        totalTurnoverText.substring(totalTurnoverText.indexOf("$") + 1)
      );
    }

    if (laborResults) {
      var totalYearlyCostText = laborResults.textContent;
      totalYearlyCost = parseFloat(
        totalYearlyCostText.substring(totalYearlyCostText.indexOf("$") + 1)
      );
    }

    var totalOpportunity = totalTurnover + totalYearlyCost;

    var totalOpportunityElement = document.getElementById("totalOpportunity");
    if (!totalOpportunityElement) {
      totalOpportunityElement = document.createElement("div");
      totalOpportunityElement.id = "totalOpportunity";
      totalOpportunityElement.className = "totalOpportunity";
      document.body.appendChild(totalOpportunityElement);
    }

    totalOpportunityElement.textContent =
      "Total Opportunity: $" + totalOpportunity.toFixed(2);
  }
});

inputs.forEach(function (input) {
  input.addEventListener("input", synchronizeInputs);
});

function synchronizeInputs(event) {
  var input = event.target;
  var inputId = input.id;
  var rangeId = inputId + "Range";
  var range = document.getElementById(rangeId);

  range.value = input.value;
}
