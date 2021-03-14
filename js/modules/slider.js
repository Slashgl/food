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

export default slider;