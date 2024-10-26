import Phaser from 'phaser'
export default class Player extends Phaser.Physics.Arcade.Sprite{  //-----> This class is usedto create objectsof type sprite

    //-------- There are 3 methods created in this class (spawn, die, update). Complete it by moving on to the next stage! -------//
   constructor(scene, x, y, texture, config){
    super(scene, x, y, texture);
    this.scene = scene;
    this.attack_cool = 500;
    this.status = 0;
    this.size = 0.95;
    this.inv_frame = 0;
    this.playereffect = 0;
    this.playereffect_cooldown = 0;
   }
   spawn(){  
    this.setPosition(400, 400); //------> The value of X position will be set when this method is called
    this.setActive(true);
    this.setVisible(true);
    this.hp = 30;
    this.x = 400
    this.y = 400
   }                                     
   die(){
    this.destroy();
   }
   movex(addx){
    if (addx != 0){
      this.setVelocityX(addx)
    } else {
      this.setVelocityX(0)
    }
   }
   movey(addy){
    if (addy != 0){
      this.setVelocityY(addy)
    } else {
      this.setVelocityY(0)
    }
   }
   stop(){
    this.setVelocity(0,0)
   }
   update(time){
   const gameHeight = 600;
   const gameWidth = 600;
    if (this.y > gameHeight) { 
      this.y = 0
    }
    if (this.x > gameWidth) { 
      this.x = 0
    }
    if (this.y < 0) { 
      this.y = gameHeight
    }
    if (this.x < 0) { 
      this.x = gameWidth
    }
  }
}