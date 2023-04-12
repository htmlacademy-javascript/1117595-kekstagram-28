import './form.js';
import './scale.js';
import './slider.js';
import './upload-picture.js';
import { renderThumbnails } from './thumbnails-rendering.js';
import { renderGallery } from './gallery.js';
import { getFilteredPhotos, init } from './filter.js';
import { showErrorText } from './message.js';
import { getData } from './api.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

getData()
  .then((data) => {
    const debouncedRenderGallery = debounce(renderThumbnails, RERENDER_DELAY);
    init(data, debouncedRenderGallery);
    renderThumbnails(getFilteredPhotos());
    renderGallery(data);
  })
  .catch(() => {
    showErrorText();
  }
  );
