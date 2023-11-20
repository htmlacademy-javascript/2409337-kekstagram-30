const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getId = function (count) {
  let previousId = 0;
  return function () {
    previousId += 1;
    if (count) {
      if (previousId > count) {
        previousId = 1;
      }
    }
    return previousId;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomArrayElement, getId, isEscapeKey};
