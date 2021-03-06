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
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom" ).position( -unit, -unit, -unit).rotationY(180).update());
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right" ).position( 0, -unit, 0).rotationY(90).update());
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front" ).position( -unit, 0, -2*unit).rotationX(90).update());
      shape1.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update());
      return shape1
      break

    case 1:
      // Add shape2
      var shape2 = Sprite3D.create(".shape second").rotation(70,0,45).position(x+20, y+35, z).update() ;
      // Shape 2
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, unit).update() )
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update() )
      shape2.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update() )
      return shape2
      break

    case 2:
      // Add shape3
      var shape3 = Sprite3D.create(".shape third").rotation(70,0,45).position(x, y+50, z).update() ;

      // shape3
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -3*unit, 3*unit).update() )
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 2*unit).rotationY(-90).update() )
      shape3.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update() )
      return shape3
      break

    case 3:
      // Add shape4
      var shape4 = Sprite3D.create(".shape fourth").rotation(70,0,45).position(x, y+40, z).update() ;

      // shape4
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape bottom").position( -unit, -unit, -unit).rotationY(180).update());
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, 0).rotationY(90).update());
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update());
      shape4.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 2*unit).rotationX(-90).update());
      return shape4
      break

    case 4:
      // Add shape5
      var shape5 = Sprite3D.create(".shape fifth").rotation(70,0,45).position(x, y-10, z).update() ;

      // shape5
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape top").position( -unit, -unit, -unit).rotationY(180).update());
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape right").position( 0, -unit, -2*unit).rotationY(90).update());
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -unit, 0, 0).rotationX(90).update());
      shape5.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update());
      return shape5
      break

    case 5:
      // Add shape6
      var shape6 = Sprite3D.create(".shape sixth").rotation(70,0,45).position(x, y+40, z).update() ;
      // shape6
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape left").position( -2*unit, -unit, 0).rotationY(-90).update());
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape front").position( -3*unit, 0, 2*unit).rotationX(90).update());
      shape6.appendChild( Sprite3D.box( 2*unit, 2*unit, depth, ".shape back").position( -unit, -2*unit, 0).rotationX(-90).update());
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
