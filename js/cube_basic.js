var $ = jQuery;
var unit = 35;
var depth = 1;

var stage = Sprite3D.stage( document.getElementById("center") ).perspective('300000px');

// Add shape1
var shape1 = stage.appendChild( Sprite3D.create(".shape first").rotation(70,0,45).position(3*unit,3*unit,0).update() );

// Shape 1
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top" ).position( -unit, -unit, unit).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update() );
shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );

// Add shape2
var shape2 = stage.appendChild( Sprite3D.create(".shape second").rotation(70,0,45).position(shape1.x()+7.5*unit,9*unit,0).update() );
// Shape 2
shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update() );
shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
//
// Add shape3
var shape3 = stage.appendChild( Sprite3D.create(".shape third").rotation(70,0,45).position(shape2.x()+7.5*unit,14*unit,0).update() );

// shape3
shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update() );
shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update() );
shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
//
// Add shape4
var shape4 = stage.appendChild( Sprite3D.create(".shape fourth").rotation(70,0,45).position(shape3.x()+7.5*unit,18*unit,0).update() );

// shape4
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update() );
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() );
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update() );
//
// // Add shape5
var shape5 = stage.appendChild( Sprite3D.create(".shape fifth").rotation(70,0,45).position(shape4.x()+7.5*unit,20*unit,0).update() );

// // shape5
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update() );
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update() );
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update() );
shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );
//
// Add shape6
var shape6 = stage.appendChild( Sprite3D.create(".shape sixth").rotation(70,0,45).position(shape5.x()+8*unit,25*unit,0).update() );

// shape6
shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update() );
shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() );
shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() );


// Set Face Sizes
$(".face").css("width",2*unit).css("height",2*unit);
//
var clicking = false;
var previousX;
var previousY;

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
