import { openPopup, closePopup, onDocumentKeydown } from './popup.js';
import { renderBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const closeButton = document.querySelector('.big-picture__cancel');

const renderGallery = (photos) => {
  picturesContainer.addEventListener('click', (evt) => {
    if (evt.target.closest('.picture__img')) {
      openPopup();

      const currectPhoto = photos.find((photo) => photo.id === +evt.target.dataset.pictureCloneId);
      renderBigPicture(currectPhoto);

      document.addEventListener('keydown', onDocumentKeydown);
    }
  });
};

closeButton.addEventListener('click', () => closePopup());

export { renderGallery };
