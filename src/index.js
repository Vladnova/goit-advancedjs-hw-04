import { fetchImgs } from './js/getImgs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const error = {
  title: 'Error',
  message:
    'Sorry, there are no images matching your search query. Please try again',
  position: 'topRight',
};

const info = {
  title: 'Info',
  message: 'We`re sorry, but you`ve reached the end of search results.',
  position: 'topRight',
};

const success = {
  title: 'Success',
  position: 'topRight',
};

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('.js-btn'),
};

refs.form.addEventListener('submit', handlerSearchImg);
refs.btnLoadMore.addEventListener('click', handlerLoadMore);

let page = null;
let search = '';
let simpleLightBox;

async function handlerLoadMore() {
  page += 1;
  try {
    const { hits, totalHits } = await fetchImgs(search, page);
    createMarkup(hits);
    getScroll();
    simpleLightBox.refresh();
    if (calcPage(totalHits)) return;
  } catch (err) {
    iziToast.error({ ...error, message: err.message });
  }
}

async function handlerSearchImg(e) {
  hiddenBtn(true);
  refs.gallery.innerHTML = '';
  e.preventDefault();
  search = e.currentTarget.elements.searchQuery.value;
  page = 1;

  if (!search.trim()) {
    iziToast.error({
      ...error,
      message: 'Sorry, input is required to search for images',
    });
    return;
  }

  try {
    const { hits, totalHits } = await fetchImgs(search, page);
    if (hits.length === 0) {
      iziToast.error(error);
      return;
    }
    iziToast.success({
      ...success,
      message: `Hooray! We found ${totalHits} images.`,
    });
    createMarkup(hits);
    simpleLightBox = new SimpleLightbox('.gallery a').refresh();

    if (calcPage(totalHits)) return;
    hiddenBtn(false);
  } catch (err) {
    iziToast.error({ ...error, message: err.message });
  }
}

function createMarkup(images) {
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
      }) => `
      <li class="item-photo">
        <div class="photo-card">
            <a href="${largeImageURL}">
              <img src=${webformatURL} alt=${tags} class="img" data-big-img=${largeImageURL} />
            </a>
            <div class="stats">
                <p class="stats-item">
                  <b class="material-icons">Likes</b>
                  <span>${likes}</span>
                </p>
                <p class="stats-item">
                    <b class="material-icons">Views</b>
                    ${views}
                </p>
                <p class="stats-item">
                    <b class="material-icons">Comments</b>
                    ${comments}
                </p>
                <p class="stats-item">
                    <b class="material-icons">Downloads</b>
                    ${downloads}
                </p>
            </div>
        </div>
      </li>
`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function hiddenBtn(bool) {
  refs.btnLoadMore.hidden = bool;
}

function calcPage(totalHits) {
  const allPages = Math.ceil(totalHits / 40);
  if (page >= allPages) {
    iziToast.info(info);
    hiddenBtn(true);
    return true;
  }
}

function getScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}
