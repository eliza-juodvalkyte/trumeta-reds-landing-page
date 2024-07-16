import "./src/scss/main.scss";

import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    loop: true,
    autoHeight: true,
    pagination: {
      el: ".pagination",
      clickable: true,
      horizontalClass: "pagination--horizontal",
      bulletClass: "pagination__bullet",
      bulletActiveClass: "pagination__bullet--active",
    },
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
  });
});
