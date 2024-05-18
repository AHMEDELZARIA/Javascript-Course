function toggleButton(selector) {
  const buttonElement = document.querySelector('.' + selector);

  if (!buttonElement.classList.contains('is-toggled')) {
    turnOffPreviousButton();
    buttonElement.classList.add('is-toggled');

  } else {
    buttonElement.classList.remove('is-toggled');
  }
}

function turnOffPreviousButton() {
  const previousButtonElement = document.querySelector('.is-toggled');

  if (previousButtonElement) {
    previousButtonElement.classList.remove('is-toggled');
  }
}