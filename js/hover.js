var $ = jQuery;

$(document).ready( function() {

  $('#christine').hide();

  $('.shape.second').hover (

    function() {

      $('.shapes-container > #center > .shape').not('.shape.second').hide();

      $('#christine').show().typetype(
        "CHRISTINE BJERKE",
        {
          e: 0.08, // error rate. (use e=0 for perfect typing)
          t: 200, // interval between keypresses
          keypress: function (){
            // called after every keypress (this may be an erroneous keypress!)
          },
          callback: function (){
            // the `this` keyword is bound to the particular element.
          },
          showCursor: true,
            // character for cursor
          cursorChar: "|"
        }
      );

      var now = Date.now();

      rotate = setInterval(
        function() {
          var diff = Date.now() - now;
          shape2.rotationZ(0.1*diff+160).update();
          shape2.rotationY(0.01*diff).update();
          rotateBox(shape2.children[0], 'y', 0.02*diff);
          rotateBox(shape2.children[1], 'x', 0.0009*(Math.sin(diff)*2));
          rotateBox(shape2.children[2], 'z', 0.001*(Math.cos(diff)));
        },
        50);

      $('.shape, .face').css('transition','transform 0.2s ease-in-out');

      shape2.scale(2.5).update();
      shape2.move(80,100,0).update();
    },

    function() {
      $('.shapes-container > #center > .shape').not('.shape.second').show();
      $('#christine').hide().html("");
      shape2.scale(1).update();
      shape2.rotation(70,0,45).update();
      shape2.move(-80,-100,0).update();
      shape2.children[0].rotation(0, 0, 0).update();
      shape2.children[1].rotation(0, 90, 0).update();
      shape2.children[2].rotation(90, 0, 0).update();
      clearInterval(rotate);
    }

  );


});
