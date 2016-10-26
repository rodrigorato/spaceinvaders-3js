class GameBullet extends HasPhysics{
	constructor(x, y, z){
		super(x, y, z);

		this.size = {'x': 8, 'y': 8, 'z': 8};
		this.vel = {'x': 0, 'y': 500, 'z': 0};
		this.boundingSphereRadius = 8; 
	}


	createObject(){
		//createSphere(x, y, z, radius, horSegments, verSegments, material) {
		this.createSphere(0, 0, 0, 8, 4, 4, MATERIALS.lightblue);
		this.createSound();
	}

	createSound(){
		var snd = new Audio("res/blast.wav"); 
      	snd.volume = bulletSoundVolume;
      	snd.playbackRate = 1 + (Math.random()*0.2*(Math.random() >= 0.5 ? -1 : 1));
      	snd.play();
	}
}