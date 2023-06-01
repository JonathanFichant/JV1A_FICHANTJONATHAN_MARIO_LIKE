class Ennemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ennemy');
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics to body
        this.body.setCollideWorldBounds(true);
        this.setPipeline('Light2D');
        this.init();
        this.initEvents();
    }


    init() {
        // ici des variables notées this.mob.var ailleurs dans les autres fichiers
        
        
        
    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

    }

    //autre fonctions

}
export default Ennemy;