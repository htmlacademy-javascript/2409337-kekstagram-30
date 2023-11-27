import {isEscapeKey} from './util.js';
import { pictures } from './main.js';

const COMMENTS_SHOW_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const picturesContainer = document.querySelector('.pictures');
const body = document.querySelector('body');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsContaner = document.querySelector('.social__comments');
const commentsLoaderElement = bigPicture.querySelector('.social__comments-loader');
const socialCommentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const fragment = document.createDocumentFragment();

let commentsShownCount = 0;
let comments = [];

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
  commentsShownCount = 0;
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

function showComments () {
  commentsShownCount += COMMENTS_SHOW_COUNT;

  if (commentsShownCount >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsShownCount = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
  for (let i = 0; i < commentsShownCount; i++) {
    fragment.appendChild(getComment(comments[i]));
  }

  commentsContaner.innerHTML = '';
  commentsContaner.appendChild(fragment);

  socialCommentShownCount.textContent = commentsShownCount;
}

function onCommentsLoaderElementClick () {
  showComments();
}

function onPicturesContainerClick (evt) {
  const targetId = evt.target.parentNode.id;
  const pictureData = pictures.find((el) => el.id === +targetId);

  if (evt.target.classList[0] === 'picture__img') {
    showBigPicture();
    fillBigPicture(pictureData);
    comments = pictureData.comments;
    if (comments.length > 0) {
      showComments();
    }
  }
}

function onBigPictureCloseButtonClick () {
  closeBigPicture();
}

picturesContainer.addEventListener('click', onPicturesContainerClick);
bigPictureCloseButton.addEventListener('click', onBigPictureCloseButtonClick);
commentsLoaderElement.addEventListener('click', onCommentsLoaderElementClick);
