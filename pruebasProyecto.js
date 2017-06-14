var malla, camara, renderer, escena, pointLight;
var pos = 0, posLuna = 0, posPersonajeCinco = 0;
var planetaTierra, luna;
var personajeCincoM, personajeSeisM;


setup();
loop();

function personaje6(x, y, z){
	var escala = 25;
	
	var cabeza = new THREE.IcosahedronGeometry(escala*0.25);
	var cuerpo = new THREE.CylinderGeometry(escala*0.25, escala*0.25, escala*1);
	var brazoIzq = new THREE.CylinderGeometry(escala*0.08, escala*0.08, escala*0.5);
	var brazoDer = new THREE.CylinderGeometry(escala*0.08, escala*0.08, escala*0.5);
	var piernaIzq = new THREE.CylinderGeometry(escala*0.09, escala*0.09, escala*0.5);
	var piernaDer = new THREE.CylinderGeometry(escala*0.09, escala*0.09, escala*0.5);
	
	brazoIzq.rotateZ(5.75);
	brazoDer.rotateZ(Math.PI/6);
	piernaIzq.rotateZ(6.1);
	piernaDer.rotateZ(0.17);
	
	cabeza.translate(escala*0, escala*0.7, escala*0);
	piernaIzq.translate(escala*-0.2, escala*-0.75, escala*0);
	piernaDer.translate(escala*0.2, escala*-0.75, escala*0);
	brazoIzq.translate(escala*-0.33, escala*0, escala*0);
	brazoDer.translate(escala*0.33, escala*0, escala*0);
	
	var cabezaMalla = new THREE.Mesh(cabeza);
	var cuerpoMalla = new THREE.Mesh(cuerpo);
	var brazoIzqMalla = new THREE.Mesh(brazoIzq);
	var brazoDerMalla = new THREE.Mesh(brazoDer);
	var piernaIzqMalla = new THREE.Mesh(piernaIzq);
	var piernaDerMalla = new THREE.Mesh(piernaDer);
	
	
	var loader = new THREE.TextureLoader();
	loader.load('MilkyWay/transition3.png', function ( texture ) {
		
		var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
		var personajeSeis = new THREE.Geometry();

		personajeSeis.merge(cabezaMalla.geometry, cabezaMalla.matrix);
		personajeSeis.merge(cuerpoMalla.geometry, cuerpoMalla.matrix);
		personajeSeis.merge(brazoIzqMalla.geometry, brazoIzqMalla.matrix);
		personajeSeis.merge(brazoDerMalla.geometry, brazoDerMalla.matrix);
		personajeSeis.merge(piernaIzqMalla.geometry, piernaIzqMalla.matrix);
		personajeSeis.merge(piernaDerMalla.geometry, piernaDerMalla.matrix);
		
		personajeSeisM = new THREE.Mesh(personajeSeis, material);
		personajeSeisM.position.x = x;
		personajeSeisM.position.y = y;
		personajeSeisM.position.z = z;
		
		escena.add(personajeSeisM);
	});
	

}

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

	var loader = new THREE.TextureLoader();
	loader.load('MilkyWay/lavatile.jpg', function ( texture ) {
		
		var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
		var personajeCinco = new THREE.Geometry();

		personajeCinco.merge(esferaMalla.geometry, esferaMalla.matrix);
		personajeCinco.merge(conoMalla1.geometry, conoMalla1.matrix);
		personajeCinco.merge(conoMalla2.geometry, conoMalla2.matrix);
		personajeCinco.merge(conoMalla3.geometry, conoMalla3.matrix);
		personajeCinco.merge(conoMalla4.geometry, conoMalla4.matrix);
		personajeCinco.merge(conoMalla5.geometry, conoMalla5.matrix);
		personajeCinco.merge(conoMalla6.geometry, conoMalla6.matrix)
		
		personajeCincoM = new THREE.Mesh(personajeCinco, material);
		personajeCincoM.position.x = x;
		personajeCincoM.position.y = y;
		personajeCincoM.position.z = z;
		
		escena.add(personajeCincoM);
	});
	
	

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

function actualiza(){
	planetaTierra.position.x = 600*Math.cos(pos);
	planetaTierra.position.y = 600*Math.sin(pos);
	planetaTierra.rotation.y += 0.01;
	
	luna.position.x = 600*Math.cos(pos)+120*Math.cos(posLuna);
	luna.position.y = 600*Math.sin(pos)+120*Math.sin(posLuna);	
	
	personajeCincoM.position.x = 90*Math.cos(posPersonajeCinco );
	personajeCincoM.position.z = 90*Math.sin(posPersonajeCinco );
	personajeCincoM.rotation.y += 0.05;
	
	pos += 0.01;
	if( pos >= 2*Math.PI)
		pos = 0;
	posLuna += 0.05;
	if( posLuna >= 2*Math.PI)
		posLuna = 0;
	posPersonajeCinco += 0.05;
	if( posPersonajeCinco >= 2*Math.PI)
		posPersonajeCinco = 0;

}

function setup(){
	//Escena
  	escena = new THREE.Scene();
	
	
	//Cámara
	var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
	camara = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);	
	escena.add(camara);
	camara.position.set(-1000, 750, -1000);
	camara.lookAt(escena.position);	


	//Renderizador
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );


	//Eventos
	window.addEventListener( 'resize', windowResize, false );
	window.addEventListener( 'keydown', push, false);
  
  	//Controles
	controls = new THREE.OrbitControls( camara, renderer.domElement );
	
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

	//Piso
	var loader = new THREE.TextureLoader();
	loader.load('floor-texture.jpg', function ( texture ) {
		var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
		var floorMaterial = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
		var floor = new THREE.Mesh(floorGeometry, floorMaterial);
		floor.position.y = -0.5;
		floor.rotation.x = Math.PI / 2;
		escena.add( floor);
	});
	
	//Paredes	
	var loader = new THREE.TextureLoader();
	loader.load('brick-texture.jpg', function ( texture ) {
		
		var wallGeometry = new THREE.CubeGeometry( 1000, 30, 10, 1, 1 );
		var wallMaterial = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } );
	
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
	});
	
	// Planetas
	
	//tierra
	var loader = new THREE.TextureLoader();
		loader.load( 'MilkyWay/land_ocean_ice_cloud_2048.jpg', function ( texture ) {
			var planeta1 = new THREE.SphereGeometry( 60, 20, 20 );
			var materialPlaneta1 = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
			planetaTierra = new THREE.Mesh( planeta1, materialPlaneta1 );
			planetaTierra.position.y = 400;
			escena.add(planetaTierra);
	} );
	//luna
	var loader = new THREE.TextureLoader();
		loader.load( 'MilkyWay/moon-texture.jpg', function ( texture ) {
			var lunaG = new THREE.SphereGeometry( 20, 20, 20 );
			var lunaM = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
			luna = new THREE.Mesh( lunaG, lunaM );
			luna.position.y = 400+120;
			escena.add(luna);
	} );
	
	/Personajes
	personaje5(0, 30, 0);
	personaje6(-450, 30, -450);
}


 function loop(){
	requestAnimationFrame(loop);
        renderer.render(escena, camara);
	actualiza();
        controls.update();
  }

