// var itemHeader = document.querySelectorAll('.item-header');
// itemHeader.forEach((item) => {
//     item.onclick = () => {
//         console.log(123);
//         item.classList.add('active-color');
//     }
// });

(function ($) {
  $(document).ready(function () {
    // get current URL path and assign 'active' class
    var pathname = window.location.pathname;
    var pathnameCategorie = window.location.pathname;

    if (pathname.startsWith("/admin/users")) {
      pathname = "/admin/users";
      $('.navbar-nav > li > a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname.startsWith("/admin/categories")) {
      pathname = "/admin/categories";
      $('.navbar-nav > li > a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname.startsWith("/admin/products")) {
      pathname = "/admin/products";
      $('.navbar-nav > li > a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname == "/home") {
      pathname = "/";
      $('.navbar-nav > li > a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname == "/login") {
      pathname = "/login";
      $('a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname.startsWith("/products")) {
      pathname = "/products";
      $('a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname.startsWith("/cart")) {
      pathname = "/carts";
      $('a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else if (pathname.startsWith("/history")) {
      pathname = "/history";
      $('a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    } else {
      element = $('.navbar-nav > li > a[href="' + pathname + '"]')
        .parent()
        .addClass("active-color");
    }

    // List Categories
    if (pathnameCategorie.startsWith("/products/converse")) {
      pathnameCategorie = "/products/converse";
      $('a[href="' + pathnameCategorie + '"]')
        .parent()
        .addClass("active-colorCategorie");
    } else if (pathnameCategorie.startsWith("/products/vans")) {
      pathnameCategorie = "/products/vans";
      $('a[href="' + pathnameCategorie + '"]')
        .parent()
        .addClass("active-colorCategorie");
    } else if (pathnameCategorie.startsWith("/products/adidas")) {
      pathnameCategorie = "/products/adidas";

      $('a[href="' + pathnameCategorie + '"]')
        .parent()
        .addClass("active-colorCategorie");
    } else if (pathnameCategorie.startsWith("/products/puma")) {
      pathnameCategorie = "/products/puma";

      $('a[href="' + pathnameCategorie + '"]')
        .parent()
        .addClass("active-colorCategorie");
    } else if (pathnameCategorie.startsWith("/products/mlb")) {
      pathnameCategorie = "/products/mlb";

      $('a[href="' + pathnameCategorie + '"]')
        .parent()
        .addClass("active-colorCategorie");
    }
  });
})(jQuery);

// Header time
var dateString;
var day;
var d;
var timeText = document.querySelector(".header-time");
setInterval(function () {
  d = new Date();
  switch (d.getDay()) {
    case 0:
      day = "Thứ 2";
      break;
    case 1:
      day = "Thứ 3";
      break;
    case 2:
      day = "Thứ 4";
      break;
    case 3:
      day = "Thứ 5";
      break;
    case 4:
      day = "Thứ 6";
      break;
    case 5:
      day = "Thứ 7";
      break;
    case 6:
      day = "Chủ nhật";
      break;
    default:
      break;
  }
  dateString =
    day +
    ", " +
    d.getDate() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getFullYear() +
    " " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds();
  timeText.innerHTML = dateString;
}, 1000);

window.addEventListener("scroll", function (e) {
  var scrollProgress = document.querySelector(".my-progress");
  var progressValue = document.querySelector(".my-progress-value");
  var pos = document.body.scrollTop;
  var calcHeight = document.body.scrollHeight - document.body.clientHeight;
  var scrollValue = Math.round((pos * 100) / calcHeight);
  scrollProgress.style.background =
    "conic-gradient(var(--hover-color) " +
    scrollValue +
    "%, #ccc " +
    scrollValue +
    "%)";
  progressValue.textContent = `${scrollValue}%`;
  if (parseInt(scrollY) == 0) {
    document.querySelector(".my-progress").classList.add("none-progress");
  } else {
    document.querySelector(".my-progress").classList.remove("none-progress");
  }
});

//AOS
AOS.init();
