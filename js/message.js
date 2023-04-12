import { isEscapeKey } from './util.js';

const MESSAGE_TIMEOUT = 5000;

const errorMessage = document.querySelector('#error')
  .content
  .querySelector('.error');

const successMessage = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorAlert = document.querySelector('#error-message')
  .content
  .querySelector('.error-message');

const onCloseButtonClick = () => {
  const popup = document.querySelector('.error, .success');
  popup.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}

function onOutsideClick (evt) {
  const popup = document.querySelector('.error, .success');
  if (evt.target === popup) {
    onCloseButtonClick();
  }
  document.removeEventListener('click', onOutsideClick);
}

const createElement = (element) => {
  const alertContainer = element.cloneNode(true);
  document.body.append(alertContainer);
};

const openFormPopup = (element) => {
  createElement(element);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onOutsideClick);

  const popupButton = document.querySelector('.error__button, .success__button');
  popupButton.addEventListener('click', onCloseButtonClick);
};

const showErrorText = () => {
  createElement(errorAlert);
  const alertContainer = document.querySelector('.error-message');

  setTimeout(() => {
    alertContainer.remove();
  }, MESSAGE_TIMEOUT);
};

export {
  showErrorText,
  openFormPopup,
  errorMessage,
  successMessage,
  onOutsideClick
};
