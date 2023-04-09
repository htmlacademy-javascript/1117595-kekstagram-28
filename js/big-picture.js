const COMMENT_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const commentCount = bigPicture.querySelector('.social__comment-count');
const shownCommentsCount = commentCount.querySelector('.comments-shown');
const totalCommentsCount = commentCount.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const socialComments = bigPicture.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content
  .querySelector('.social__comment');

const image = bigPicture.querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');

let moduleComments = [];
let shownComments = 0;

const fillComment = ({ avatar, message, name }) => {
  const commentElement = commentTemplate.cloneNode(true);

  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  return commentElement;
};

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  const socialFragment = document.createDocumentFragment();
  socialFragment.append(...comments.map(fillComment));
  socialComments.append(socialFragment);
};

const renderFiveComments = () => {
  shownComments += COMMENT_PORTION;

  if (shownComments >= moduleComments.length) {
    shownComments = moduleComments.length;
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const comments = moduleComments.slice(0, shownComments);
  renderComments(comments);

  shownCommentsCount.textContent = shownComments;
  totalCommentsCount.textContent = moduleComments.length;
};

const renderBigPicture = ({url, likes, comments}) => {
  shownComments = 0;
  image.src = url;
  likesCount.textContent = likes;
  moduleComments = comments;
  renderFiveComments();
};

commentsLoader.addEventListener('click', renderFiveComments);

export { renderBigPicture };
