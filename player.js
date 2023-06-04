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
        this.frictionSol = 200;
        this.frictionAir = 20;
        this.hauteurSaut = -1750; //-1000 
        this.hauteurSautFinal = this.hauteurSaut;
        this.speedMax = 800;
        this.acceleration = 30;
        this.jumpTimer = 5;
        this.coyoteTime = 10;
        this.coyoteTimer = 0;
        this.speedPlayer = 0
        this.falling = false;
        this.anim = '';

        // INPUT ?



        // Animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('narutoRun', { start: 0, end: 18 }),
            frameRate: 40,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 28 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'fall',
            frames: this.anims.generateFrameNumbers('fall', { start: 0, end: 22 }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 13 }),
            frameRate: 20,
            repeat: -1
        });




    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {

        if (this.body.velocity.y >= 1200) {
            this.falling = true;
        }

        //anim
        if (this.body.velocity.y > 0) {
            this.anim = 'fall';
        }
        else if (this.body.velocity.y < 0) {
            this.anim = 'jump';
        }
        else if (this.body.velocity.y == 0 && this.body.velocity.x != 0) {
            this.anim = 'run';
        }
        else {
            this.anim = 'idle';
        }


        if (this.body.velocity.x > 0) {
            this.directionPlayer = 'right';
        }
        else if (this.body.velocity.x < 0) {
            this.directionPlayer = 'left';
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

        if (this.body.velocity.y > 1200) { // vitesse de chute capée
            this.setVelocityY(1200);
        }

        if (this.apparition == true) { // effet apparition, marche pas dans la classe ?
            this.alpha += 0.05;
            if (this.alpha >= 1) {
                this.apparition = false;
            }
        }

        // switch case animation
        switch (this.anim) {
            case 'run':
                if (this.directionPlayer == 'right') {
                    this.anims.play('run', true).setFlipX(false);
                    this.setOffset(210, 0);
                }
                if (this.directionPlayer == 'left') {
                    this.anims.play('run', true).setFlipX(true);
                    this.setOffset(180, 0);
                }
                break;

            case 'jump':
                if (this.directionPlayer == 'right') {
                    this.anims.play('jump', true).setFlipX(false);
                    this.setOffset(180, 0);
                }
                if (this.directionPlayer == 'left') {
                    this.anims.play('jump', true).setFlipX(true);
                    this.setOffset(128, 0);
                }
                break;

            case 'fall':
                if (this.directionPlayer == 'right') {
                    this.anims.play('fall', true).setFlipX(false);//.setAngle(Phaser.Math.RadToDeg(Math.atan2(this.body.velocity.y, this.body.velocity.x))-45);
                    this.setOffset(110, 0);
                }
                if (this.directionPlayer == 'left') {
                    this.anims.play('fall', true).setFlipX(true);
                    this.setOffset(68, 0);
                }
                break;

            case 'idle':

                if (this.directionPlayer == 'right') {
                    this.anims.play('idle', true).setFlipX(false);
                    this.setOffset(100, 0);
                }
                if (this.directionPlayer == 'left') {
                    this.anims.play('idle', true).setFlipX(true);
                    this.setOffset(45, 0);
                }
                break;

            case '':
                break;

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

    /*facing() {
        if (this.directionPlayer == 'right') {
            this.anims.play('idle', true).setFlipX(false);
        }
        if (this.directionPlayer == 'left') {
            this.anims.play('idle', true).setFlipX(true);
        }
    }*/

    right() { // déplacement à droite
        // if (Math.abs(this.speedPlayer) < this.speedMax) {
        //     this.speedPlayer += this.acceleration;

        // }
        // else {
        //     this.speedPlayer = this.speedMax;
        // }
        if (this.speedPlayer < this.speedMax) {
            this.speedPlayer = this.speedMax;
        }
    }

    left() { // déplacement à gauche

        // if (Math.abs(this.speedPlayer) < this.speedMax) {
        //     this.speedPlayer -= this.acceleration;
        // }
        // else {
        //     this.speedPlayer = -this.speedMax;
        // }
        if (this.speedPlayer > -this.speedMax) {
            this.speedPlayer = -this.speedMax;
        }
    }

    frictionAuSol() { // friction au sol
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

    frictionAirs() { // friction dans les airs
        if (Math.abs(this.speedPlayer) <= this.frictionAir) {
            this.speedPlayer = 0
        }
        else if (this.speedPlayer > 0) {
            this.speedPlayer -= this.frictionAir;
        }
        else if (this.speedPlayer < 0) {
            this.speedPlayer += this.frictionAir;
        }
    }



}
export default Player;
