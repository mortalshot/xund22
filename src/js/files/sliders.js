
// Подключение функционала 
import { menuClose } from "./functions.js";

/*
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Lazy, Keyboard, Mousewheel, Scrollbar, FreeMode } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.home__slider')) {
		const wrapper = document.querySelector('.wrapper');

		// Создаем слайдер
		let homeSlider = new Swiper('.home__slider', {
			direction: 'vertical',
			slidesPerView: 'auto',

			modules: [Lazy, Keyboard, Mousewheel, Scrollbar, FreeMode],
			observer: true,
			observeParents: true,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			watchOverflow: true,

			// Запрет на смену слайда через перетаскивание
			// allowTouchMove: false,

			// Ленивая загрузка
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			keyboard: {
				enabled: true,
				onlyInViewport: false,
				pageUpDown: true,
			},

			mousewheel: {
				sensitivity: 1,
			},

			scrollbar: {
				el: '.home__scroll',
				dragClass: "home__drag-scroll",
				draggable: true,
			},

			// отключаем авто инит для проверки высоты слайдов
			init: false,

			// События
			on: {
				init: function () {
					setScrollType();
				},
				resize: function () {
					setScrollType();
				}
			}
		});

		function setScrollType() {
			if (wrapper.classList.contains('_free')) {
				wrapper.classList.remove('_free');
				homeSlider.params.freeMode.enabled = false;
			}

			for (let index = 0; index < homeSlider.slides.length; index++) {
				const homeSlide = homeSlider.slides[index];
				const homeSlideContent = homeSlide.querySelector('.home__content');

				if (homeSlideContent) {
					const homeSlideContentHeight = homeSlideContent.offsetHeight;

					if (homeSlideContentHeight > window.innerHeight) {
						wrapper.classList.add('_free');
						homeSlider.params.freeMode.enabled = true;
						break;
					}
				}
			}

			// console.log(homeSlider.params.freeMode);
		}

		homeSlider.init();

		const sliderLinks = document.querySelectorAll('._slider-link a');
		if (sliderLinks.length > 0) {
			sliderLinks.forEach(element => {
				element.addEventListener('click', function (e) {
					// Закрываем бургер-меню при клике на ссылку, ведущую на секцию на той же странице
					menuClose();

					// Навигация по слайдеру
					const href = this.getAttribute('href');
					homeSlider.slideTo(href);
					e.preventDefault();
				})
			});
		}
	}

	if (document.querySelector('.template1__slider')) {
		let template1Md2 = window.matchMedia('(max-width: 991.98px)');
		function template1HandleMd2Change(e) {
			if (e.matches) {
				new Swiper('.template1__slider', { // Указываем скласс нужного слайдера
					// Подключаем модули слайдера
					// для конкретного случая
					modules: [Lazy],
					observer: true,
					observeParents: true,
					slidesPerView: 1.5,
					spaceBetween: 10,
					autoHeight: false,
					speed: 800,
					watchOverflow: true,

					// Ленивая загрузка
					preloadImages: true,
					lazy: {
						loanOnTransitionStart: true,
						loadPrevNext: true,
					},

					// Брейкпоинты
					breakpoints: {
						450: {
							slidesPerView: 1.8,
						},
						575: {
							slidesPerView: 2.2,
						},
						768: {
							slidesPerView: 2.7,
						},
					},

					// События
					on: {

					}
				});
			}
			else {
				let template1Items = document.querySelectorAll('.template1__slide');
				template1Items.forEach(element => {
					const elementImage = element.querySelector('img');
					const elementImageSrc = elementImage.dataset.src;
					elementImage.src = elementImageSrc;
				});
			}
		}
		template1Md2.addEventListener('change', template1HandleMd2Change);
		template1HandleMd2Change(template1Md2);
	}

	if (document.querySelector('.template3__slider')) {
		new Swiper('.template3__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [],
			observer: true,
			observeParents: true,
			slidesPerView: 1.7,
			spaceBetween: 20,
			autoHeight: false,
			speed: 800,
			watchOverflow: true,
			loop: true,

			// Брейкпоинты
			breakpoints: {
				575: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 2,
				},
			},

			// События
			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}



window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});