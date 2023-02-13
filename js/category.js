// 收藏功能

// 获取收藏
var collect = document.getElementsByClassName("collect");
// 设置点击次数
var collectNum = 0;
for (let i = 0; i < collect.length; i++) {
  collect[i].addEventListener("click", function () {
    collectNum++;
    if (collectNum % 2) {
      this.style.backgroundImage = "url(./images/heart_h.png)";
    } else {
      this.style.backgroundImage = "url(./images/heart.png)";
    }
  });
}

// 清空浏览历史功能
// 获取商品总列表ul
var shopList = document
  .getElementsByClassName("aside-shop")[0]
  .getElementsByTagName("ul")[0];

// 获取商品列表里面的商品li
var shopLis = shopList.getElementsByTagName("li");

// 获取清空按钮
var clearShop = document.getElementsByClassName("clear-shop")[0];

// 点击清空
clearShop.addEventListener("click", function () {
  for (let i = 0; i < shopLis.length; i++) {
    shopList.removeChild(shopLis[i]);
    i--;
  }
});

// // 价格升序降序
// // 获取价格升序降序标签
// var priceShop = document.getElementsByClassName("price-shop");
// // console.log(priceShop);

// // 获取价格升序
// var priceUp = document.getElementsByClassName("price-up")[1];
// // console.log(priceUp);

// // 获取价格降序
// var priceDown = document.getElementsByClassName("price-down")[1];
// // console.log(priceDown);

// // 获取全部商品
// var lis = document.getElementsByClassName("product-content-main")[0].children[0]
//   .children;
// console.log(lis);

// // 获取到全部的价格标签
// var prices = document.getElementsByClassName("goods-price");

// // 创建价格数组 放入遍历好的价格
// var pricesArray = [];

// // 遍历prices
// for (let item of prices) {
//   item = item.innerHTML.slice(1) - 0;
//   pricesArray.push(item);
// }
// console.log(pricesArray);

// for (let i in pricesArray) {
//   console.log(pricesArray[i].parentNode);
// }

// // 新的价格数组升序
// pricesArray = pricesArray.sort(function (a, b) {
//   return a - b;
// });
// console.log(pricesArray);

// for (let i in pricesArray) {
//   //   console.log(pricesArray[i]);
// }
