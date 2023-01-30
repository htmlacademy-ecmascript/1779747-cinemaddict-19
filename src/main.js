import {render} from './framework/render.js';
import UserNameView from './view/user-name-view.js';
import FilmsPresenter from './presenter/films-presenter.js';
import FilmsModel from './model/films-model.js';
import FooterStatisticsView from './view/footer-statistics-view.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer__statistics');
const filmsModel = new FilmsModel();
const filmsPresenter = new FilmsPresenter({filmContainer: siteMainElement, filmsModel});

render(new UserNameView(), siteHeaderElement);
render(new FooterStatisticsView({filmsModel}), footerElement);

filmsPresenter.init();
