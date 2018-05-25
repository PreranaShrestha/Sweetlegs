jQuery(function($) {
   var redirect_us = $.cookie('redirect_us');

    var url = window.location.href,
      status = url.split('?')[1];
      
    if (status == 'no-redirect' ) {
      $.cookie('redirect_us', 'no', {
            expires: 1 // the number of days cookie  will be effective
      });      
    }

    if ( status == 'redirected_ca') {
      setTimeout(function () {
          $('#redirect-bar').slideDown('slow');  
        }, 600);
    }
    else if (redirect_us == 'no') {
        return false;
    } 

    // onclick close redirect bar
    $('.redirect-btn.no').click(function(e) {
      e.preventDefault();
      $('#redirect-bar').slideUp('slow'); 
      
      
      $.cookie('redirect_us', 'no', {
            expires: 1 // the number of days cookie  will be effective
      });
      
    });

//$('.redirect-btn:not(.no)').hide();
  // redirect
  jQuery.ajax({
    url: 'https://ipapi.co/jsonp/',
    type: 'POST',
    dataType: 'jsonp',
    success: function(location) {
      $('#redirect-bar .redirect-bar-text .country').text(location.country_name);
      
      var url = window.location.href,
          status = url.split('?')[1];

      var url_account = window.location.pathname;
      
      if (location.country === 'CA') {

        if (status == 'no-redirect' || redirect_us == 'no' || url_account == '/account/login') {}
        else {
         window.top.location.href = 'https://sweetlegs.ca'+window.location.pathname+'?redirected_us'; 
        }

      }   
    }
  });

});