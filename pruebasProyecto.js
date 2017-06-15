var malla, camara, renderer, escena, pointLight;
var pos = 0, posLuna = 0, posPersonajeCinco = 0, posTo1=0, posTo2=0, posP3=3.5, posP2=3.5;
var planetaTierra, luna, Torus, Torus2, personajeDosM, personajeDosM2, personajeTresM, personajeTresM2, personajeTresM3, personajeTresM4, personajeCincoM, personajeSeisM, trenM;
var trayT = 0;


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


function personaje3(x, y, z, p){
	//Personaje III
	var puntos = [];
	for ( var i = 0; i < 30; i ++ ) {
	    puntos.push( new THREE.Vector2(Math.sin( i * 0.2 ) *10 + 0.5, ( i - 5 ) * 3 ) );
	}

	var personajeTres = new THREE.LatheGeometry(puntos);
	var material = new THREE.MeshNormalMaterial();
	
	if (p===0){
		personajeTresM = new THREE.Mesh( personajeTres, material );
		personajeTresM.position.set(x, y, z);
		escena.add(personajeTresM);
	}
	if (p===1){
		personajeTresM2 = new THREE.Mesh( personajeTres, material );
		personajeTresM2.position.set(x, y, z);
		escena.add(personajeTresM2);
	}
	if (p===2){
		personajeTresM3 = new THREE.Mesh( personajeTres, material );
		personajeTresM3.position.set(x, y, z);
		escena.add(personajeTresM3);
	}
	if (p===3){
		personajeTresM4 = new THREE.Mesh( personajeTres, material );
		personajeTresM4.position.set(x, y, z);
		escena.add(personajeTresM4);
	}
}

function personaje2(x, y, z, p){
	//--PERSONAJE II --

	var esc = 25;

	var esferaForma = new THREE.SphereGeometry( esc*.25 );
	var conoForma = new THREE.ConeGeometry( esc*.25, esc*1);
	var conoForma2 = new THREE.ConeGeometry( esc*.25, esc*1);

	conoForma2.rotateZ(Math.PI);

	conoForma.translate(0, esc*0.7, 0);
	conoForma2.translate(0, esc*-0.7, 0);


	var baseMalla = new THREE.Mesh(esferaForma);
	var conoMalla = new THREE.Mesh(conoForma);
	var conoMalla2 = new THREE.Mesh(conoForma2);


	var personajeDos = new THREE.Geometry();

	personajeDos.merge(baseMalla.geometry, baseMalla.matrix);
	personajeDos.merge(conoMalla.geometry, conoMalla.matrix);
	personajeDos.merge(conoMalla2.geometry, conoMalla2.matrix);
	
	var material = new THREE.MeshNormalMaterial();
	
	if (p === 0){
		personajeDosM = new THREE.Mesh(personajeDos, material);
		personajeDosM.rotateY(Math.PI/2);
		personajeDosM.position.set(x, y, z);
		escena.add(personajeDosM);
	}
	if (p === 1){
		personajeDosM2 = new THREE.Mesh(personajeDos, material);
		personajeDosM2.rotateY(Math.PI/2);
		personajeDosM2.position.set(x, y, z);
		escena.add(personajeDosM2);
	}
}

function personajeTren(x, y, z, p){
	// Tren
        var forma = new THREE.Geometry();
        var esferaForma = new THREE.SphereGeometry(15.2);
        var cilindroForma = new THREE.CylinderGeometry(8, 8, 45, 32);
        var cilindroForma2 = new THREE.CylinderGeometry(6, 6, 35, 32);
        var cilindroForma3 = new THREE.CylinderGeometry(8, 8, 35, 32);
        var cilindroForma4 = new THREE.CylinderGeometry(7, 7, 35, 32);
        var toroForma = new THREE.TorusGeometry(15, 4, 16, 100);

        forma.vertices.push(new THREE.Vector3(40, 0, 10)); // Vértice 0
        forma.vertices.push(new THREE.Vector3(40, 0, -10)); // Vértice 1
        forma.vertices.push(new THREE.Vector3(-10, 0, -10)); // Vértice 2
        forma.vertices.push(new THREE.Vector3(-10, 0, 10)); // Vértice 3

        forma.vertices.push(new THREE.Vector3(40, 20, 10)); // Vértice 4
        forma.vertices.push(new THREE.Vector3(40, 20, -10)); // Vértice 5
        forma.vertices.push(new THREE.Vector3(-10, 20, -10)); // Vértice 6
        forma.vertices.push(new THREE.Vector3(-10, 20, 10)); // Vértice 7

        forma.faces.push(new THREE.Face3(3, 1, 2)); // Cara 0
        forma.faces.push(new THREE.Face3(3, 0, 1)); // Cara 1

        forma.faces.push(new THREE.Face3(3, 4, 7)); // Cara 2
        forma.faces.push(new THREE.Face3(3, 0, 4)); // Cara 3

        forma.faces.push(new THREE.Face3(0, 5, 4)); // Cara 4
        forma.faces.push(new THREE.Face3(0, 1, 5)); // Cara 5

        forma.faces.push(new THREE.Face3(1, 6, 5)); // Cara 6
        forma.faces.push(new THREE.Face3(1, 2, 6)); // Cara 7

        forma.faces.push(new THREE.Face3(2, 7, 6)); // Cara 8
        forma.faces.push(new THREE.Face3(2, 3, 7)); // Cara 9

        forma.faces.push(new THREE.Face3(7, 5, 6)); // Cara 10
        forma.faces.push(new THREE.Face3(7, 4, 5)); // Cara 11

        forma.computeBoundingSphere();
        forma.computeFaceNormals();

            //forma.rotateX(Math.PI / 4);
            //forma.rotateY(3*Math.PI / 2);

        toroForma.rotateY(Math.PI / 2);
        cilindroForma3.rotateX(Math.PI / 2);
        cilindroForma4.rotateX(Math.PI / 2);

        esferaForma.translate(-10, 10, 0);
        toroForma.translate(-3, 10, 0);
        cilindroForma.translate(10, 25, 0);
        cilindroForma2.translate(30, 25, 0);
        cilindroForma3.translate(10, -3, 0);
        cilindroForma4.translate(30, -3, 0);

        var esferaMalla = new THREE.Mesh(esferaForma);
        var malla = new THREE.Mesh(forma);
        var toroMalla = new THREE.Mesh(toroForma);
        var cilindroMalla = new THREE.Mesh(cilindroForma);
        var cilindroMalla2 = new THREE.Mesh(cilindroForma2);
        var cilindroMalla3 = new THREE.Mesh(cilindroForma3);
        var cilindroMalla4 = new THREE.Mesh(cilindroForma4);
        var trenForma = new THREE.Geometry();
        trenForma.merge(esferaMalla.geometry, esferaMalla.matrix);
        trenForma.merge(malla.geometry, malla.matrix);
        trenForma.merge(toroMalla.geometry, toroMalla.matrix);
        trenForma.merge(cilindroMalla.geometry, cilindroMalla.matrix);
        trenForma.merge(cilindroMalla2.geometry, cilindroMalla2.matrix);
        trenForma.merge(cilindroMalla3.geometry, cilindroMalla3.matrix);
        trenForma.merge(cilindroMalla4.geometry, cilindroMalla4.matrix);
        trenForma.rotateY(3 * Math.PI / 4);
        trenForma.translate(0, -20, 0)

	
	var loader = new THREE.TextureLoader();
	loader.load('MilkyWay/iron-texture', function ( texture ) {
		
		var material = new THREE.MeshLambertMaterial( { map: texture, side: THREE.DoubleSide } );
		
		trenM = new THREE.Mesh(trenForma, material);
		trenM.position.x = x;
		trenM.position.y = y;
		trenM.position.z = z;
		trenM.rotation.y = Math.PI/4;

		escena.add(trenM);
	});
	
	
}


function Colisiones(){
	//Choques con paredes
	//console.log( Math.round(personajeSeisM.position.x) );
	if( Math.round(personajeSeisM.position.x) <= -489 )
		personajeSeisM.position.x = -486;
	if( Math.round(personajeSeisM.position.x) >= 489 )
		personajeSeisM.position.x = 486;
	if( Math.round(personajeSeisM.position.z) <= -489 )
		personajeSeisM.position.z = -486;
	if( Math.round(personajeSeisM.position.z) >= 489 )
		personajeSeisM.position.z = 486;
	 
}


function actualiza(){
	//Movimientos tierra
	planetaTierra.position.x = 600*Math.cos(pos);
	planetaTierra.position.y = 600*Math.sin(pos);
	planetaTierra.rotation.y += 0.01;
	
	//Movimientos Luna
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

	//Movimientos Personaje 5
	personajeCincoM.position.x = 90*Math.cos(posPersonajeCinco );
	personajeCincoM.position.z = 90*Math.sin(posPersonajeCinco );
	personajeCincoM.rotation.y += 0.05;

	//Movimientos Torus
	Torus.position.x = 170*Math.cos(posTo1);
	Torus.position.z = 170*Math.sin(posTo1);
	
	Torus2.position.x = 170*Math.cos(posTo2+(Math.PI));
	Torus2.position.z = 170*Math.sin(posTo2+(Math.PI));
	

	if(        Math.round(Torus.position.x) == Math.round(Torus2.position.x) 
		&& Math.round(Torus.position.y) === Math.round(Torus2.position.y)){
		
		if(trayT === 0)
			trayT = 1;
		else
			trayT = 0;
	}
	
	if (trayT === 0){
		posTo1 += 0.01;
		if( posTo1 >= 2*Math.PI)
			posTo1 = 0;

		posTo2 -= 0.01;
		if( posTo2 <= -2*Math.PI)
			posTo2 = 0;
	}
	if(trayT === 1){
		posTo1 -= 0.01;
		if( posTo1 <= 0)
			posTo1 = 2*Math.PI;
		posTo2 += 0.01;
		if( posTo2 >= 0)
			posTo2 = -2*Math.PI;
	}
	
	
	//Movimientos Personaje 3
	
	if(personajeTresM.position.x >= 487){
		posP3 = -posP3;
	}else{
		if(personajeTresM.position.x <= -487)
			posP3 = -posP3;
	}
	personajeTresM.position.x += posP3;
	personajeTresM2.position.x -= posP3;
	personajeTresM3.position.x += posP3;
	personajeTresM4.position.x -= posP3;
	

	//Movimientos Personaje 2
	if(personajeDosM.position.z >= 487){
		posP2 = -posP2;
	}else{
		if(personajeDosM.position.z <= -487)
			posP2 = -posP2;
	}
	personajeDosM.position.z += posP2;
	personajeDosM2.position.z -= posP2;
	
	personajeDosM.rotation.z += 0.1;
	personajeDosM2.rotation.z += 0.1;

	//Rotación tren
	trenM.rotation.y += 0.05;

	Colisiones();
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
	
	//Posición personaje 6
	if (e.keyCode === 65) // IZQUIERDA - A
		personajeSeisM.position.z -= 3; 
	if (e.keyCode === 68) // DERECHA - D
		personajeSeisM.position.z += 3; 
	if (e.keyCode === 87) // ARRIBA - W
		personajeSeisM.position.x += 3;
	if (e.keyCode === 83) // ABAJO - S
		personajeSeisM.position.x -= 3;
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
	
	/*pointLight = new THREE.PointLight( 0xffffff, 2 );
	escena.add( pointLight );	
	var spotlight = new THREE.SpotLight(0xffffff);
	spotlight.position.set(0, 500, 0);
	spotlight.castShadow = true;
	spotlight.intensity = 3;
	
	var spotlight2 = new THREE.SpotLight(0xffffff);
	spotlight2.position.set(0, -500, 0);
	spotlight2.castShadow = true;
	spotlight2.intensity = 3;
	
	var spotlight3 = new THREE.SpotLight(0xffffff);
	spotlight3.position.set(500, 0, 0);
	spotlight3.castShadow = true;
	spotlight3.intensity = 3;

	var spotlight4 = new THREE.SpotLight(0xffffff);
	spotlight4.position.set(-500, 0, 0);
	spotlight4.castShadow = true;
	spotlight4.intensity = 3;
	
	escena.add(spotlight);
	escena.add(spotlight2);
	escena.add(spotlight3);
	escena.add(spotlight4);*/
	
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
	
	//Personaje Torus
	var material = new THREE.MeshLambertMaterial( {color: 0xabcdef} );
	Torus = new THREE.Mesh( new THREE.TorusGeometry( 20, 5, 20, 20 ), material );
	Torus.rotation.x = Math.PI/2;
	Torus.position.set( -170, 30, -0 );	
	escena.add( Torus );

	var material = new THREE.MeshLambertMaterial( {color: 0xff0000} );
	Torus2 = new THREE.Mesh( new THREE.TorusGeometry( 20, 5, 20, 20 ), material );
	Torus2.rotation.x = Math.PI/2;
	Torus2.position.set( 170, 30, -0 );	
	escena.add( Torus2 );
	

	//Personajes
	personaje2( 250, 50, 0, 0);
	personaje2(-250, 50, 0, 1);

	personaje3(-250, 30, -250, 0);
	personaje3( 250, 30, -250, 1);
	personaje3(-250, 30, 250, 2);
	personaje3( 250, 30, 250, 3);
	
	personaje5(0, 30, 0);
	personaje6(-450, 30, -450);

	personajeTren(0, 35, 0, 0);

	//Activar luz y sombras
	renderer.shadowMap.Enabled = true;
//	planetaTierra.castShadow = true;
//	floor.receiveShadow = true;
}


 function loop(){
	requestAnimationFrame(loop);
        renderer.render(escena, camara);
	actualiza();
        controls.update();
  }

