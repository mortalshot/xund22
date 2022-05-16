// Подключение функционала 
import { isMobile, menuClose } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Добавляем класс к оболочке страницы, чтобы сделать слайдер на всю высоту экрана
const homeSlider = document.querySelector('.home__slider');
if (homeSlider) {
    document.querySelector('.page').classList.add('_fixed');
}

/* Калькулятор */
/* Шаг 1: Определение гендера */
const genders = document.querySelectorAll('.options_gender');
if (genders.length > 0) {
    genders.forEach(element => {
        const gendersRadio = element.querySelectorAll('input');

        gendersRadio.forEach(radio => {
            radio.addEventListener('change', function () {
                const parent = this.closest('.form');
                const select = parent.querySelector('.form__item._disabled');
                if (select) {
                    select.classList.remove('_disabled');
                }

                const serviceItems = parent.querySelectorAll('.options-service .checkbox');
                if (serviceItems) {
                    serviceItems.forEach(item => {
                        item.classList.remove('_disabled');
                        item.querySelector('input').checked = false;
                        parent.querySelector('.service_4').classList.add('_disabled');
                    });
                }

                if (this.value == "male") {
                    parent.querySelector('.service_4').classList.add('_disabled');
                    parent.querySelector('.service_4 input').checked = false;
                }

                if (this.value == "baby") {
                    parent.querySelector('.service_4').classList.add('_disabled');
                    parent.querySelector('.service_4 input').checked = false;
                    parent.querySelector('.service_2').classList.add('_disabled');
                    parent.querySelector('.service_2 input').checked = false;
                }
            })
        });
    });
}

/* Шаг 1: Выбор года рождения */

/* Шаг 3: Выбор услуг */
const service = document.querySelectorAll('.options-service');
if (service.length > 0) {
    service.forEach(element => {
        const serviceInput = element.querySelectorAll('input');
        const parent = element.closest('.form');
        const femaleInput = parent.querySelector('.gender_1 input');
        const sicherheit = parent.querySelector('.service_1 input');
        const freude = parent.querySelector('.service_2 input');
        const nutzen = parent.querySelector('.service_3 input');
        const baby = parent.querySelector('.service_4 input');

        serviceInput.forEach(input => {
            input.addEventListener('change', function () {
                // Freude всегда вместе с Nutzen
                if (this.closest('.checkbox').classList.contains('service_2')) {
                    if (freude.checked) {
                        nutzen.checked = true;
                    }
                } else if (freude.checked) {
                    nutzen.checked = true;
                }

                // Если это женщина
                if (femaleInput.checked) {
                    if (sicherheit.checked || nutzen.checked) {
                        parent.querySelector('.service_4').classList.remove('_disabled');
                    } else {
                        parent.querySelector('.service_4').classList.add('_disabled');
                        baby.checked = false;
                    }

                    // Baby всегда вместе с Sicherheit
                    if (baby.checked) {
                        sicherheit.checked = true;
                    }
                }

                // Выбрана ли услуга
                if (sicherheit.checked || freude.checked || nutzen.checked || baby.checked) {
                    parent.querySelector('.form__item-wrapper').classList.remove('_disabled');
                } else {
                    parent.querySelector('.form__item-wrapper').classList.add('_disabled');
                    parent.querySelector('.form__submit').classList.add('_disabled');
                }
            })
        });
    });
}

/* Шаг 4: Выбор формы обратной связи */
const formControls = document.querySelectorAll('.form__item-controls');
if (formControls.length > 0) {
    formControls.forEach(controls => {
        const options = controls.querySelectorAll('.options__item');
        const contactWrapper = controls.closest('.form__item-wrapper');
        const contactInput = contactWrapper.querySelector('.form__input_contact');
        const parent = controls.closest('.form');

        options.forEach(element => {
            const controlsInput = element.querySelectorAll('input');

            controlsInput.forEach(input => {
                input.addEventListener('change', function () {
                    contactInput.disabled = false;

                    if (this.value == "whatsapp" || this.value == "phone") {
                        contactInput.placeholder = "+43 660 0000 000";
                    } else if (this.value == "email") {
                        contactInput.placeholder = "email@gmx.at";
                    }
                })
            });
        });

        // Проверка на валидность контакта
        contactInput.addEventListener('input', function () {
            const controlsValue = controls.querySelector('input:checked').value;
            validate(controlsValue);
        })

        function validate(radioValue) {
            let error = 0;

            if (radioValue == "email") {
                if (!validateEmail(contactInput.value)) {
                    error++;
                }
            }
            else {
                if (!validatePhone(contactInput.value)) {
                    error++;
                }
            }

            if (!error == 0) {
                parent.querySelector('.form__submit').classList.add('_disabled');
                parent.querySelector('.form__item-wrapper').classList.add('_error');
            } else {
                parent.querySelector('.form__submit').classList.remove('_disabled');
                parent.querySelector('.form__item-wrapper').classList.remove('_error');
            }
        }

        // Валидация почты
        function validateEmail(email) {
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            return re.test(String(email).toLowerCase());
        }
        // Валидация телефона
        function validatePhone(phone) {
            var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
            return re.test(phone);
        }
    });
}