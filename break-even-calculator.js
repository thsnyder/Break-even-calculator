function calculateBreakEven() {
    // Get values from form
    const numEmployees = document.getElementById('numEmployees').value;
    const hoursOpen = document.getElementById('hoursOpen').value;
    const daysOpen = document.getElementById('daysOpen').value;
    const hourlyWage = document.getElementById('hourlyWage').value;
    const initialCosts = document.getElementById('initialCosts').value;
    const fixedCosts = document.getElementById('fixedCosts').value;
    const variableCosts = document.getElementById('variableCosts').value;
    const pricePerUnit = document.getElementById('pricePerUnit').value;
    const averageSales = document.getElementById('averageSales').value;

    // Calculate total labor cost per month
    const monthlyLaborCost = numEmployees * hoursOpen * daysOpen * 4 * hourlyWage;

    // Calculate total monthly costs
    const totalMonthlyCosts = parseFloat(initialCosts) + parseFloat(fixedCosts) + (variableCosts * averageSales * daysOpen * 4);

    // Calculate break-even units
    const breakEvenUnits = (parseFloat(initialCosts) + parseFloat(fixedCosts)) / (pricePerUnit - variableCosts);

    // Estimate the timeline to break-even
    const dailyUnitsSold = averageSales;
    const daysToBreakEven = breakEvenUnits / dailyUnitsSold;
    const monthsToBreakEven = daysToBreakEven / (daysOpen * 4);

    // Display the result
    document.getElementById('result').innerHTML = `Estimated Time to Break Even: ${monthsToBreakEven.toFixed(2)} months`;
}
