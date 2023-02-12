import {render, RenderPosition} from './framework/render.js';
import UserNameView from './view/user-name-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import CommentModel from './model/comment-model.js';
import FooterStatisticsView from './view/footer-statistics-view.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsApiService from './api/films-api-service.js';
import CommentsApiService from './api/comments-api-service.js';

const AUTHORIZATION = 'Basic KAgTyr79ypzefefedrrrC8FO';
const END_POINT = 'https://19.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');

const filmsModel = new FilmsModel({
  filmsApiService: new FilmsApiService(END_POINT,
    AUTHORIZATION)
});

const commentsModel = new CommentModel({
  commentsApiService: new CommentsApiService(END_POINT,
    AUTHORIZATION)
});

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

render(new UserNameView(), siteHeaderElement, RenderPosition.BEFOREEND);
filterPresenter.init();
filmsPresenter.init();
filmsModel.init() .finally(() => {
  render(new FooterStatisticsView({filmsModel}), footerElement, RenderPosition.BEFOREEND);
});
