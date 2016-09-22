/***************

***************/

const SHIP_SIZE = {'x': 90, 'y':80, 'z':25};
const ALIEN1_SIZE = {'x': 40, 'y':40, 'z':25};
const ALIEN2_SIZE = {'x': 60, 'y':40, 'z':25};	
const PLAYINGFIELD_SIZE = {'x': 15*SHIP_SIZE.x, 'y':10*SHIP_SIZE.y, 'z':10*SHIP_SIZE.y};
const COLORS = {'red': 0xff0000, 'lightblue':0x00E5FF};

var camera, camera_persp, camera_ortho,
	scene, renderer,
	geometry,material,mesh;

var ball, player;


function render() {	
	'use strict';

	renderer.render(scene,camera);
}

function createBall(x,y,z) {
	'use strict';
	
	ball = new THREE.Object3D();
	ball.userData = {jumping: true , step : 0};

	material = new THREE.MeshBasicMaterial( {color: COLORS.red, wireframe: true });
	geometry = new THREE.SphereGeometry(4,10 ,10);
	mesh = new THREE.Mesh(geometry, material);

	ball.add(mesh);
	ball.position.set(x,y,z);

	scene.add(ball);
}

function createPlayer(x, y, z) {
	'use strict';
	
	player = new THREE.Object3D();
	player.userData = {movingRight: false, movingLeft: false, step: 0};

	material = new THREE.MeshBasicMaterial({color: COLORS.lightblue, wireframe: true});
	geometry = new THREE.CubeGeometry(SHIP_SIZE.x, SHIP_SIZE.y, SHIP_SIZE.z);
	mesh = new THREE.Mesh(geometry, material);
	player.add(mesh);
	
	player.position.set(x, y, z);
	scene.add(player);
 
}

function createAlien1(x, y, z) {
	'use strict';
	var alien = new THREE.Object3D();

	material = new THREE.MeshBasicMaterial({color: COLORS.red , wireframe: true});
	geometry = new THREE.CubeGeometry(ALIEN1_SIZE.x, ALIEN1_SIZE.y, ALIEN1_SIZE.z);
	mesh = new THREE.Mesh(geometry, material);
	alien.add(mesh);
	
	alien.position.set(x, y, z);
	scene.add(alien);
 
}

function createCamera() {
	'use strict';

	camera_persp = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight,1,1000);
	camera_ortho = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2,1,1000);
	camera_persp.position.x = (camera_ortho.position.x = 700);
	camera_persp.position.y = (camera_ortho.position.y = 400);
	camera_persp.position.z = (camera_ortho.position.z = 800);

	var lookAtVector = new THREE.Vector3(700, 400, 0);
	//lookAtVector.applyQuaternion(camera_persp.quaternion);

	camera_persp.lookAt(lookAtVector); camera_ortho.lookAt(lookAtVector);
	camera = camera_persp;
}

function createScene() {
	'use strict';

	scene = new THREE.Scene();
	scene.add(new THREE.AxisHelper(10));

	createBall(0,800,0);
	createPlayer(45,40,0);

	createAlien1(400,400,0);	
}

function onResize() {
	'use strict';
	
	renderer.setSize(window.innerWidth, window.innerHeight);

	if (window.innerHeight > 0 && window.innerWidth > 0) 
	{
		camera.aspect = renderer.getSize().width / renderer.getSize().height;
		camera.updateProjectionMatrix();
	}

}

function onKeyDown(key) {
	'use strict';
	
	switch (key.keyCode)
	{
		case 65: case 97: // A or a
			scene.traverse(function (node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;

		case 39: //-->
			if (player.userData.movingLeft){
				player.userData.movingLeft = false;
				player.userData.step = 5;
			}
			player.userData.movingRight = true;

			break;
		case 37: //<--
			if(player.userData.movingRight){
				player.userData.movingRight = false;
				player.userData.step = 5;
			}
			player.userData.movingLeft = true;
			break;
		case 80: //p
			camera = camera_persp;
			break;
		case 79: //o
			camera = camera_ortho;
			break;
		break;
	}
	
}
function onKeyUp(key){
	'use strict';
	
	switch (key.keyCode)
	{
		case 39: //-->
			player.userData.movingRight = false;
			player.userData.step = 5;
			break;
		case 37: //<--
			player.userData.movingLeft = false;
			player.userData.step = 5;
			break;
	}
}
function movePlayer(){
	'use strict';

	stats.begin();

	if(player.userData.movingLeft || player.userData.movingRight)
		player.userData.step += 0.8;
	if (player.userData.movingLeft && (player.position.x-player.userData.step)>=45){
		player.position.x -= player.userData.step;
	}
	else if (player.userData.movingLeft) player.position.x=45;
	if (player.userData.movingRight && (player.position.x+player.userData.step)<=1350){
		player.position.x += player.userData.step;
	}
	else if (player.userData.movingRight) player.position.x=1350;
	render();
	requestAnimationFrame(movePlayer);

	stats.end();
}

function init() {	
	'use strict';

	renderer = new THREE.WebGLRenderer({antialias : true});

	renderer.setSize(window.innerWidth , window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	createCamera();

	render();

	window.addEventListener("resize",onResize);
	window.addEventListener("keydown",onKeyDown);
	window.addEventListener("keyup",onKeyUp);
}