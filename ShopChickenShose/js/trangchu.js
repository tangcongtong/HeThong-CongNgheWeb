function dangnhap(e) {
  var dn = document.getElementById("dangnhap");
  var dk = document.getElementById("dangki");
  var styledn = dn.style.display;
  if (styledn == "none" || styledn == "") {
    dk.style.display = "none";
    dn.style.display = "flex";
  } else {
    dn.style.display = "none";
  }
}
function dangki(e) {
  var dn = document.getElementById("dangnhap");
  var dk = document.getElementById("dangki");
  if (dk.style.display === "none") {
    dn.style.display = "none";
    dk.style.display = "flex";
  } else {
    dk.style.display = "none";
  }
}

function Validator(options) {
  var selectRules = {};

  // hàm thực hiện validate
  function Validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.parentElement.querySelector(
      options.errorSelector
    );
    //value : imputElement.value
    //test func: rule.test
    var errorMessage;
    //lay cac rule cuar selector
    var rules = selectRules[rule.selector];

    //lap qua tung rule & kiem tra
    // neu co loi thi se dung
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }
    // } ;

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.classList.add("is-invalid");
    } else {
      errorElement.innerText = "";
      inputElement.classList.remove("is-invalid");
    }
    return !errorMessage;
  }

  //   lấy Element của form
  var formdk = document.querySelector(options.form);
  if (formdk) {
    //khi submit form
    formdk.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      options.rules.forEach(function (rule) {
        var inputElement = formdk.querySelector(rule.selector);
        var isvalid = Validate(inputElement, rule);
        if (!isvalid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          var enableInputs = formdk.querySelectorAll("[name]:not([disabled])");
          var formValue = Array.from(enableInputs).reduce(function (
            value,
            input
          ) {
            value[input.name] = input.value;
            return value;
          },
          {});
          options.onSubmit(formValue);
          alert("Đăng ký thành công");
          window.location = "../trangchu.html";
        }
      }
    };

    options.rules.forEach(function (rule) {
      //luu rule cho  moi input
      if (Array.isArray(selectRules[rule.selector])) {
        selectRules[rule.selector].push(rule.test);
      } else {
        selectRules[rule.selector] = [rule.test];
      }

      var inputElement = formdk.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.parentElement.querySelector(
        options.errorSelector
      );
      if (inputElement) {
        //   xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          Validate(inputElement, rule);
        };

        //xử lí khi người dùng nhập vào input
        inputElement.oninput = function () {
          errorElement.innerText = "";

          inputElement.classList.remove("is-invalid");
        };
      }
    });
  }
}

// định nghĩa rules:
// nguyên tắc của các rules:
// 1. khi có lỗi => trả ra mess lỗi
// 2. khi hợp lệ => không trả ra gì cả (undefined)
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập thông tin";
    },
  };
};

Validator.isSDT = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var re = /^\+?0([0-9]{1})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
      return re.test(value) ? undefined : message || "Vui lòng nhập thông tin";
    },
  };
};

Validator.isPassw = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      var re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return re.test(value) ? undefined : message || "Vui lòng nhập thông tin";
    },
  };
};
Validator.isConfirmpassword = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : message || "Giá trị nhập không chính xác";
    },
  };
};

function ValidatorLogin(options) {
  var selectRules = {};

  // hàm thực hiện validate
  function Validate(inputElement, rule) {
    var errorElement = inputElement.parentElement.parentElement.querySelector(
      options.errorSelector
    );
    //value : imputElement.value
    //test func: rule.test
    var errorMessage;
    //lay cac rule cuar selector
    var rules = selectRules[rule.selector];

    //lap qua tung rule & kiem tra
    // neu co loi thi se dung
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) break;
    }
    // } ;

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.classList.add("is-invalid");
    } else {
      errorElement.innerText = "";
      inputElement.classList.remove("is-invalid");
    }
    return !errorMessage;
  }

  //   lấy Element của form
  var formdk = document.querySelector(options.form);
  if (formdk) {
    //khi submit form
    formdk.onsubmit = function (e) {
      e.preventDefault();

      var isFormValid = true;

      options.rules.forEach(function (rule) {
        var inputElement = formdk.querySelector(rule.selector);
        var isvalid = Validate(inputElement, rule);
        if (!isvalid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          var enableInputs = formdk.querySelectorAll("[name]:not([disabled])");
          var formValue = Array.from(enableInputs).reduce(function (
            value,
            input
          ) {
            value[input.name] = input.value;
            console.log(value);
            return value;
          },
          {});
          //  var user= enableInputs.value;
          var pass = formValue.password;
          var user = formValue.username;
          if (user === "Chicken" && pass === "Chicken@123") {
            var dn = document.getElementById("dangnhap");
            dn.style.display = "none";
            alert("Đăng nhập thành công");

          }
          else{
            alert('Tài khoản hoặc mật khẩu không chính xác');
          }
        }
      }
    };

    options.rules.forEach(function (rule) {
      //luu rule cho  moi input
      if (Array.isArray(selectRules[rule.selector])) {
        selectRules[rule.selector].push(rule.test);
      } else {
        selectRules[rule.selector] = [rule.test];
      }

      var inputElement = formdk.querySelector(rule.selector);
      var errorElement = inputElement.parentElement.parentElement.querySelector(
        options.errorSelector
      );
      if (inputElement) {
        //   xử lí trường hợp blur khỏi input
        inputElement.onblur = function () {
          Validate(inputElement, rule);
        };

        //xử lí khi người dùng nhập vào input
        inputElement.oninput = function () {
          errorElement.innerText = "";

          inputElement.classList.remove("is-invalid");
        };
      }
    });
  }
}
ValidatorLogin.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : message || "Vui lòng nhập thông tin";
    },
  };
};
