const isAllowedLength = function (string, length) {
  return string.length <= length;
};
isAllowedLength('проверяемая строка', 10);

const isPalindrom = function (string) {
  const newString = string.replaceAll(' ', '').toUpperCase();
  let anotherString = '';
  for (let i = newString.length - 1; i >= newString[0]; i--) {
    anotherString += newString[i];
  }
  return newString === anotherString;
};
isPalindrom('проверяемая строка');
