function handleCostKeydown(event) {
  if (event.key === 'Enter') {
    calculateTotal();
  }
}

function calculateTotal() {
  const inputElement = document.querySelector('.js-cost-input');
  let cost = Number(inputElement.value);
  console.log(cost);
  const totalCostElement = document.querySelector('.js-total-cost');

  if (!cost) {
    totalCostElement.classList.add('error-message');
    totalCostElement.innerHTML = 'Error: not a number';
    return;
  }

  if (cost < 0) {
    totalCostElement.classList.add('error-message');
    totalCostElement.innerHTML = 'Error: cost cannot be less than $0';
    return;
  }
  
  if (cost < 40) {
    cost += 10;
  }

  totalCostElement
    .innerHTML = `$${cost}`;
}