// document.addEventListener('DOMContentLoaded', function() {
//     // Update margin display and recalculate on slider change
//     document.getElementById('grossMargin').addEventListener('input', function() {
//         updateMarginValue(this.value);
//         calculateBreakEven();
//     });

//     // Initial calculation
//     calculateBreakEven();
// });


function calculateBreakEven() {
    // User Inputs
    const numEmployees = document.getElementById('numEmployees').value;
    const hoursOpen = document.getElementById('hoursOpen').value;
    const daysOpen = document.getElementById('daysOpen').value;
    const hourlyWage = document.getElementById('hourlyWage').value;
    const initialCosts = parseFloat(document.getElementById('initialCosts').value);
    const fixedCosts = parseFloat(document.getElementById('fixedCosts').value);
    const pricePerUnit = parseFloat(document.getElementById('pricePerUnit').value);
    const averageSales = parseFloat(document.getElementById('averageSales').value);
    const marketingBudget = parseFloat(document.getElementById('marketingBudget').value); 
    // const grossMarginValue = parseFloat(document.getElementById('grossMargin').value);

    // Calculate total labor cost per month
    const monthlyLaborCost = numEmployees * hoursOpen * daysOpen * 4 * hourlyWage;

    // Net margins are calculated at the unit level
    const profitPerUnit = pricePerUnit * .75;

    // Calculate the increase in sales due to marketing
    const salesIncreaseFromMarketing = 0 + (4 * marketingBudget / 100);

    // Adjusted average sales including the impact of marketing
    const adjustedAverageSales = averageSales + salesIncreaseFromMarketing;

    // Calculate total profit per month with adjusted sales
    const monthlyProfit = (adjustedAverageSales * daysOpen * 4 * profitPerUnit) - (monthlyLaborCost + fixedCosts + marketingBudget); // Including marketing budget as monthly cost

    // Adjust the logic to track until finances reach zero
    let cumulativeProfit = -initialCosts; // Start with initial investment as negative profit
    let months = [];
    let finances = [];
    for (let month = 1; month <= 48; month++) {
        if (cumulativeProfit >= 0) break; // Stop adding months once break-even is reached
        cumulativeProfit += monthlyProfit;
        months.push(month);
        finances.push(cumulativeProfit);
    }

    updateChartWithData(months, finances);
}

function updateChartWithData(months, finances) {
    const ctx = document.getElementById('breakEvenChart').getContext('2d');
    if (window.breakEvenChart instanceof Chart) {
        window.breakEvenChart.destroy(); // Destroy the existing chart before creating a new one
    }
    window.breakEvenChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months.map(month => `${month} months`),
            datasets: [{
                label: 'Cumulative Finances Over Time',
                data: finances,
                backgroundColor: 'rgba(186, 143, 98, 0.2)',
                borderColor: 'rgba(186, 143, 98, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false, // Changed to false to better represent negative values
                    title: {
                        display: true,
                        text: 'Cumulative Finances ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time (Months)'
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const downloadButton = document.getElementById('downloadChart');
    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            if (window.breakEvenChart) {
                const url = window.breakEvenChart.toBase64Image();
                const a = document.createElement('a');
                a.href = url;
                a.download = 'coffee-shop-break-even-chart.png'; // The filename for the download
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    } else {
        console.error('Download button not found');
    }
});


// Call the function to calculate break-even and update the chart
calculateBreakEven();
