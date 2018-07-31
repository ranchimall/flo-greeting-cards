const html2canvas = require('html2canvas');

$(document).on('keyup', '.stick_text', function() {
  var btn = this;
  var _id = $(btn).attr('id');
  
  if(_id == '_to') {
    var to = $(btn).val();
    $("#span_to").text(to);
  } else if(_id == '_from') {
    var from = $(btn).val();
    $("#span_from").text(from);
  } else if(_id == '_bdata') {
    var usg_msg = $(btn).val();
    $("#span_user_msg").text(usg_msg);
  }
});

$(document).on('click', '#bc-btn', function() {
  var text = $('#_bdata').val();
  var _from = $('#_from').val();
  var _to = $('#_to').val();
  var _cardid = $('#_cardid').val();
    $.ajax({
      type: 'post',
      url: '/write',
      data: {_bdata:text,_from:_from, _to:_to, _cardid:_cardid},
      success: function(data) {

        html2canvas(document.getElementById("pdfcontent"), { allowTaint: true }).then(function(canvas) {
            var img = canvas.toDataURL("image/png");
            var doc = new jsPDF('p', 'mm', 'a3');
            doc.addImage(img, 'PNG', 10, 10);
            doc.save("test.pdf");
            doc.autoPrint();
        });

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
     } 
    });
  });