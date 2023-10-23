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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function getId () {
  let previousId = 0;
  return function () {
    previousId += 1;
    return previousId;
  };
}

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

const photoArrays = Array.from({length: 25}, creatPhotoDescription);

window.console.log(photoArrays);
