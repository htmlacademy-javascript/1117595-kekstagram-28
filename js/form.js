import { isEscapeKey, stopEventPropagation } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const ERROR_TEXT = 'Введите до 5-ти хештегов, каждый длинною до 20ти символов, первый символ всегда # далее буквы или цифры.';
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const textHashtags = form.querySelector('.text__hashtags');
const textDescription = form.querySelector('.text__description');
const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = form.querySelector('.img-upload__cancel');

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

const closeImgUploadOverlay = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  pristine.reset();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgUploadOverlay();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const showImgUploadOverlay = () => {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

textHashtags.addEventListener('keydown', stopEventPropagation);
textDescription.addEventListener('keydown', stopEventPropagation);
uploadFile.addEventListener('change', showImgUploadOverlay);
imgUploadCancel.addEventListener('click', closeImgUploadOverlay);
