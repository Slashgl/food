
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

export default modal;
export {closeModal};