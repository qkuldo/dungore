import Phaser from 'phaser'

import mainscene from "./scenes/mainscene.js";
const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 600,
	height: 600,
	scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 },
		},
	},
	scene: [mainscene],
}

export default new Phaser.Game(config)
