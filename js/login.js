// 登录模块功能

// 获取电话
var tel = document.getElementsByClassName("tel")[0];
// 获取密码
var password = document.getElementsByClassName("password")[0];
// 获取记住密码框
var checkbox = document.getElementById("checkbox");
// 获取登录按钮
var loginBtn = document.getElementsByClassName("login-btn")[0];

// 记住密码功能
// 页面加载后完成手机号码和密码自动填写
window.addEventListener("load", function () {
  // 记住密码选中状态
  if (window.localStorage.getItem("checked") == "true") {
    tel.value = window.localStorage.getItem("tel");
    password.value = window.localStorage.getItem("password");
    checkbox.checked = window.localStorage.getItem("checked");
  }
});

// 登录功能
loginBtn.addEventListener("click", function () {
  // 获取localStorage中手机号码的值
  var telLocalStorage = window.localStorage.getItem("tel");
  // 获取localStorage中密码的值
  var passwordLocalStorage = window.localStorage.getItem("password");
  // 判断手机号码和密码输入是否正确
  if (tel.value == telLocalStorage && password.value == passwordLocalStorage) {
    alert("登录成功");

    // 记住密码框放入localStrong
    window.localStorage.setItem("checked", checkbox.checked);

    // 登录成功把设置user为true
    window.localStorage.setItem("user", "true");

    // 跳转到首页
    setTimeout(function () {
      window.location.href = "./index.html";
    }, 1000);
   
  } else {
    alert("用户名或密码输入错误");

    // 登录失败把设置user为false
    window.localStorage.setItem("user", "false");
  }
});
