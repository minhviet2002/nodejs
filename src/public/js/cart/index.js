var productReduceBtn = document.querySelector(".product-count-reduce");
var productPlusBtn = document.querySelector(".product-count-plus");
var productCountInput = document.querySelector(".product-count-input");
var reduceProduct = () => {
  if (
    productCountInput.value == 1 ||
    productCountInput.value == "" ||
    isNaN(productCountInput.value) !== false
  ) {
    productCountInput.value = 1;
  } else {
    productCountInput.value--;
  }
};
var plusProduct = () => {
  if (isNaN(productCountInput.value) !== false) {
    productCountInput.value = 1;
  } else {
    productCountInput.value++;
  }
};

productReduceBtn.onclick = (e) => {
  reduceProduct();
};
productPlusBtn.onclick = (e) => {
  plusProduct();
};

productCountInput.onchange = () => {
  if (isNaN(productCountInput.value) != false) {
    productCountInput.value = 1;
  }
};

// ADD product in cart
var productAddBtn = document.querySelector(".product-action-button");

productAddBtn.addEventListener("click", function (e) {
  var pathname = window.location.pathname;
  var count = productCountInput.value;
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", pathname);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("totalCount=" + count);
});
