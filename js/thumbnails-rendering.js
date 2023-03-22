import { createPhotos } from './data.js';

const pictureContainer = document.querySelector('.picture');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const picturesFragment = document.createDocumentFragment();

const renderedThumbnails = createPhotos();

renderedThumbnails.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comment.length;

  picturesFragment.append(pictureElement);
});

pictureContainer.append(picturesFragment);

export { renderedThumbnails };
