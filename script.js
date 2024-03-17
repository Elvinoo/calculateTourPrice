document.getElementById("tourForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values from input fields
  let minParticipants = parseInt(
    document.getElementById("minParticipants").value
  );
  let maxParticipants = parseInt(
    document.getElementById("maxParticipants").value
  );
  let tourNights = parseInt(document.getElementById("tourNights").value);
  let hotelPriceDouble = parseFloat(
    document.getElementById("hotelPriceDouble").value
  );
  let hotelPriceSingle = parseFloat(
    document.getElementById("hotelPriceSingle").value
  );
  let tourDays = parseInt(document.getElementById("tourDays").value);
  let guidePricePerDay = parseFloat(
    document.getElementById("guidePricePerDay").value
  );
  let numberOfGuideDays = parseInt(
    document.getElementById("numberOfGuideDays").value
  );
  let guidePricePerTransfer = parseFloat(
    document.getElementById("guidePricePerTransfer").value
  );
  let numberOfTransfers = parseInt(
    document.getElementById("numberOfTransfers").value
  );
  let numberOfMeals = parseInt(document.getElementById("numberOfMeals").value);
  let priceOfMeals = parseFloat(document.getElementById("priceOfMeals").value);
  let transportationPrice = parseFloat(
    document.getElementById("transportationPrice").value
  );
  let profitPerPerson = parseFloat(
    document.getElementById("profitPerPerson").value
  );

  // Check if any required field is empty
  let requiredInputs = document.querySelectorAll("input[required]");
  let isValid = true;
  requiredInputs.forEach(function (input) {
    if (input.value.trim() === "") {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (!isValid) {
    alert("Please fill in all required fields.");
    return;
  }

  // Create a table to display the results
  let table =
    "<table><tr><th>Number of Participants</th><th>Price per Person</th></tr>";

  // Calculate and display the price per person for different numbers of participants
  for (let i = minParticipants; i <= maxParticipants; i++) {
    // Calculate total cost for the current number of participants
    let totalPrice =
      tourNights * hotelPriceDouble * (i / 2) +
      numberOfGuideDays * guidePricePerDay +
      numberOfTransfers * guidePricePerTransfer +
      transportationPrice;

    // Add prices of selected museums to the total
    let museumCheckboxes = document.querySelectorAll(
      'input[name="museums"]:checked'
    );
    museumCheckboxes.forEach(function (checkbox) {
      totalPrice += parseFloat(checkbox.value) * i;
    });

    // Add the price of meals to the total
    totalPrice += numberOfMeals * priceOfMeals * i;

    // Add the profit to the total
    let totalProfit = profitPerPerson * i;
    totalPrice += totalProfit;

    // Calculate tax and final price
    let taxAndRisk = totalPrice * 0.12;
    let finalPrice = totalPrice + taxAndRisk;

    // Calculate price per person
    let pricePerPerson = finalPrice / i;

    // Add the results to the table
    table += `<tr><td>${i} pax</td><td>₼ ${pricePerPerson.toFixed(
      2
    )}</td></tr>`;
  }

  // Calculate SS
  let ss = (hotelPriceSingle - hotelPriceDouble / 2) * tourNights;

  // Add SS to the end of the table
  table += `<tr><td>SS</td><td>₼ ${ss.toFixed(2)}</td></tr>`;

  // Close the table
  table += "</table>";

  // Display the table
  document.getElementById("result").innerHTML = table;
});
