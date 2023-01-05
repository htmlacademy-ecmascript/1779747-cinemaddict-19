import {render} from './render.js';
import UserNameView from './view/user-name-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmPresenter from './presenter/films-presenter.js';
import InfoPopUpView from './view/info-pop-up-view.js';
import FooterStatisticsView from './view/footer__statistics.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const bodyElement = document.querySelector('body');
const filmPresenter = new FilmPresenter({filmContainer: siteMainElement});
const footerElement = document.querySelector('.footer__statistics');

render(new UserNameView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new FooterStatisticsView(), footerElement);
render(new InfoPopUpView(), bodyElement);
filmPresenter.init();

