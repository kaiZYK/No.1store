// 单个价格购买功能
// 获取价格
var ourPrice = document.getElementsByClassName("our-price")[0];

// 尺码选中状态功能
// 获取全部的size
var sizes = document.getElementsByClassName("size");
// exclusive(sizes, "size", "shopping-bg");
for (let i = 0; i < sizes.length; i++) {
  sizes[i].addEventListener("click", function () {
    //  排他法
    for (let i = 0; i < sizes.length; i++) {
      sizes[i].className = "size";
    }
    this.className += " shopping-bg";
    if (sizes[0].getAttribute("class") == "size shopping-bg") {
      ourPrice.innerHTML = 1789 * shopCount.value;
    } else if (sizes[1].getAttribute("class") == "size shopping-bg") {
      ourPrice.innerHTML = 1989 * shopCount.value;
    } else if (sizes[2].getAttribute("class") == "size shopping-bg") {
      ourPrice.innerHTML = 2189 * shopCount.value;
    }
  });
}

// 颜色选中状态功能
// 获取全部的color-selection
var colorSelection = document.getElementsByClassName("color-selection");
exclusive(colorSelection, "color-selection", "shopping-bg");

// 封装排他法函数
// list：遍历的列表
// style1：原本的样式
// style2：要添加的样式
function exclusive(list, style1, style2) {
  for (let i = 0; i < list.length; i++) {
    list[i].addEventListener("click", function () {
      //  排他法
      for (let i = 0; i < list.length; i++) {
        list[i].className = style1;
      }
      this.className = `${style1} ${style2}`;
    });
  }
}

// 件数增加或减少功能
// 获取件数输入框
var shopCount = document.getElementsByClassName("shop—count")[0];
// 获取件数添加按钮
var countAdd = document.getElementsByClassName("count-add")[0];
// 获取件数减少按钮
var countRemove = document.getElementsByClassName("count-remove")[0];

// 封装价格计算函数
function priceCalculation() {
  if (sizes[0].getAttribute("class") == "size shopping-bg") {
    ourPrice.innerHTML = 1789;
  } else if (sizes[1].getAttribute("class") == "size shopping-bg") {
    ourPrice.innerHTML = 1989;
  } else if (sizes[2].getAttribute("class") == "size shopping-bg") {
    ourPrice.innerHTML = 2189;
  }
  ourPrice.innerHTML = ourPrice.innerHTML * shopCount.value;
}

// 页面加载触发价格计算函数
window.addEventListener("load", function () {
  priceCalculation();
});

// 设置一开始的件数
var ainitialCount = shopCount.value;

// 件数输入框失去焦点时触发 每次获取上一次写好之后的件数
shopCount.addEventListener("blur", function () {
  ainitialCount = shopCount.value;
});

// 件数输入框输入时触发
shopCount.addEventListener("input", function () {
  // 判断是否输入的是字符或有小数点没 如果是字符或有小数点 件数变为之前写好的件数
  if (isNaN(shopCount.value) || shopCount.value.indexOf(".") != -1) {
    shopCount.value = ainitialCount;
  }

  // 如果输入的件数小于等于1 价格乘以次数为 *1
  if (shopCount.value <= 1) {
    countRemove.setAttribute("disabled", "true");
    shopCount.value = 1;
    priceCalculation();
  } else {
    // 否则输入的件数大于1 价格乘以次数为写的次数
    countRemove.removeAttribute("disabled");
    priceCalculation();
  }
});

// 件数添加按钮点击时触发
countAdd.addEventListener("click", function () {
  countRemove.removeAttribute("disabled");
  shopCount.value++;
  priceCalculation();
});

// 件数减少按钮点击时触发
countRemove.addEventListener("click", function () {
  if (shopCount.value > 1) {
    countRemove.removeAttribute("disabled");
    shopCount.value--;
    priceCalculation();
  } else {
    countRemove.setAttribute("disabled", "true");
  }
});

// 组合购买功能
// 获取组合商品的选中框
var checkboxs = document.getElementsByClassName("checkbox");
// 获取组合商品的价格
var shopPrices = document.getElementsByClassName("shop-price");
// 获取组合商品的件数输入框
var shopTotalcount = document.getElementsByClassName("shop-totalcount")[0];
// 获取组合商品的总价格
var shopTotalprice = document.getElementsByClassName("shop-totalprice")[0];

window.addEventListener("load", function () {
  // 让总价格变为0
  shopTotalprice.innerHTML = "";

  // 当勾选输入时
  for (let i = 0; i < checkboxs.length; i++) {
    // 开始的价格是加上初始选中的价格
    if (checkboxs[i].checked == true) {
      shopTotalprice.innerHTML =
        shopTotalprice.innerHTML - 0 + (shopPrices[i].innerHTML - 0);
    }
    checkboxs[i].addEventListener("click", function () {
      // 谁选中了就加上谁的价格
      if (this.checked == true) {
        shopTotalprice.innerHTML =
          shopTotalprice.innerHTML - 0 + (shopPrices[i].innerHTML - 0);
      } else if (this.checked == false) {
        // 谁取消选中了就减去谁的价格
        shopTotalprice.innerHTML =
          shopTotalprice.innerHTML - shopPrices[i].innerHTML;
      }
    });
  }
});

// 设置一开始组合商品的件数
var ainitialCounts = shopTotalcount.value;

// 组合商品的件数输入框失去焦点时触发 每次获取上一次写好之后的件数
shopTotalcount.addEventListener("blur", function () {
  ainitialCounts = shopTotalcount.value;
});

// 组合商品的件数输入框输入时触发
shopTotalcount.addEventListener("input", function () {
  // 每一次上次选中的全部价格
  var shopTotalprice1 = 0;
  // 判断是否输入的是字符或有小数点没 如果是字符或有小数点就价格变为之前的件数
  if (
    isNaN(shopTotalcount.value) ||
    shopTotalcount.value.indexOf(".") != -1 ||
    shopTotalcount.value < 1
  ) {
    shopTotalcount.value = ainitialCounts;
  }

  // 如果输入的件数小于等于1 每一个价格乘以次数为 *1
  if (shopTotalcount.value <= 1) {
    shopTotalcount.value = 1;
    // 让总价格变为0
    shopTotalprice.innerHTML = "";

    // 当勾选输入时
    for (let i = 0; i < checkboxs.length; i++) {
      // 开始的价格是加上初始选中的价格
      if (checkboxs[i].checked == true) {
        shopTotalprice1 =
          shopTotalprice.innerHTML - 0 + (shopPrices[i].innerHTML - 0);
      }
      // 开始的价格是加上初始选中的价格 乘以次数
      if (checkboxs[i].checked == true) {
        shopTotalprice.innerHTML =
          shopTotalprice.innerHTML -
          0 +
          shopPrices[i].innerHTML * shopTotalcount.value;
      }
      checkboxs[i].addEventListener("click", function () {
        // 谁选中了就加上谁的价格乘以倍数
        if (this.checked == true) {
          shopTotalprice.innerHTML =
            shopTotalprice.innerHTML -
            0 +
            shopPrices[i].innerHTML * shopTotalcount.value +
            shopTotalprice1;
        } else if (this.checked == false) {
          // 谁取消选中了就减去谁的价格
          shopTotalprice.innerHTML =
            shopTotalprice.innerHTML -
            shopPrices[i].innerHTML * shopTotalcount.value -
            shopTotalprice1;
        }
      });
    }
  } else {
    // 否则输入的件数大于1 价格乘以次数为写的次数

    // 让总价格变为0
    shopTotalprice.innerHTML = "";

    // 当勾选输入时
    for (let i = 0; i < checkboxs.length; i++) {
      // 开始的价格是加上初始选中的价格 乘以次数
      if (checkboxs[i].checked == true) {
        shopTotalprice.innerHTML =
          shopTotalprice.innerHTML -
          0 +
          shopPrices[i].innerHTML * shopTotalcount.value;
      }
      checkboxs[i].addEventListener("click", function () {
        // 谁选中了就加上谁的价格乘以倍数
        if (this.checked == true) {
          shopTotalprice.innerHTML =
            shopTotalprice.innerHTML -
            0 +
            shopPrices[i].innerHTML * shopTotalcount.value +
            shopTotalprice1 / shopTotalcount.value;
        } else if (this.checked == false) {
          // 谁取消选中了就减去谁的价格
          shopTotalprice.innerHTML =
            shopTotalprice.innerHTML -
            shopPrices[i].innerHTML * shopTotalcount.value -
            shopTotalprice1 / shopTotalcount.value;
          if (
            checkboxs[0].checked == false &&
            checkboxs[1].checked == false &&
            checkboxs[2].checked == false
          ) {
            shopTotalprice.innerHTML = 0;
          }
        }
      });
    }
  }
});
// 加入购物车功能
// 购物车功能
// 获取整个购物车
var shopping = document.getElementsByClassName("shopping")[0];
// 查找购物车里面的ul
var shoppingList = document.getElementsByClassName("shopping-list")[0];
// 获取购物车里面每一项li
var shoppingLis = shoppingList.children;
// 获取商品删除按钮
var shoppingClose = document.getElementsByClassName("close");
// 获取商品数量
var shoppingHeadCount = document.getElementsByClassName("shopping-head-count");
// 获取商品的总数量
var totalQuantity = document.getElementsByClassName("total—quantity")[0];
// 获取商品价格
var shoppingPrice = document.getElementsByClassName("price");
// 获取商品的总价格
var totalPrice = document.getElementsByClassName("total-price")[0];
// 获取商品输入框
var textCount = document.getElementsByClassName("text-count");
// 获取商品添加按钮
var btnAdd = document.getElementsByClassName("btn-add");
// 获取商品减少按钮
var btnRemove = document.getElementsByClassName("btn-remove");

// 查找商品的img
var shop_img = document.getElementsByClassName("product-shopping-left")[0]
  .children[0].children[0];
// 查找商品的标题
var shop_h4 = document.getElementsByClassName("product-shopping-center")[0]
  .children[0];
// 查找商品的文本
var shop_div = document.getElementsByClassName("product-shopping-center")[0]
  .children[1];
// 获取加入购物车按钮
var shoppingCar = document.getElementsByClassName("shopping-car")[0];
shoppingCar.addEventListener("click", function () {
  // 如果里面还有li商品项的话
  if (shoppingList.children.length != 0) {
    // 创建li
    var li = document.createElement("li");

    // 创建头部div shopping-head
    var shoppingHead = document.createElement("div");
    shoppingHead.className = "shopping-head";
    // 创建头部div里面的第一个p标签
    var shoppingHead_p1 = document.createElement("p");
    shoppingHead_p1.innerHTML = "珠韵首饰旗舰店";
    shoppingHead.appendChild(shoppingHead_p1);
    // 创建头部div里面的第二个p标签
    var shoppingHead_p2 = document.createElement("p");
    // 创建头部div里面的第二个p标签里面的文字1
    shoppingHead_p2.innerHTML = "共";
    // 创建头部div里面的第二个p标签里面的span标签
    var shoppingHead_p2_span = document.createElement("span");
    shoppingHead_p2_span.className = "shopping-head-count";
    shoppingHead_p2_span.innerHTML = shopCount.value;
    shoppingHead_p2.appendChild(shoppingHead_p2_span);
    // 创建头部div里面的第二个p标签里面的文字1
    shoppingHead_p2.innerHTML += "件商品";
    shoppingHead.appendChild(shoppingHead_p2);
    li.appendChild(shoppingHead);

    // 创建主要内容div shopping-main
    var shoppingMain = document.createElement("div");
    shoppingMain.className = "shopping-main";
    // 创建主要内容div里面的img
    var shoppingMain_img = document.createElement("img");
    shoppingMain_img.setAttribute("src", shop_img.getAttribute("src"));
    shoppingMain_img.className = "pic";
    shoppingMain.appendChild(shoppingMain_img);
    // 创建主要内容div里面的div shopping-title
    var shoppingMain_div = document.createElement("div");
    shoppingMain_div.className = "shopping-title";
    // 创建主要内容div里面的div里面的第一个p标签
    var shoppingMain_div_p1 = document.createElement("p");
    shoppingMain_div_p1.innerHTML = shop_h4.innerHTML;
    shoppingMain_div.appendChild(shoppingMain_div_p1);
    // 创建主要内容div里面的div里面的第一个span标签
    var shoppingMain_div_span1 = document.createElement("span");
    shoppingMain_div_span1.innerHTML = shop_div.innerHTML;
    shoppingMain_div.appendChild(shoppingMain_div_span1);
    // 创建主要内容div里面的div里面的div标签
    var shoppingMain_div_div = document.createElement("div");
    // 创建主要内容div里面的div里面的div标签里面的第一个button减
    var shoppingMain_div_div_btnRemove = document.createElement("button");
    shoppingMain_div_div_btnRemove.className = "btn-remove";
    shoppingMain_div_div_btnRemove.innerHTML = "-";
    shoppingMain_div_div.appendChild(shoppingMain_div_div_btnRemove);
    // 创建主要内容div里面的div里面的div标签里面的input框
    var shoppingMain_div_div_input = document.createElement("input");
    shoppingMain_div_div_input.className = "text-count";
    shoppingMain_div_div_input.type = "text";
    shoppingMain_div_div_input.value = shopCount.value;
    shoppingMain_div_div.appendChild(shoppingMain_div_div_input);
    // 创建主要内容div里面的div里面的div标签里面的第二个button加
    var shoppingMain_div_div_btnAdd = document.createElement("button");
    shoppingMain_div_div_btnAdd.className = "btn-add";
    shoppingMain_div_div_btnAdd.innerHTML = "+";
    shoppingMain_div_div.appendChild(shoppingMain_div_div_btnAdd);
    shoppingMain_div.appendChild(shoppingMain_div_div);
    // 创建主要内容div里面的div里面的第二个span标签
    var shoppingMain_div_span2 = document.createElement("span");
    shoppingMain_div_span2.className = "close";
    shoppingMain_div_span2.innerHTML = "X";
    shoppingMain_div.appendChild(shoppingMain_div_span2);
    // 创建主要内容div里面的div里面的第二个p标签
    var shoppingMain_div_p2 = document.createElement("p");
    shoppingMain_div_p2.innerHTML = "￥";
    // 创建主要内容div里面的div里面的第二个p标签里面的span
    var shoppingMain_div_p2_span = document.createElement("span");
    shoppingMain_div_p2_span.className = "price";
    shoppingMain_div_p2_span.innerHTML = ourPrice.innerHTML - 0;
    shoppingMain_div_p2.appendChild(shoppingMain_div_p2_span);
    shoppingMain_div.appendChild(shoppingMain_div_p2);
    shoppingMain.appendChild(shoppingMain_div);
    li.appendChild(shoppingMain);

    // 创建底部div shopping-bottom
    var shoppingBottom = document.createElement("div");
    shoppingBottom.className = "shopping-bottom";
    // 创建底部div里面的span
    var shoppingBottom_span = document.createElement("span");
    shoppingBottom_span.innerHTML = "全场包邮";
    shoppingBottom.appendChild(shoppingBottom_span);
    li.appendChild(shoppingBottom);

    // 把创建好的li放入ul中
    shoppingList.appendChild(li);

    // priceCalculations();
    // 购物车功能

    // 购物车输入框添加减少输入功能
    // 封装计算价格函数
    function priceCalculations() {
      totalPrice.innerHTML = 0;
      totalQuantity.innerHTML = 0;
      for (let i = 0; i < textCount.length; i++) {
        shoppingPrice[i].innerHTML = initialPrice[i];
        shoppingPrice[i].innerHTML =
          (shoppingPrice[i].innerHTML * textCount[i].value).toFixed(2) - 0;
        totalPrice.innerHTML =
          (totalPrice.innerHTML - 0 + (shoppingPrice[i].innerHTML - 0)).toFixed(
            2
          ) - 0;
        totalQuantity.innerHTML =
          totalQuantity.innerHTML - 0 + (shoppingHeadCount[i].innerHTML - 0);
      }
    }

    // 设置一开始的件数数量
    var ainitialCounts = [];
    // 设置所有价格的初值
    var initialPrice = [];
    for (let i = 0; i < textCount.length; i++) {
      ainitialCounts.push(textCount[i].value);
      initialPrice.push(shoppingPrice[i].innerHTML);
      // 给每个li设置下标
      shoppingLis[i].setAttribute("index", i);

      // 设置商品的数量为输入框里的数量
      shoppingHeadCount[i].innerHTML = textCount[i].value;

      // 件数输入框失去焦点时触发 每次获取上一次写好之后的件数
      textCount[i].addEventListener("blur", function () {
        ainitialCounts[i] = this.value;
      });

      // 件数输入框输入时触发
      textCount[i].addEventListener("input", function () {
        // 判断是否输入的是字符或有小数点没 如果是字符或有小数点 件数变为之前写好的件数
        if (
          isNaN(this.value) ||
          this.value.indexOf(".") != -1 ||
          this.value < 1
        ) {
          this.value = ainitialCounts[i];
          // 设置商品的数量为输入框里的数量
          shoppingHeadCount[i].innerHTML = this.value;
        }

        // 如果输入的件数小于等于1 价格乘以次数为 *1
        if (this.value <= 1) {
          this.value = 1;
          // 设置商品的数量为输入框里的数量
          shoppingHeadCount[i].innerHTML = this.value;
          priceCalculations();
        } else {
          // 设置商品的数量为输入框里的数量
          shoppingHeadCount[i].innerHTML = this.value;
          // 否则输入的件数大于1 价格乘以次数为写的次数
          priceCalculations();
        }
      });

      // 件数添加按钮点击时触发
      btnAdd[i].addEventListener("click", function () {
        this.previousElementSibling.value++;
        // 设置商品的数量为输入框里的数量
        this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
          this.previousElementSibling.value;
        priceCalculations();

        // textCount[i].value++;
        // // 设置商品的数量为输入框里的数量
        // shoppingHeadCount[i].innerHTML = textCount[i].value;
        // priceCalculations();
      });

      // 件数减少按钮点击时触发
      btnRemove[i].addEventListener("click", function () {
        if (this.nextElementSibling.value >= 1) {
          this.nextElementSibling.value--;
          // 设置商品的数量为输入框里的数量
          this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
            this.nextElementSibling.value;
          priceCalculations();
        } else {
          // 设置商品的数量为输入框里的数量
          this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
            this.nextElementSibling.value;
        }
        // if (textCount[i].value >= 1) {
        //   textCount[i].value--;
        //   // 设置商品的数量为输入框里的数量
        //   shoppingHeadCount[i].innerHTML = textCount[i].value;
        //   priceCalculations();
        // }
        // else {
        //   // 设置商品的数量为输入框里的数量
        //   shoppingHeadCount[i].innerHTML = textCount[i].value;
        //   priceCalculations();
        // }
      });
    }

    // 删除商品功能
    for (let i = 0; i < shoppingLis.length; i++) {
      // 给每一个close按钮设置closeRemove函数把this传入
      shoppingClose[i].setAttribute("onclick", "closeRemove(this)");
      // 给每一个remove按钮设置remove函数把this传入
      btnRemove[i].setAttribute("onclick", "remove(this)");
    }

    // 删除shoppingLis的函数
    // close删除函数;
    function closeRemove(this_) {
      var bool = confirm("宝贝仅剩一件啦,确定要删除吗？");
      if (bool) {
        // 删除前先获取下标
        var index =
          this_.parentNode.parentNode.parentNode.getAttribute("index");
        // 把下标放入localStorage中
        window.localStorage.setItem("lis" + index, index);
        shoppingList.removeChild(this_.parentNode.parentNode.parentNode);
        priceCalculations();
        // 当li全部删完之后
        if (shoppingLis.length == 0) {
          // 执行没有商品列表项创建图片函数
          pic();
        }
      }
    }
    // remove按钮删除函数
    function remove(this_) {
      if (this_.nextElementSibling.value == 0) {
        var bool = confirm("宝贝仅剩一件啦,确定要删除吗？");
        if (bool) {
          // 删除前先获取下标
          var index =
            this_.parentNode.parentNode.parentNode.parentNode.getAttribute(
              "index"
            );
          // 把下标放入localStorage中
          window.localStorage.setItem("lis" + index, index);
          shoppingList.removeChild(
            this_.parentNode.parentNode.parentNode.parentNode
          );
          priceCalculations();
          // 当li全部删完之后
          if (shoppingLis.length == 0) {
            // 执行没有商品列表项创建图片函数
            pic();
          }
        } else {
          this_.nextElementSibling.value = 1;
          priceCalculations();
          // 设置商品的数量为输入框里的数量
          this_.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
            this_.nextElementSibling.value;
        }
      }
    }
    // 封装没有商品列表项创建图片函数
    function pic() {
      if (totalQuantity.innerHTML == 0) {
        for (let i = 0; i < shopping.children.length; i++) {
          shopping.removeChild(shopping.children[i]);
          i--;
        }
        var div = document.createElement("div");
        div.className = "shopping-div";
        var img = document.createElement("img");
        img.setAttribute("src", "./images/icon_tips2.png");
        img.className = "shopping-pic";
        div.appendChild(img);
        var h4 = document.createElement("h4");
        h4.innerHTML = "你的一号店购物车还是空的";
        h4.className = "shopping-h4";
        div.appendChild(h4);
        shopping.appendChild(div);
      }
    }

    // 保留localStorage数据
    window.addEventListener("load", function () {
      // 开始获取li的长度 防止每次获取li
      var length_ = shoppingLis.length;
      for (let i = 0; i < length_; i++) {
        var index = window.localStorage.getItem("lis" + i);

        // 第一次
        if (i == 0) {
          // 当localStorage的lis的值不为空时
          if (index != null) {
            // 第一次是第几个下标删除第几个元素;
            shoppingList.removeChild(shoppingLis[index]);
            // 执行价格计算函数
            priceCalculations();
          }
        } else {
          // 第一次以外次数
          // 当localStorage的lis的值不为空时
          if (index != null) {
            // 第一次以外是 第几个下标再减去循环的次数 删除第几个元素 循环的次数代表已经删除几个元素  因为第一次删除之后 下面的元素会顶上去;
            shoppingList.removeChild(shoppingLis[index - i]);
            // 执行价格计算函数
            priceCalculations();
          }
        }
      }
      // 当li全部删完之后
      if (shoppingLis.length == 0) {
        // 执行没有商品列表项创建图片函数
        pic();
      }
    });
  } else {
    // 如果没有li商品项的话
    // 获取没有商品列表生成的图片标签
    var shoppingDiv = document.getElementsByClassName("shopping-div")[0];
    // 删除图片标签
    shopping.removeChild(shoppingDiv);

    // 创建shopping里面的ul
    var ul = document.createElement("ul");
    ul.className = "shopping-list";
    // 创建li
    var li = document.createElement("li");

    // 创建头部div shopping-head
    var shoppingHead = document.createElement("div");
    shoppingHead.className = "shopping-head";
    // 创建头部div里面的第一个p标签
    var shoppingHead_p1 = document.createElement("p");
    shoppingHead_p1.innerHTML = "珠韵首饰旗舰店";
    shoppingHead.appendChild(shoppingHead_p1);
    // 创建头部div里面的第二个p标签
    var shoppingHead_p2 = document.createElement("p");
    // 创建头部div里面的第二个p标签里面的文字1
    shoppingHead_p2.innerHTML = "共";
    // 创建头部div里面的第二个p标签里面的span标签
    var shoppingHead_p2_span = document.createElement("span");
    shoppingHead_p2_span.className = "shopping-head-count";
    shoppingHead_p2_span.innerHTML = shopCount.value;
    shoppingHead_p2.appendChild(shoppingHead_p2_span);
    // 创建头部div里面的第二个p标签里面的文字1
    shoppingHead_p2.innerHTML += "件商品";
    shoppingHead.appendChild(shoppingHead_p2);
    li.appendChild(shoppingHead);

    // 创建主要内容div shopping-main
    var shoppingMain = document.createElement("div");
    shoppingMain.className = "shopping-main";
    // 创建主要内容div里面的img
    var shoppingMain_img = document.createElement("img");
    shoppingMain_img.setAttribute("src", shop_img.getAttribute("src"));
    shoppingMain_img.className = "pic";
    shoppingMain.appendChild(shoppingMain_img);
    // 创建主要内容div里面的div shopping-title
    var shoppingMain_div = document.createElement("div");
    shoppingMain_div.className = "shopping-title";
    // 创建主要内容div里面的div里面的第一个p标签
    var shoppingMain_div_p1 = document.createElement("p");
    shoppingMain_div_p1.innerHTML = shop_h4.innerHTML;
    shoppingMain_div.appendChild(shoppingMain_div_p1);
    // 创建主要内容div里面的div里面的第一个span标签
    var shoppingMain_div_span1 = document.createElement("span");
    shoppingMain_div_span1.innerHTML = shop_div.innerHTML;
    shoppingMain_div.appendChild(shoppingMain_div_span1);
    // 创建主要内容div里面的div里面的div标签
    var shoppingMain_div_div = document.createElement("div");
    // 创建主要内容div里面的div里面的div标签里面的第一个button减
    var shoppingMain_div_div_btnRemove = document.createElement("button");
    shoppingMain_div_div_btnRemove.className = "btn-remove";
    shoppingMain_div_div_btnRemove.innerHTML = "-";
    shoppingMain_div_div.appendChild(shoppingMain_div_div_btnRemove);
    // 创建主要内容div里面的div里面的div标签里面的input框
    var shoppingMain_div_div_input = document.createElement("input");
    shoppingMain_div_div_input.className = "text-count";
    shoppingMain_div_div_input.type = "text";
    shoppingMain_div_div_input.value = shopCount.value;
    shoppingMain_div_div.appendChild(shoppingMain_div_div_input);
    // 创建主要内容div里面的div里面的div标签里面的第二个button加
    var shoppingMain_div_div_btnAdd = document.createElement("button");
    shoppingMain_div_div_btnAdd.className = "btn-add";
    shoppingMain_div_div_btnAdd.innerHTML = "+";
    shoppingMain_div_div.appendChild(shoppingMain_div_div_btnAdd);
    shoppingMain_div.appendChild(shoppingMain_div_div);
    // 创建主要内容div里面的div里面的第二个span标签
    var shoppingMain_div_span2 = document.createElement("span");
    shoppingMain_div_span2.className = "close";
    shoppingMain_div_span2.innerHTML = "X";
    shoppingMain_div.appendChild(shoppingMain_div_span2);
    // 创建主要内容div里面的div里面的第二个p标签
    var shoppingMain_div_p2 = document.createElement("p");
    shoppingMain_div_p2.innerHTML = "￥";
    // 创建主要内容div里面的div里面的第二个p标签里面的span
    var shoppingMain_div_p2_span = document.createElement("span");
    shoppingMain_div_p2_span.className = "price";
    shoppingMain_div_p2_span.innerHTML = ourPrice.innerHTML - 0;
    shoppingMain_div_p2.appendChild(shoppingMain_div_p2_span);
    shoppingMain_div.appendChild(shoppingMain_div_p2);
    shoppingMain.appendChild(shoppingMain_div);
    li.appendChild(shoppingMain);

    // 创建底部div shopping-bottom
    var shoppingBottom = document.createElement("div");
    shoppingBottom.className = "shopping-bottom";
    // 创建底部div里面的span
    var shoppingBottom_span = document.createElement("span");
    shoppingBottom_span.innerHTML = "全场包邮";
    shoppingBottom.appendChild(shoppingBottom_span);
    li.appendChild(shoppingBottom);
    // 把创建好的li放入ul中
    ul.appendChild(li);
    shopping.appendChild(ul);

    // 创建shopping里面的意见反馈div shopping-feedback
    var shoppingFeedback = document.createElement("div");
    shoppingFeedback.className = "shopping-feedback";
    // 创建意见反馈div里面的a标签
    var shoppingFeedback_a = document.createElement("a");
    shoppingFeedback_a.href = "##";
    shoppingFeedback_a.innerHTML = "意见反馈";
    shoppingFeedback.appendChild(shoppingFeedback_a);
    shopping.appendChild(shoppingFeedback);

    // 创建shopping底部的按钮div shopping-button
    var shoppingButton = document.createElement("div");
    shoppingButton.className = "shopping-button";
    // 创建shopping底部的按钮div里面的p标签
    var shoppingButton_p = document.createElement("p");
    shoppingButton_p.innerHTML = "合计 ￥";
    // 创建shopping底部的按钮div里面的p标签里面的span标签
    var shoppingButton_p_span = document.createElement("span");
    shoppingButton_p_span.className = "total-price";
    shoppingButton_p_span.innerHTML = totalPrice.innerHTML;
    shoppingButton_p.appendChild(shoppingButton_p_span);
    shoppingButton.appendChild(shoppingButton_p);
    // 创建shopping底部的按钮div里面的button标签
    var shoppingButton_btn = document.createElement("button");
    shoppingButton_btn.innerHTML = "立即结算(";
    // 创建shopping底部的按钮div里面的button标签里面的span标签
    var shoppingButton_btn_span = document.createElement("span");
    shoppingButton_btn_span.className = "total—quantity";
    shoppingButton_btn_span.innerHTML = totalQuantity.innerHTML;
    shoppingButton_btn.appendChild(shoppingButton_btn_span);
    shoppingButton_btn.innerHTML += ")";
    shoppingButton.appendChild(shoppingButton_btn);
    shopping.appendChild(shoppingButton);

    // 购物车功能
    // 购物车输入框添加减少输入功能
    // 封装计算价格函数
    function priceCalculations() {
      totalPrice.innerHTML = 0;
      totalQuantity.innerHTML = 0;
      for (let i = 0; i < textCount.length; i++) {
        shoppingPrice[i].innerHTML = initialPrice[i];
        shoppingPrice[i].innerHTML =
          (shoppingPrice[i].innerHTML * textCount[i].value).toFixed(2) - 0;
        totalPrice.innerHTML =
          (totalPrice.innerHTML - 0 + (shoppingPrice[i].innerHTML - 0)).toFixed(
            2
          ) - 0;
        totalQuantity.innerHTML =
          totalQuantity.innerHTML - 0 + (shoppingHeadCount[i].innerHTML - 0);
      }
    }

    // 设置一开始的件数数量
    var ainitialCounts = [];
    // 设置所有价格的初值
    var initialPrice = [];
    for (let i = 0; i < textCount.length; i++) {
      ainitialCounts.push(textCount[i].value);
      initialPrice.push(shoppingPrice[i].innerHTML);
      // 给每个li设置下标
      shoppingLis[i].setAttribute("index", i);

      // 设置商品的数量为输入框里的数量
      shoppingHeadCount[i].innerHTML = textCount[i].value;

      // 件数输入框失去焦点时触发 每次获取上一次写好之后的件数
      textCount[i].addEventListener("blur", function () {
        ainitialCounts[i] = this.value;
      });

      // 件数输入框输入时触发
      textCount[i].addEventListener("input", function () {
        // 判断是否输入的是字符或有小数点没 如果是字符或有小数点 件数变为之前写好的件数
        if (
          isNaN(this.value) ||
          this.value.indexOf(".") != -1 ||
          this.value < 1
        ) {
          this.value = ainitialCounts[i];
          // 设置商品的数量为输入框里的数量
          shoppingHeadCount[i].innerHTML = this.value;
        }

        // 如果输入的件数小于等于1 价格乘以次数为 *1
        if (this.value <= 1) {
          this.value = 1;
          // 设置商品的数量为输入框里的数量
          shoppingHeadCount[i].innerHTML = this.value;
          priceCalculations();
        } else {
          // 设置商品的数量为输入框里的数量
          shoppingHeadCount[i].innerHTML = this.value;
          // 否则输入的件数大于1 价格乘以次数为写的次数
          priceCalculations();
        }
      });

      // 件数添加按钮点击时触发
      btnAdd[i].addEventListener("click", function () {
        this.previousElementSibling.value++;
        // 设置商品的数量为输入框里的数量
        this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
          this.previousElementSibling.value;
        priceCalculations();

        // textCount[i].value++;
        // // 设置商品的数量为输入框里的数量
        // shoppingHeadCount[i].innerHTML = textCount[i].value;
        // priceCalculations();
      });

      // 件数减少按钮点击时触发
      btnRemove[i].addEventListener("click", function () {
        if (this.nextElementSibling.value >= 1) {
          this.nextElementSibling.value--;
          // 设置商品的数量为输入框里的数量
          this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
            this.nextElementSibling.value;
          priceCalculations();
        } else {
          // 设置商品的数量为输入框里的数量
          this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
            this.nextElementSibling.value;
        }
        // if (textCount[i].value >= 1) {
        //   textCount[i].value--;
        //   // 设置商品的数量为输入框里的数量
        //   shoppingHeadCount[i].innerHTML = textCount[i].value;
        //   priceCalculations();
        // }
        // else {
        //   // 设置商品的数量为输入框里的数量
        //   shoppingHeadCount[i].innerHTML = textCount[i].value;
        //   priceCalculations();
        // }
      });
    }

    // 删除商品功能
    for (let i = 0; i < shoppingLis.length; i++) {
      // 给每一个close按钮设置closeRemove函数把this传入
      shoppingClose[i].setAttribute("onclick", "closeRemove(this)");
      // 给每一个remove按钮设置remove函数把this传入
      btnRemove[i].setAttribute("onclick", "remove(this)");
    }

    // 删除shoppingLis的函数
    // close删除函数;
    function closeRemove(this_) {
      var bool = confirm("宝贝仅剩一件啦,确定要删除吗？");
      if (bool) {
        // 删除前先获取下标
        var index =
          this_.parentNode.parentNode.parentNode.getAttribute("index");
        // 把下标放入localStorage中
        window.localStorage.setItem("lis" + index, index);
        shoppingList.removeChild(this_.parentNode.parentNode.parentNode);
        priceCalculations();
        // 当li全部删完之后
        if (shoppingLis.length == 0) {
          // 执行没有商品列表项创建图片函数
          pic();
        }
      }
    }
    // remove按钮删除函数
    function remove(this_) {
      if (this_.nextElementSibling.value == 0) {
        var bool = confirm("宝贝仅剩一件啦,确定要删除吗？");
        if (bool) {
          // 删除前先获取下标
          var index =
            this_.parentNode.parentNode.parentNode.parentNode.getAttribute(
              "index"
            );
          // 把下标放入localStorage中
          window.localStorage.setItem("lis" + index, index);
          shoppingList.removeChild(
            this_.parentNode.parentNode.parentNode.parentNode
          );
          priceCalculations();
          // 当li全部删完之后
          if (shoppingLis.length == 0) {
            // 执行没有商品列表项创建图片函数
            pic();
          }
        } else {
          this_.nextElementSibling.value = 1;
          priceCalculations();
          // 设置商品的数量为输入框里的数量
          this_.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
            this_.nextElementSibling.value;
        }
      }
    }
    // 封装没有商品列表项创建图片函数
    function pic() {
      if (totalQuantity.innerHTML == 0) {
        for (let i = 0; i < shopping.children.length; i++) {
          shopping.removeChild(shopping.children[i]);
          i--;
        }
        var div = document.createElement("div");
        div.className = "shopping-div";
        var img = document.createElement("img");
        img.setAttribute("src", "./images/icon_tips2.png");
        img.className = "shopping-pic";
        div.appendChild(img);
        var h4 = document.createElement("h4");
        h4.innerHTML = "你的一号店购物车还是空的";
        h4.className = "shopping-h4";
        div.appendChild(h4);
        shopping.appendChild(div);
      }
    }

    // 保留localStorage数据
    window.addEventListener("load", function () {
      // 开始获取li的长度 防止每次获取li
      var length_ = shoppingLis.length;
      for (let i = 0; i < length_; i++) {
        var index = window.localStorage.getItem("lis" + i);

        // 第一次
        if (i == 0) {
          // 当localStorage的lis的值不为空时
          if (index != null) {
            // 第一次是第几个下标删除第几个元素;
            shoppingList.removeChild(shoppingLis[index]);
            // 执行价格计算函数
            priceCalculations();
          }
        } else {
          // 第一次以外次数
          // 当localStorage的lis的值不为空时
          if (index != null) {
            // 第一次以外是 第几个下标再减去循环的次数 删除第几个元素 循环的次数代表已经删除几个元素  因为第一次删除之后 下面的元素会顶上去;
            shoppingList.removeChild(shoppingLis[index - i]);
            // 执行价格计算函数
            priceCalculations();
          }
        }
      }
      // 当li全部删完之后
      if (shoppingLis.length == 0) {
        // 执行没有商品列表项创建图片函数
        pic();
      }
    });
  }
});
