function ShoppingCar() {
  // 购物车功能
  // 获取整个购物车
  var shopping = document.getElementsByClassName("shopping")[0];
  // 获取购物车ul列表
  var shoppingList = document.getElementsByClassName("shopping-list")[0];
  // 获取购物车里面每一项li
  var shoppingLis = shoppingList.children;
  // 获取商品删除按钮
  var shoppingClose = document.getElementsByClassName("close");
  // 获取商品数量
  var shoppingHeadCount = document.getElementsByClassName(
    "shopping-head-count"
  );
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

  // 购物车输入框添加减少输入功能
  // 封装计算价格函数
  this.priceCalculations = function () {
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
  };

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
        this.priceCalculations();
      } else {
        // 设置商品的数量为输入框里的数量
        shoppingHeadCount[i].innerHTML = this.value;
        // 否则输入的件数大于1 价格乘以次数为写的次数
        this.priceCalculations();
      }
    });

    // 件数添加按钮点击时触发
    btnAdd[i].addEventListener("click", function () {
      this.previousElementSibling.value++;
      // 设置商品的数量为输入框里的数量
      this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
        this.previousElementSibling.value;
      this.priceCalculations();

      // textCount[i].value++;
      // // 设置商品的数量为输入框里的数量
      // shoppingHeadCount[i].innerHTML = textCount[i].value;
      // this.priceCalculations();
    });

    // 件数减少按钮点击时触发
    btnRemove[i].addEventListener("click", function () {
      if (this.nextElementSibling.value >= 1) {
        this.nextElementSibling.value--;
        // 设置商品的数量为输入框里的数量
        this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
          this.nextElementSibling.value;
        this.priceCalculations();
      } else {
        // 设置商品的数量为输入框里的数量
        this.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
          this.nextElementSibling.value;
      }
      // if (textCount[i].value >= 1) {
      //   textCount[i].value--;
      //   // 设置商品的数量为输入框里的数量
      //   shoppingHeadCount[i].innerHTML = textCount[i].value;
      //   this.priceCalculations();
      // }
      // else {
      //   // 设置商品的数量为输入框里的数量
      //   shoppingHeadCount[i].innerHTML = textCount[i].value;
      //   this.priceCalculations();
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
      var index = this_.parentNode.parentNode.parentNode.getAttribute("index");
      // 把下标放入localStorage中
      window.localStorage.setItem("lis" + index, index);
      shoppingList.removeChild(this_.parentNode.parentNode.parentNode);
      this.priceCalculations();
      // 当li全部删完之后
      if (shoppingLis.length == 0) {
        // 执行没有商品列表项创建图片函数
        this.pic();
      }
    }
  }
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
        this.priceCalculations();
        // 当li全部删完之后
        if (shoppingLis.length == 0) {
          // 执行没有商品列表项创建图片函数
          this.pic();
        }
      } else {
        this_.nextElementSibling.value = 1;
        this.priceCalculations();
        // 设置商品的数量为输入框里的数量
        this_.parentNode.parentNode.parentNode.previousElementSibling.children[1].children[0].innerHTML =
          this_.nextElementSibling.value;
      }
    }
  }
  // 封装没有商品列表项创建图片函数
  pic = function () {
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
  };

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
          this.priceCalculations();
        }
      } else {
        // 第一次以外次数
        // 当localStorage的lis的值不为空时
        if (index != null) {
          // 第一次以外是 第几个下标再减去循环的次数 删除第几个元素 循环的次数代表已经删除几个元素  因为第一次删除之后 下面的元素会顶上去;
          shoppingList.removeChild(shoppingLis[index - i]);
          // 执行价格计算函数
          this.priceCalculations();
        }
      }
    }
    // 当li全部删完之后
    if (shoppingLis.length == 0) {
      // 执行没有商品列表项创建图片函数
      this.pic();
    }
  });
}
