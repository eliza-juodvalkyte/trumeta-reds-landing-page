const performanceItem = document.getElementById("performance_energy");
const imgs = performanceItem.querySelectorAll("img");

const showImageVariant1 = () => {
  imgs[0].classList.remove("performance__image--hidden");
  imgs[1].classList.add("performance__image--hidden");
};

const showImageVariant2 = () => {
  imgs[0].classList.add("performance__image--hidden");
  imgs[1].classList.remove("performance__image--hidden");
};

const checkScreenWidth = () => {
  if (window.innerWidth > 975) {
    showImageVariant1();
  } else {
    showImageVariant2();
  }
};

checkScreenWidth();

window.addEventListener("resize", checkScreenWidth);
