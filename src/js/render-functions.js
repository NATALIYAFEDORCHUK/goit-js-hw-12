import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.getElementById('global-loader');
const btn = document.querySelector('.js-btn');
const loadingText = document.querySelector('.loading-text');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  caption: true,
  captionPosition: 'bottom',
  captionDelay: 250,
});

//!=========================================================
export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item"><a class="gallery-link" href="${largeImageURL}"><img class="gallery-img" src="${webformatURL}" alt="${tags}"></a>
  <ul class="gallery-list">
    <li class="gallery-list-item"><b>likes</b>${likes}</li>
  <li class="gallery-list-item"><b>views</b>${views}</li>
  <li class="gallery-list-item"><b>comments</b>${comments}</li>
  <li class="gallery-list-item"><b>downloads</b>${downloads}</li>
  </ul>
</li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
//!====================================================
export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  btn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  btn.classList.add('hidden');
}

export function showLoadingText() {
  loadingText.classList.remove('hidden');
}

export function hideLoadingText() {
  loadingText.classList.add('hidden');
}
