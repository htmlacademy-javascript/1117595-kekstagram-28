const PHOTO_COUNT = 10;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

let currentFilter = Filter.DEFAULT;
let pictures = [];

const filterContainer = document.querySelector('.img-filters');


const sortRandomly = () => Math.random() - 0.5;

const sortByComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;

const changeActiveClass = (evt) => {
  if (!evt.target.classList.contains('img-filters__button--active')) {
    filterContainer.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  }
};

const getFilteredPhotos = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PHOTO_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  filterContainer.addEventListener('click', (evt) => {
    if (evt.target.matches('button')) {
      changeActiveClass(evt);

      currentFilter = evt.target.id;
      callback(getFilteredPhotos());
    }
  });
};

const init = (loadedPictures, cb) => {
  filterContainer.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  setOnFilterClick(cb);
};

export { getFilteredPhotos, init };
