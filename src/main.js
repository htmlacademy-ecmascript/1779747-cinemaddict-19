import {render} from './framework/render.js';
import UserNameView from './view/user-name-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentModel from './model/comment-model.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const commentsModel = new CommentModel();
const filterModel = new FilterModel();

const filmsPresenter = new FilmsPresenter({
  filmContainer: siteMainElement,
  filmsModel,
  commentsModel,
  filterModel});

const filterPresenter = new FilterPresenter({
  filterContainer: siteMainElement,
  filterModel,
  filmsModel
});

render(new UserNameView(), siteHeaderElement);
render(new FooterStatisticsView({filmsModel}), footerElement);

filmsPresenter.init();
filterPresenter.init();
