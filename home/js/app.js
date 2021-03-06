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
     $('.shape, .face').css('transition','');
  }
  else {  // Firefox
    // The measurement units of the detail and wheelDelta properties are different.
     rolled = -40 * event.detail;
     $('.shape, .face').css('transition','');
  }

  // Scrollfuck Events

  var scale = function(x) {
    return 0.0005*(Math.e^x);
  };
  var axes = ['x','y','z'];

  var perspectiveTimer;

  $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
    $(this).data('rotationReset', [this.rotationX(), this.rotationY(), this.rotationZ()]);
    this.rotate(randomFloat(-4.5,1.5)*scale(rolled),randomFloat(-1.5,1.5)*scale(rolled),randomFloat(-1.5,1.5)*scale(rolled)).update();
  });

  clearTimeout($.data(this, 'scrollTimer'));
  $.data(this, 'scrollTimer', setTimeout(function() {
    $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
        this.rotation(70,0,45).update();
    });
  }, 200));

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
  var exhibitor_names = ['A n d r e a s   Angeli dakis', 'F O  A M', 'n e w- terri tories', 'C h r istine Bjerke', 'GRNA SFC K', 'TO MA'];

  var viewport_height = $( window ).height();
      viewport_width = $( window ).width();

  var axes=['x','y','z'];
  var colors =['#007FFF','#FF0000','#33FFB2','#FF00AD','#00FF17','#B3B42E','#FF9437','#606060','#89B0C7','#FF7C00','#EEFF00','#FF8A8A','#9CF2FF'];

  $('pre').html('<span style="color:'+colors[randomInt(0,colors.length)]+'">('+userip + ')</span>$ >BETA<span class="typed-cursor">|</span>');

    $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
      $(this).data('rotationReset', [this.rotationX(), this.rotationY(), this.rotationZ()]);
    });

    $('.shape-container .col-sm-2').each( function( index, element ) {

      var offset = offsets[index]+1;
      $( element ).addClass('col-sm-offset-'+offset);

      // Center shapes in containers
      var width = $(this).width();
          height = $(this).height();


      Sprite3D.stage( $( element )[0] ).perspective(perspective).appendChild( shapeCreatorSpread(index, width/2, height/2, 0, 23) );
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
    SLOW ROTATE
    */

  var start = new Date().getTime();
  setInterval(function() {
      var now = new Date().getTime();
      var secs = (now - start)/1000;
      $('span > .row.shape-container .col-sm-2 > .shape').each(function() {
        this.rotate(0, 0, 0.2*Math.cos(secs)).update();
      });
  }, 100);

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
            var t = diff/1000;
            return {
              'x' : randomFloat(0.008, 0.06)*t+0.1,
              'y' : 0.009*(Math.sin(t)*2)+0.1,
              'z' : 0.05*(Math.cos(t))+0.1
            }[axis];
          }
          $(revealed_shape).children('.shape').each( function (index) {

              // this.rotate(rotators('x'), -1*rotators('y'), rotators('z')).update();

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
           var rando = 10*Math.sin(randomFloat(0,10));
           var addToOverlay = $('<span />', {
              'style' : "top:"+(j*50)+"px; left:"+(j+2)*(50)+"px; transform: rotate("+rando+"deg);",
              'html' :  el
            }).appendTo($h1);
          // test.move(10,10,23).update().appendTo($h1);
          //  $h1.append("<span class='facetext' style='top:"+(j*50)+"px; left:"+(j+2)*(50)+"px;'>" + el + "</span>");
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
