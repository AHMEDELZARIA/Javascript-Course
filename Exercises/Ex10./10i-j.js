let calculation = localStorage.getItem('calculation') || '';

// Display calculation when page first loads
displayCalculation();

function updateCalculation(value) {
  calculation += value;
  saveCalculation();
  // Display updated calculation on the page
  displayCalculation();
}

function saveCalculation() {
  localStorage.setItem('calculation', calculation);
}

function displayCalculation() {
  document.querySelector('.js-calculation')
    .innerHTML = calculation;
}