const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createElement = ({url, comments, likes, id}) => {
  const pictureClone = pictureTemplate.cloneNode(true);
  pictureClone.querySelector('.picture__img').src = url;
  pictureClone.querySelector('.picture__comments').textContent = comments.length;
  pictureClone.querySelector('.picture__likes').textContent = likes;
  pictureClone.querySelector('.picture__img').dataset.pictureCloneId = id;
  return pictureClone;
};

const renderThumbnails = (photos) => {
  const pictureFragment = document.createDocumentFragment();
  photos.forEach((element) => {
    const thumbnail = createElement(element);
    pictureFragment.append(thumbnail);
  });

  pictureContainer.append(pictureFragment);
};

export { renderThumbnails };
