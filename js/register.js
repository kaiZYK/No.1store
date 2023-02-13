// 注册模块功能

// 获取手机号码
var tel = document.getElementsByClassName("tel")[0];
// 获取验证码
var authCode = document.getElementsByClassName("auth-code")[0];
// 获取发送验证码按钮
var authCodeBtn = document.getElementsByClassName("auth-code-btn")[0];
// 获取设置密码
var password1 = document.getElementsByClassName("password1")[0];
// 获取确认密码
var password2 = document.getElementsByClassName("password2")[0];
// 获取登录按钮
var registerBtn = document.getElementsByClassName("register-btn")[0];
// 获取span提示信息
var spans = document
  .getElementsByClassName("register")[0]
  .getElementsByTagName("span");

// 手机号码功能

// 设置手机号码布尔值
var telBool = false;

tel.addEventListener("focus", function () {
  spans[0].className = "";
  spans[0].innerHTML = "请输入1-11位手机号码";
});
tel.addEventListener("blur", function () {
  var reg = /^1[3-9][0-9]{9}$/;
  var bool = reg.test(tel.value);

  // 如果输入为空就清空提示信息
  if (tel.value == "") {
    spans[0].className = "";
    spans[0].innerHTML = "";
    // 手机号码布尔值返回错误
    telBool = false;
  } else {
    // 判断手机号码输入的是否正确
    if (bool) {
      spans[0].className = "success";
      spans[0].innerHTML = "手机号码格式正确";
      // 手机号码布尔值返回正确
      telBool = true;
    } else {
      spans[0].className = "error";
      spans[0].innerHTML = "手机号码格式错误";
      // 手机号码布尔值返回错误
      telBool = false;
    }
  }
});

// 验证码功能

// 设置验证码布尔值
var authCodeBool = false;

// 验证码倒计时
var numberAuthCode = 60;
// 验证按定时器
var timerAuthCode = null;
// 验证码数组
var randomNumber = [];
// 验证码次数 用于判断点击按钮没有
var indexAuthCode = 0;
authCodeBtn.addEventListener("click", function (e) {
  e = e || window.event;
  window.event ? (event.cancelBubble = "true") : event.stopPropagation();
  if (telBool) {
    // 按钮禁选
    authCodeBtn.setAttribute("disabled", "true");

    // 防抖
    clearInterval(timerAuthCode);

    // 每点一次验证码失效 验证码清空
    randomNumber = [];

    // 倒计时开始
    timerAuthCode = setInterval(function () {
      numberAuthCode--;
      authCodeBtn.innerHTML = `（${numberAuthCode}秒）重发`;
      // 如果倒计时为0 就停止 按钮恢复正常 时间变为60 验证码变为空数组
      if (numberAuthCode == 0) {
        clearInterval(timerAuthCode);
        authCodeBtn.innerHTML = `重新获取验证码`;
        authCodeBtn.removeAttribute("disabled");
        numberAuthCode = 60;
      }
    }, 1000);

    if (authCodeBtn.disabled) {
      // 设置六位随机数验证码
      setTimeout(function () {
        // 产生六个随机数添加入数组
        for (let i = 1; i <= 6; i++) {
          var number = Math.floor(Math.random() * 10);
          randomNumber.push(number);
        }
        // 数组转为字符串 + 字符串替换
        randomNumber = randomNumber.join().replace(/,/g, "");
        alert(
          `您注册的验证码为：${randomNumber}，请您尽快注册，请不要把验证码泄露给其他人，如非本人请勿操作！`
        );
        // 成功弹出验证码之后验证码次数+1
        indexAuthCode++;
      }, 3000);
    }
  } else {
    spans[1].className = "error";
    spans[1].innerHTML = "请填写正确的手机号";
    // 验证码布尔值返回错误
    authCodeBool = false;
    document.addEventListener("click", function (e) {
      e = e || window.event;
      window.event ? (event.cancelBubble = "true") : event.stopPropagation();
      spans[1].className = "";
      spans[1].innerHTML = "";
      // 验证码布尔值返回错误
      authCodeBool = false;
    });
  }
});

authCode.addEventListener("click", function (e) {
  e = e || window.event;
  window.event ? (event.cancelBubble = "true") : event.stopPropagation();
});
authCode.addEventListener("focus", function () {
  spans[1].className = "";
  spans[1].innerHTML = "请输入6位验证码";
});

// 判断验证码是否正确
authCode.addEventListener("blur", function () {
  // 如果没有点获取验证码按钮 没有获取验证码
  if (indexAuthCode == 0) {
    // 如果输入为空就清空提示信息
    if (authCode.value == "") {
      spans[1].className = "";
      spans[1].innerHTML = "";
      // 验证码布尔值返回错误
      authCodeBool = false;
    } else {
      // 否则都是错误
      spans[1].className = "error";
      spans[1].innerHTML = "验证码错误";
      // 验证码布尔值返回错误
      authCodeBool = false;
    }
  } else {
    // 如果点获取验证码按钮 获取到了验证码

    // 如果输入为空就清空提示信息
    if (authCode.value == "") {
      spans[1].className = "";
      spans[1].innerHTML = "";
      // 验证码布尔值返回错误
      authCodeBool = false;
    } else if (authCode.value == randomNumber) {
      // 如果输入为是验证码提示信息正确
      spans[1].className = "success";
      spans[1].innerHTML = "验证码正确";
      // 验证码布尔值返回正确
      authCodeBool = true;
    } else {
      // 否则输入不为是验证码提示信息失败
      spans[1].className = "error";
      spans[1].innerHTML = "验证码错误";
      // 验证码布尔值返回错误
      authCodeBool = false;
    }
  }
});

// 密码功能

// 设置密码布尔值
var passwordBool = false;

password1.addEventListener("focus", function () {
  spans[2].className = "";
  spans[2].innerHTML = "请输入字母，数子的密码，至少为6位";
});
password1.addEventListener("blur", function () {
  var reg = /^[A-z0-9]{6,}$/;
  var bool = reg.test(password1.value);

  // 如果输入为空就清空提示信息
  if (password1.value == "") {
    spans[2].className = "";
    spans[2].innerHTML = "";
    // 密码布尔值返回错误
    passwordBool = false;
  } else {
    // 判断密码输入的是否正确
    if (bool) {
      spans[2].className = "success";
      spans[2].innerHTML = "密码格式正确";
      // 密码布尔值返回错误
      passwordBool = false;
    } else {
      spans[2].className = "error";
      spans[2].innerHTML = "密码格式错误";
      // 密码布尔值返回错误
      passwordBool = false;
    }
  }

  // 如果密码2里面的值不为空的情况下
  if (password2 != "") {
    var reg = /^[A-z0-9]{6,}$/;
    var bool = reg.test(password2.value);

    // 如果输入为空就清空提示信息
    if (password2.value == "") {
      spans[3].className = "";
      spans[3].innerHTML = "";
      // 密码布尔值返回错误
      passwordBool = false;
    } else {
      if (bool) {
        // 判断两次输入的值是否一致
        if (password1.value == password2.value) {
          spans[3].className = "success";
          spans[3].innerHTML = "两次输入密码一致";
          // 密码布尔值返回正确
          passwordBool = true;
        } else {
          spans[3].className = "error";
          spans[3].innerHTML = "两次输入密码不一致";
          // 密码布尔值返回错误
          passwordBool = false;
        }
      } else {
        spans[3].className = "error";
        spans[3].innerHTML = "密码格式错误";
        // 密码布尔值返回错误
        passwordBool = false;
      }
    }
  }
});
password2.addEventListener("focus", function () {
  spans[3].className = "";
  spans[3].innerHTML = "请输入字母，数子的密码，至少为6位";
});
password2.addEventListener("blur", function () {
  var reg = /^[A-z0-9]{6,}$/;
  var bool = reg.test(password2.value);

  // 如果输入为空就清空提示信息
  if (password2.value == "") {
    spans[3].className = "";
    spans[3].innerHTML = "";
    // 密码布尔值返回错误
    passwordBool = false;
  } else {
    if (bool) {
      // 判断两次输入的值是否一致
      if (password1.value == password2.value) {
        spans[3].className = "success";
        spans[3].innerHTML = "两次输入密码一致";
        // 密码布尔值返回正确
        passwordBool = true;
      } else {
        spans[3].className = "error";
        spans[3].innerHTML = "两次输入密码不一致";
        // 密码布尔值返回错误
        passwordBool = false;
      }
    } else {
      spans[3].className = "error";
      spans[3].innerHTML = "密码格式错误";
      // 密码布尔值返回错误
      passwordBool = false;
    }
  }
});

// 注册功能
registerBtn.addEventListener("click", function () {
  // 当手机号码 验证码 密码 的布尔值都为true时 才能完成注册
  if (telBool == true && authCodeBool == true && passwordBool == true) {
    alert("注册成功");

    // localStrong
    // 保存手机号码
    window.localStorage.setItem("tel", tel.value);
    // 保存密码
    window.localStorage.setItem("password", password1.value);

    // 跳转到登录页
    setTimeout(function () {
      window.location.href = "./login.html";
    }, 1000);
  } else {
    alert("注册失败");
  }
});
