/*********************
*	Space Invaders   *
*	CG @ IST         *
*	1sem 2016/17     *
*                    *
*	Grupo 29         *
**********************/

const SHIP_SIZE = {'x': 90, 'y':80, 'z':25};
const ALIEN1_SIZE = {'x': 40, 'y':40, 'z':25};
//const ALIEN2_SIZE = {'x': 60, 'y':40, 'z':25};	
const PLAYINGFIELD_SIZE = {'x': 15*SHIP_SIZE.x, 'y':10*SHIP_SIZE.y, 'z':10*SHIP_SIZE.y};

var MATERIALS = {
	'red': 			new THREE.MeshBasicMaterial({color: 0xFF0000, wireframe: true }),
	'green': 		new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true }),
	'blue': 		new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true }),
	'black': 		new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true }),
	'white': 		new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true }),
	'lightblue': 	new THREE.MeshBasicMaterial({color: 0x00E5FF, wireframe: true }),
	'purpleish': 	new THREE.MeshBasicMaterial({color: 0x5D1BD1, wireframe: true }),	

}
const CAMERA = {"fov": 65, "near": 0.1, "far": 1000};

const ACCELERATION = 3000;

var camera, camera_persp, camera_ortho,camera_player,
	scene, renderer,
	geometry,material,mesh;

var ball, player;

var clock;

//done
function render() {	
	'use strict';

	renderer.render(scene,camera);
}

function createBall(x, y, z,radius, material) {
	'use strict';
	
	ball = new THREE.Object3D();

	var ball_material = material;
	geometry = new THREE.SphereGeometry(radius,8 ,8);
	mesh = new THREE.Mesh(geometry, ball_material);

	ball.add(mesh);
	ball.position.set(x,y,z);

	scene.add(ball);
}
function createCylinder(obj,x, y, z, radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, material){
	'use strict';
	geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded);
	mesh = new THREE.Mesh(geometry, material); 
	mesh.position.set(x, y, z);
	obj.add(mesh);
}
function createCube(obj, x, y, z, dx, dy, dz, material){
	'use strict';
	geometry = new THREE.CubeGeometry(dx,dy,dz);
	mesh = new THREE.Mesh(geometry, material); 
	mesh.position.set(x,y,z);
	obj.add(mesh);
}
function createLimits(){
	var limit = new THREE.Object3D();
	createCube(limit,0,PLAYINGFIELD_SIZE.y/2,0,     2,PLAYINGFIELD_SIZE.y,2,MATERIALS.green);//l
	createCube(limit,PLAYINGFIELD_SIZE.x,PLAYINGFIELD_SIZE.y/2,0,   2,PLAYINGFIELD_SIZE.y,2,MATERIALS.green);//r
	createCube(limit,PLAYINGFIELD_SIZE.x/2,PLAYINGFIELD_SIZE.y-2,0,   PLAYINGFIELD_SIZE.x,2,2,MATERIALS.green);//t
	createCube(limit,PLAYINGFIELD_SIZE.x/2,2,0,     PLAYINGFIELD_SIZE.x,2,2,MATERIALS.green);//b
	

	limit.position.set(0,0,0);
	scene.add(limit);
}
function createPlayer(x, y, z) {
	'use strict';
	
	player = new THREE.Object3D();
	player.userData = {movingRight: false, movingLeft: false, vel: 0};

	//createCube(player,0,0,0, SHIP_SIZE.x, SHIP_SIZE.y, SHIP_SIZE.z,COLORS.lightblue);
	createCube(player,	  0,   0,  0, 30, 60, 20, MATERIALS.blue);
	createCube(player,	  0, -15, -5, 90, 10, 10, MATERIALS.blue);

	createCube(player,	 40, -25, -5, 10, 10, 10, MATERIALS.blue);
	createCube(player,	-40, -25, -5, 10, 10, 10, MATERIALS.blue);

	createCylinder(player,	-30,  -5, -5, 0,  5, 10, 3, 2,  true, MATERIALS.purpleish);
	createCylinder(player,	 30,  -5, -5, 0,  5, 10, 3, 2,  true, MATERIALS.purpleish);
	createCylinder(player,	  0, -35, -5, 5,  0, 10, 3, 2,  true, MATERIALS.red);
	createCylinder(player,	  0,  40,  0, 0, 10, 20, 3, 2,  true, MATERIALS.purpleish);

	createCylinder(player,	  0,  10, 10, 5,  5, 20, 3, 2, false, MATERIALS.white);
	
	player.position.set(x, y, z);
	scene.add(player);
 
}

function createAlien1(x, y, z) {
	'use strict';
	var alien = new THREE.Object3D();
	//createCube(alien,0,0,0,ALIEN1_SIZE.x, ALIEN1_SIZE.y, ALIEN1_SIZE.z);//cubo
	createCube(alien,     0,     5, 0, 10, 30, 25, MATERIALS.red);//paralelipepedo central
	createCube(alien,   -15,     0, 0, 10, 10, 25, MATERIALS.red);//cubos
	createCube(alien,   +15,     0, 0, 10, 10, 25, MATERIALS.red);

	createCube(alien,   +10,  +7.5, 0, 10,  5, 25, MATERIALS.red);//paralelipipedos mini
	createCube(alien,   -10,  +7.5, 0, 10,  5, 25, MATERIALS.red);

	createCube(alien,  +7.5, +12.5, 0,  5,  5, 25, MATERIALS.red);//cubos altos
 	createCube(alien,  -7.5, +12.5, 0,  5,  5, 25, MATERIALS.red);
	createCube(alien,  +7.5,  -2.5, 0,  5,  5, 25, MATERIALS.red);
	createCube(alien,  -7.5,  -2.5, 0,  5,  5, 25, MATERIALS.red);
	
	createCube(alien, +12.5,  -7.5, 0,  5,  5, 15, MATERIALS.red);//pata direita
	createCube(alien, +17.5, -12.5, 0,  5,  5, 15, MATERIALS.red);
	createCube(alien, +12.5, -17.5, 0,  5,  5, 15, MATERIALS.red);
	createCube(alien, -12.5,  -7.5, 0,  5,  5, 15, MATERIALS.red);//pata esquerda
	createCube(alien, -17.5, -12.5, 0,  5,  5, 15, MATERIALS.red);
	createCube(alien, -12.5, -17.5, 0,  5,  5, 15, MATERIALS.red);

	createCube(alien,  -7.5,   2.5, 0,  5, 5,  25, MATERIALS.white);
	createCube(alien,   7.5,   2.5, 0,  5, 5,  25, MATERIALS.white);

	scene.add(alien);
	alien.position.set(x,y,z);
}

function createBullet(){
	'use strict';
	createBall(player.position.x,player.position.y+50,player.position.z,4,MATERIALS.white);
}

function createRowOfAliens(kind, y, quant){
	'use strict';

	for(var i = 0; i < quant; i++)
			createAlien1((ALIEN1_SIZE.x * 2) + (i * ((PLAYINGFIELD_SIZE.x - ALIEN1_SIZE.x) / quant)), y, 0);
}


function createCamera() {
	'use strict';

	camera_ortho = new THREE.OrthographicCamera(PLAYINGFIELD_SIZE.x / -2, // Limite esquerdo
										 PLAYINGFIELD_SIZE.x /  2, 		  //      e direito
										 PLAYINGFIELD_SIZE.y /  2,        // Limite superior
										 PLAYINGFIELD_SIZE.y / -2,        //      e inferior
										 CAMERA.near,			          // Limite frontal
										 CAMERA.far);			          //  	  e traseiro

	camera_persp = new THREE.PerspectiveCamera(CAMERA.fov, window.innerWidth / window.innerHeight, CAMERA.near, CAMERA.far);
	camera_player = new THREE.PerspectiveCamera(CAMERA.fov, window.innerWidth / window.innerHeight, CAMERA.near, CAMERA.far);
	camera_ortho.position.x = (PLAYINGFIELD_SIZE.x / 2);
	camera_ortho.position.y = (PLAYINGFIELD_SIZE.y / 2);
	camera_ortho.position.z = PLAYINGFIELD_SIZE.z;

	camera_persp.position.x = (PLAYINGFIELD_SIZE.x / 2);
	camera_persp.position.y = -100;
	camera_persp.position.z = 600;

	camera_player.position.x= player.position.x;
	camera_player.position.y= player.position.y - 150;
	camera_player.position.z= player.position.z + 500;

	camera_persp.lookAt(new THREE.Vector3(PLAYINGFIELD_SIZE.x / 2, 300, 0));
	camera_player.lookAt(new THREE.Vector3(player.position.x,player.position.y+100,player.position.z));
	camera_ortho.lookAt(new THREE.Vector3(PLAYINGFIELD_SIZE.x / 2, PLAYINGFIELD_SIZE.y / 2, 0));
	camera = camera_ortho;
	onResize();	// Para acertar o aspect ratio.
}

//done
function createScene() {
	'use strict';

	scene = new THREE.Scene();

	// As bolas e o axis helper mostram os cantos do campo de jogo 
	scene.add(new THREE.AxisHelper(100));
	createBall(0,PLAYINGFIELD_SIZE.y,0,4, MATERIALS.red);
	createBall(PLAYINGFIELD_SIZE.x,PLAYINGFIELD_SIZE.y,0,4, MATERIALS.red);
	createBall(PLAYINGFIELD_SIZE.x,0,0,4, MATERIALS.red);
	
	createPlayer(PLAYINGFIELD_SIZE.x / 2, SHIP_SIZE.y / 1.5, 0);

	createRowOfAliens(1, 700, 12);	
	createRowOfAliens(1, 600, 12);	
	createLimits();

}

function onResize() {
	'use strict';
	
	renderer.setSize(window.innerWidth, window.innerHeight);

	var aspect_ratio =(window.innerWidth / window.innerHeight);
	
	if (camera instanceof THREE.OrthographicCamera ) 
	{
		if(aspect_ratio>1){
			camera.left = (PLAYINGFIELD_SIZE.x / -2) * aspect_ratio;
			camera.right = (PLAYINGFIELD_SIZE.x / 2) * aspect_ratio;
			camera.top = PLAYINGFIELD_SIZE.y/ 2;
			camera.bottom = PLAYINGFIELD_SIZE.y / -2;
	
		}else{
			camera.left = (PLAYINGFIELD_SIZE.x / -2) ;
			camera.right = (PLAYINGFIELD_SIZE.x / 2) ;
			camera.top = (PLAYINGFIELD_SIZE.y/ 2) / aspect_ratio;
			camera.bottom = (PLAYINGFIELD_SIZE.y / -2) /aspect_ratio;
		}
		camera.near = CAMERA.near;
		camera.far = CAMERA.far;
	}
	else{
		console.log("persp");
		camera.aspect = aspect_ratio;
	}
	camera.updateProjectionMatrix();

}

function onKeyDown(key) {
	'use strict';
	
	switch (key.keyCode)
	{
		case 65: case 97: // A or a
			for(var i in MATERIALS)
				MATERIALS[i].wireframe = !MATERIALS[i].wireframe;
			break;

		case 39: //-->
			player.userData.movingRight = true;

			break;
		case 37: //<--
			player.userData.movingLeft = true;
			break;
		case 51:
			camera = camera_player;
			break;
		case 50: //2
			camera = camera_persp;
			break;
		case 49: //1
			camera = camera_ortho;
			break;
		case 32: case 66: //B or space
			createBullet();
			break;
		
	}
	
}
function onKeyUp(key){
	'use strict';
	
	switch (key.keyCode)
	{
		case 39: //-->
			player.userData.movingRight = false;
			break;
		case 37: //<--
			player.userData.movingLeft = false;
			break;
	}
}
function shootBullet(){
	'use strict';

}

function movePlayer(){
	'use strict';

	stats.begin();

	var time = clock.getDelta();
	// Checks if the player is moving and adds to its movement
	if(player.userData.movingLeft || player.userData.movingRight)
		player.userData.vel += (player.userData.movingLeft ? -1:1)*ACCELERATION * time;


	if ((!player.userData.movingLeft && player.userData.vel <= 0) || (!player.userData.movingRight && player.userData.vel >= 0))
		player.userData.vel += (player.userData.vel <= 0 ? 1:-1)*ACCELERATION * time;

	
	if (!player.userData.movingRight && !player.userData.movingLeft && Math.abs(player.userData.vel) <= ACCELERATION / 10) 
	{
		player.userData.vel = 0;
	}

	
	//lado esquerdo do campo
	if (player.userData.vel <= 0 && (player.position.x+player.userData.vel*time)<=SHIP_SIZE.x / 2)
	{
		player.position.x = SHIP_SIZE.x / 2;
		player.userData.vel = 0;
	}
	
	//lado direito do campo
	else if (player.userData.vel >= 0 && (player.position.x+player.userData.vel*time) >= PLAYINGFIELD_SIZE.x-SHIP_SIZE.x / 2)
	{
		player.position.x = PLAYINGFIELD_SIZE.x - SHIP_SIZE.x / 2;
		player.userData.vel = 0;
	}
	else 
		player.position.x += player.userData.vel*time;

	camera_player.position.x= player.position.x;
	camera_player.position.y= player.position.y - 100;
	camera_player.position.z= player.position.z + 600;

	render();
	requestAnimationFrame(movePlayer);

	stats.end();
}

//done
function init() {	
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias : true});

	renderer.setSize(window.innerWidth , window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	clock = new THREE.Clock();

	render();

	window.addEventListener("resize",onResize);
	window.addEventListener("keydown",onKeyDown);
	window.addEventListener("keyup",onKeyUp);
}