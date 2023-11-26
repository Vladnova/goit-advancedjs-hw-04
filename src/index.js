import { fetchImgs } from './js/getImgs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const error = {
  title: 'Error',
  message: 'Oops! Something went wrong! Try reloading the page!',
  position: 'topRight',
};

const info = {
  title: 'Info',
  message:
    'Sorry, there are no images matching your search query. Please try again.',
  position: 'topRight',
};

const success = {
  title: 'Success',
  message: 'We`re sorry, but you`ve reached the end of search results.',
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

  fetchImgs(search, page)
    .then(({ hits, totalHits }) => {
      createMarkup(hits);
      getScroll();
      simpleLightBox.refresh();
      if (calcPage(totalHits)) return;
    })
    .catch(err => iziToast.error(error));
}

async function handlerSearchImg(e) {
  hiddenBtn(true);
  refs.gallery.innerHTML = '';
  e.preventDefault();
  search = e.currentTarget.elements.searchQuery.value;
  page = 1;

  if (!search) {
    iziToast.info(info);
    return;
  }

  fetchImgs(search, page)
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        iziToast.info(info);
        return;
      }
      iziToast.success({
        ...success,
        message: `Hooray! We found ${totalHits} images.`,
      });
      createMarkup(hits);
      getScroll();
      simpleLightBox = new SimpleLightbox('.gallery a').refresh();

      if (calcPage(totalHits)) return;
      hiddenBtn(false);
    })
    .catch(err => {
      iziToast.error(error);
      refs.gallery.innerHTML = '';
    });
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
    iziToast.success(success);
    hiddenBtn(true);
    return true;
  }
}

function getScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 6,
    behavior: 'smooth',
  });
}
