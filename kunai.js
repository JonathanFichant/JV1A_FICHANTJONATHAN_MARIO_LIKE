class Kunai extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'kunaiTP');
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics to body
        this.body.setCollideWorldBounds(true);
        //this.setPipeline('Light2D'); toujours voir le kunai
        this.init();
        this.initEvents();
    }

    // tout ce qui concerne le kunai mais pas le joueur

    init() {
        // ici des variables notées this.kunaiTP.var ailleurs dans les autres fichiers


        this.keyF = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.isMouseClicked = false;
        this.showTrajectory = false;
        this.trajectoire = this.scene.add.graphics();
        this.Throw = false;
        this.onWood = false;
        this.KunaiAngleFinal = 0;
        this.kunaiPlant = "air";
        this.timeCD = 1; //seconde(s)
        this.cooldown = false; // utilisable
        this.disableBody(true, true);
        this.kunaiCD = 270;
        this.alphaCD = 1;
        this.showCD = this.scene.add.graphics();
        this.showCD.fillStyle(0xffffff, this.alphaCD);
        this.showCD.fillPath();

        // const particles = this.add.particles('particule');
        // this.emitter = particles.createEmitter({
        //     x: this.x,
        //     y: this.y,
        //     speed: { min: 0, max: 10 },
        //     angle: { min: 0, max: 360 },
        //     scale: { start: 1, end: 0 },
        //     lifespan: 300,
        //     blendMode: 'ADD'
        // });

    }


    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {


        this.scene.input.on('pointerdown', function (pointer) {
            if (pointer.leftButtonDown()) {
                this.isMouseClicked = true; // permet de check le clic gauche
            }
        }, this);

        if (Phaser.Input.Keyboard.JustDown(this.keyF)) {
            if (this.showTrajectory == true) {
                this.showTrajectory = false;
                this.trajectoire.clear();
            }
            else {
                this.showTrajectory = true;
            }
        }

        if (this.Throw == true) { // orientation du kunai selon sa vitesse, se plante ou non
            this.angle = Phaser.Math.RadToDeg(Math.atan2(this.body.velocity.y, this.body.velocity.x));
            if (!this.body.blocked.down && !this.body.blocked.up && !this.body.blocked.right && !this.body.blocked.left &&
                this.body.velocity.x != 0 && this.body.velocity.y != 0) {
                this.kunaiAngleFinal = this.angle;
            }


            if (this.onWood == true) { // se plante 
                if (this.body.blocked.down) {
                    this.kunaiPlant = "down"
                }
                else if (this.body.blocked.up) {
                    this.kunaiPlant = "up";
                }
                else if (this.body.blocked.right) {
                    this.kunaiPlant = "right";
                }
                else if (this.body.blocked.left) {
                    this.kunaiPlant = "left";
                }
                else { // à enlever plus tard
                    this.kunaiPlant = "air"
                }

                if (this.body.blocked.down || this.body.blocked.up || this.body.blocked.right || this.body.blocked.left) {
                    this.angle = this.kunaiAngleFinal;
                    this.setVelocityX(0);
                    this.disableBody(false, false);
                }
            }

            else { // ne se plante pas // mettre une collision qui appelle une fonction pour vérifier le type de texture si je veux utiliser le bounce

                this.setBounce(0.5, 0.4);
                if (Math.abs(this.body.velocity.x) < 25 && this.body.blocked.down) { // fin de course au sol du kunai, body.blocked sinon kunai reste figé quand on vise à la verticale
                    this.setVelocityX(0);
                    this.angle = this.kunaiAngleFinal;
                    this.disableBody(false, false);
                }
                if (this.body.blocked.down) {
                    if (this.body.velocity.x > 0) {
                        this.setVelocityX(this.body.velocity.x - 30)
                    }
                    else if (this.body.velocity.x < 0) {
                        this.setVelocityX(this.body.velocity.x + 30)
                    }
                }
            }

        }



    }

    //autre fonctions
    time() {
        this.cooldown = true;
        this.scene.time.delayedCall(this.timeCD * 1000, () => {
            this.cooldown = false
        });
    }





}
export default Kunai;