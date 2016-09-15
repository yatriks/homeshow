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
    this.rotate(0,0,scale(rolled)).update();
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

  if (Math.abs(rolled) < 1) {

    // Resets

    $('.shape, .face').css('transition','transform 0.04s ease');

    // Rotation Reset
    // shape1.rotation(70,0,45).update();
    // shape2.rotation(70,0,45).update();
    // shape3.rotation(70,0,45).update();
    // shape4.rotation(70,0,45).update();
    // shape5.rotation(70,0,45).update();
    // shape6.rotation(70,0,45).update();
    //
    // // Children Rotation Reset
    // shape2.children[0].rotation(0, 0, 0).update();
    // shape1.children[0].rotation(0, 0, 0).update();
    // shape1.children[3].rotation(90, 0, 0).update();
    // shape3.children[0].rotation(0, 0, 0).update();
    // shape3.children[1].rotation(0, -90, 0).update();
    // shape4.children[0].rotation(0, 180, 0).update();
    // shape4.children[2].rotation(90, 0, 0).update();
    // shape5.children[1].rotation(0, 90, 0).update();
    // shape5.children[2].rotation(90, 0, 0).update();
    // shape6.children[0].rotation(0, -90, 0).update();
    // shape6.children[2].rotation(-90, 0, 0).update();

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


    Sprite3D.stage( $( element )[0] ).perspective(perspective).appendChild( shapeCreatorSpread(index, width/2, height/2, 0) );
    var revelation = Sprite3D.stage($( this ).parents('.shape-container').siblings('.revelation')[0]).perspective('600').appendChild( shapeCreatorSpread(index, viewport_width/2, viewport_height/4, 0, 100, 1).addClass('gradient-'+(index+1)) );
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

      var kids = $(this).children('.shape').children().children();

      var overlay = $( this ).parents('.shape-container').siblings('.revelation');

      var axes=['x','y','z'];

      // Hide sibling shapes
      $('.shape-container .col-sm-2 > .shape').hide();

      // Move shape to center of page
      var offset = $(this).offset();
          centerX = offset.left + ($(this).width() / 2);
          centerY = offset.top + ($(this).height() / 2);
          positionTranslateX = Math.min(viewport_width/2, viewport_width/2 - centerX);
          positionTranslateY = Math.min(viewport_height/2, viewport_height/2 - centerY);

      // kids.each( function() {
      //   // $(this).addClass('gradient');
      // });

      // Provide reset data to mouseout function
      $(overlay).data('rotationReset', [$(overlay).children('.shape')[0].rotationX(), $(overlay).children('.shape')[0].rotationY(), $(overlay).children('.shape')[0].rotationZ()]);
      var revealed_shape = $(overlay).children('.shape')[0];
      rotate = setInterval(
        function() {
          var diff = (Date.now() - now);
          var diffsecs = diff/1000;
          overlay.children('.shape')[0].rotate(0, 0.0005*Math.sin(diff)^(0.5), 0.0005*Math.cos(diff)^(0.5)).update();
          var perspectiveNormalize = function(rate) {
            return Math.min(600+(15000*(diffsecs/rate)), 300000);
          }
          overlay[0].perspective(perspectiveNormalize(5));
          // }
          // rotateBox(overlay.children('.shape')[0].children[randomInt(0,2)], 'x', 0.02*diff);
          // rotateBox(overlay.children('.shape')[0].children[randomInt(0,2)], 'z', 0.009*(Math.sin(diff)*2));
          // rotateBox(overlay.children('.shape')[0].children[randomInt(0,2)], 'y', 0.001*(Math.cos(diff)));
          // revealed_shape.children[randomInt(0,revealed_shape.children.length)].scale(0.25*Math.sin(diff)).update();
          // revealed_shape.children[randomInt(0,revealed_shape.children.length)].scale(0.25*Math.cos(diff)).update();
          // revealed_shape.children[randomInt(0,revealed_shape.children.length)].scale(0.25*Math.tan(diff)).update();
          // $(overlay).children('.shape')[0].children

          var rotators = function(axis) {
            var t = diff/400;
            return {
              'x' : 0.02*t+0.1,
              'y' : 0.009*(Math.sin(t)*2)+0.1,
              'z' : 0.001*(Math.cos(t))+0.1
            }[axis];
          }
          $(revealed_shape).children('.shape').each( function (index) {

              this.rotate(rotators('x'), -1*rotators('y'), rotators('z')).update();

              var randomAxis = axes[randomInt(0,2)];
              Math.round(Math.random()) * this.rotate(rotators(randomAxis), rotators(randomAxis), rotators(randomAxis)).update();
          })
        },
        10);


      // Display overlay
      var overlay = $( this ).parents('.shape-container').siblings('.revelation').fadeIn( 20 );

      /*
        TYPE TYPE
        Gets typetype going on the overlay div.
        */

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

      var overlay = $( this ).parents('.shape-container').siblings('.revelation')[0];

      /*
        RESET HOVER EFFECTS
        */

      // Reveal neighbors
      $('.shape-container .col-sm-2 > .shape').show();

      // Hide revelation
      $( this ).parents('.shape-container').siblings().fadeOut( 20 );

      var rotationResetX = $(overlay).data('rotationReset')[0];
      var rotationResetY = $(overlay).data('rotationReset')[1];
      var rotationResetZ = $(overlay).data('rotationReset')[2];

      // shape[0].move(-positionReset[0],-positionReset[1],0).update();
      // $(overlay).children('.shape')[0].rotation(rotationResetX, rotationResetY, rotationResetZ).update();

      // shape[0].children[0].rotation(0, 0, 0).update();
      // shape[0].children[1].rotation(0, 90, 0).update();
      // shape[0].children[2].rotation(90, 0, 0).update();
      clearInterval(rotate);
    }

  );


});

var $ = jQuery;

// var stage = Sprite3D.stage( document.getElementById("center") ).perspective('300000px');
var _unit = 27;
var _depth = 1;

function shapeCreator(index, x, y, z, unit, depth) {
  if (!unit) {
    unit = _unit;
  }
  if (!depth) {
    depth = _depth;
  }
  switch(index) {
    case 0:
      // Add shape1
      var shape1 = Sprite3D.create(".shape first").transformOrigin(x, y-10, z).rotation(70,0,45).update() ;
      // Shape 1 Faces
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top" ).position( -unit, -unit, unit).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update() );
      return shape1
      break

    case 1:
      // Add shape2
      var shape2 = Sprite3D.create(".shape second").rotation(70,0,45).position(x+20, y+35, z).update() ;
      // Shape 2
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update() );
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
      return shape2
      break

    case 2:
      // Add shape3
      var shape3 = Sprite3D.create(".shape third").rotation(70,0,45).position(x, y+50, z).update() ;

      // shape3
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update() );
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update() );
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
      return shape3
      break

    case 3:
      // Add shape4
      var shape4 = Sprite3D.create(".shape fourth").rotation(70,0,45).position(x, y+40, z).update() ;

      // shape4
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update() );
      return shape4
      break

    case 4:
      // Add shape5
      var shape5 = Sprite3D.create(".shape fifth").rotation(70,0,45).position(x, y-10, z).update() ;

      // shape5
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
      return shape5
      break

    case 5:
      // Add shape6
      var shape6 = Sprite3D.create(".shape sixth").rotation(70,0,45).position(x, y+40, z).update() ;
      // shape6
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
      return shape6
      break
  }

};

function shapeCreatorSpread(index, x, y, z, unit, depth) {
  if (!unit) {
    unit = _unit;
  }
  if (!depth) {
    depth = _depth;
  }
  switch(index) {
    case 0:
      // Add shape1
      var shape1 = Sprite3D.create(".shape first").rotation(70,0,45).update().move(x, y, z).update();
      // Shape 1 Faces
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top" ).position( -unit, -unit, unit).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape1
      break

      // Sizes

      // var shape1 = Sprite3D.create(".shape first").rotation(70,0,45).transformOrigin(x, y-10, z).update();
      // // Shape 1 Faces
      // shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top" ).position( -unit, -unit, unit).update() );
      // shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -4*unit, -4*unit, -2.55*unit).rotationY(180).update() );
      // shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -2*unit, 15).update() );
      // shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update() );
      // return shape1
      // break

    case 1:
      // Add shape2
      var shape2 = Sprite3D.create(".shape second").rotation(70,0,45).position(x+20, y+35, z).update() ;
      // Shape 2
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update() );
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
      return shape2
      break

    case 2:
      // Add shape3
      var shape3 = Sprite3D.create(".shape third").rotation(70,0,45).position(x, y+50, z).update() ;

      // shape3
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update() );
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update() );
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
      return shape3
      break

    case 3:
      // Add shape4
      var shape4 = Sprite3D.create(".shape fourth").rotation(70,0,45).position(x, y+40, z).update() ;

      // shape4
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update() );
      return shape4
      break

    case 4:
      // Add shape5
      var shape5 = Sprite3D.create(".shape fifth").rotation(70,0,45).position(x, y-10, z).update() ;

      // shape5
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
      return shape5
      break

    case 5:
      // Add shape6
      var shape6 = Sprite3D.create(".shape sixth").rotation(70,0,45).position(x, y+40, z).update() ;
      // shape6
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
      return shape6
      break
  }

};
