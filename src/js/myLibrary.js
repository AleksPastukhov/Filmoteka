// FT-14 За натисканням на кнопку "Watched" показуються переглянуті фільми користувача
// FT-15 За натисканням на кнопку "Queue" показуються фільми додані в чергу користувача
import { Spinner } from './loader.js';
import { getDataFromLocalStorage } from './local-storage-info';
import { onFilmCardClick } from './modal';
import Pagination from 'tui-pagination';

import ComingSoonImg from '../images/movie-poster-coming-soon.jpg';
import { getDataFromLocalStorage } from './local-storage-info';
import { DATA_STORAGE } from './genres';
import { getGenresFromId } from './getGenresFromId';

const refs = {
  watchedBtn: document.querySelector('button.watched'),
  queueBtn: document.querySelector('button.queue'),
  libraryContainer: document.querySelector('.library__container'),
  libraryList: document.querySelector('.library__list'),
  emptyLibrary: document.querySelector('.empty-library'),
  libraryName: document.querySelector('span.library-name'),
  libraryCard: document.querySelector('.library__item'),
  activeBtn: document.querySelector('button.is-active'),
  paginationContainer: document.querySelector('#pagination'),
};

const spinner = new Spinner('.spinner');

let activeBtn = 'watched';

export function libraryHandler() {
  if (refs.libraryContainer) {
    if (refs.watchedBtn) {
      refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
      refs.queueBtn.addEventListener('click', onQueueBtnClick);
    }
    if (activeBtn === 'watched') {
      onWatchedBtnClick();
      checkLocalStorage('watched');
    }
    if (activeBtn === 'queue') {
      onQueueBtnClick();
      checkLocalStorage('queue');
    }
    function onWatchedBtnClick() {
      const savedMovies = getDataFromLocalStorage('watched');
      activeBtn = 'watched';
      changeActiveBtn(refs.watchedBtn, refs.queueBtn);
      checkLocalStorage('watched');
      refs.libraryName.textContent = 'watched';
      renderSavedMovies(savedMovies);
      if (savedMovies.length === 0) {
        refs.emptyLibrary.classList.remove('visually-hidden');
      }
    }

    function onQueueBtnClick() {
      const savedMovies = getDataFromLocalStorage('queue');
      changeActiveBtn(refs.queueBtn, refs.watchedBtn);
      checkLocalStorage('queue');
      refs.libraryName.textContent = 'queue';
      activeBtn = 'queue';
      renderSavedMovies(savedMovies);
      if (savedMovies.length === 0) {
        refs.emptyLibrary.classList.remove('visually-hidden');
      }
    }
    function changeActiveBtn(btn1, btn2) {
      btn1.classList.add('is-active');
      btn2.classList.remove('is-active');
    }
    function checkLocalStorage(library) {
      const savedMovies = getDataFromLocalStorage(library);
      if (savedMovies) {
        refs.emptyLibrary.classList.add('visually-hidden');
        refs.paginationContainer.classList.remove('visually-hidden');
//         addPagination();
        // renderSavedMovies(savedMovies);
      }
      if (savedMovies.length === 0) {
        refs.emptyLibrary.classList.remove('visually-hidden');
        refs.paginationContainer.classList.add('visually-hidden');
      }
    }
    function renderSavedMovies(movies) {
      if (!movies) {
        refs.emptyLibrary.classList.remove('visually-hidden');
      }
      const genresData = getDataFromLocalStorage(DATA_STORAGE);
      refs.libraryList.innerHTML = movies
        .map(
          ({
            poster_path,
            title,
            genre_ids: genreIds,
            id,
            release_date,
            vote_average,
          }) => {
            const basePosterURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
            return `<li class="library__item" id="${id}">
        <a href="" class="library__link"><div class="library__thumb">
      <img class="library__image" 
src="${poster_path ? basePosterURL : ComingSoonImg}"  alt="${title}" />
    </div>
    <div class="library__paragraph">
    <h2 class="library__movie">${title}</h2>
    <ul class="library__info">
      <li class="library__description">
        <p class="library__genres">${
          genreIds.length === 0
            ? 'No genre'
            : getGenresFromId(genreIds, genresData)
        } |</p>
      </li>
      <li class="library__description">
        <p class="library__year">${
          release_date === '' || !release_date
            ? 'No date'
            : release_date.slice(0, 4)
        }</p>
      </li>
      <li class="library__description">
        <p class="library__rating">${vote_average.toFixed(1)}</p>
      </li>
    </ul>
    </div></a></li>`;
          }
        )
        .join('');
    }

    refs.libraryContainer.addEventListener('click', onFilmCardClick);
  }
  function addPagination() {
    const savedMovies = getDataFromLocalStorage(activeBtn);
    let totalResults = savedMovies.length;
    let opts = {
      totalItems: `${totalResults}`,
      itemsPerPage: 5,
      visiblePages: 5,
      centerAlign: true,
      // currentPage: 1,
    };

    const pagination = new Pagination(refs.paginationContainer, opts);
    pagination.reset(totalResults);
    pagination.on('beforeMove', e => {
      currentPage = e.page;
      // opts.currentPage = currentPage;
      if (!savedMovies) {
        return;
      }
      function chunkArray(array, itemsPerPage) {
        const chunkedArray = [];
        let index = 0;
        while (index < array.length) {
          const item = array.slice(index, itemsPerPage + index);
          result.push(item);
          index += itemsPerPage;
        }
        return chunkedArray;
      }
      const chunkedSavedMovies = chunkArray((savedMovies, opts.itemsPerPage));
      console.log(chunkArray((savedMovies, opts.itemsPerPage)));
      renderSavedMovies(chunkedSavedMovies[currentPage]);
    });
  }
}

libraryHandler();
