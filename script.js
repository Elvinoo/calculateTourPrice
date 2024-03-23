// Add event listeners to each input element
document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("change", function () {
    if (this.value === "") {
      this.value = "0"; // Treat empty input as 0
    }
  });
});

document.getElementById("tourForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // Get values from input fields
  let paxFrom = parseInt(document.getElementById("paxFrom").value);
  let paxTo = parseInt(document.getElementById("paxTo").value);
  let guidePricePerDay = parseFloat(
    document.getElementById("guidePerday").value
  );
  let numberOfGuideDays = parseInt(document.getElementById("guideDays").value);
  let guidePricePerTransfer = parseFloat(
    document.getElementById("transferRate").value
  );
  let numberOfTransfers = parseInt(
    document.getElementById("numberOfTransfers").value
  );
  let bakuHotelPriceDouble = parseFloat(
    document.getElementById("bakuDouble").value
  );
  let bakuHotelPriceSingle = parseFloat(
    document.getElementById("bakuSingle").value
  );
  let bakuHotelNights = parseInt(document.getElementById("bakuNights").value);
  let bakuHotelSs =
    (bakuHotelPriceSingle - bakuHotelPriceDouble / 2) * bakuHotelNights;
  let shakiHotelPriceDouble = parseFloat(
    document.getElementById("shakiDouble").value
  );
  let shakiHotelPriceSingle = parseFloat(
    document.getElementById("shakiSingle").value
  );
  let shakiHotelNights = parseInt(document.getElementById("shakiNights").value);
  let shakiHotelSs =
    (shakiHotelPriceSingle - shakiHotelPriceDouble / 2) * shakiHotelNights;
  let ganjaHotelPriceDouble = parseFloat(
    document.getElementById("ganjaDouble").value
  );
  let ganjaHotelPriceSingle = parseFloat(
    document.getElementById("ganjaSingle").value
  );
  let ganjaHotelNights = parseInt(document.getElementById("ganjaNights").value);
  let ganjaHotelSs =
    (ganjaHotelPriceSingle - ganjaHotelPriceDouble / 2) * ganjaHotelNights;
  let otherHotelPriceDouble = parseFloat(
    document.getElementById("otherDouble").value
  );
  let otherHotelPriceSingle = parseFloat(
    document.getElementById("otherSingle").value
  );
  let otherHotelNights = parseInt(document.getElementById("otherNights").value);
  let otherHotelSs =
    (otherHotelPriceSingle - otherHotelPriceDouble / 2) * otherHotelNights;
  let hotelPriceSingle =
    bakuHotelPriceSingle * bakuHotelNights +
    shakiHotelPriceSingle * shakiHotelNights +
    ganjaHotelPriceSingle * ganjaHotelNights +
    otherHotelPriceSingle * otherHotelNights;
  let hotelPriceDouble =
    bakuHotelPriceDouble * bakuHotelNights +
    shakiHotelPriceDouble * shakiHotelNights +
    ganjaHotelPriceDouble * ganjaHotelNights +
    otherHotelPriceDouble * otherHotelNights;
  let numberOfMeals = parseInt(document.getElementById("mealQuantity").value);
  let priceOfMeals = parseFloat(document.getElementById("mealPrice").value);
  let sedanPrice = parseFloat(document.getElementById("sedan").value);
  let minivanPrice = parseFloat(document.getElementById("minivan").value);
  let sprinterPrice = parseFloat(document.getElementById("sprinter").value);
  let busPrice = parseFloat(document.getElementById("bus").value);
  let profitPerPerson = parseFloat(document.getElementById("profit").value);
  let galaDinnerQuantity = parseInt(
    document.getElementById("galaDinner").value
  );
  let galaDinnerPrice = parseFloat(
    document.getElementById("galaDinnerPrice").value
  );
  let guideAndDriverExpenses =
    parseFloat(document.getElementById("guideDriverHotel").value) +
    parseFloat(document.getElementById("guideDriverMeal").value);
  // Create a table to display the results
  let table =
    "<table><tr><th>Pax</th><th>Total Cost</th><th>Total Profit</th><th>Total Taxes</th><th>Total Price</th><th>Price per Person</th></tr>";

  // Calculate and display the price per person for different numbers of participants
  for (let i = paxFrom; i <= paxTo; i++) {
    // Calculate total cost for the current number of participants
    let totalCost;
    let totalPrice;
    let transportationPrice;
    if (i < 3) {
      transportationPrice = sedanPrice;
    } else if (i > 2 && i < 5) {
      transportationPrice = minivanPrice;
    } else if (i > 4 && i < 13) {
      transportationPrice = sprinterPrice;
    } else {
      transportationPrice = busPrice;
    }
    if (i === 1) {
      totalCost =
        hotelPriceSingle +
        numberOfGuideDays * guidePricePerDay +
        numberOfTransfers * guidePricePerTransfer +
        transportationPrice;
    } else {
      totalCost =
        hotelPriceDouble * (i / 2) +
        numberOfGuideDays * guidePricePerDay +
        numberOfTransfers * guidePricePerTransfer +
        transportationPrice;
    }

    // Add prices of selected museums to the total
    let museumCheckboxes = document.querySelectorAll(
      'input[name="museums"]:checked'
    );
    museumCheckboxes.forEach(function (checkbox) {
      totalCost += parseFloat(checkbox.value) * i;
    });

    // Add the price of meals to the total
    totalCost += numberOfMeals * priceOfMeals * i;
    totalCost += galaDinnerPrice * galaDinnerQuantity * i;
    // Add the guide and driver expenses
    totalCost += guideAndDriverExpenses;

    // Add the profit to the total
    let totalProfit = profitPerPerson * i;
    totalPrice = totalCost + totalProfit;

    // Calculate tax and final price
    let taxAndRisk = totalPrice * 0.12;
    totalPrice += taxAndRisk;

    // Calculate price per person
    let pricePerPerson = totalPrice / i;

    // Add the results to the table
    table += `<tr><td>${i} pax</td><td>₼ ${totalCost.toFixed(
      2
    )}</td><td>₼ ${totalProfit.toFixed(2)}</td><td>₼ ${taxAndRisk.toFixed(
      2
    )}</td><td>₼ ${totalPrice.toFixed(2)}</td><td>₼ ${pricePerPerson.toFixed(
      2
    )}</td></tr>`;
  }

  // Calculate SS
  let ss = bakuHotelSs + shakiHotelSs + ganjaHotelSs + otherHotelSs;

  // Add SS to the end of the table
  table += `<tr><td>SS</td><td>₼ ${ss.toFixed(
    2
  )}</td><td>---</td><td>---</td><td>---</td><td>---</td></tr>`;

  // Close the table
  table += "</table>";

  // Display the table
  document.getElementById("result").innerHTML = table;
});
