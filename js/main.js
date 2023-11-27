import {showPictureCards} from './pictures.js';
import './big-picture.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilter } from './filters.js';

let pictures = [];

async function bootstrap () {
  try {
    pictures = await loadPictures ();
    showPictureCards(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();

export {pictures};
