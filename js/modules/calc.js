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
export default calc;