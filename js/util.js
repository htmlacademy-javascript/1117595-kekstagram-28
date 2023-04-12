const isEscapeKey = (evt) => evt.key === 'Escape';

const onInputKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { isEscapeKey, onInputKeydown, debounce };

