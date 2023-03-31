// проверка длинны строки

const checkLength = (string, length) => string.length <= length;

checkLength('Привет как дела', 20); // будет true


// проверка строки палиндрома (как это будет применяться в будущем)

const isPalindrome = (string) => {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');

  let reverseString = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  return tempString === reverseString;
};

isPalindrome('Лёша на полке клопа нашёл '); // будет true


// извлечение числа из строки

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }
  return Math.abs(parseInt(result, 10));
};

extractNumber('сейчес -2023,5 год'); // вернёт 20235


// добавляем символы строке

const addSymbol = (string, minLength, extraSymbols) => {
  let result = string;

  while (result.length < minLength) {
    const newResultLength = result.length + extraSymbols.length;
    const actualExtraSymbols = newResultLength <= minLength ? extraSymbols :
      extraSymbols.slice(0, minLength - newResultLength);
    result = actualExtraSymbols + result;
  }
  return result;
};

addSymbol('qwerty', 4, '0');
