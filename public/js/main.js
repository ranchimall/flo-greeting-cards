$(document).on('click', '#bc-btn', function() {
    $.ajax({
      type: 'post',
      url: '/write',
      success: function(data) {
        console.log(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
     } 
    });
  });