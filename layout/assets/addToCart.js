function addToCart($url, $id, inputQty) {
  var $qty = 0;
  var check = true;
  var $cartItems = $('.cart_items_number.counter_number.animated.rubberBand');
  var $cartItemsVal = parseInt($cartItems.text());
 
  $.ajax({
      type: 'GET',
      url:'/cart.js',
      dataType: 'json',
      success: function(cart){
        $qty = cart.items.filter(item => item.variant_id == $id)[0].quantity;       
      }
    });
  $.ajax({
        type: 'GET',
        url: `${$url}`,
        cache: false,
        dataType: 'json',
        success: function(cart) {
          var tags = cart.product.tags.split(','); 
          tags.forEach(tag => {
            if (tag.trim() == 'limit1' && parseInt($qty) + inputQty > 10) {
                $('.goCart').addClass('hideMe');
          	    $('.btn.btn-default.closeModal').removeClass('hideMe');
                $(".modal-body").text("Sorry, you have reached the maximum limit for this product.");      
                $('.popUpModal').fadeIn();
				var quantity = 10;
              	check = false;
                addQtyToCart(quantity); 
              	$cartItems.text($cartItemsVal - parseInt($qty) + 10);
            } else if (tag.trim() == 'limit2' && parseInt($qty) + inputQty > 15) {
             	$('.goCart').addClass('hideMe');
          	    $('.btn.btn-default.closeModal').removeClass('hideMe');
                $(".modal-body").text("Sorry, you have reached the maximum limit for this product.");      
                $('.popUpModal').fadeIn();
				var quantity = 15;
              	check = false;
              	addQtyToCart(quantity);
                $cartItems.text($cartItemsVal - parseInt($qty) + 20);
            } else if (tag.trim() == 'limit3' && parseInt($qty) + inputQty > 20) {
               $('.goCart').addClass('hideMe');
          	   $('.btn.btn-default.closeModal').removeClass('hideMe');
               $(".modal-body").text("Sorry, you have reached the maximum limit for this product.");      
               $('.popUpModal').fadeIn();
				var quantity = 20;
              	check = false;
              	addQtyToCart(quantity);
              	$cartItems.text($cartItemsVal - parseInt($qty) + 30);
            }
          });
          if(check) {
    		addQtyToCart(parseInt($qty) + inputQty);
            $cartItems.text($cartItemsVal + inputQty);
          }
        }
    });
 function addQtyToCart(qty) {  
   var data = {
    	quantity: qty,
    	id: $id
    }
    $.ajax({
        type: "POST",
        url: '/cart/change.js',
        data: data,
        success: function(cart){
          console.log('response from cart after post');
          console.log(cart);
          if(cart.items.length > 250) {
             $(".modal-body").text("You have hit the maximum line items allowed in your cart, please checkout to avoid any issues."); 
             $('.goCart').removeClass('hideMe');
             $('.btn.btn-default.closeModal').addClass('hideMe');
             $('.popUpModal').fadeIn();        	
          }          
          },
          dataType: 'json'
        });   
 }
  
}