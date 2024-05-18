$(document).ready(function () {


function selectVariant(){
  var slectedId=$(".select__variants").val();
  var url= new URL(window.location.href);
  url.searchParams.set('variant',slectedId)
  window.history.replaceState({},"",url)

}


  function selectedUpdate() {
    var updateValue = "";
    $(".product_variants input[type='radio']:checked").each(function () {
      updateValue += (updateValue ? " / " : "") + $(this).val();
    });

    $(".select__variants option").each(function () {
      var variantImage = $(this).attr("data-img");

      if ($(this).text().trim() == updateValue) {
        $(this).prop("selected", true);
        $(".main_product img").attr("src", variantImage)

        return false;
      }
    });
  }
  $(".product_variants input[type='radio']").change(function(){
    selectedUpdate();
    selectVariant();
  });


  

  selectedUpdate();
});
