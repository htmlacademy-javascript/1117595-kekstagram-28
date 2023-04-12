const effects = {
  none: {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: '',
  },
};

const defaultEffect = effects.none;
let chosenEffect = effects.none;
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const image = document.querySelector('.img-upload__preview img');
const effectButtonsList = document.querySelector('.effects__list');
const effectsValue = document.querySelector('.effect-level__value');

const showSlider = () => sliderContainer.classList.remove('hidden');
const hideSlider = () => sliderContainer.classList.add('hidden');


const changeEffect = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.start,
    step: chosenEffect.step,
  });

  (chosenEffect === defaultEffect ? hideSlider : showSlider)();
};

const onSliderChange = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  image.style.filter = chosenEffect === defaultEffect ? effects.none.name :
    `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;

  effectsValue.value = sliderValue;
};

const removeEffects = () => {
  chosenEffect = defaultEffect;
  changeEffect();
};

noUiSlider.create(sliderElement, {
  range: {
    min: defaultEffect.min,
    max: defaultEffect.max,
  },
  start: defaultEffect.start,
  step: defaultEffect.step,
  connect: 'lower',
});

effectButtonsList.addEventListener('click',(evt) => {
  if (evt.target.closest('.effects__radio')) {
    chosenEffect = effects[evt.target.value];
    image.className = `effects__preview--${chosenEffect.name}`;
    changeEffect();
  }
});

sliderElement.noUiSlider.on('update', onSliderChange);

hideSlider();

export { removeEffects };
