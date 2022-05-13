// Подключение функционала 
import { isMobile, menuClose } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Добавляем класс к оболочке страницы, чтобы сделать слайдер на всю высоту экрана
const homeSlider = document.querySelector('.home__slider');
if (homeSlider) {
    document.querySelector('.page').classList.add('_fixed');
}