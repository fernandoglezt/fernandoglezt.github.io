function setup(){
  THREE.ImageUtils.crossOrigin = '';
  var textura = THREE.ImageUtils.loadTexture('http://fernandoglezt.github.io/jack.jpg');
  var material = new THREE.MeshBasicMaterial( {map: textura} );
  var forma = new THREE.BoxGeometry(1, 1, 1);
  malla = new THREE.Mesh(forma, material);
  malla.position.x = -3;
    
  var textura2 = THREE.ImageUtils.loadTexture('http://fernandoglezt.github.io/foca.jpg');
  var material2 = new THREE.MeshBasicMaterial( {map: textura2} );
  var forma2 = new THREE.BoxGeometry(1, 1, 1);
  malla2 = new THREE.Mesh(forma2, material2);
  malla2.position.x = 3;
  
  escena = new THREE.Scene();
  escena.add(malla);
  escena.add(malla2);
  
  camara = new THREE.PerspectiveCamera();
  camara.position.z = 5;
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerHeight*.95, window.innerHeight*.95);
  document.body.appendChild(renderer.domElement);
  }
  
  function loop(){
    requestAnimationFrame(loop);
    
    malla.rotation.x += 0.01;
    malla.rotation.y += 0.01;
    
    renderer.render(escena, camara);
  }
  
  var camara, escena, renderer, malla;
  setup();
  loop();
