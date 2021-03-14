import {closeModal} from './modal';
import {postData} from '../service/service';

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
 
         
 
         postData('http://localhost:3000/requests', json)
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
         closeModal('.modal');
     }, 2000);
 }
}

export default forms;
