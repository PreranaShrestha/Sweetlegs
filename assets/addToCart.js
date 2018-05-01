function addToCart($url, $id) {
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
            if (tag.trim() == 'black' && parseInt($qty) + 1 > 10) {
              alert("You can choose only 10 items from this product");
				var quantity = 10;
              	check = false;
                addQtyToCart(quantity); 
              	$cartItems.text($cartItemsVal - parseInt($qty) + 10);
            } else if (tag.trim() == 'limit2' && parseInt($qty) + 1 > 15) {
             	alert("You can choose only 15 items from this product");
				var quantity = 15;
              	check = false;
              	addQtyToCart(quantity);
                $cartItems.text($cartItemsVal - parseInt($qty) + 20);
            } else if (tag.trim() == 'limit3' && parseInt($qty) + 1 > 20) {
              alert("You can choose only 20 items from this product");
				var quantity = 20;
              	check = false;
              	addQtyToCart(quantity);
              	$cartItems.text($cartItemsVal - parseInt($qty) + 30);
            }
          });
          if(check) {
    		addQtyToCart(parseInt($qty) + 1);
            $cartItems.text($cartItemsVal + 1);
          }
        }
    });
 function addQtyToCart(qty) {  
   console.log('qty' + qty);
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
          if(cart.items.length >= 5) {
            $('.popUpModal').fadeIn();
        	
          }
          
          },
          dataType: 'json'
        });   
 }
  
}