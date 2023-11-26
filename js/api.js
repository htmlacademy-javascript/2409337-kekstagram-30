const SERVER_URL = 'https://30.javascript.pages.academy/kekstagram';

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
};

const ServerRout = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

async function request (url, method = HttpMethod.GET, body = null) {
  const response = await fetch (url, {method, body});
  return response.json();
}

async function loadPictures() {
  return request(SERVER_URL + ServerRout.GET_DATA);
}

async function sendPicture(pictureData) {
  return request(SERVER_URL + ServerRout.SEND_DATA, HttpMethod.POST, pictureData);
}

export {loadPictures, sendPicture};
