export default class Enemy extends Phaser.Physics.Arcade.Sprite{  //-----> This class is usedto create objectsof type sprite

    //-------- There are 3 methods created in this class (spawn, die, update). Complete it by moving on to the next stage! -------//
   constructor(scene, x, y, texture, config){
    super(scene, x, y, texture);
    this.scene = scene;
    this.attack_cool = 500;
    this.status = 0;
    this.size = 0.95;
    this.moved = false;
    this.rotatevar=0;
    this.rotate_mult=1;
    this.rotate_start = Phaser.Math.Between(-2,2);
    this.inv_frame = 0;
    this.dmgl = [5,-5];
    this.dmgx = this.dmgl[Phaser.Math.Between(0,1)];
    this.dmgy = this.dmgl[Phaser.Math.Between(0,1)];
   }
   spawn(){  
    this.hp = 3;
    this.setPosition(Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 600)); //------> The value of X position will be set when this method is called
    this.setActive(true);
    this.setVisible(true);
   }                                     
   die(){
    this.destroy();
   }
   movex(addx){
    this.moved=true;
    if (addx != 0){
      this.setVelocityX(addx)
    } else {
      this.setVelocityX(0)
    }
   }
   movey(addy){
    this.moved=true;
    if (addy != 0){
      this.setVelocityY(addy)
    } else {
      this.setVelocityY(0)
    }
   }
   stop(){
    this.setVelocity(0,0)
   }
   followplayer(playerx,playery){
    this.differencex = this.x - playerx
    this.differencey = this.y - playery
    this.offsetx = 0
    this.offsety = 0
    if (this.differencey > 20){
      this.offsety = Phaser.Math.Between(-200,200)
    }
    if (this.differencex > 20){
      this.offsetx = Phaser.Math.Between(-200,200)
    }
    if (playerx+this.offsetx > this.x) {
      this.movex(50)
    }
    if (playerx+this.offsetx < this.x) {
      this.movex(-50)
    }
    if (playery+this.offsety > this.y) {
      this.movey(50)
    }
    if (playery+this.offsety < this.y) {
      this.movey(-50)
    }
   }
   update(time){
   const gameHeight = this.scene.scale.height;
   const gameWidth = this.scene.scale.width;
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