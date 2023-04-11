import './form.js';
import './scale.js';
import './slider.js';
import './upload-picture.js';
import { renderThumbnails } from './thumbnails-rendering.js';
import { renderGallery } from './gallery.js';
import { sortPhoto } from './filter.js';
import { showErrorText } from './message.js';
import { getData } from './api.js';


getData()
  .then((data) => {
    renderThumbnails(data);
    renderGallery(data);
    sortPhoto(data);
  })
  .catch(() => {
    showErrorText();
  }
  );
