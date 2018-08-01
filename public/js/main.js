window.$ = window.jQuery = require('jquery');    
var bootstrap = require('bootstrap');

const html2canvas = require('html2canvas');
const QRCode = require('qrcode');

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

        var txnid = $.trim(data.txnid);
        if(txnid.length < 1) {
            console.log("No Tx found");    
            return false;
        }

        var urlstring = `https://testnet.florincoin.info/tx/${txnid}`;

        var canvas = document.getElementById('canvas');

        var opts = {
            width: 200,
            errorCorrectionLevel: 'H'
          }

        QRCode.toCanvas(canvas, urlstring, opts, function (error) {
            if (error) console.error(error)
            console.log('Qr generated! for : '.urlstring);
            html2canvas(document.getElementById("pdfcontent"), { allowTaint: true }).then(function(canvas) {
                let namepdf = "flo-greetings-"+new Date().getTime()+".pdf";
                var img = canvas.toDataURL("image/png");
                var doc = new jsPDF('p', 'mm', 'a3');
                doc.addImage(img, 'PNG', 1, 2);
                doc.save(namepdf);
                doc.autoPrint();
            });
        })
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus, errorThrown);
     } 
    });
  });