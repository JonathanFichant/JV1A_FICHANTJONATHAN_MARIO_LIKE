

import PreloadScene from './preload.js';
import niveau1 from './niveau1.js';
import niveau2 from './niveau2.js';
/*import menuScene from './menuScene.js';
import sceneFin from './sceneFin.js';*/




var config = { // initialisation de phaser
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT, //La fenetre s'adapte avec le même ratio
        width: 1920,
        height: 1080,
    },
    physics: {
        default: 'arcade',

        arcade: {
            gravity: { y: 850*4 },
            debug: false,
            tileBias : 128 //taille des tuiles
        }
    },
    pixelArt: true,
    input: { gamepad: true },
    scene: [PreloadScene, niveau1, niveau2/*, menuScene, sceneFin*/]
};

new Phaser.Game(config);
//var game = new Phaser.Game(config);
//game.scene.start("niveau0"); // Le jeu commence à cette scène