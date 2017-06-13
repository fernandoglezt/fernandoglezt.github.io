var malla, camara, renderer, escena, pointLight;
var pos = 0, posLuna = 0, ampl = 200;
var planetaTierra, luna, trayectoria = 0;
var personajeCincoM;


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
	planetaTierra.position.x = ampl*Math.cos(pos);
	planetaTierra.position.y = ampl*Math.sin(pos);
	planetaTierra.rotation.y += 0.05;
	
	luna.position.x = ampl*Math.cos(posLuna+(Math.PI));
	luna.position.y = ampl*Math.sin(posLuna+(Math.PI));
	luna.rotation.y += 0.05;
	

	if(        Math.round(planetaTierra.position.x) == Math.round(luna.position.x) 
		&& Math.round(planetaTierra.position.y) === Math.round(luna.position.y)){
		
		if(trayectoria === 0)
			trayectoria = 1;
		else
			trayectoria = 0;
	}
	
	if (trayectoria === 0){
		pos += 0.01;
		if( pos >= 2*Math.PI)
			pos = 0;

		posLuna -= 0.01;
		if( posLuna <= -2*Math.PI)
			posLuna = 0;
	}
	if(trayectoria === 1){
		pos -= 0.01;
		if( pos === 0)
			pos = 2*Math.PI;
		posLuna += 0.01;
		if( posLuna === 0)
			posLuna = -2*Math.PI;
	}

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
