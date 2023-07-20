import "../libs/lazyload.min.js";
let lazyLoadInstance = new LazyLoad();
window.lazyLoad = lazyLoadInstance;

window.screenWidth = {
  laptop: 1100,
}

/*
import { Fancybox, Carousel } from "@fancyapps/ui";
import { Fancybox, Carousel, Panzoom } from "@fancyapps/ui";
Fancybox.bind('[data-fancybox]', {
  Toolbar: {
    display: [
      "close",
    ],
  },
});
*/

/**
 * Маска телефона
 */
/*
import "../libs/inputmask.js";
const telInputs = document.querySelectorAll('input[type="tel"]');
telInputs.forEach(tel => {
  const maskOptions = {
    mask: '+7(999) 999-99-99',
    inputmode: 'tel',
  };

  new Inputmask(maskOptions).mask(tel);
})
//*/

const phones = document.querySelectorAll('a[href^="tel:"]');
phones.forEach((phone) => {
  phone.classList.add('js_copyclicker');
});
import "../b_components/controls/copyclicker.js"


// import AOS from "aos";
// window.aos = AOS;
// window.aos.init({
//   offset: 50
// });

// setTimeout(() => {
//   window.aos.refresh();
// }, 5000)

import "./apple-helpers.js"
import "./smooth-anchors.js"
import "./swiper-helpers.js"
