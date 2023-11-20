import {getRandomInteger, getRandomArrayElement, getId} from './util.js';

const photoDescriptions = [
  'Жду обратной связи в коментариях!',
  'Что оличает Новый Год от деловой конференции?',
  'Красота в глазах смотрящего',
  'Как думаете?',
  'На зимовку...',
  'Смотрим мультфильмы на английском',
  'Наряжаемся в костюмы',
  'Мастерим украшения',
  'Хочу сладкого',
  'Ожидания/реальность',
];
const userNames = [
  'Иван',
  'Сергей',
  'Мария',
  'Петр',
  'Виктор',
  'Юлия',
  'Укроп',
  'кекс',
];
const userMassages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const PHOTO_DESCRIPTION_COUNT = 25;
const generateCommentId = getId();
const generatePhotoId = getId();
const generateUrl = getId(PHOTO_DESCRIPTION_COUNT);

const creatComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message:getRandomArrayElement(userMassages),
  name:getRandomArrayElement(userNames),
});

const creatPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrl()}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomInteger(15,200),
  comments: Array.from({length: getRandomInteger(0,30)}, creatComment)
});

const getPhotoArrays = () => Array.from({length: PHOTO_DESCRIPTION_COUNT}, creatPhotoDescription);
export const data = getPhotoArrays();

