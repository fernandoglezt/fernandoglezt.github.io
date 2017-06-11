var listener = function() {
	camara.aspect = window.innerWidth/window.innerHeight;
	camara.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function setup(){
	//Escena
  escena = new THREE.Scene();
	
	
	//Cámara
	var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
	camara = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);	
	escena.add(camara);
	camara.position.set(0,150,400);
	camara.lookAt(escena.position);	


	//Renderizador
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );


	//Eventos
	window.addEventListener( 'resize', listener, false);
  
  
        //Fondo
	var path = '';
        var sides = [ path + 'sbox_px.jpg', path + 'sbox_nx.jpg', path + 'sbox_py.jpg', path + 'sbox_ny.jpg', path + 'sbox_pz.jpg', path + 'sbox_nz.jpg' ];
        var scCube = new THREE.CubeTextureLoader().load(sides);
	
        scCube.format = THREE.RGBFormat;
	escena.background = scCube;
        
	//Luces
  	var ambient = new THREE.AmbientLight( 0xffffff );
	escena.add( ambient );
	pointLight = new THREE.PointLight( 0xffffff, 2 );
	escena.add( pointLight );
	
	//Malla
	THREE.ImageUtils.crossOrigin = '';
  	var textura = THREE.ImageUtils.loadTexture('http://fernandoglezt.github.io/jack.bmp');
  	var material = new THREE.MeshBasicMaterial( {map: textura} );
  	var forma = new THREE.BoxGeometry(50, 50, 50);
  	malla = new THREE.Mesh(forma, material);
 	malla.position.x = -1;

}

 function loop(){
    requestAnimationFrame(loop);
    
    malla.rotation.x += 0.05;
    malla.rotation.y += 0.05;

    renderer.render(escena, camara);
  }

var malla, camara, renderer, escena;
var pointLight;
setup();
loop();
