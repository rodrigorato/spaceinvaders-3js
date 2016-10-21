/*********************
*	Space Invaders   *
*	CG @ IST         *
*	1sem 2016/17     *
*                    *
*	Grupo 29         *
**********************/


class GameAlien extends HasPhysics{
	constructor(x,y,z){
		'use strict';
		super(x,y,z);
		this.size = {'x': 40, 'y':40, 'z':25};
		//this.accel.x = 100*(Math.random()-0.5);
		//this.accel.y = 100*(Math.random()-0.5);
		
	}	

	static getSize(){ 
		return {'x': 40, 'y':40, 'z':25};
	}


	createObject(){
		'use strict';
		this.createCube(0,     5, 0, 10, 30, 25, MATERIALS.red);//paralelipepedo central
		this.createCube(-15,   0, 0, 10, 10, 25, MATERIALS.red);//cubos
		this.createCube(+15,   0, 0, 10, 10, 25, MATERIALS.red);

		this.createCube(+10,  +7.5, 0, 10,  5, 25, MATERIALS.red);//paralelipipedos mini
		this.createCube(-10,  +7.5, 0, 10,  5, 25, MATERIALS.red);

		this.createCube(+7.5, +12.5, 0,  5,  5, 25, MATERIALS.red);//cubos altos
	 	this.createCube(-7.5, +12.5, 0,  5,  5, 25, MATERIALS.red);
		this.createCube(+7.5,  -2.5, 0,  5,  5, 25, MATERIALS.red);
		this.createCube( -7.5,  -2.5, 0,  5,  5, 25, MATERIALS.red);
		
		this.createCube(+12.5,  -7.5, 0,  5,  5, 15, MATERIALS.red);//pata direita
		this.createCube(+17.5, -12.5, 0,  5,  5, 15, MATERIALS.red);
		this.createCube(+12.5, -17.5, 0,  5,  5, 15, MATERIALS.red);
		this.createCube(-12.5,  -7.5, 0,  5,  5, 15, MATERIALS.red);//pata esquerda
		this.createCube(-17.5, -12.5, 0,  5,  5, 15, MATERIALS.red);
		this.createCube(-12.5, -17.5, 0,  5,  5, 15, MATERIALS.red);

		this.createCube(-7.5,   2.5, 0,  5, 5,  25, MATERIALS.white);
		this.createCube( 7.5,   2.5, 0,  5, 5,  25, MATERIALS.white);
	}
} 