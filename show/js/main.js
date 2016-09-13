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

var $ = jQuery;
var unit = 27;
var depth = 1;

var stage = Sprite3D.stage( document.getElementById("center") ).perspective('300000px');

// Add shape1
var shape1 = Sprite3D.stage( $("#angelidakis .row.shape-container > .col-sm-2")[0] ).perspective('300000px').appendChild( Sprite3D.create(".shape first").rotation(70,0,45).position(140,50,0).update() );

// Shape 1
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top" ).position( -unit, -unit, unit).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );

// Add shape2
var shape2 = Sprite3D.stage( $('#foam .row.shape-container > .col-sm-2')[0] ).perspective('300000px').appendChild( Sprite3D.create(".shape second").rotation(70,0,45).position(150,100,0).update() );
// Shape 2
shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update() );
shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
//
// Add shape3
var shape3 = Sprite3D.stage( $('#newterritories .row.shape-container > .col-sm-2')[0] ).perspective('300000px').appendChild( Sprite3D.create(".shape third").rotation(70,0,45).position(126,105,0).update() );

// shape3
shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update() );
shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update() );
shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
//
// Add shape4
var shape4 = Sprite3D.stage( $('#chrstinebjerke .row.shape-container > .col-sm-2')[0] ).perspective('300000px').appendChild( Sprite3D.create(".shape fourth").rotation(70,0,45).position(135,95,0).update() );

// shape4
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update() );
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update() );
//
// // Add shape5
var shape5 = Sprite3D.stage( $('#grnasfck .row.shape-container > .col-sm-2')[0] ).perspective('300000px').appendChild( Sprite3D.create(".shape fifth").rotation(70,0,45).position(135,50,0).update() );

// // shape5
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update() );
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update() );
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
//
// Add shape6
var shape6 = Sprite3D.stage( $('#toma .row.shape-container > .col-sm-2')[0] ).perspective('300000px').appendChild( Sprite3D.create(".shape sixth").rotation(70,0,45).position(150,100,0).update() );

// shape6
shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update() );
shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );


// Set Face Sizes
// $(".face").css("width",2*unit).css("height",2*unit);
//
var clicking = false;
var previousX;
var previousY;

// console.log(shape2.size(100,100));

function MouseScroll (event) {
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

    console.log(rolled, scale(rolled));

    rotateBox(shape1, 'z', scale(rolled));
    rotateBox(shape2, 'z', scale(rolled));
    rotateBox(shape3, 'z', scale(rolled));
    rotateBox(shape4, 'z', scale(rolled));
    rotateBox(shape5, 'z', scale(rolled));
    rotateBox(shape6, 'z', scale(rolled));

    rotateBox(shape2.children[0], 'y', scale(rolled));
    rotateBox(shape1.children[0], 'y', scale(rolled));
    rotateBox(shape1.children[3], 'x', scale(rolled));
    rotateBox(shape3.children[0], 'y', scale(rolled));
    rotateBox(shape3.children[1], 'x', scale(rolled));
    rotateBox(shape4.children[0], 'y', scale(rolled));
    rotateBox(shape4.children[2], 'x', scale(rolled));
    rotateBox(shape5.children[1], 'y', scale(rolled));
    rotateBox(shape5.children[2], 'y', scale(rolled));
    rotateBox(shape6.children[0], 'x', scale(rolled));
    rotateBox(shape6.children[2], 'x', scale(rolled));

    if (Math.abs(rolled) < 10) {

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

// $(document).mousedown(function(e) {
//
//     e.preventDefault();
//     previousX = e.clientX;
//     previousY = e.clientY;
//     clicking = true;
// });
//
// $(document).mouseup(function() {
//     clicking = false;
//     $('.shape, .face').css('transition','transform 0.2s');
//
//    // Perpsective Reset
//     shape1.perspective('300000');
//     shape2.perspective('300000');
//     shape3.perspective('300000');
//     shape4.perspective('300000');
//     shape5.perspective('300000');
//     shape6.perspective('300000');
//
//     // Rotation Reset
//     shape1.rotation(70,0,45).update();
//     shape2.rotation(70,0,45).update();
//     shape3.rotation(70,0,45).update();
//     shape4.rotation(70,0,45).update();
//     shape5.rotation(70,0,45).update();
//     shape6.rotation(70,0,45).update();
//
//     // Children Rotation Reset
//     shape2.children[0].rotation(0, 0, 0).update();
//     shape1.children[0].rotation(0, 0, 0).update();
//     shape1.children[3].rotation(90, 0, 0).update();
//     shape3.children[0].rotation(0, 0, 0).update();
//     shape3.children[1].rotation(0, -90, 0).update();
//     shape4.children[0].rotation(0, 180, 0).update();
//     shape4.children[2].rotation(90, 0, 0).update();
//     shape5.children[1].rotation(0, 90, 0).update();
//     shape5.children[2].rotation(90, 0, 0).update();
//     shape6.children[0].rotation(0, -90, 0).update();
//     shape6.children[2].rotation(-90, 0, 0).update();
// });
// //
// $(document).mousemove(function(e) {
//     if (clicking) {
//         e.preventDefault();
//         $('.shape, .face').css('transition','');
//         var directionX = (e.clientX - previousX) > 0 ? 1 : -1;
//         var directionY = (previousY - e.clientY) > 0 ? 1 : -1;
//
//         var scale = 0.006;
//
//         var distance = scale*Math.round(Math.sqrt(Math.pow(previousX - e.clientX, 2) +Math.pow(previousY - e.clientY, 2)));
//
//         // perspectiveFuck(shape1, 1500-(distance/scale));
//         // perspectiveFuck(shape2, 1200-(distance/scale));
//         // perspectiveFuck(shape3, 1800-(distance/scale));
//         // perspectiveFuck(shape4, 1000-(distance/scale));
//         // perspectiveFuck(shape5, 1500-(distance/scale));
//         // perspectiveFuck(shape6, 1200-(distance/scale));
//
//         rotateBox(shape1, 'z', distance*directionX);
//         rotateBox(shape2, 'z', 1.2*distance*directionX);
//         rotateBox(shape3, 'z', 2.2*distance*directionX);
//         rotateBox(shape4, 'z', 0.3*distance*directionX);
//         rotateBox(shape5, 'z', distance*directionX);
//         rotateBox(shape6, 'z', 0.8*distance*directionX);
//
//         rotateBox(shape2.children[0], 'y', 0.1*distance);
//         rotateBox(shape1.children[0], 'y', 0.1*distance);
//         rotateBox(shape1.children[3], 'x', 0.1*distance);
//         rotateBox(shape3.children[0], 'y', 0.1*distance);
//         rotateBox(shape3.children[1], 'x', 0.1*distance);
//         rotateBox(shape4.children[0], 'y', 0.1*distance);
//         rotateBox(shape4.children[2], 'x', 0.1*distance);
//         rotateBox(shape5.children[1], 'y', 0.1*distance);
//         rotateBox(shape5.children[2], 'y', 0.1*distance);
//         rotateBox(shape6.children[0], 'x', 0.1*distance);
//         rotateBox(shape6.children[2], 'x', 0.1*distance);
//     }
// });
// //
var initialValue;
//
function rotateBox(shape, axis, amount) {
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