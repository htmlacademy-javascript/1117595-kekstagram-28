import { isEscapeKey, onInputKeydown } from './util.js';
import { removeScale } from './scale.js';
import { removeEffects } from './slider.js';
import { sendData } from './api.js';
import { openFormPopup, errorMessage, successMessage, onOutsideClick } from './message.js';

const MAX_HASHTAGS_COUNT = 5;
const ERROR_TEXT = 'Введите до 5-ти хештегов, каждый длинною до 20ти символов, первый символ всегда # далее буквы или цифры.';
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isValidHashtagCount = (tags) => tags.length <= MAX_HASHTAGS_COUNT;
const isValidHashtagSymbols = (tag) => HASHTAG_REGEXP.test(tag);
const isUniqueHashtag = (tags) => {
  const lowerCaseHashTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseHashTags.length === new Set(lowerCaseHashTags).size;
};

const validateHashtags = (value) => {
  const hashtags = value
    .trim()
    .split(' ')
    .filter(Boolean);

  return hashtags.every(isValidHashtagSymbols) && isValidHashtagCount(hashtags) && isUniqueHashtag(hashtags);
};

pristine.addValidator(textHashtags, validateHashtags, ERROR_TEXT);

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
  removeScale();
  removeEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onOutsideClick);
};

const onCloseButtonClick = () => {
  closeModal();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.error') === null) {
      closeModal();
    }
  }
}

const onFileUploadChange = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .then(() => {
          openFormPopup(successMessage);
        })
        .catch(
          () => {
            openFormPopup(errorMessage);
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

setUserFormSubmit(onCloseButtonClick);

textHashtags.addEventListener('keydown', onInputKeydown);
textDescription.addEventListener('keydown', onInputKeydown);
uploadFile.addEventListener('change', onFileUploadChange);
imgUploadCancel.addEventListener('click', onCloseButtonClick);
