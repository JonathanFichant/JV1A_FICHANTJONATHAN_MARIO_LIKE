class Preload extends Phaser.Scene {

    constructor() {
        super("PreloadScene");
    }

    preload() {
        // Backgrounds     

        //this.load.image('background', 'assets/backgroundJapon.jpg');



        // Personnage

        this.load.spritesheet('idle', 'assets/ninja_idle.png',
            { frameWidth: 18, frameHeight: 32 }
        );
        this.load.spritesheet('animDroite', 'assets/ninja_marche_droite.png',
            { frameWidth: 20, frameHeight: 32 }
        );
        this.load.spritesheet('animGauche', 'assets/ninja_marche_gauche.png',
            { frameWidth: 20, frameHeight: 32 }
        );
        this.load.spritesheet('animBas', 'assets/ninja_marche_bas.png',
            { frameWidth: 18, frameHeight: 32 }
        );
        this.load.spritesheet('animHaut', 'assets/ninja_marche_haut.png',
            { frameWidth: 20, frameHeight: 32 }
        );
        this.load.spritesheet('marcheSamurai', 'assets/samurai1_marche.png',
            { frameWidth: 20, frameHeight: 32 }
        );
        this.load.spritesheet('animTP', 'assets/animTP.png',
            { frameWidth: 350, frameHeight: 155 }
        );
        this.load.spritesheet('animApparition', 'assets/animApparition.png',
            { frameWidth: 85, frameHeight: 88 }
        );
        this.load.image("testPerso", 'assets/testPerso.png');
        this.load.spritesheet('narutoRun', 'assets/narutoRunSpritesheet.png',
            { frameWidth : 1922, frameHeight : 1082});


        this.load.spritesheet('animFlamme', 'assets/spriteSheetFlamme.png',
            { frameWidth: 106, frameHeight: 256 }
        );
        // Autres éléments
        this.load.image("marqueTP", 'assets/marqueTP.png');
        this.load.image("plateformeTest", "assets/plateformeTest.png");
        this.load.image("murTest", "assets/murTest.png");
        this.load.image("plateformeMove", "assets/plateformeMove.png");
        this.load.image("kunaiTP", "assets/kunaiTP.png");
        this.load.image("arrow", "assets/arrow.png");
        this.load.image("eye", "assets/eye.png");
        this.load.image("plateformeBrancheInvisible", "assets/plateformeBrancheInvisible.png");

        // UI
        this.load.spritesheet('visibility', 'assets/spritesheetVisibility.png',
            { frameWidth: 497, frameHeight: 497 }
        );
        this.load.image("silhouette", 'assets/silhouette.png');


        //Maps
        /* this.load.image('tileset1', 'tiled/tilesetZelda.png'); //import du tileset
         this.load.tilemapTiledJSON('niveau1', 'tiled/level1_zelda.json'); // import fichier tiled*/

        this.load.image('tileset1', 'tiled/tilesetMario.png');
        this.load.tilemapTiledJSON('lvl1', 'tiled/lvl1_Mario.json');



        //Audio

        //this.load.audio("", "assets/sounds/.mp3")
    }

    create() {

        this.scene.start("niveau1", { // Le jeu commence à ce niveau (après être passé par les fichiers preload et main) // Nom de la scène
            mapName: "lvl1", // nom du load.tilemapTiledJSON
            mapTileset: "tilesetMario", //nom du tileset dans Tiled
            mapTilesetImage: 'tileset1', // nom déclaré dans le load.image
        });
    }
}
export default Preload