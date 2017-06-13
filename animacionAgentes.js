function Agent(x=0, y=0){

	THREE.Object3D.call(this);
	this.position.x= x;
	this.position.y= y;

}

Agent.prototype = new THREE.Object3D();

Agent.prototype.sense= function(environment) {};
Agent.prototype.plan= function(environment) {};
Agent.prototype.act= function(environment) {};

function Environment(){

	THREE.Scene.call(this);

}

Environment.prototype= new THREE.Scene();

Environment.prototype.sense = function(){
	for(var i=0; i< this.children.length; i++){
		if (this.children[i].sense !== undefined)
			this.children[i].sense(this);
	}
}

Environment.prototype.plan= function(){
	for(var i=0; i< this.children.length; i++){
		if (this.children[i].plan !== undefined)
			this.children[i].plan(this);
	}
}

Environment.prototype.act = function (){
	for(var i=0; i< this.children.length; i++){
		if (this.children[i].act !== undefined)
			this.children[i].act(this);	
	}
}


function Pelota (r, x=0, y=0){

	/*Agent.call(this, x, y)
	var cubeGeometry = new THREE.CubeGeometry( .5, .5, .5 );
	var cubeMaterial = new THREE.MeshNormalMaterial();
	this.add = new THREE.Mesh( cubeGeometry, cubeMaterial );
	
	this.step = 0.1;
	this.colision=0;
	this.radius= r;
	
	this.sensor= new THREE.Raycaster( this.position, new THREE.Vector3(1,0,0));*/
	
	Agent.call(this,x,y);
	this.add(new THREE.Mesh(new THREE.SphereGeometry(r),
		 		new THREE.MeshNormalMaterial()));
	this.step= 0.1;
	this.colision=0;
	this.radius= r;
	this.sensor= new THREE.Raycaster( this.position, 
					  new THREE.Vector3(1,0,0));

}

Pelota.prototype= new Agent();

Pelota.prototype.sense = function(environment){
	
	this.sensor.set(this.position, new THREE.Vector3(1,0,0));
	var obstaculo1= this.sensor.intersectObjects(environment.children,true);

	this.sensor.set(this.position, new THREE.Vector3(-1,0,0));
	var obstaculo2= this.sensor.intersectObjects(environment.children,true);

	if (( obstaculo1.length >0 && ( obstaculo1[0].distance <= this.radius)) || ( obstaculo2.length >0 && (obstaculo2[0].distance <= this.radius) ))
		this.colision= 1;
	else
		this.colision=0;

};


Pelota.prototype.act= function(environment) {
	if (this.colision===1)
		this.step= -this.step;
	
	this.position.x += this.step;
};


function Pared(size, x=0, y=0){
	
	THREE.Object3D.call(this,x,y);

	this.add(new THREE.Mesh(new THREE.BoxGeometry(size, size, size),
			             new THREE.MeshNormalMaterial()));
	this.size= size;
	this.position.x= x;
	this.position.y=y;
}


Pared.prototype= new THREE.Object3D();

function setup(){

	entorno = new Environment();
	var VIEW_ANGLE = 45, ASPECT = window.innerWidth / window.innerHeight, NEAR = 0.1, FAR = 20000;
	camara = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);	
	camara.position.set(0, 0, 30);
	//camara.lookAt(entorno.position);

	entorno.add(new Pared(5,2*7,0));
	entorno.add(new Pared(5,2*-7,0));
	entorno.add(new Pared(5,2*7,2*1));
	entorno.add(new Pared(5,2*-7,2*1));
	entorno.add(new Pared(5,2*7,2*-1));
	entorno.add(new Pared(5,2*-7,2*-1));
	entorno.add(new Pelota(0.5,0,0));
	entorno.add(new Pelota(0.5,5,0));

	entorno.add(new Pelota(0.5,0,4));
	entorno.add(new Pelota(0.5,5,4));
	entorno.add(new Pelota(0.5,-5,4));

	entorno.add(camara);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//Controles
	controls = new THREE.OrbitControls( camara, renderer.domElement );
}



function loop(){
	requestAnimationFrame( loop);
 	entorno.sense();
	entorno.plan();
	entorno.act();
	renderer.render(entorno, camara);
	controls.update();
}


	var entorno, camara, renderer;

	setup();
	loop();
