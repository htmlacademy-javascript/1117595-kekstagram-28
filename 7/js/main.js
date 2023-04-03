import { renderThumbnails } from './thumbnails-rendering.js';
import { renderGallery } from './gallery.js';
import { createPhotos } from './data.js';
import './form.js';

const photos = createPhotos();
renderThumbnails(photos);
renderGallery(photos);
