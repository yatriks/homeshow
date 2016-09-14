var $ = jQuery;

// Shuffle elements in an array randomly; useful for moving stuff around.

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

// Generate a random integer between min and max.

function randomInt(min, max) {
  return Math.floor(Math.random() * max) + min;
}

// On document ready.

$(document).ready( function() {

  /*
    GRID REORDERING
    The following will reorder homepage shapes into random slots on the grid by assigning them
    random offsets.
    */

  var columns = 10;
  var order = shuffle([0,1,2,3,4,5,6,7,8,9]);
  // var order = shuffle([0,1,2,3,4,5,6]);

  $(' .shape-container .col-sm-2').each( function( index, element ) {
    var offset = order[index]+1;
    // var offset = Math.floor((Math.random() * columns) + 1);
    $( element )
      .addClass('col-sm-offset-'+offset)
  });

  var now = Date.now();

  // Glitchimation
  setInterval(
  function() {
    var diff = Date.now() - now;
    // shape1.rotationZ(0.01*diff+160).update();
    // shape1.rotationY(0.01*diff).update();
    // rotateBox(shape1.children[randomInt(0,2)], 'x', 0.02*diff);
    // // rotateBox(shape1.children[randomInt(0,2)], 'x', 0.009*(Math.sin(diff)*2));
    // rotateBox(shape1.children[randomInt(0,2)], 'y', 0.001*(Math.cos(diff)));
  },
  160);

  /*
    SHAPE HOVER EFFECTS
    We set up the hover functions for each shape, which involves shape property manipulation
    and reset on mouseout.
    */

  $('span > .row.shape-container .col-sm-2').hover (

    function() {

      var shape = $(this).children('.shape');

      var kids = $(this).children('.shape').children();

      // $('.shape-container .col-sm-2 > .shape').not(shape).hide();

      // $( this ).parents('.shape-container').siblings('.row.revelation').find('h1').typetype(
      //   "CHRISTINE BJERKE",
      //   {
      //     e: 0.08, // error rate. (use e=0 for perfect typing)
      //     t: 170, // interval between keypresses
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

      // $( this ).addClass('col-sm-offset-4');

      // $( this ).parents('span').siblings().hide();

      var now = Date.now();

      var viewport_height = $( window ).height();
      var viewport_width = $( window ).width();

      var offset = $(this).offset();
      var width = $(this).width();
      var height = $(this).height();

      var centerX = offset.left + width / 2;
      var centerY = offset.top + height / 2;

      var positionTranslateX = Math.min(viewport_width/2, viewport_width/2 - centerX);
      var positionTranslateY = Math.min(viewport_height/2, viewport_height/2 - centerY);;
      // var positionTranslateY = viewport_height/2 - centerY;

      shape[0].move(positionTranslateX, positionTranslateY, 0).update();

      $(this).data({
        'positionReset': [positionTranslateX, positionTranslateY]
      });
      $(this).data('rotationReset', [shape[0].rotationX(), shape[0].rotationY(), shape[0].rotationZ()]);

      // console.log(shape[0].rotation);

      // $( this ).parents('span').siblings().hide();
      // var test = $( this ).parents().parents('span').siblings().hide();
      // console.log(  $( this ).parents('.span').siblings().hide() );
      // shape[0].position((height/2)-position.top, (width/2)-position.left, 0);

      rotate = setInterval(
        function() {
          var diff = Date.now() - now;
          shape[0].rotationZ(0.01*diff+160).update();
          shape[0].rotationY(0.01*diff).update();
          // rotateBox(shape[0].children[randomInt(0,2)], 'x', 0.02*diff);
          // rotateBox(shape[0].children[randomInt(0,2)], 'x', 0.009*(Math.sin(diff)*2));
          // rotateBox(shape[0].children[randomInt(0,2)], 'y', 0.001*(Math.cos(diff)));
        },
        160);

      $('.shape, .face').css('transition','');
      // shape[0].scale(3).update();
      // shape2.move(0,0,0).update();
    },

    function() {

      var shape = $(this).children('.shape');

      // $( this ).parents('span').siblings().show();

      $('.shape, .face').css('transition','');
      // console.log($(this).data('originalY'));

      // $( this ).parents('.shape-container').siblings().hide();
      // $('.shape-container .col-sm-2 > .shape').show();

      // shape[0].scale(1).update();

      // shape[0].rotation(70,0,45).update();

      var positionReset = $(this).data('positionReset');
      var rotationResetX = $(this).data('rotationReset')[0];
      var rotationResetY = $(this).data('rotationReset')[1];
      var rotationResetZ = $(this).data('rotationReset')[2];

      shape[0].move(-positionReset[0],-positionReset[1],0).update();
      shape[0].rotation(rotationResetX, rotationResetY, rotationResetZ).update();

      // shape[0].children[0].rotation(0, 0, 0).update();
      // shape[0].children[1].rotation(0, 90, 0).update();
      // shape[0].children[2].rotation(90, 0, 0).update();
      clearInterval(rotate);
    }

  );


});
