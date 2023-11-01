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

const checkWorkingTime = (workDayBeginning, workDayEnding, appointmentTime, appointmentDuration) => {
  // const start = workDayBeginning.split(':');
  // const end = workDayEnding.split(':');
  // const beginning = appointmentTime.split(':');
  // const duration = appointmentDuration / 60;
  // const startH = +start[0] + +start[1] / 60;
  // const endH = +end[0] + +end[1] / 60;
  // const beginningH = +beginning[0] + +beginning[1] / 60;
  // let result = false;
  // if (beginningH >= startH && beginningH < endH) {
  //   const sum = duration + beginningH;
  //   result = sum <= endH;
  // }
  // return result;
  const newArray = [workDayBeginning, workDayEnding, appointmentTime].map((value) => value.split(':'));
  const inHour = newArray.map((value) => +value[0] + (+value[1] / 60));
  const duration = inHour[2] + appointmentDuration / 60;
  return (inHour[2] >= inHour[0] && duration <= inHour[1]);
};
window.console.log(checkWorkingTime('08:30', '17:30', '17:00', 30));
