var malla, camara, renderer, escena, pointLight;
var pos = 0, posLuna = 0, posPersonajeCinco = 0;
var planetaTierra, luna;
var personajeCincoM;



setup();
loop();


function personaje5(x, y, z){
	var esferaForma = new THREE.SphereGeometry( 6*1 );
	var conoUno = new THREE.ConeGeometry( 6*1, 6*4);
	var conoDos = new THREE.ConeGeometry( 6*1, 6*4);
	var conoTres = new THREE.ConeGeometry( 6*1, 6*4);
	var conoCuatro = new THREE.ConeGeometry( 6*1, 6*4);
	var conoCinco = new THREE.ConeGeometry( 6*1, 6*4);
	var conoSeis = new THREE.ConeGeometry( 6*1, 6*4);

	conoDos.rotateZ(Math.PI);
	conoTres.rotateZ(3*Math.PI/2);
	conoCuatro.rotateZ(Math.PI/2);
	conoCinco.rotateX(Math.PI/2);
	conoSeis.rotateX(3*Math.PI/2);

	conoUno.translate(0, 6*2.8, 0);
	conoDos.translate(0, 6*-2.8, 0);
	conoTres.translate(6*2.8, 0, 0);
	conoCuatro.translate(6*-2.8, 0, 0);
	conoCinco.translate(0, 0, 6*2.8);
	conoSeis.translate(0, 0, 6*-2.8);

	var esferaMalla = new THREE.Mesh(esferaForma);
	var conoMalla1 = new THREE.Mesh(conoUno);
	var conoMalla2 = new THREE.Mesh(conoDos);
	var conoMalla3 = new THREE.Mesh(conoTres);
	var conoMalla4 = new THREE.Mesh(conoCuatro);
	var conoMalla5 = new THREE.Mesh(conoCinco);
	var conoMalla6 = new THREE.Mesh(conoSeis);

	var personajeCinco = new THREE.Geometry();

	personajeCinco.merge(esferaMalla.geometry, esferaMalla.matrix);
	personajeCinco.merge(conoMalla1.geometry, conoMalla1.matrix);
	personajeCinco.merge(conoMalla2.geometry, conoMalla2.matrix);
	personajeCinco.merge(conoMalla3.geometry, conoMalla3.matrix);
	personajeCinco.merge(conoMalla4.geometry, conoMalla4.matrix);
	personajeCinco.merge(conoMalla5.geometry, conoMalla5.matrix);
	personajeCinco.merge(conoMalla6.geometry, conoMalla6.matrix);


	var material = new THREE.MeshBasicMaterial({color: 0xABCDEFE});
	personajeCincoM = new THREE.Mesh(personajeCinco, material);

	
	personajeCinco.translate(x, y, z);
	escena.add(personajeCincoM);

}


function actualiza(){
	planetaTierra.position.x = 600*Math.cos(pos);
	planetaTierra.position.y = 600*Math.sin(pos);
	planetaTierra.rotation.y += 0.01;
	
	luna.position.x = 600*Math.cos(pos)+120*Math.cos(posLuna);
	
	luna.position.y = 600*Math.sin(pos)+120*Math.sin(posLuna);

	
	pos += 0.01;
	if( pos >= 2*Math.PI)
		pos = 0;
	posLuna += 0.1;
	if( posLuna >= 2*Math.PI)
		posLuna = 0;
	posPersonajeCinco += 0.05;
	if( posPersonajeCinco >= 2*Math.PI)
		posPersonajeCinco = 0;

}


function windowResize() {
	camara.aspect = window.innerWidth/window.innerHeight;
	camara.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function push(e) {
	//CAMBIOS DE C�MARA
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
	
	//C�mara
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

	//Luces
  	var ambient = new THREE.AmbientLight( 0xffffff );
	escena.add( ambient );
	
	//Piso
	var floorMaterial = new THREE.MeshLambertMaterial( {color:0xFF4B4B, side:THREE.DoubleSide} );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	floor.receiveShadow = true;
	escena.add(floor);
		
	//Paredes	
	var wallGeometry = new THREE.CubeGeometry( 1000, 30, 10, 1, 1 );
	var wallMaterial = new THREE.MeshBasicMaterial( {color: 0xFF845F} );
	
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

	escena.add( new THREE.AxisHelper( 100 ) );
	
	// Planetas
	//tierra
	var planeta1 = new THREE.SphereGeometry( 60, 20, 20 );
	var materialPlaneta1 = new THREE.MeshBasicMaterial({color: 0x8888ff});
	planetaTierra = new THREE.Mesh( planeta1, materialPlaneta1 );
	planetaTierra.position.y = 400;
	escena.add(planetaTierra);
	//luna
	var lunaG = new THREE.SphereGeometry( 20, 20, 20 );
	var lunaM = new THREE.MeshBasicMaterial( {color: 0x00ffff} );
	luna = new THREE.Mesh( lunaG, lunaM );
	luna.position.y = 400+120;
	escena.add(luna);
	

	//Personajes
	personaje5(0, 30, 0);
}



 function loop(){
    requestAnimationFrame(loop);
    renderer.render(escena, camara);
    actualiza();
 }
