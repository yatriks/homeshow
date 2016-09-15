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

function perspectiveNormalize(rate, timer) {
  return Math.min(600+(10000*(timer/rate)), 300000);
}

// Generate a random integer between min and max.

function randomInt(min, max) {
  return Math.floor(randomFloat(min,max));
}
function randomFloat(min, max) {
  return (Math.random() * max) + min;
}

function MouseScroll (event) {
  var clicking = false;
  var previousX;
  var previousY;
  var rolled = 0;

  if ('wheelDelta' in event) {
     rolled = event.wheelDelta;
     $('.shape, .face').css('transition','0.1s ease');
  }
  else {  // Firefox
    // The measurement units of the detail and wheelDelta properties are different.
     rolled = -40 * event.detail;
     $('.shape, .face').css('transition','0.1s ease');
  }

  // Scrollfuck Events

  var scale = function(x) {
    return 0.0005*(Math.e^x);
  };
  var axes = ['x','y','z'];

  var perspectiveTimer;

  $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
    $(this).data('rotationReset', [this.rotationX(), this.rotationY(), this.rotationZ()]);
    this.rotate(0,0,scale(rolled)).update();
  });

  clearTimeout($.data(this, 'scrollTimer'));
  $.data(this, 'scrollTimer', setTimeout(function() {
    $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
        this.rotation(70,0,45).update();
    });
  }, 500));

  $('header p').each(function(index) {
    var rate = Math.abs(scale(rolled));
    $(this).css('line-height', 18 + 30* rate*(index+1)+'px');
  });

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
  var exhibitor_names = ['Andreas   Angeli dakis', 'F O A M', 'new- terri tories', 'Christine Bjerke', 'GRNA SFC K', 'T O  M   A'];

  var viewport_height = $( window ).height();
      viewport_width = $( window ).width();

    $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
      $(this).data('rotationReset', [this.rotationX(), this.rotationY(), this.rotationZ()]);
    });

    $('.shape-container .col-sm-2').each( function( index, element ) {

      var offset = offsets[index]+1;
      $( element ).addClass('col-sm-offset-'+offset);

      // Center shapes in containers
      var width = $(this).width();
          height = $(this).height();


      Sprite3D.stage( $( element )[0] ).perspective(perspective).appendChild( shapeCreator(index, width/2, height/2, 0, 23) );
      var revelation = Sprite3D.stage($( this ).parents('.shape-container').siblings('.revelation')[0]).perspective('600').appendChild( shapeCreatorSpread(index, viewport_width/2, viewport_height/3, 0, 130, 0).addClass('gradient-'+(index+1)) );
      // revelation.appendChild( shapeCreatorSpread(index, viewport_width/2, viewport_height/3, 0, 130, 0).addClass('gradient-'+(index+1)) );

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

      // Constants
      $(revealed_shape).children('.shape').each( function (index) {
        $(this).data('rotationReset', [this.rotationX(), this.rotationY(), this.rotationZ()]);
      })

      // Move shape to center of page
      var offset = $(this).offset();
          centerX = offset.left + ($(this).width() / 2);
          centerY = offset.top + ($(this).height() / 2);
          positionTranslateX = Math.min(viewport_width/2, viewport_width/2 - centerX);
          positionTranslateY = Math.min(viewport_height/2, viewport_height/2 - centerY);

      // Provide reset data to mouseout function
      $(overlay).data('rotationReset', [this.rotationX(), $(overlay).children('.shape')[0].rotationY(), $(overlay).children('.shape')[0].rotationZ()]);

      var revealed_shape = $(overlay).children('.shape')[0];
      rotate = setInterval(
        function() {
          var diff = (Date.now() - now);
          var diffsecs = diff/1000;
          overlay.children('.shape')[0].rotate(0, 0.0005*Math.sin(diff)^(0.5), 0.0005*Math.cos(diff)^(0.5)).update();
          overlay[0].perspective(perspectiveNormalize(5, diffsecs));

          var rotators = function(axis) {
            var t = diff/300;
            return {
              'x' : randomInt(0.008, 0.06)*t+0.1,
              'y' : 0.009*(Math.sin(t)*2)+0.1,
              'z' : 0.05*(Math.cos(t))+0.1
            }[axis];
          }
          $(revealed_shape).children('.shape').each( function (index) {

              this.rotate(rotators('x'), -1*rotators('y'), rotators('z')).update();

              var randomAxis = axes[randomInt(0,2)];
              Math.round(Math.random()) * this.rotate(rotators(randomAxis), rotators(randomAxis), rotators(randomAxis)).update();

              $(this).data('rotationReset', [this.rotationX(), this.rotationY(), this.rotationZ()]);
          })
        },
        10);

        /*
          WIP: facetext
          */

      // for (i=0; i<exhibitor_ids.length; i++) {
      //   var shapeChosen = $('span'+exhibitor_ids[i]+' .revelation .shape > .shape:eq('+randomInt(0,2)+')');
      //   var $h1 = shapeChosen.children( '.front, .back' ).css('text-overflow','clip');
      //   $h1.empty();
      //   $h1 = $($h1[randomInt(0,2)]);
      //   var nameArray = exhibitor_names[i].split(" ");
      //   $.each(nameArray, function (j, el) {
      //       j = j+1;
      //       $h1.append("<span class='facetext' style='top:"+(j*50)+"px; left:"+(j+2)*(50)+"px;'>" + el + "</span>");
      //   });
      // }

      for (i=0; i<exhibitor_ids.length; i++) {
       $h1 = $('span'+exhibitor_ids[i]+' .revelation h1')
       $h1.empty();
       var nameArray = exhibitor_names[i].split(" ");
       $.each(nameArray, function (j, el) {
           j = j+1;
           $h1.append("<span class='facetext' style='top:"+(j*50)+"px; left:"+(j+2)*(50)+"px;'>" + el + "</span>");
       });
     }

      // Display overlay
      $( this ).parents('.shape-container').siblings('.revelation').fadeIn( 200 , function() {
      });

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
      $( this ).parents('.shape-container').siblings().fadeOut( 50 );

      $(overlay).children('.shape')[0].rotation(70, 0, 45).update();

      var revealed_shape = $(overlay).children('.shape')[0];
      // $(revealed_shape).children('.shape').each( function (index) {
      //   var rotationReset = $.data(this, 'rotationReset');
      //   this.rotate(-rotationReset[0],-rotationReset[1],-rotationReset[2]).update();
      // });

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
      var shape1 = Sprite3D.create(".shape first").position(x, y-10, z).rotation(70,0,45).update() ;
      // Shape 1 Faces
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape1
      break

    case 1:
      // Add shape2
      var shape2 = Sprite3D.create(".shape second").rotation(70,0,45).position(x+20, y+35, z).update() ;
      // Shape 2
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update().move(-2*unit,-2*unit,-1*unit-depth).update() )
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() )
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() )
      return shape2
      break

    case 2:
      // Add shape3
      var shape3 = Sprite3D.create(".shape third").rotation(70,0,45).position(x, y+50, z).update() ;

      // shape3
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update().move(-2*unit,-2*unit,-1*unit-depth).update() )
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update().move(1*unit,1*unit,0.5*unit+depth).update() )
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(2*unit,2*unit,1*unit+depth).update() )
      return shape3
      break

    case 3:
      // Add shape4
      var shape4 = Sprite3D.create(".shape fourth").rotation(70,0,45).position(x, y+40, z).update() ;

      // shape4
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape4
      break

    case 4:
      // Add shape5
      var shape5 = Sprite3D.create(".shape fifth").rotation(70,0,45).position(x, y-10, z).update() ;

      // shape5
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape5
      break

    case 5:
      // Add shape6
      var shape6 = Sprite3D.create(".shape sixth").rotation(70,0,45).position(x, y+40, z).update() ;
      // shape6
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(2*unit,2*unit,1*unit+depth).update() );
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
      var shape1 = Sprite3D.create(".shape first").rotation(70,0,45).update().move(x+unit, y, z).update();
      // Shape 1 Faces
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top" ).position( -unit, -unit, unit).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape1
      break

    case 1:
      // Add shape2
      var shape2 = Sprite3D.create(".shape second").rotation(70,0,45).position(0.5*unit + x, y + 2*unit, z).update() ;
      // Shape 2
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update().move(-2*unit,-2*unit,-1*unit-depth).update() )
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() )
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() )
      return shape2
      break

    case 2:
      // Add shape3
      var shape3 = Sprite3D.create(".shape third").rotation(70,0,45).position(x, y + 3*unit, z).update() ;

      // shape3
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update().move(-2*unit,-2*unit,-1*unit-depth).update() )
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update().move(1*unit,1*unit,0.5*unit+depth).update() )
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(2*unit,2*unit,1*unit+depth).update() )
      return shape3
      break

    case 3:
      // Add shape4
      var shape4 = Sprite3D.create(".shape fourth").rotation(70,0,45).position(x, y + unit, z).update() ;

      // shape4
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape4
      break

    case 4:
      // Add shape5
      var shape5 = Sprite3D.create(".shape fifth").rotation(70,0,45).position(x, y + unit, z).update() ;

      // shape5
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update().move(2*unit,2*unit,1*unit+depth).update() );
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(-1*unit,-1*unit,-0.5*unit+depth).update() );
      return shape5
      break

    case 5:
      // Add shape6
      var shape6 = Sprite3D.create(".shape sixth").rotation(70,0,45).position(x + unit, y + 3*unit, z).update() ;
      // shape6
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update().move(-2*unit,-2*unit,-1*unit-depth).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update().move(1*unit,1*unit,0.5*unit+depth).update() );
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update().move(2*unit,2*unit,1*unit+depth).update() );
      return shape6
      break
  }

};
