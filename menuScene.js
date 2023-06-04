export class menuScene extends Phaser.Scene {

    constructor() {
        super("menuScene");
        this.controller = false;
        this.keyboard;
    }

    init(data) {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.entrance = data.entrance;
    }

    preload() {
        this.load.image('caisse', 'assets/caisse.png')
        this.load.image('blocCible', 'assets/blocCible.png');
        this.load.image('poids', 'assets/poids.png');
        this.load.image('ombreJoueur', 'assets/ombreJoueur.png')
        this.load.spritesheet('lifeBarre', 'assets/lifeBarre.png',
            { frameWidth: 32 * 7, frameHeight: 64 });
        this.load.spritesheet('animStun', 'assets/animStun.png',
            { frameWidth: 32, frameHeight: 32 });
        this.load.image('ecranTitre', 'assets/ecranTitreZelda.png');
        this.load.image('ecranFin','assets/ecranFinZelda.png');
        
 
    }

    create() {
        
        this.cameras.main.fadeIn(1300,0,0,0);
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.controller = false;
        this.input.gamepad.once('connected', function (pad) {
            this.controller = pad;
        })

        this.background = this.add.image(1920, 1080, 'ecranTitre');
        this.background.setOrigin(1,1);
        this.cameras.main.setZoom(1);
    };

    update() {

        if (this.keyboard.space.isDown) {
            this.cameras.main.fadeOut(400, 0, 0, 0);
            this.time.delayedCall(400, () => {
                this.scene.start('niveau1', {entrance :'menuScene'});
            })
        }
    }
};
