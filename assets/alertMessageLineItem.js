
   $(document).ready(function(){
//     $('.closeModal').on('click',function(){
//        $('.popUpModal').fadeOut();
//   	});
    $('.click').unbind().click(function(e){
       var $url = $(this).parent().find('.url').val();
      	var $id = $(this).parent().find('.id').val();
      	console.log('collection page'+$url);
      	addToCart($url, $id, 1);     
     });
   })
