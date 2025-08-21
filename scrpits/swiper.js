const swiper = new Swiper(".education-swiper", {
loop: true,
grabCursor: true,
autoplay: {
    delay: 2000,
    disableOnInteraction: false,
},
slidesPerView: 1,
spaceBetween: 20,
breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
},
});
const projectSwiper = new Swiper('.project-swiper', {
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    640: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});
