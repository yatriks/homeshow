var $ = jQuery;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

$(document).ready( function() {

  $('#christine').hide();
  var columns = 10;
  var order = shuffle([0,1,2,3,4,5,6]);
  $(' .shape-container .col-sm-2').each( function( index, element ) {
    var offset = order[index]+3;
    // var offset = Math.floor((Math.random() * columns) + 1);
    $( element )
      .addClass('col-sm-offset-'+offset)
      // .after('<div class="col-sm-'+ (columns-offset) + '"></div>');
  });

  $('span > .row.shape-container .col-sm-2').hover (

    function() {

      var shape = $(this).children('.shape');

      $('.shape-container .col-sm-2 > .shape').not(shape).hide();

      // $('#christine').show().typetype(
      //   "CHRISTINE BJERKE",
      //   {
      //     e: 0.08, // error rate. (use e=0 for perfect typing)
      //     t: 200, // interval between keypresses
      //     keypress: function (){
      //       // called after every keypress (this may be an erroneous keypress!)
      //     },
      //     callback: function (){
      //       // the `this` keyword is bound to the particular element.
      //     },
      //     showCursor: true,
      //       // character for cursor
      //     cursorChar: "|"
      //   }
      // );

      $( this ).parents('.shape-container').siblings().show();

      var now = Date.now();

      rotate = setInterval(
        function() {
          var diff = Date.now() - now;
          shape[0].rotationZ(0.1*diff+160).update();
          shape[0].rotationY(0.01*diff).update();
          rotateBox(shape[0].children[randomInt(0,2)], 'x', 0.02*diff);
          // rotateBox(shape[0].children[randomInt(0,2)], 'x', 0.009*(Math.sin(diff)*2));
          rotateBox(shape[0].children[randomInt(0,2)], 'z', 0.001*(Math.cos(diff)));
        },
        100);

      // $('.shape, .face').css('transition','transform 0.2s ease-in-out');

      shape[0].scale(3.4).update();
      // shape2.move(0,0,0).update();
    },

    function() {

      var shape = $(this).children('.shape');

      $( this ).parents('.shape-container').siblings().hide();
      $('.shape-container .col-sm-2 > .shape').show();
      $('#christine').hide().html("");
      shape[0].scale(1).update();
      shape[0].rotation(70,0,45).update();
      // shape[0].move(-80,-100,0).update();
      shape[0].children[0].rotation(0, 0, 0).update();
      shape[0].children[1].rotation(0, 90, 0).update();
      shape[0].children[2].rotation(90, 0, 0).update();
      clearInterval(rotate);
    }

  );


});
