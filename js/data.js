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

const creatComment = () => ({
  id: getId(),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message:getRandomArrayElement(userMassages),
  name:getRandomArrayElement(userNames),
});

const creatPhotoDescription = () => ({
  id: getRandomInteger(1,25),
  url: `photos/${getRandomInteger(1,25)}.jpg`,
  description: getRandomArrayElement(photoDescriptions),
  likes: getRandomInteger(15,200),
  comments: Array.from({length: getRandomInteger(0,30)}, creatComment)
});

export const photoArrays = Array.from({length: 25}, creatPhotoDescription);
