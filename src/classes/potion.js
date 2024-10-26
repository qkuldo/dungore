import Phaser from 'phaser'
export default class Potion extends Phaser.Physics.Arcade.Sprite{  //-----> This class is usedto create objectsof type sprite

    //-------- There are 3 methods created in this class (spawn, die, update). Complete it by moving on to the next stage! -------//
   constructor(scene, x, y, texture, config){
    super(scene, x, y, texture);
    this.scene = scene;
   }
   spawn(){  
    this.setPosition(Phaser.Math.Between(100,600),Phaser.Math.Between(100,600)); //------> The value of X position will be set when this method is called
    this.setActive(true);
    this.setVisible(true);
   }                                     
   die(){
    this.destroy();
   }
   update(time){
  }
}