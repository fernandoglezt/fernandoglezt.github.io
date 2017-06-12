var malla, camara, renderer, escena, pointLight;
var pos = 0, posLuna = 0;
var planetaTierra, luna;


setup();
loop();


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
	
	luna.position.x = 600*Math.cos(pos)+120*Math.cos(posLuna);
	luna.position.y = 600*Math.sin(pos)+120*Math.sin(posLuna);	
	
	planetaTierra.rotation.y += 0.01;
	
	pos += 0.01;
	if( pos >= 2*Math.PI)
		pos = 0;
	posLuna += 0.1;
	if( posLuna >= 2*Math.PI)
		posLuna = 0;

}

function setup(){
	//Escena
  	escena = new THREE.Scene();
	
	
	//Cámara
	var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
	camara = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);	
	escena.add(camara);
	camara.position.set(0,500,1000);
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
}


 function loop(){
	requestAnimationFrame(loop);
        renderer.render(escena, camara);
	actualiza();
        controls.update();
  }

