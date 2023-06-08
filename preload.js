class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        // Backgrounds     

        //this.load.image('background', 'assets/backgroundJapon.jpg');



        // Personnage


        this.load.spritesheet('animTP', 'assets/animTP.png',
            { frameWidth: 350, frameHeight: 155 });

        this.load.spritesheet('animApparition', 'assets/animApparition.png',
            { frameWidth: 170, frameHeight: 176 });

        this.load.spritesheet('narutoRun', 'animations_perso/animNarutoRun6px.png',
            { frameWidth: 482, frameHeight: 540 });

        this.load.spritesheet('shadowRun', 'animations_perso/shadowRun.png',
            { frameWidth: 482, frameHeight: 540 });
        this.load.spritesheet('shadowRunLeft', 'animations_perso/shadowRunLeft.png',
            { frameWidth: 482, frameHeight: 540 });

        this.load.spritesheet('idle', 'animations_perso/persoIdle6px.png',
            { frameWidth: 241, frameHeight: 540 });

        this.load.spritesheet('fall', 'animations_perso/animChutePropre6px.png',
            { frameWidth: 279, frameHeight: 550 });

        this.load.spritesheet('shadowFall', 'animations_perso/shadowFall.png',
            { frameWidth: 279, frameHeight: 550 });
        this.load.spritesheet('shadowFallLeft', 'animations_perso/shadowFallLeft.png',
            { frameWidth: 279, frameHeight: 550 });

        this.load.spritesheet('jump', 'animations_perso/peroSaut6px.png',
            { frameWidth: 402, frameHeight: 540 });

        this.load.spritesheet('shadowJump', 'animations_perso/shadowJump.png',
            { frameWidth: 402, frameHeight: 540 });
        this.load.spritesheet('shadowJumpLeft', 'animations_perso/shadowJumpLeft.png',
            { frameWidth: 402, frameHeight: 540 });

        this.load.spritesheet('mobMarche', 'animations_perso/animEnnemiPropre6px.png',
            { frameWidth: 410, frameHeight: 540 });



        // Autres éléments

        this.load.spritesheet('lanterne', 'assets/lanterne.png',
            { frameWidth: 128, frameHeight: 128 }
        );
        this.load.image("luneBleue", "assets/luneBleue.png");
        this.load.image("luneJaune", "assets/luneJaune.png");
        this.load.image("luneJaune2", "assets/luneJaune2.png");

        this.load.spritesheet('animFlamme', 'assets/spriteSheetFlamme.png',
            { frameWidth: 106, frameHeight: 256 }
        );
        this.load.image("kunaiTP", "assets/kunaiTP.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("particule", "assets/particule.png")
        this.load.spritesheet('kunaiPickUp', 'assets/kunaiPickUp.png',
            { frameWidth: 37, frameHeight: 95 }
        );
        this.load.image("plateformeBrancheInvisible", "assets/plateformeBrancheInvisible.png");

        //this.load.image("ecranTitre", "assets/ecranTitre.png");
        this.load.image("ecranFin","assets/ecranFin.png");


        // UI
        this.load.spritesheet('visibility', 'assets/spritesheetVisibility.png',
            { frameWidth: 497, frameHeight: 497 }
        );
        this.load.image("silhouette", 'assets/silhouette.png');
        this.load.image("eye", "assets/eye.png");
        this.load.image("symboleTraque", "assets/exclamationMark.png");
        this.load.image("symboleDistrait", "assets/questionMark.png");
        this.load.image('cdKunai', "assets/cdKunai.png");

        //Maps
        /* this.load.image('tileset1', 'tiled/tilesetZelda.png'); //import du tileset
         this.load.tilemapTiledJSON('niveau1', 'tiled/level1_zelda.json'); // import fichier tiled*/

        this.load.image('tileset1', 'tiled/tilesetMario.png');
        this.load.tilemapTiledJSON('lvl1', 'tiled/lvl1_Mario.json');
        this.load.tilemapTiledJSON('lvl2', 'tiled/lvl2_Mario.json');



        //Audio

        this.load.audio("jumpSound", "sounds/jump.wav");
        this.load.audio("nightSound","sounds/nuitcrickets.mp3");
        this.load.audio("runSound","sounds/run.mp3");
    }

    create() {

        this.scene.start("menuScene", { // Le jeu commence à ce niveau (après être passé par les fichiers preload et main) // Nom de la scène
            // mapName: "lvl1", // nom du load.tilemapTiledJSON
            // mapTileset: "tilesetMario", //nom du tileset dans Tiled
            // mapTilesetImage: 'tileset1', // nom déclaré dans le load.image
        });
    }
}
export default Preload