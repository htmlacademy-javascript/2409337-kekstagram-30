import {isEscapeKey} from './util.js';
import {resetScale} from './scale.js';
import {init as initEffect, reset as resetEffect} from './picture-filter.js';
import { sendPicture } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const REQUIRED_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const form = document.querySelector('.img-upload__form');
const imgUploadOverlay = form.querySelector('.img-upload__overlay');
const imgUploadInput = form.querySelector('.img-upload__input');
const body = document.querySelector('body');
const imgOverlayCloseButton = form.querySelector('.img-upload__cancel');
const comment = form.querySelector('.text__description');
const hashtag = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};

const pristine = new Pristine (form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error'
});

function toggleSubmitButton (isDisabled) {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled
    ? SubmitButtonCaption.SUBMITTING
    : SubmitButtonCaption.IDLE;
}

function isActiveElement () {
  return document.activeElement === comment || document.activeElement === hashtag;
}

function onImgOverlayKeydown (evt) {
  const isErrorMessageExists = Boolean (document.querySelector('.error'));
  if (isEscapeKey(evt) && !isActiveElement() && !isErrorMessageExists) {
    evt.preventDefault();
    closeRedactionForm();
  }
}

function showRedactionForm () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onImgOverlayKeydown);
}

function closeRedactionForm () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onImgOverlayKeydown);
  form.reset();
  pristine.reset();
  resetScale();
  resetEffect();
}

function onImgUploadInputChange () {
  showRedactionForm();
}
function onImgOverlayCloseButtonClick () {
  closeRedactionForm();
}

imgUploadInput.addEventListener('change', onImgUploadInputChange);
imgOverlayCloseButton.addEventListener('click', onImgOverlayCloseButtonClick);

async function sendForm (formElement) {
  if (!pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    closeRedactionForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
}

function onFormSubmit (evt) {
  evt.preventDefault();
  sendForm(evt.target);
}

function validateComment (value) {
  return value.length <= 140;
}

const getHashtags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((el) => Boolean(el.length));


function isHachtagValid (value) {
  getHashtags(value).every((el) => REQUIRED_SIMBOLS.test(el));
}

function isHashtagNumberValid (value) {
  return getHashtags(value).length <= 5;
}

function isHashtagRepeaded (value) {
  const lowerCaseHashtags = getHashtags(value).map((el) => el.toLowerCase());
  return lowerCaseHashtags.length === new Set (lowerCaseHashtags).size;
}

pristine.addValidator (
  comment,
  validateComment,
  'Длина комментария больше 140 символов'
);

pristine.addValidator (
  hashtag,
  isHachtagValid,
  'Введён невалидный хэш-тег',
  3,
  true
);

pristine.addValidator (
  hashtag,
  isHashtagNumberValid,
  'Превышено количество хэш-тегов;',
  2,
  true
);

pristine.addValidator (
  hashtag,
  isHashtagRepeaded,
  'Хэш-теги повторяются',
  1,
  true
);


form.addEventListener('submit', onFormSubmit);
initEffect();
