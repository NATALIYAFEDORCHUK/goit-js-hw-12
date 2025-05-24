import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  hideLoadMoreButton,
  showLoadMoreButton,
  showLoadingText,
  hideLoadingText,
} from './js/render-functions';

const form = document.querySelector('.form');
const input = form.elements['search-text'];
const gallery = document.querySelector('.gallery');
const btn = document.querySelector('.js-btn');
hideLoadMoreButton();

let query = '';
let page = 1;
let maxPage = 0;
const PAGE_SIZE = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();

  query = input.value.trim();

  if (!query) {
    iziToast.info({
      message: 'Будь ласка, введіть ключове слово!',
      position: 'topRight',
      timeout: 2000,
      backgroundColor: '#ffa000',
    });
    return;
  }

  page = 1;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const res = await getImagesByQuery(query, page);
    if (!res.hits || res.hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'Нічого не знайдено. Спробуйте інший запит!',
        position: 'topRight',
        timeout: 3000,
        backgroundColor: '#ef4040',
      });

      return;
    }
    createGallery(res.hits);

    maxPage = Math.ceil(res.totalHits / PAGE_SIZE);

    imagesNotification();
    updateBtnStatus();
    input.value = '';
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Сталася помилка. Спробуйте пізніше!',
      position: 'topRight',
      timeout: 3000,
      backgroundColor: '#ffa040',
    });
  } finally {
    hideLoader();
  }
});

btn.addEventListener('click', async () => {
  page += 1;
  updateBtnStatus();

  showLoader();
  showLoadingText();

  try {
    const res = await getImagesByQuery(query, page);
    createGallery(res.hits);
    scrollToNewContent();
    imagesNotification();
    updateBtnStatus();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Не вдалося завантажити більше зображень!',
      position: 'topRight',
      timeout: 3000,
      backgroundColor: '#ffa040',
    });
  } finally {
    hideLoader();
    hideLoadingText();
  }
});

function updateBtnStatus() {
  if (page < maxPage) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
  }
}

function imagesNotification() {
  if (page === 1 && maxPage > 1) {
    iziToast.info({
      message: `Було знайдено ${maxPage} сторінок`,
      position: 'topRight',
      timeout: 2000,
    });
  }
  if (page === maxPage && maxPage !== 0) {
    iziToast.info({
      message: `Ви завантажили всі дані`,
      position: 'topRight',
      timeout: 2000,
    });
  }
  if (maxPage === 0) {
    iziToast.error({
      message: `По вашому запиту нічого не знайдено`,
      position: 'topRight',
      timeout: 2000,
    });
  }
}

function scrollToNewContent() {
  const card = document.querySelector('.gallery .gallery-item');

  if (card) {
    const { height: cardHeight } = card.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
