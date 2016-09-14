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

function MouseScroll (event) {
  var clicking = false;
  var previousX;
  var previousY;
  var rolled = 0;

  if ('wheelDelta' in event) {
     rolled = event.wheelDelta;
     $('.shape, .face').css('transition','');
  }
  else {  // Firefox
    // The measurement units of the detail and wheelDelta properties are different.
     rolled = -40 * event.detail;
     $('.shape, .face').css('transition','');
  }

  // Scrollfuck Events

  var scale = function(x) {
    return 0.03*x + (70/(Math.abs(x)+2));
  };
  var axes = ['x','y','z'];

  $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
    rotateBox(this, 'z', scale(rolled));
  });

  // rotateBox(shape2.children[0], 'y', scale(rolled));
  // rotateBox(shape1.children[0], 'y', scale(rolled));
  // rotateBox(shape1.children[3], 'x', scale(rolled));
  // rotateBox(shape3.children[0], 'y', scale(rolled));
  // rotateBox(shape3.children[1], 'x', scale(rolled));
  // rotateBox(shape4.children[0], 'y', scale(rolled));
  // rotateBox(shape4.children[2], 'x', scale(rolled));
  // rotateBox(shape5.children[1], 'y', scale(rolled));
  // rotateBox(shape5.children[2], 'y', scale(rolled));
  // rotateBox(shape6.children[0], 'x', scale(rolled));
  // rotateBox(shape6.children[2], 'x', scale(rolled));

  if (Math.abs(rolled) < 15) {

    // Resets

    $('.shape, .face').css('transition','transform 0.3s ease-in-out');

    // Rotation Reset
    shape1.rotation(70,0,45).update();
    shape2.rotation(70,0,45).update();
    shape3.rotation(70,0,45).update();
    shape4.rotation(70,0,45).update();
    shape5.rotation(70,0,45).update();
    shape6.rotation(70,0,45).update();

    // Children Rotation Reset
    shape2.children[0].rotation(0, 0, 0).update();
    shape1.children[0].rotation(0, 0, 0).update();
    shape1.children[3].rotation(90, 0, 0).update();
    shape3.children[0].rotation(0, 0, 0).update();
    shape3.children[1].rotation(0, -90, 0).update();
    shape4.children[0].rotation(0, 180, 0).update();
    shape4.children[2].rotation(90, 0, 0).update();
    shape5.children[1].rotation(0, 90, 0).update();
    shape5.children[2].rotation(90, 0, 0).update();
    shape6.children[0].rotation(0, -90, 0).update();
    shape6.children[2].rotation(-90, 0, 0).update();

  }
}

function Init () {
    // for mouse scrolling in Firefox
    var elem = document.getElementById ("body");
    if (elem.addEventListener) {    // all browsers except IE before version 9
           // Internet Explorer, Opera, Google Chrome and Safari
       elem.addEventListener ("mousewheel", MouseScroll, false);
           // Firefox
       elem.addEventListener ("DOMMouseScroll", MouseScroll, false);
    }
    else {
       if (elem.attachEvent) { // IE before version 9
           elem.attachEvent ("onmousewheel", MouseScroll);
       }
    }
}

function rotateBox(shape, axis, amount) {
  var initialValue;
  if (axis == 'x') {
    initialValue = shape.rotationX();
    shape.rotationX(initialValue + amount).update();
  }
  else if (axis == 'y') {
    initialValue = shape.rotationY();
    shape.rotationY(initialValue + amount).update();
  }
  else if (axis == 'z') {
    initialValue = shape.rotationZ();
    shape.rotationZ(initialValue + amount).update();
  }
}

function perspectiveFuck(shape, amount) {
  shape.perspective(amount);
}

// On document ready.

$(document).ready( function() {

  /*
    GRID REORDERING
    The following will reorder homepage shapes into random slots on the grid by assigning them
    random offsets.
    */

  /* TODO
    Add this to CSS
    */

  var columns = 10;
  var perspective = '300000px';

  var offsets = shuffle([0,1,2,3,4,5,6,7,8,9]);
  var order = shuffle([0,1,2,3,4,5]);
  var exhibitor_ids = ['#angelidakis', '#foam', '#newterritories', '#chrstinebjerke', '#grnasfck', '#toma'];

  var viewport_height = $( window ).height();
      viewport_width = $( window ).width();

  $('.shape-container .col-sm-2').each( function( index, element ) {

    var offset = offsets[index]+1;
    $( element ).addClass('col-sm-offset-'+offset);

    // Center shapes in containers
    var width = $(this).width();
        height = $(this).height();


    Sprite3D.stage( $( element )[0] ).perspective(perspective).appendChild( shapeCreator(index, width/2, height/2, 0) );
    $('.shape, .face').css('transition','0.02s all ease');

    // Randomize Order:
    // Sprite3D.stage( $( element )[0] ).perspective(perspective).appendChild( shapeCreator(order[index]) );

  });

  /*
    TODO
    Set shapes to heights of their containers.
    */


  /*
    ONLOAD GLITCH TIMER
    Glitches things, on a timer. Coolio.
    */

  setInterval(
  function() {
    // var diff = Date.now() - now;
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

  $('span > .row.shape-container .col-sm-2').hover ( function() {

      var now = Date.now();

      var shape = $(this).children('.shape');

      var kids = $(this).children('.shape').children();

      // Hide sibling shapes
      $('.shape-container .col-sm-2 > .shape').not(shape).hide();

      // Move shape to center of page
      var offset = $(this).offset();
          centerX = offset.left + ($(this).width() / 2);
          centerY = offset.top + ($(this).height() / 2);
          positionTranslateX = Math.min(viewport_width/2, viewport_width/2 - centerX);
          positionTranslateY = Math.min(viewport_height/2, viewport_height/2 - centerY);;

      shape[0].move(positionTranslateX, positionTranslateY, 0).update();

      shape[0].scale(2.5).update();

      // Provide reset data to mouseout function
      $(this).data({
        'positionReset': [positionTranslateX, positionTranslateY]
      });
      $(this).data('rotationReset', [shape[0].rotationX(), shape[0].rotationY(), shape[0].rotationZ()]);

      rotate = setInterval(
        function() {
          var diff = Date.now() - now;
          shape[0].rotate(0, 0.001*diff+10, 0.001*diff+10).update();
          // rotateBox(shape[0].children[randomInt(0,2)], 'x', 0.02*diff);
          // rotateBox(shape[0].children[randomInt(0,2)], 'x', 0.009*(Math.sin(diff)*2));
          // rotateBox(shape[0].children[randomInt(0,2)], 'y', 0.001*(Math.cos(diff)));
        },
        180);


      // Display overlay
      $( this ).parents('.shape-container').siblings().show();

      /*
        TYPE TYPE
        Gets typetype going on the overlay div.
        */

      $( this ).parents('.shape-container').siblings().show();

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
    },

    function() {

      var shape = $(this).children('.shape');

      /*
        RESET HOVER EFFECTS
        */

      // Reveal neighbors
      $('.shape-container .col-sm-2 > .shape').show();

      // Return scale;
      shape[0].scale(1).update();

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
