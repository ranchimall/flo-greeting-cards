(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);