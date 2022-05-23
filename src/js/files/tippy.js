// Подключение функционала 
import { isMobile, FLS } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Подключение из node_modules
import tippy from 'tippy.js';

// Подключение cтилей из src/scss/libs
import "../../scss/libs/tippy.scss";
// Подключение cтилей из node_modules
//import 'tippy.js/dist/tippy.css';

// Запускаем и добавляем в объект модулей
let tippyMmd3 = window.matchMedia('(min-width: 767.98px)');
function tippyHma3dleMd2Change(e) {
    if (e.matches) {
        flsModules.tippy = tippy('[data-tippy-content]', {
        });
    }
}
tippyMmd3.addEventListener('change', tippyHma3dleMd2Change);
tippyHma3dleMd2Change(tippyMmd3);