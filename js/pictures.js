
const pictureTemplate = document.querySelector('#picture').content.querySelector('a');
const picturesContaner = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

function fillPictureCard ({id, url, description, comments, likes}) {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = url;
  newPicture.querySelector('.picture__img').alt = description;
  newPicture.querySelector('.picture__comments').textContent = comments.length;
  newPicture.querySelector('.picture__likes').textContent = likes;
  newPicture.setAttribute('id', id);
  return newPicture;
}

function showPictureCards (data) {
  data.forEach((object) => {
    fragment.appendChild(fillPictureCard(object));
  });
  picturesContaner.appendChild(fragment);
}

export {showPictureCards};
