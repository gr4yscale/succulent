var domReady = require('domready');
var dat = require('dat-gui');

var glslify = require('glslify');

domReady(function(){

  var params = {
    speed: 1000,
    opacity : 0.25,
    width : 2.0,
    height : 0.2,
    boxThickness : 1.0,
    hueRange : 0.35,
    hueOffset : 0.3,
    twistSpeed : 0.0,
    rotationSpeed : 0.00,
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
  light.position.set(-10, -10, -10);
  app.scene.add(light);


  // shader
  var shaderMaterial = new THREE.ShaderMaterial({
      uniforms : {
        iGlobalTime: { type: 'f', value: 0 }
      },
      defines: {
        USE_MAP: ''
      },
      vertexShader : glslify(__dirname + '/shaders/sketch.vert'),
      fragmentShader : glslify(__dirname + '/shaders/sketch.frag'),
      side: THREE.DoubleSide
  });

  var petalFunc = function (u, v) {
            var petalLength = 2.0;
            var petalWidth = 0.9;
            var curveAmount = 0.5;
            var curve = Math.pow(u * 4.0, 0.3) * curveAmount; // * (Math.pow(u, 0.9));
            var petalOutline = (Math.sin((u - 1.5) * 2.0) * Math.sin((v - 0.5) * Math.sin((u + 2.14))) * petalLength);
            return new THREE.Vector3(petalOutline * petalWidth, u * petalLength, curve);
        };

  var geom = new THREE.ParametricGeometry(petalFunc, 100, 100);


  var material = new THREE.MeshLambertMaterial({
                  color: 0xFF333FF,
                  side: THREE.DoubleSide,
                  shading: THREE.SmoothShading,
                });

  var mesh = new THREE.Mesh(geom, shaderMaterial);
  mesh.position.x = 0;
  mesh.position.y = 0;
  mesh.position.z = 0;

  app.camera.position.x = 0;
  app.camera.position.y = 0;
  app.camera.position.z = -1;
  // mesh.position.x = 0.2;

  var helper = new THREE.BoundingBoxHelper(mesh, 0xff0000);
  helper.update();
  app.scene.add(helper);

  app.scene.add(mesh);


  var sphereGeom = new THREE.SphereGeometry(0.01, 10, 10);
  var sphereMesh = new THREE.Mesh(sphereGeom, material);

  app.scene.add(sphereMesh);

  // render loop

  var tickCounter = 0;
  app.on('tick', function(time) {
    tickCounter += (time / params.speed);

    shaderMaterial.uniforms.iGlobalTime.value = tickCounter;
    light.position.set( 0, params.lightYPosition, 0);
  });


  // params GUI

  //datgui.add(params, "speed", 10, 2000);
  //datgui.add(params, 'opacity', 0.1, 1);
  //datgui.add(params, 'width', 0.001, 10);
  //datgui.add(params, 'height', 0.02, 3).step(0.01);
  //datgui.add(params, 'boxThickness', 0.01, 10);
  //datgui.add(params, 'hueRange', 0.0, 1);
  //datgui.add(params, 'hueOffset', 0, 1).step(0.01);
  //datgui.add(params, 'twistSpeed', 0.0, 0.08);
  //datgui.add(params, 'rotationSpeed', 0.0, 0.1).step(0.01);
  //datgui.add(params, 'lightYPosition', 0.01, 60);

});
