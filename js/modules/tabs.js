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

export default tabs;