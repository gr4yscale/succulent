var domReady = require('domready');
var dat = require('dat-gui');

domReady(function(){

  var params = {
    speed: 1000,
    opacity : 0.25,
    width : 1.0,
    height : 0.2,
    boxThickness : 1.0,
    hueRange : 0.35,
    hueOffset : 0.3,
    twistSpeed : 0.15,
    rotationSpeed : 0.01,
    lightYPosition : 20
  };

  var OrbitViewer = require('three-orbit-viewer')(THREE);

  var app = OrbitViewer({
    clearColor: 'rgb(50,50,50)',
    clearAlpha: 1.0,
    fov: 65,
    contextAttributes: {
      antialias: true,
      alpha: false
    }
  });

  var datgui = new dat.GUI();

  var light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  light.position.set(10, 20, -20);
  app.scene.add(light);


  // cubes
  var cubes = [];
  var numCubes = 100;

  for ( i = 1; i < numCubes; i ++ ) {
    var width = 24 - ((24 / numCubes) * i);
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff, opacity: 0.25, transparent: true } );

    var geometry = new THREE.BoxGeometry( width, 0.1, width);
    var cube = new THREE.Mesh( geometry, material );

    cube.position.y = 0.2 * i;

    app.scene.add(cube);
    cubes.push(cube);
  }

 
  // render loop

  var tickCounter = 0;
  app.on('tick', function(time) {
    tickCounter += (time / params.speed);

    for (var i = (numCubes - 1); i > 0; i-- ) {

      var cube = cubes[i-1];

      cube.rotation.y += ((Math.sin(tickCounter) * (i / numCubes) * params.twistSpeed) - params.rotationSpeed);
      cube.scale.x = params.width;
      cube.scale.z = params.width;
      cube.scale.y = params.boxThickness;
      cube.position.y = params.height * i;

      // colors!
      var hue = (i / numCubes) * params.hueRange - params.hueOffset;
      cube.material.color.setHSL(hue, 1.0, 0.5);
      cube.material.opacity = params.opacity;
    }

    light.position.set( 0, params.lightYPosition, 0);
  });


  // params GUI

  datgui.add(params, "speed", 10, 2000);
  datgui.add(params, 'opacity', 0.1, 1);
  datgui.add(params, 'width', 0.001, 10);
  datgui.add(params, 'height', 0.02, 3).step(0.01);
  datgui.add(params, 'boxThickness', 0.01, 10);
  datgui.add(params, 'hueRange', 0.0, 1);
  datgui.add(params, 'hueOffset', 0, 1).step(0.01);
  datgui.add(params, 'twistSpeed', 0.0, 0.8);
  datgui.add(params, 'rotationSpeed', 0.0, 0.1).step(0.01);
  datgui.add(params, 'lightYPosition', 0.01, 60);

});
