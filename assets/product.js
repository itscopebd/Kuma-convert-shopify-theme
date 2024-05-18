$(document).ready(function () {
  $(".main__product button").click(function (e) {
    e.preventDefault();
    var formData = $(this)
      .closest(".main__product [action='/cart/add']")
      .serialize();

    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      dataType: "json",
      data: formData,
      success: function (data) {
        $("#offcanvasRight").offcanvas("show");
        getDetails();
      },
    });
  });
});

function getDetails() {
  fetch("section_id?=header") 
    .then((res) => res.text())
    .then((data) => {
      var cart_html = $(data);
      var cart__update = $(".cart__cunter", cart_html);
      $(".cart__cunter").replaceWith(cart__update);
    });

  fetch("section_id?=cart-drawer")
    .then((res) => res.text())
    .then((drawer_data) => {
      drawer__html = $(drawer_data);
      drawer__update = $("#offcanvasRightLabel", drawer__html);
      $("#offcanvasRightLabel").replaceWith(drawer__update);

      drawer__items = $(".offcanvas-body", drawer__html);
      $(".offcanvas-body").replaceWith(drawer__items);

      // total price rander

      var totalPrice = $(".cart__bottom .money", drawer__html);
      $(".cart__bottom .money").replaceWith(totalPrice);
    });
}

function increases(el) {
  var input = el.nextElementSibling;
  var value = parseInt(input.value);
  value = isNaN(value) ? 0 : value;
  value++;
  input.value = value;

  quantityChange(input);
}

function decreases(el) {
  var input = el.previousElementSibling;
  var value = parseInt(input.value);
  value = isNaN(value) ? 0 : value;
  if (value > 0) {
    value--;
    input.value = value;

    quantityChange(input);
  }
}

function quantityChange(input) {
  var data_line = $(input).attr("data-line");
  var quantity = $(input).val();
  var data={
    "line":data_line,
    "quantity":quantity
  }

  $.ajax({
    type:"POST",
    url:"/cart/change.js",
    dataType:"json",
    data:data,
    success:function(data){
      getDetails()
    }

  })
}


function itemRemove(event,el){

  event.preventDefault();
  var data_line = $(el).attr("data-line");
  var data={
    "line":data_line,
    "quantity":0
  }

  $.ajax({
    type:"POST",
    url:"/cart/change.js",
    dataType:"json",
    data:data,
    success:function(data){
      getDetails()
    }

  })


}