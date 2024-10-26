import Phaser from 'phaser'
import Player from "../classes/player";
import Enemy from "../classes/enemy";
import Potion from "../classes/potion";
 export default class mainscene extends Phaser.Scene{
    constructor(){
        super('mainscene')
    }
    init(){
      this.enemy = undefined;
      this.avg_dmg = 2;
      this.hp = 100;
      this.score = 20;
      this.player = undefined;
      this.mainplayer = undefined;
      this.cursor = this.input.keyboard.createCursorKeys();
      this.bgnoise = undefined;
      this.moved = false;
      this.rotatevar = 1;
      this.enemylist = [];
      this.lastattacked = 0;
      this.spawncap = 15;
      this.bosshp = 50;
      this.potion = undefined;
      this.current_potion = undefined;
      this.effect = 0;
      this.scoretext = undefined;
    }
    preload(){
      this.load.spritesheet("player","/images/player.png",{frameWidth:64,frameHeight:64});
      this.load.spritesheet("enemy","/images/enemy.png",{frameWidth:64,frameHeight:64});
      this.load.image("potion","/images/potion.png");
      this.load.image("stage","/images/stage.png");
      this.load.audio("bgmusic","/sounds/music/itscool.wav");
      this.load.audio("damage","/sounds/sound effects/damage.wav");
     this.time.addEvent({
     delay: 10000, // potion spawns every 10 secs
     callback: this.spawnpotion,
     callbackScope: this,
     loop: true,
    });
     this.time.addEvent({
     delay: 3000, // potion spawns every 10 secs
     callback: this.spawnenemy,
     callbackScope: this,
     loop: true,
    });
     this.player = this.physics.add.group({
     classType: Player,
     maxSize: 1,  //-----> the number of enemies in one group
     runChildUpdate: true,
    });
     this.potion = this.physics.add.group({
     classType: Potion,
     maxSize: 1,  //-----> the number of enemies in one group
     runChildUpdate: true,
    });
     this.enemy = this.physics.add.group({
     classType: Enemy,
     maxSize: 30,  //-----> the number of enemies in one group
     runChildUpdate: true,
    });
    }
    spawnenemy(){
      this.enemylist.push(this.enemy.get(0, 0, 'enemy'));
      this.enemylist[this.enemylist.length-1].spawn()
      this.enemylist[this.enemylist.length-1].setScale(this.enemylist[this.enemylist.length-1].size);
    }
    spawnpotion(){
      this.current_potion = this.potion.get(Phaser.Math.Between(100,600),Phaser.Math.Between(100,600),"potion");
    }
    startgame(){
      for (let i = 0;i<Phaser.Math.Between(5,this.spawncap);i++){
         this.spawnenemy();
      }
    }
    create(){
      this.bgnoise = this.sound.add("bgmusic");
         var soundConfig = {
      loop: true, // sound configuration
      volume: 0.5,
    };
    this.bgnoise.play(soundConfig);
      const gameWidth = this.scale.width * 0.5;
     this.time.addEvent({
     delay: 300, // player rotates every 300m
     callback: this.hop,
     callbackScope: this,
     loop: true,
    });
    const gameHeight = this.scale.height * 0.5;
      this.add.image(gameWidth,gameHeight,"stage")
      this.startgame();
      this.mainplayer = this.player.get(0, 0, 'player');
      this.mainplayer.spawn();
      this.mainplayer.setScale(this.mainplayer.size);
      this.anims.create({key:"player idle",frames:this.anims.generateFrameNames("player",{start:0,end:0}),loop:false});
      this.anims.create({key:"player attack",frames:this.anims.generateFrameNames("player",{start:1,end:1}),loop:false});
      this.anims.create({key:"player damaged",frames:this.anims.generateFrameNames("player",{start:2,end:2}),loop:false});
      this.anims.create({key:"enemy idle",frames:this.anims.generateFrameNames("enemy",{start:0,end:0}),loop:false});
      this.anims.create({key:"enemy damaged",frames:this.anims.generateFrameNames("enemy",{start:1,end:1}),loop:false});
      this.physics.add.overlap(this.player,this.enemy,this.touchEnemy,null,this);
      this.physics.add.overlap(this.player,this.potion,this.touchPotion,null,this);
      this.scoretext = this.add.text(240, 10, "Score: 0", {
   color: "#9bbc0f", 
   fontSize: 24 
}).setScrollFactor(0);
    }
    update(time){
      this.recordedtime = time
      if (this.recordedtime > this.mainplayer.playereffect_cooldown){
         this.mainplayer.playereffect = 0
      }
      if ((this.cursor.up.isDown || this.cursor.down.isDown || this.cursor.left.isDown || this.cursor.right.isDown) && this.mainplayer.status == 0){
         this.moved = true;
         if (this.cursor.up.isDown){
            if (this.mainplayer.playereffect == 0){
            this.mainplayer.movey(-70)
         } else if (this.mainplayer.playereffect == 1){
            this.mainplayer.movey(-100)
         }
         } else if (this.cursor.down.isDown){
            if (this.mainplayer.playereffect == 0){
            this.mainplayer.movey(70)
         } else if (this.mainplayer.playereffect == 1){
            this.mainplayer.movey(100)
         }
         }
         if (this.cursor.left.isDown){
            if (this.mainplayer.playereffect == 0){
            this.mainplayer.movex(-70)
         } else if (this.mainplayer.playereffect == 1){
            this.mainplayer.movex(-100)
         }
         } else if (this.cursor.right.isDown){
            if (this.mainplayer.playereffect == 0){
            this.mainplayer.movex(70)
         } else if (this.mainplayer.playereffect == 1){
            this.mainplayer.movex(100)
         }
         }
      } else {
         this.moved = false;
         this.mainplayer.stop();
      }
      if (Phaser.Input.Keyboard.JustDown(this.cursor.space) && this.mainplayer.status == 0 && time > this.lastattacked){
         this.mainplayer.status = 1
         this.lastattacked = time+1000;
         this.time.addEvent({
     delay: 500,
     callback: this.back_tonorm,
     callbackScope: this,
     loop: false,
    });
      if (this.mainplayer.status == 1){
      this.mainplayer.play("player attack");
      }
      }
   this.enemy.children.iterate((child) => {child.followplayer(this.mainplayer.x,this.mainplayer.y);
if (child.moved){
      if (child.rotatevar == child.rotate_start){
         child.rotate_mult=1;
      child.rotation = 0.3;
   } else if (child.rotatevar == 30) {
      child.rotate_mult= -1;
      child.rotation = -0.3;
   }
      child.rotatevar += child.rotate_mult;
      child.moved = false;
      if (child.inv_frame > time){
      child.play("enemy damaged")
      child.x += child.dmgx;
      child.y += child.dmgy;
      } else {
         child.play("enemy idle")
      }
      }})
      }
   acthop(){
      if (this.moved){
      if (this.rotatevar == 1){
      this.mainplayer.rotation = 0.3;
   } else {
      this.mainplayer.rotation = -0.3;
   }
      this.rotatevar = this.rotatevar * -1;
      }
   }
   hop(){
      if (this.mainplayer.status == 0){
         this.mainplayer.play("player idle");
         this.acthop();
      }
   }
   touchPotion(player,potion){
      this.effect = Phaser.Math.Between(0,3);
      if (this.effect == 1){
         player.hp += 5;
      } else if (this.effect == 2){
         player.playereffect = 1;
         player.effect_cooldown = this.recordedtime + 10000;
      }
      potion.destroy()
   }
   touchEnemy(player,enemy){
      if (player.status == 1 && this.recordedtime > enemy.inv_frame){
         enemy.inv_frame = this.recordedtime + 500;
         enemy.hp -= 1;
         this.sound.play("damage")
         if (enemy.hp <= 0){
             enemy.die();
             this.score = this.score + 1;
             this.scoretext.text = 'Score: '+this.score;
         }
       } else if (Phaser.Math.Between(1,20) == 15 && player.status == 0 && this.recordedtime > player.inv_frame) {
         player.inv_frame = this.recordedtime + 1000;
         player.hp -= 1;
         this.sound.play("damage");
         this.dmglist = [-70,70]
         player.x += this.dmglist[Phaser.Math.Between(0,1)];
         player.y += this.dmglist[Phaser.Math.Between(0,1)];
         if (player.hp <= 0){
            this.sound.stopAll();
            setTimeout(this.scene.start("mainscene"),10000);
         }
      }
   }
   back_tonorm(){
      this.mainplayer.status = 0;
   }
   }