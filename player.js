class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'ninja');
        scene.add.existing(this); //Add object to scene
        scene.physics.add.existing(this); //Gives physics to body
        this.body.setCollideWorldBounds(true);
        this.setPipeline('Light2D');
        this.init();
        this.initEvents();
    }


    init() {
        // ici des variables notées this.player.var ailleurs dans les autres fichiers
        this.speedPlayer = 0;
        this.jumpActif = false;
        this.tpReady = false;
        this.apparition = false;
        this.invulnerable = false;
        this.directionPlayer = 'right';
        this.frictionSol = 120;
        this.hauteurSaut = -800;
        this.hauteurSautFinal = this.hauteurSaut;
        this.speedMax = 600;
        this.acceleration = 30;
        this.jumpTimer = 5;
        this.coyoteTime = 10;
        this.coyoteTimer = 0;
        this.speedPlayer = 0
        this.falling = false;

        // INPUT ?



        // Animations
        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('idle', { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('idle', { start: 1, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('animGauche', { start: 0, end: 7 }),
            frameRate: 13,
            repeat: -1
        });
        /*this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('animDroite', { start: 0, end: 7 }),
            frameRate: 13,
            repeat: -1
        });*/
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('narutoRun', { start: 0, end: 18 }),
            frameRate: 20,
            repeat: -1
        });
       

        

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

        if (this.body.velocity.y >=  400){
            this.falling = true;
        }




        this.setVelocityX(this.speedPlayer);
        if (this.body.blocked.right || this.body.blocked.left) { // STOP la vitesse du joueur d'un coup
            this.speedPlayer = 0;
        }

        // Coyote time

        if (this.body.blocked.down) {
            this.jumpActif = false;
            this.coyoteTimer = this.coyoteTime; // on enclenche le chrono en continu tant que le joueur touche la plateforme
        }
        else {
            this.coyoteTimer -= 1;
        }


        if (this.jumpActif == true) { // jump hang time
            if (Math.abs(this.body.velocity.y) < 400) {
                this.body.setGravityY(-200);
            }
            else {
                this.body.setGravityY(0);
            }
        }

        if (this.body.velocity.y > 800) { // vitesse de chute capée
            this.setVelocityY(800);
        }

        if (this.apparition == true) { // effet apparition, marche pas dans la classe ?
            this.alpha += 0.05;
            if (this.alpha >= 1) {
                this.apparition = false;
            }
        }
    }

    // fonctions propre à l'objet player

    jump() { // saut analogique
        this.hauteurSautFinal = this.hauteurSaut;
        this.jumpActif = true;
        this.jumpTimer = 20;
        this.setVelocityY(this.hauteurSaut)
        this.coyoteTimer = 0;
    }

    facing() {
        if (this.directionPlayer == 'right') {
            this.anims.play('idleRight', true);
        }
        if (this.directionPlayer == 'left') {
            this.anims.play('idleLeft', true);
        }
    }

    left() { // déplacement à gauche
        this.anims.play('right', true).setFlipX(true);
        this.directionPlayer = 'left';
        if (Math.abs(this.speedPlayer) < this.speedMax) {
            this.speedPlayer -= this.acceleration;
        }
        else {
            this.speedPlayer = -this.speedMax;
        }
    }

    right() { // déplacement à droite
        if (Math.abs(this.speedPlayer) < this.speedMax) {
            this.speedPlayer += this.acceleration;
        }
        else {
            this.speedPlayer = this.speedMax;
        }
        this.anims.play('right', true).setFlipX(false);
        this.directionPlayer = 'right';
    }

    friction() { // friction au sol
        if (Math.abs(this.speedPlayer) <= this.frictionSol) {
            this.speedPlayer = 0
        }
        else if (this.speedPlayer > 0) {
            this.speedPlayer -= this.frictionSol;
        }
        else if (this.speedPlayer < 0) {
            this.speedPlayer += this.frictionSol;
        }
    }



}
export default Player;