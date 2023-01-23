import {render} from './framework/render.js';
import UserNameView from './view/user-name-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilmsModel from './model/films-model.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter({filmContainer: siteMainElement, filmsModel});
const footerElement = document.querySelector('.footer__statistics');


render(new UserNameView(), siteHeaderElement);
render(new FilterView(), siteMainElement);
render(new SortView(), siteMainElement);
render(new FooterStatisticsView(), footerElement);
filmsPresenter.init();
