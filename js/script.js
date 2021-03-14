'use strict';

    import timer from './modules/timer';
    import tabs from'./modules/tabs';
    import slider from'./modules/slider';
    import modal from'./modules/modal';
    import forms from'./modules/forms';
    import cards from'./modules/cards';
    import calc from'./modules/calc';

    window.addEventListener('DOMContentLoaded', () => {
    timer('.timer', '2021-04-13');
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', 'tabheader__item_active');
    slider({
        container:'.offer__slider',
        slide:'.offer__slide',
        wrapper:'.offer__slider-wrapper',
        inner:'.offer__slider-inner',
        prevArrow:'.offer__slider-prev',
        nextArrow:'.offer__slider-next',
        totalCounter:'#total',
        currentCounter:'#current'
    });
    modal('[data-modal]', '.modal');
    forms('form');
    cards();
    calc();
});







