// banner 广告位 轮播图功能
var mySwiper = new Swiper(".swiper", {
  direction: "horizontal", // 垂直切换选项
  loop: true, // 循环模式选项
  // autoplay: true, //等同于以下设置
  autoplay: {
    delay: 2000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
  },
  effect: "fade",

  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
// 鼠标滑过pagination控制swiper切换
for (let i = 0; i < mySwiper.pagination.bullets.length; i++) {
  mySwiper.pagination.bullets[i].onmouseover = function () {
    this.click();
  };
}
