var esferaForma = new THREE.SphereGeometry( 5 );
var conoForma = new THREE.ConeGeometry( 3, 7);
conoForma.translate(0, 5, 0);

var baseMalla = new THREE.Mesh(esferaForma);
var conoMalla = new THREE.Mesh(conoForma);

var personajeUno = new THREE.Geometry();
personajeUno.merge(baseMalla.geometry, baseMalla.matrix);
personajeUno.merge(conoMalla.geometry, conoMalla.matrix);

var material = new THREE.MeshNormalMaterial();
var personajeUnoMalla = new THREE.Mesh(personajeUno, material);

var escena = new THREE.Scene();
escena.add(personajeUnoMalla);

var camara = new THREE.PerspectiveCamera();
camara.position.z = 5;

renderizador = new THREE.WebGLRenderer();
renderizador.setSize( window.innerHeight*.95, window.innerHeight*.95 );
document.body.appendChild( renderizador.domElement );
renderizador.render( escena, camara );
