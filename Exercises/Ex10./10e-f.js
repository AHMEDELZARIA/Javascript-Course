function toggleButton(selector) {
  const buttonElement = document.querySelector('.' + selector);

  if (!buttonElement.classList.contains('is-toggled')) {
    buttonElement.classList.add('is-toggled');
  } else {
    buttonElement.classList.remove('is-toggled');
  }
}