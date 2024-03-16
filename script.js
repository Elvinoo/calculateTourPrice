document.getElementById("tourForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get values from input fields
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
  let numberOfParticipants = parseInt(
    document.getElementById("numberOfParticipants").value
  );
  let transportationPrice = parseFloat(
    document.getElementById("transportationPrice").value
  );
  let profitPerPerson = parseFloat(
    document.getElementById("profitPerPerson").value
  );
  let totalProfit = profitPerPerson * 10;
  let eVisa = document.getElementById("eVisa");
  // Calculate total cost
  let totalPrice = tourNights * hotelPriceDouble * (numberOfParticipants / 2);
  totalPrice += numberOfGuideDays * guidePricePerDay;
  totalPrice += numberOfTransfers * guidePricePerTransfer;
  totalPrice += transportationPrice;
  if (eVisa.checked) {
    totalPrice += 50 * numberOfParticipants;
  }
  let finalPrice = (totalPrice + totalProfit) * 0.12 + totalPrice + totalProfit;

  // Display result to user
  document.getElementById("totalCost").innerText =
    "Total cost without taxes : $" + totalPrice;

  document.getElementById("singleCost").innerText =
    "Price for 1 person : $" + totalPrice / numberOfParticipants;
  document.getElementById("ss").innerText =
    "SS: $" + (hotelPriceSingle - hotelPriceDouble / 2) * tourNights;
  document.getElementById("totalWithProfit").innerText =
    "Total Price with profit, taxes and risks: $" + finalPrice;
  document.getElementById("singleWithProfit").innerText =
    "Price per 1 person with profit, taxes and risks: $" +
    finalPrice / numberOfParticipants;
});
