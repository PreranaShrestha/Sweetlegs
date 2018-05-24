function addToCart($url, $id, inputQty) {
  var check = true;
  var $cartItems = $('.cart_items_number.counter_number.animated.rubberBand');
  var $cartItemsVal = parseInt($cartItems.text());
 
  $.ajax({
      type: 'GET',
      url:'/cart.js',
      dataType: 'json',
      success: function(cart){
        
        item = cart.items.filter(item => item.variant_id == $id);
        if(item.length == 0) {
          $qty = 0;
        } else {
         $qty = item[0].quantity; 
        }
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
            } else if (tag.trim() == 'limit2' && parseInt($qty) + inputQty > 15) {
             	$('.goCart').addClass('hideMe');
          	    $('.btn.btn-default.closeModal').removeClass('hideMe');
                $(".modal-body").text("Sorry, you have reached the maximum limit for this product.");      
                $('.popUpModal').fadeIn();
				var quantity = 15;
              	check = false;
              	addQtyToCart(quantity);
            } else if (tag.trim() == 'limit3' && parseInt($qty) + inputQty > 20) {
               $('.goCart').addClass('hideMe');
          	   $('.btn.btn-default.closeModal').removeClass('hideMe');
               $(".modal-body").text("Sorry, you have reached the maximum limit for this product.");      
               $('.popUpModal').fadeIn();
				var quantity = 20;
              	check = false;
              	addQtyToCart(quantity);
            }
          });
          if(check) {
    		addQtyToCart(parseInt($qty) + inputQty);
          }
        }
    });
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
          $cartItems.text(cart.item_count);
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