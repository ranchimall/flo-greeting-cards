$(document).on('click', '#bc-btn', function() {
  var text = $('#_bdata').val();
  var _cardid = $('#_cardid').val();
    $.ajax({
      type: 'post',
      url: '/write',
      data: {_bdata:text, _cardid:_cardid},
      success: function(data) {
        console.log(data);
        //console.log(JSON.parse(data));  
        
        var doc = new jsPDF()
        var specialElementHandlers = {
          '#pdfignore': function(element, renderer){
            return true;
          }
        };
        //console.log($('#pdfcontent').html());
        
        doc.fromHTML($('#pdfcontent').html(), 15, 15, {
          'width': 170, 
          'elementHandlers': specialElementHandlers
        },
        function(bla){doc.save('card.pdf');},
        doc.autoPrint()
      );

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
     } 
    });
  });