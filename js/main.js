import { renderThumbnails } from './thumbnails-rendering.js';
import { renderGallery } from './gallery.js';
// import { createPhotos } from './data.js';
import './form.js';
import './scale.js';
import './slider.js';
import { showErrorText } from './message.js';
import { getData } from './api.js';


getData()
  .then((data) => {
    renderThumbnails(data);
    renderGallery(data);
  })
  .catch(() => {
    showErrorText();
  }
  );

// const photos = createPhotos();
// renderThumbnails(photos);
// renderGallery(data);
