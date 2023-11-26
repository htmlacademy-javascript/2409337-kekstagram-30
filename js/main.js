import {showPictureCards} from './pictures.js';
import './big-picture.js';
import './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';


async function bootstrap () {
  try {
    const pictures = await loadPictures ();
    showPictureCards(pictures);
  } catch (error) {
    showErrorMessage();
  }
}

bootstrap();
