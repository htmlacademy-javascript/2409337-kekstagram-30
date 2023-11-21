import {data} from './data.js';
import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const body = document.querySelector('body');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContaner = document.querySelector('.social__comments');
const fragment = document.createDocumentFragment();

function onBigPictureKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function showBigPicture () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onBigPictureKeydown);
}
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
}

function fillBigPicture (pictureData) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = pictureData.url;
  bigPicture.querySelector('.likes-count').textContent = pictureData.likes;
  bigPicture.querySelector('.social__caption').textContent = pictureData.description;
  bigPicture.querySelector('.social__comment-total-count').textContent = pictureData.comments.length;
}

function getComment ({avatar, message, name}) {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
}

function showComments (comments) {
  commentsContaner.innerHTML = '';
  comments.forEach((object) => {
    fragment.appendChild(getComment(object));
  });
  commentsContaner.appendChild(fragment);
}

function onPicturesContainerClick (evt) {
  const targetId = evt.target.parentNode.id;
  const pictureData = data.find((el) => el.id === +targetId);
  showBigPicture();
  fillBigPicture(pictureData);
  showComments(pictureData.comments);
}

function onBigPictureCloseButtonClick () {
  closeBigPicture();
}

picturesContainer.addEventListener('click', onPicturesContainerClick);
bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
