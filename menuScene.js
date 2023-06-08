// export class menuScene extends Phaser.Scene {

class menuScene extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    init(data) {
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.entrance = data.entrance;
    }

    preload() {   
        this.load.image("ecranTitre", "assets/ecranTitre.png");
    }

    create() {
        
        this.cameras.main.fadeIn(1300,0,0,0);
        this.keyboard = this.input.keyboard.createCursorKeys();
        this.background = this.add.image(0, 0, 'ecranTitre');
        this.background.setOrigin(0,0);
        this.cameras.main.setZoom(1);
    };

    update() {

        // if (this.keyboard.space.isDown) {
        //     this.cameras.main.fadeOut(400, 0, 0, 0);
        //     this.time.delayedCall(400, () => {
        //         this.scene.start('niveau1', {entrance :'menuScene'});
        //     })
        // }
    }
};

export default menuScene