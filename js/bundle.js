/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
     // calc

     const result = document.querySelector('.calculating__result span');
     let sex , height, weight, age, ration;
 
     if(localStorage.getItem('sex')) {
         sex = localStorage.getItem('sex');
     }else {
         sex = 'woman';
         localStorage.setItem('sex', 'woman');
     }
 
     if(localStorage.getItem('ratio')) {
         ration = localStorage.getItem('ratio');
     }else {
         ration = 1.375;
         localStorage.setItem('ratio', 1.375);
     }
 
     function initLocalSettings(selector, classActive) {
         const elements = document.querySelectorAll(selector);
 
               elements.forEach(elem => {
                 elem.classList.remove(classActive);
 
                 if(elem.getAttribute('id') === localStorage.getItem('sex')) {
                     elem.classList.add(classActive);
                 }
                 if(elem.getAttribute('data-ration') === localStorage.getItem('ratio')) {
                     elem.classList.add(classActive);
                 }
               });
     }
 
     initLocalSettings('#gender div', 'calculating__choose-item_active');
     initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
 
     function calcTotal () {
         if(!sex || !height || !weight || !age || !ration) {
             result.textContent = '_____';
             return;
         }
 
         if(sex === 'woman') {
             result.textContent = Math.round((447.6 + (9,2 * weight) + (3.1 * height) - (4.3 * age)) * ration);
         }else {
             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ration);
         }
     }
 
     calcTotal();
 
    
 
     function getStaticInformation (selector, classActiv) {
         const elements = document.querySelectorAll(selector);
                 elements.forEach(elem => {
                     elem.addEventListener('click', (e) => {
                         if(e.target.getAttribute('data-ration')) {
                             ration = +e.target.getAttribute('data-ration');
                             localStorage.setItem('ratio', +e.target.getAttribute('data-ration'));
                         } else {
                             sex = e.target.getAttribute('id');
                             localStorage.setItem('sex', e.target.getAttribute('id'));
                         }
 
 
 
                         elements.forEach(elem => {
                             elem.classList.remove(classActiv);
                         });
 
                         e.target.classList.add(classActiv);
 
                         calcTotal();
                     });
                 });
                 
     }
 
     getStaticInformation('#gender div', 'calculating__choose-item_active');
     getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
 
     function getDynamicInformation (selector) {
         const input = document.querySelector(selector);
 
         input.addEventListener('input', () => {
 
             if(input.value.match(/\D/g)){
                 input.style.border = '1px solid red';
             }else {
                 input.style.border = '';
             }
 
             switch(input.getAttribute('id')){
                 case 'height':
                     height = +input.value;
                     break;
                 case 'weight':
                     weight = +input.value;
                     break;
                 case 'age':
                     age = +input.value;
                     break;
             }
             console.log(height, weight, age);
             calcTotal();
         });
     }
 
     getDynamicInformation('#height');
     getDynamicInformation('#weight');
     getDynamicInformation('#age');
 
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
    //menuCard

    class MenuCard {
        constructor (img, title, descr, price, altimg, parentSelector, ...classes) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.altimg = altimg;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price *= this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
                element.innerHTML = `
                    
                    <img src=${this.img} alt=${this.altimg}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                    
                `;
                this.parent.append(element);
        }
    }

    /*getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, title, descr, price, altimg}) => {
            new MenuCard(img, title, descr, price, altimg, '.menu .container').render();
        });
    }); */

    axios.get('http://localhost:3000/menu')
    .then(data => {
        data.data.forEach(({img, title, descr, price, altimg}) => {
            new MenuCard(img, title, descr, price, altimg, '.menu .container').render();
        }); 
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _service_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/service */ "./js/service/service.js");



function forms(form) {
     
     const forms = document.querySelectorAll(form);

     forms.forEach(item => {
         biendpostData(item);
     });
 
     const message = {
         Loading: 'img/form/spinner.svg',
         Success: 'Спасибо вам! данные отправленны',
         fail: 'Что-то пошло не так'
     };
     
     
       
 function biendpostData(form) {
     form.addEventListener('submit', (e) => {
         e.preventDefault();
 
         const statusMassage = document.createElement('img');
             statusMassage.src= message.Loading;
             statusMassage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
             form.insertAdjacentElement('afterend', statusMassage);
 
         
  
 
         const formData = new FormData(form);
         const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
         
 
         (0,_service_service__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
         .then((data) => {
             console.log(data);
             showThanksModal(message.Success);
             statusMassage.remove();
         })
         .catch(() => {
             showThanksModal(message.fail);
         })
         .finally(() => {
             form.reset();
         });
     });
 }
 
 function showThanksModal (message) {
 
     const prevThanksDialog = document.querySelector('.modal__dialog');
     prevThanksDialog.classList.add('hide');
     
 
     const ThanksModal = document.createElement('div');
     ThanksModal.classList.add('modal__dialog');
 
     ThanksModal.innerHTML = `
         <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>       
         </div>
     `;
 
     document.querySelector('.modal').append(ThanksModal);
 
     
     setTimeout(() => {
         ThanksModal.remove();
         prevThanksDialog.classList.add('show');
         prevThanksDialog.classList.remove('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
     }, 2000);
 }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });

function closeModal (modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.remove('show');
  document.body.style.overflow = '';
}



function modal (triggerSelector, modalSelector) {
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);

    

     function openModal () {
      modal.classList.toggle('show');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimerId);
    }
    
    
    modalTrigger.forEach(item => {
      item.addEventListener('click', openModal);
    });


    modal.addEventListener('click', (e) => {
      const target = e.target;

      if(target === modal || target.getAttribute('data-close') == '') {
          closeModal(modalSelector);
      }
    });

    const modalTimerId = setTimeout(openModal, 50000);

    document.addEventListener('keydown', (e) => {
          if(e.code === 'Espace') {
              closeModal(modalSelector);
          }
    });

    function showModalByScroll () {
        if(window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight) {
          openModal();
          window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
          
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, wrapper, inner, prevArrow, nextArrow, totalCounter, currentCounter}) {
    //Slider

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          sliderWrapper = document.querySelector(wrapper),
          sliderInner = document.querySelector(inner),
          width = window.getComputedStyle(sliderWrapper).width,
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter);
          
    let slidesIndex = 1;
    let offset = 0;

    function slideCurrent () {
        if(slides.length < 10) {
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slidesIndex}`;
        }else {
            total.textContent = `${slides.length}`;
            current.textContent = `${slidesIndex}`;
        }
    }

    function opacityDots() {
        arrDots.forEach(item => item.style.opacity = '0.5');
        arrDots[slidesIndex - 1].style.opacity = 1; 
    }

    sliderInner.style.width = slides.length * 100 + '%' ;
    sliderInner.style.display = 'flex';
    sliderInner.style.transition = '0.5s all';

    sliderWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const dots = document.createElement('ol');
        const  arrDots = [];
          dots.classList.add('carousel-dots');
          dots.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
          `;
          slider.append(dots);
    
          for(let i = 0; i < slides.length; i++) {
              const dot = document.createElement('li');
                    dot.setAttribute('data-slide-to', i + 1);
                dot.style.cssText = `
                    box-sizing: content-box;
                    flex: 0 1 auto;
                    width: 30px;
                    height: 6px;
                    margin-right: 3px;
                    margin-left: 3px;
                    cursor: pointer;
                    background-color: #fff;
                    background-clip: padding-box;
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    opacity: .5;
                    transition: opacity .6s ease;
                `;
                if(i == 0) {
                    dot.style.opacity = 1;
                  }
                dots.append(dot);
                arrDots.push(dot);

                opacityDots();
          }
          
          function deleteNotDigits(str) {
              return +str.replace(/\D/g, '');
          }

    next.addEventListener('click', () => {
        if(offset == deleteNotDigits(width) * (slides.length - 1)){
            offset = 0;
        }else {
            offset += deleteNotDigits(width);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(slidesIndex == slides.length) {
            slidesIndex = 1;
        }else {
            slidesIndex++;
        }

        if(slides.length < 10) {
            current.textContent = `0${slidesIndex}`;
        }else {
            current.textContent = slidesIndex;
        }

        
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        }else {
            offset -= deleteNotDigits(width);
        }

        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(slidesIndex == 1) {
            slidesIndex = slides.length ;
        }else {
            slidesIndex--;
        }

        if(slides.length < 10) {
            current.textContent = `0${slidesIndex}`;
        }else {
            current.textContent = slidesIndex;
        }

        opacityDots();
    });

    arrDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slidesIndex = slideTo;

            offset = deleteNotDigits(width) * (slideTo - 1);
            sliderInner.style.transform = `translateX(-${offset}px)`;

            arrDots.forEach(item => item.style.opacity = '0.5');
            arrDots[slidesIndex - 1].style.opacity = 1; 

            slideCurrent();
        });
    });
    

    
   /*  showSlides(slidesIndex);

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if(n > slides.length) {
            slidesIndex = 1;
        }

        if(n < 1) {
            slidesIndex = slides.length;
        }

        if(slides.length < 10) {
            current.textContent = `0${slidesIndex}`;
        } else {
            current.textContent = slidesIndex;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[slidesIndex - 1].style.display = 'block';
        
    }

    function plusSlides(n) {
        
        showSlides(slidesIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    }); */

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (parentSelector, tabSelector, tabContentSelector, tabActiveSelector) {

   const tabsParent = document.querySelector(parentSelector),
         tabs = document.querySelectorAll(tabSelector),
         tabsContent = document.querySelectorAll(tabContentSelector);

         function hiddenTabsContent() {
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show');
            });

            tabs.forEach(item => {
                item.classList.remove(tabActiveSelector);
            });
         }
         hiddenTabsContent();

         function showTabsContent(i = 0) {
             tabsContent[i].classList.add('show');
             tabsContent[i].classList.remove('hide');
             tabs[i].classList.add(tabActiveSelector);
         }

         showTabsContent();

         tabsParent.addEventListener('click', (e) => {
            const target = e.target;

            if(target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if(target === item) {
                        hiddenTabsContent();
                        showTabsContent(i);
                    }
                });
            }
         });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(timerSelector, deadline) {

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / 1000 / 60 / 60 / 24),
              hours = Math.floor((t / 1000 / 60 / 60) % 24),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML =getZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(timerSelector, deadline);         
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/service/service.js":
/*!*******************************!*\
  !*** ./js/service/service.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });


const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: data
    });
    return await res.json();
};

 const getResource = async (url) => {
        const res = await fetch(url);
        
        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    };

   




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");


    
    
    
    
    
    
    

    window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_0__.default)('.timer', '2021-04-13');
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__.default)('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_2__.default)({
        container:'.offer__slider',
        slide:'.offer__slide',
        wrapper:'.offer__slider-wrapper',
        inner:'.offer__slider-inner',
        prevArrow:'.offer__slider-prev',
        nextArrow:'.offer__slider-next',
        totalCounter:'#total',
        currentCounter:'#current'
    });
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.default)('[data-modal]', '.modal');
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__.default)();
});








})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map