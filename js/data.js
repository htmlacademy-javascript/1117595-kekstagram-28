import { getRandomInteger } from './util.js';
import { getRandomArrayElement } from './util.js';
import { createIdGenerator } from './util.js';
import { createRandomIdFromRange } from './util.js';

const AVATAR_COUNT = 6;
const LIKE_COUNT_MIN = 15;
const LIKE_COUNT_MAX = 200;
const COMMENT_COUNT_MAX = 5;
const PHOTO_COUNT = 25;


const DESCRIPTIONS = [
  'У себя дома',
  'На даче',
  'Здрастете',
  'На южном отдыхе',
  'Зимой',
  'Весело, задорно',
  '?????',
];

const COMMENT_LINES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Эвелина',
  'Татьяна',
  'Кеша',
  'Вадим',
  'Дмитрий',
  'Володька',
  'Григорий',
  'Валентин',
  'Мирон',
  'Иваныч',
  'Мишаня',
  'Олежа',
  'Неопознанный',
];

const createPhotoId = createIdGenerator();
const createPhotoNumber = createIdGenerator();
const createCommentId = createRandomIdFromRange(1, 9999);

const createMessage = () => Array.from({ length: getRandomInteger(1, 2) }, () => getRandomArrayElement(COMMENT_LINES)).join(' ');

const createComment = () => ({
  id: createCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES)
});

const createPhotoDescription = () => {
  const commentCount = getRandomInteger(1, COMMENT_COUNT_MAX);
  const photoComment = Array.from({ length: commentCount }, createComment);

  return {
    id: createPhotoId(),
    url: `photos/${createPhotoNumber()}'.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(LIKE_COUNT_MIN, LIKE_COUNT_MAX),
    comment: photoComment
  };
};

const createPhotos = () => Array.from({ length: PHOTO_COUNT }, createPhotoDescription);

export { createPhotos };
