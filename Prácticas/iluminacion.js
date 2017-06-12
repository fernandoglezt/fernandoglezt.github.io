var malla, camara, renderer, escena, pointLight;
var cube;


setup();
loop();


function actualiza(){
	cube.rotation.y += 0.01;	
}


function windowResize() {
	camara.aspect = window.innerWidth/window.innerHeight;
	camara.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function push(e) {
	//CAMBIOS DE CÁMARA
	if (e.keyCode === 90 ) //z
		camara.position.z += 10; 
	if (e.keyCode===88)  //x
		camara.position.z -= 10;
	if (e.keyCode===67) //c
		camara.position.y += 5;
	if (e.keyCode===86) //v
		camara.position.y -= 5;
	if (e.keyCode===66) //b
		camara.position.x += 5;
	if (e.keyCode===78) //n
		camara.position.x -= 5;
}

function setup(){
	//Escena
  	escena = new THREE.Scene();
	
	//Cámara
	var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
	camara = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
	escena.add(camara);
	camara.position.set(0, 500, -1000);
	camara.lookAt(escena.position);	

	//Renderizador
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	document.body.appendChild( renderer.domElement );


	//Eventos
	window.addEventListener( 'resize', windowResize, false );
	window.addEventListener( 'keydown', push, false);
  
  	//Controles
	controls = new THREE.OrbitControls( camara, renderer.domElement );	
   
	//Luces	

	var spotlight = new THREE.SpotLight(0xffff00);
	spotlight.position.set(-60,150,-30);
	spotlight.intensity = 1.5;
	spotlight.castShadow = true;
	escena.add(spotlight);
		
	var spotlight2 = new THREE.SpotLight(0xff0000);
	spotlight2.position.set(60,150,-60);
	spotlight2.intensity = 1.5;
	spotlight2.castShadow = true;
	escena.add(spotlight2);
	

	//Cubo con sombras
	var cubeGeometry = new THREE.CubeGeometry( 50, 50, 50 );
	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0x888888 } );
	cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
	cube.position.set(0,50,0);
	cube.castShadow = true;
	escena.add(cube);
	
	//Piso
	var floorMaterial = new THREE.MeshLambertMaterial( {color:0xFFFF00, side:THREE.DoubleSide} );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	escena.add(floor);
		
	//Paredes	
	var wallGeometry = new THREE.CubeGeometry( 1000, 30, 10, 1, 1 );
	var wallMaterial = new THREE.MeshLambertMaterial( {color: 0xFF845F} );
	
	var wall = new THREE.Mesh(wallGeometry, wallMaterial);
	wall.position.set(0, 15, 500);
	escena.add(wall);
	
	var wallDos = new THREE.Mesh(wallGeometry, wallMaterial);
	wallDos.position.set(0, 15, -500);
	escena.add(wallDos);
	
	var wallTres = new THREE.Mesh(wallGeometry, wallMaterial);
	wallTres.position.set(-500, 15, 0);
	wallTres.rotation.y = Math.PI / 2;
	escena.add(wallTres);

	var wallCuatro = new THREE.Mesh(wallGeometry, wallMaterial);
	wallCuatro.position.set(500, 15, 0);
	wallCuatro.rotation.y = Math.PI / 2;
	escena.add(wallCuatro);
	
	renderer.shadowMapEnabled= true;
}



 function loop(){
    requestAnimationFrame(loop);
    renderer.render(escena, camara);
    actualiza();
    controls.update();
 }




