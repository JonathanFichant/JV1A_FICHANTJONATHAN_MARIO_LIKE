import Player from "./player.js";
import Kunai from "./kunai.js";
//import Ennemy from "./ennemy.js";

class niveau2 extends Phaser.Scene {
    constructor() {
        super("niveau2");
    }

    init(data) {
        this.entrance = data.entrance;
        if (this.entrance == "niveau1") {
            this.cameras.main.fadeIn(2000, 255, 255, 255);
        }

    }

    preload() { };

    create() { // Création des éléments dès l'initialisation du jeu
        this.cameras.main.fadeIn(2000, 255, 255, 255);
        this.varTest = 0;
        this.varTest2 = 0;
        this.checkFin = false;

        this.jumpSound = this.sound.add('jumpSound');
        this.jumpSound.setVolume(0.01);
        this.runSound = this.sound.add("runSound", { loop: true });
        this.runSound.setVolume(0.03);


        this.map1 = this.add.tilemap('lvl2');
        this.tileset = this.map1.addTilesetImage('tilesetMario', 'tileset1');
        // Import de tous les calques


        this.calque_background4 = this.map1.createLayer('Background 4', this.tileset);

        this.luneJaune2 = this.add.sprite(400, 512, 'luneJaune2'); // a régler à la main si on change le spawn
        this.luneJaune2.setOrigin(0.5, 0.5).setScale(0.17);
        this.luneJaune2.setScrollFactor(0.03, 0.08);



        this.calque_background35 = this.map1.createLayer('Background 3.5', this.tileset);
        //this.calque_arbresParallax = this.map1.createLayer('Arbres parralax', this.tileset);
        this.calque_background3 = this.map1.createLayer('Background 3', this.tileset);
        this.calque_background2 = this.map1.createLayer('Background 2', this.tileset);
        this.calque_background1 = this.map1.createLayer('Background 1', this.tileset);
        this.calque_blocMob = this.map1.createLayer('blocMob', this.tileset);
        this.calque_blocMob.visible = false;
        this.calque_blocMob.setCollisionByProperty({ isSolid: true });
        this.calque_murs = this.map1.createLayer('Solide / Pierre', this.tileset);
        this.calque_murs.setCollisionByProperty({ isSolid: true });
        this.calque_bois = this.map1.createLayer('Solide / Bois', this.tileset);
        this.calque_bois.setCollisionByProperty({ Wooden: true });
        this.calque_branches = this.map1.createLayer('Branches', this.tileset);
        this.calque_herbe = this.map1.createLayer('Herbe', this.tileset);

        this.calque_plateforme = this.map1.getObjectLayer('Plateformes Branches');
        this.plateformes = this.physics.add.staticGroup();
        this.calque_plateforme.objects.forEach(eachPlateformes => {
            this.plateforme = this.plateformes.create(eachPlateformes.x + 64, eachPlateformes.y - 118, 'plateformeBrancheInvisible');
            this.plateforme.body.checkCollision.down = false;
            this.plateforme.body.checkCollision.right = false;
            this.plateforme.body.checkCollision.left = false;
            this.plateforme.setPipeline('Light2D');
        });

        this.anims.create({
            key: 'animFlammes',
            frames: this.anims.generateFrameNumbers('animFlamme', { start: 0, end: 6 }),
            repeat: -1,
            frameRate: 10,
        });

        this.anims.create({
            key: 'kunaiPick',
            frames: this.anims.generateFrameNumbers('kunaiPickUp', { start: 0, end: 11 }),
            repeat: -1,
            frameRate: 10,
        });



        // LIGHTS

        this.variationIntensity = 7;
        this.lightVar = 'down';
        this.lightRayon = 512;


        this.lightPlayer = this.lights.addLight(0, 0, this.lightRayon).setIntensity(0).setColor(0xfe1b00); // pour activer le système de lumière partout

        this.lights.enable().setAmbientColor(0x444444); // quand c'est pas éclairé


        this.calque_light = this.map1.getObjectLayer('Light');
        this.flammes = this.physics.add.staticGroup();
        this.calque_light.objects.forEach(eachflammes => {
            this.flamme = this.flammes.create(eachflammes.x + 64, eachflammes.y - 70, 'animFlammes');
            this.flamme.anims.play('animFlammes', true, Math.floor(Math.random() * 6));
            this.lumiere = this.lights.addLight(this.flamme.x, this.flamme.y, this.lightRayon + 256).setIntensity(this.variationIntensity).setColor(0xfe1b00);
        });


        this.calque_murs.setPipeline('Light2D');
        this.calque_bois.setPipeline('Light2D');
        this.calque_background1.setPipeline('Light2D');
        this.calque_background2.setPipeline('Light2D');
        this.calque_background3.setPipeline('Light2D');
        this.calque_background4.setPipeline('Light2D');
        this.calque_herbe.setPipeline('Light2D');
        this.calque_branches.setPipeline('Light2D');


        this.hitboxsLightExt = this.physics.add.group(); //staticGroup faisait ralentir le perso et sauter dans les airs
        this.calque_light.objects.forEach(eachHitBox => {
            this.hitboxLightExt = this.hitboxsLightExt.create(eachHitBox.x - 436, eachHitBox.y - 504, "");
            this.hitboxLightExt.setCircle(this.lightRayon);
            this.hitboxLightExt.visible = false;
            this.hitboxLightExt.body.allowGravity = false;
        });

        this.hitboxsLightInt = this.physics.add.group();
        this.calque_light.objects.forEach(eachHitBox => {
            this.hitboxLightInt = this.hitboxsLightInt.create(eachHitBox.x - 171, eachHitBox.y - 244, "");
            this.hitboxLightInt.setCircle(this.lightRayon / 2);
            this.hitboxLightInt.visible = false;
            this.hitboxLightInt.body.allowGravity = false;
        });
        this.calque_torche = this.map1.createLayer('Support torche', this.tileset);
        this.calque_torche.setPipeline('Light2D');


        this.kunaiPickUp = this.physics.add.sprite(128 * 262 + 64, 10.3 * 128, 'kunaiPick').setScale(1.5);
        this.kunaiPickUp.anims.play('kunaiPick', true);
        this.kunaiPickUp.body.allowGravity = false;
        this.pickUp = false;

        //INPUT

        this.cursors = this.input.keyboard.createCursorKeys(); // variable pour input
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        // FX du joueur
        const particlesShadowRun = this.add.particles('shadowRun').setDepth(0);
        this.emitterShadowRun = particlesShadowRun.createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0.5 },
            alpha: { start: 0.7, end: 0 },
            frequency: 300,
            lifespan: 1200,
            blendMode: 'NORMAL', //SCREEN
        });
        const particlesShadowRunLeft = this.add.particles('shadowRunLeft').setDepth(0);
        this.emitterShadowRunLeft = particlesShadowRunLeft.createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0.5 },
            alpha: { start: 0.7, end: 0 },
            frequency: 300,
            lifespan: 1200,
            blendMode: 'NORMAL', //SCREEN

        });
        const particlesShadowJump = this.add.particles('shadowJump').setDepth(0);
        this.emitterShadowJump = particlesShadowJump.createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0.5 },
            alpha: { start: 0.7, end: 0 },
            frequency: 180,
            lifespan: 1200,
            blendMode: 'NORMAL', //SCREEN

        });
        const particlesShadowJumpLeft = this.add.particles('shadowJumpLeft').setDepth(0);
        this.emitterShadowJumpLeft = particlesShadowJumpLeft.createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0.5 },
            alpha: { start: 0.7, end: 0 },
            frequency: 180,
            lifespan: 1200,
            blendMode: 'NORMAL', //SCREEN

        });
        const particlesShadowFall = this.add.particles('shadowFall').setDepth(0);
        this.emitterShadowFall = particlesShadowFall.createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0.5 },
            alpha: { start: 0.7, end: 0 },
            frequency: 180,
            lifespan: 1200,
            blendMode: 'NORMAL', //SCREEN

        });
        const particlesShadowFallLeft = this.add.particles('shadowFallLeft').setDepth(0);
        this.emitterShadowFallLeft = particlesShadowFallLeft.createEmitter({
            x: 0,
            y: 0,
            speed: { min: 0, max: 20 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 0.5 },
            alpha: { start: 0.7, end: 0 },
            frequency: 180,
            lifespan: 1200,
            blendMode: 'NORMAL', //SCREEN

        });
        this.emitterFall = false;
        this.emitterJump = false;
        this.emitterRun = false;
        this.emitterFallLeft = false;
        this.emitterJumpLeft = false;
        this.emitterRunLeft = false;



        // SPAWN joueur 8.5/10.4
        this.player = new Player(this, 128 * 8.5, 128 * 10.4, 'ninja').setScale(0.5).setOrigin(0.5, 0.5).setSize(100, 510).setOffset(0, 0);
        //this.objetTest = this.add.sprite(this.player.x, this.player.y, 'animApparition').setScale(0.2);
        this.stateVisibility = 'invisible';

        this.physics.add.collider(this.player, this.calque_murs);
        this.physics.add.collider(this.player, this.calque_bois);
        this.physics.add.overlap(this.kunaiPickUp, this.player, this.pickUpKunai, null, this);

        //this.physics.add.collider(this.player, this.plateformeTest, this.collidePlateformeTest, null, this);
        //this.plateformeTest.body.checkCollision.down = false;
        //this.physics.add.collider(this.player, this.murTest);
        this.physics.add.collider(this.player, this.plateformes, this.collidePlateformeTest, null, this);
        //this.physics.add.collider(this.player, this.plateformeMove, collideCallback, null, this);


        this.animApparition = this.add.sprite(0, 0, 'animApparition').setScale(1.2).setOrigin(0.5, 1)

        // hitbox pour faciliter les coins à mettre au niveau des pieds légèrement devant le joueur
        // ou hitbox ronde, apparemment ça marche bien


        this.anims.create({
            key: 'animTP',
            frames: this.anims.generateFrameNumbers('animTP', { start: 0, end: 8 }),
            repeat: 0,
            frameRate: 9,
        });
        this.animTP = this.add.sprite(0, 0, 'animTP').setScale(0.8).setOrigin(0.5, 1)

        this.animLand = this.add.sprite(0, 0, 'animTP').setScale(0.4).setOrigin(0.5, 1);

        this.anims.create({
            key: 'animApparition',
            frames: this.anims.generateFrameNumbers('animApparition', { start: 0, end: 10 }),
            repeat: 0,
            frameRate: 18,
        });

        const particlesDust = this.add.particles('animApparition').setDepth(0);
        this.emitterDust = particlesDust.createEmitter({
            x: this.player.x,
            y: this.player.y,
            speed: { min: 30, max: 90 },
            angle: { min: 0, max: 360 },
            rotation: { min: 0, max: 360 },
            scale: { start: 0.6, end: 0.3 },
            alpha: { start: 0.7, end: 0 },
            frequency: 200,
            lifespan: 700,
            blendMode: 'NORMAL', //SCREEN
            visible: false,
        });


        this.hitboxCheckpoint = this.add.rectangle(119 * 128, 23 * 128, 512, 2048, 0xff0000);
        this.physics.add.existing(this.hitboxCheckpoint);
        this.hitboxCheckpoint.body.setAllowGravity(false);
        this.hitboxCheckpoint.setVisible(false);

        this.hitboxCheckpoint2 = this.add.rectangle(168 * 128, 28 * 128, 512, 2048, 0xff0000);
        this.physics.add.existing(this.hitboxCheckpoint2);
        this.hitboxCheckpoint2.body.setAllowGravity(false);
        this.hitboxCheckpoint2.setVisible(false);

        this.spawnPlayerX = 57 * 128;
        this.spawnPlayerY = 3 * 128;
        this.physics.add.overlap(this.hitboxCheckpoint, this.player, this.refreshCheckpoint, null, this);
        this.physics.add.overlap(this.hitboxCheckpoint2, this.player, this.refreshCheckpoint2, null, this);

        // KUNAI

        this.kunaiTP = new Kunai(this, 0, 0, 'kunaiTP').setOrigin(0.3, 0.5).setScale(0.8).setCircle(13);

        const particles = this.add.particles('particule');
        this.emitter = particles.createEmitter({
            x: this.kunaiTP.x,
            y: this.kunaiTP.y,
            speed: { min: 0, max: 0 }, // dispersion, effet crépitement
            angle: { min: 0, max: 360 },
            scale: { start: 0.05, end: 0 },
            alpha: 0.5,
            lifespan: 600,
            blendMode: 'ADD'
        });
        //this.physics.add.collider(this.plateformeMove, this.kunaiTP);
        this.physics.add.collider(this.calque_murs, this.kunaiTP);
        this.physics.add.collider(this.kunaiTP, this.calque_bois, this.plant, null, this);
        this.physics.add.collider(this.kunaiTP, this.plateformes, this.plant, null, this);



        this.silhouette = this.add.sprite(0, 0, 'silhouette').setScale(0.1132).setOrigin(0.5, 1);




        // Spawn mob
        this.spawn_mob = false;
        this.mobs = this.physics.add.group({ collideWorldBounds: true });
        this.physics.add.collider(this.mobs, this.calque_murs);
        this.physics.add.collider(this.mobs, this.calque_bois);
        this.physics.add.collider(this.mobs, this.calque_blocMob);
        this.physics.add.collider(this.mobs, this.plateformes);

        this.spawn = this.map1.getObjectLayer('Spawn');
        this.spawn.objects.forEach((object) => {
            const mob = this.mobs.create(object.x, object.y, 'mobMarche');
        });
        this.spawn_mobs();

        this.symboleDistrait = this.add.sprite(0, 0, 'symboleDistrait').setScale(0.4);
        this.symboleDistrait.visible = false;
        this.symboleTraque = this.add.sprite(0, 0, 'symboleTraque').setScale(0.4);
        this.symboleTraque.visible = false;

        this.arrows = this.physics.add.group({ collideWorldsBounds: true });
        this.arrows.setOrigin(0.3, 0.5);
        this.physics.add.collider(this.arrows, this.calque_murs);
        this.physics.add.collider(this.arrows, this.calque_bois);
        this.physics.add.collider(this.arrows, this.plateformes);




        // CAMERA

        this.physics.world.setBounds(0, 0, 285 * 128, 58 * 128); // Défini les limites où le joueur peut aller, limites où la physiques s'appliquent ?
        this.cameras.main.setBounds(0, 0, 285 * 128, 58 * 128); // Défini les limites de la caméra (début x, début y, fin x, fin y)
        this.cameras.main.startFollow(this.player, true, 0.04, 0.02); //ancrage de la caméra sur l'objet player
        this.cameras.main.setZoom(0.7);


        // Anim mob
        this.anims.create({
            key: 'mobMarche',
            frames: this.anims.generateFrameNumbers('mobMarche', { start: 0, end: 28 }),
            repeat: -1,
            frameRate: 20,
        });


        this.calque_premierPlan = this.map1.createLayer('Premier plan', this.tileset);//setScrollFactor(0.98, 1);
        this.calque_premierPlan.setPipeline("Light2D")


        // UI
        this.UIvisibility = this.add.sprite(-200, -24, 'visibility'); // a régler à la main si on change le spawn
        this.UIvisibility.setOrigin(0.5, 0.5).setScale(0.7);
        this.UIvisibility.setScrollFactor(0).setDepth(1);

        this.anims.create({
            key: 'visible',
            frames: [{ key: 'visibility', frame: 0 }],
            repeat: 0,
            frameRate: 1,
        });
        this.anims.create({
            key: 'semivisible',
            frames: [{ key: 'visibility', frame: 1 }],
            repeat: 0,
            frameRate: 1,
        });
        this.anims.create({
            key: 'invisible',
            frames: [{ key: 'visibility', frame: 2 }],
            repeat: 0,
            frameRate: 1,
        });

        this.cdKunai = this.add.sprite(-250, 1150, 'cdKunai');
        this.cdKunai.setOrigin(0.5, 0.5).setScale(0.4).setScrollFactor(0).setDepth(1);




    }

    // attribuer la fonction sur un groupe et non un élément pour les hitbox des lumières

    update() {

        //FX

        if (this.player.directionPlayer == 'right') {
            this.emitterRunLeft = false;
            this.emitterFallLeft = false;
            this.emitterJumpLeft = false;
            if (this.player.anim == 'run') {
                if (this.emitterRun == false) {
                    this.emitterRun = true
                    this.emitterFall = false;
                    this.emitterJump = false;
                    this.runSound.play();
                    this.emitterShadowRun.start();
                    this.emitterDust.start();
                    this.emitterShadowRunLeft.stop();
                    this.emitterShadowJump.stop();
                    this.emitterShadowFall.stop();
                }
                this.emitterShadowRun.setPosition(this.player.x, this.player.y);
                this.emitterDust.setPosition(this.player.x, this.player.y + 100);
            }
            else if (this.player.anim == 'jump') {
                if (this.emitterJump == false) {
                    this.emitterJump = true
                    this.emitterShadowJump.start();
                    this.emitterShadowJumpLeft.stop();
                    this.emitterShadowRun.stop();
                    this.emitterShadowFall.stop();
                    this.emitterDust.stop();
                    this.emitterFall = false;
                    this.emitterRun = false;
                    this.runSound.stop();
                    this.emitterShadowJumpLeft.stop();
                    this.emitterShadowRun.stop();
                    this.emitterShadowFall.stop();
                }
                this.emitterShadowJump.setPosition(this.player.x, this.player.y);
            }
            else if (this.player.anim == 'fall') {
                if (this.emitterFall == false) {
                    this.emitterFall = true
                    this.emitterShadowFall.start();
                    this.emitterShadowFallLeft.stop();
                    this.emitterShadowJump.stop();
                    this.emitterShadowRun.stop();
                    this.emitterRun = false;
                    this.emitterJump = false;
                    this.emitterDust.stop();
                    this.runSound.stop();
                    this.emitterShadowFallLeft.stop();
                    this.emitterShadowJump.stop();
                    this.emitterShadowRun.stop();


                }
                this.emitterShadowFall.setPosition(this.player.x, this.player.y);
            }
            else if (this.player.anim == 'idle') {
                this.emitterShadowRunLeft.stop();
                this.emitterShadowJumpLeft.stop();
                this.emitterShadowFallLeft.stop();
                this.emitterShadowRun.stop();
                this.emitterShadowJump.stop();
                this.emitterShadowFall.stop();
                this.emitterRun = false;
                this.emitterJump = false;
                this.emitterFall = false;
                this.emitterDust.stop();
                this.runSound.stop();
            }
        }
        else {
            this.emitterRun = false;
            this.emitterFall = false;
            this.emitterJump = false;
            if (this.player.anim == 'run') {
                if (this.emitterRunLeft == false) {
                    this.emitterRunLeft = true
                    this.emitterShadowRunLeft.start();
                    this.emitterDust.start();
                    this.emitterDust.visible = true;
                    this.emitterShadowRun.stop();
                    this.emitterShadowJumpLeft.stop();
                    this.emitterShadowFallLeft.stop();
                    this.emitterFallLeft = false;
                    this.emitterJumpLeft = false;
                    this.runSound.play();
                }
                this.emitterShadowRunLeft.setPosition(this.player.x, this.player.y);
                this.emitterDust.setPosition(this.player.x, this.player.y + 100);
            }
            else if (this.player.anim == 'jump') {
                if (this.emitterJumpLeft == false) {
                    this.emitterJumpLeft = true
                    this.emitterShadowJumpLeft.start();
                    this.emitterShadowJump.stop();
                    this.emitterShadowRunLeft.stop();
                    this.emitterShadowFallLeft.stop();
                    this.emitterFallLeft = false;
                    this.emitterRunLeft = false;
                    this.emitterDust.stop();
                    this.runSound.stop();
                }
                this.emitterShadowJumpLeft.setPosition(this.player.x, this.player.y);
            }
            else if (this.player.anim == 'fall') {
                if (this.emitterFallLeft == false) {
                    this.emitterFallLeft = true
                    this.emitterShadowFallLeft.start();
                    this.emitterShadowFall.stop();
                    this.emitterShadowJumpLeft.stop();
                    this.emitterShadowRunLeft.stop();
                    this.emitterRunLeft = false;
                    this.emitterJumpLeft = false;
                    this.emitterDust.stop();
                    this.runSound.stop();
                }
                this.emitterShadowFallLeft.setPosition(this.player.x, this.player.y);
            }
            else if (this.player.anim == 'idle') {
                this.emitterShadowRunLeft.stop();
                this.emitterShadowJumpLeft.stop();
                this.emitterShadowFallLeft.stop();
                this.emitterShadowRun.stop();
                this.emitterShadowJump.stop();
                this.emitterShadowFall.stop();
                this.emitterRunLeft = false;
                this.emitterJumpLeft = false;
                this.emitterFallLeft = false;
                this.emitterDust.stop();
                this.runSound.stop();
            }
        }





        // this.calque_light.objects.forEach((eachLumiere, index) => {
        //     // Modifier l'intensité de la lumière
        //     eachLumiere.setIntensity(this.variationIntensity);
        //   });

        if (this.lightVar == 'down') { // variation de luminosité
            this.variationIntensity -= 0.06;
            //this.lumiere.setIntensity(this.variationIntensity)

            //this.lumiere.radius -= 0.2;
            if (this.variationIntensity < 2.8) {
                this.lightVar = 'up'
            }
        }
        if (this.lightVar == 'up') { // variation de luminosité
            this.variationIntensity += 0.06;
            //this.lumiere.setIntensity(this.variationIntensity)
            //this.lumiere.radius += 0.2;
            if (this.variationIntensity > 3.2) {
                this.lightVar = 'down'
            }
        }


        this.lightPlayer.x = this.player.x;
        this.lightPlayer.y = this.player.y;



        if (this.physics.overlap(this.hitboxsLightExt, this.player)) { // lumière et semi obscurité
            if (this.physics.overlap(this.hitboxsLightInt, this.player)) { // lumière vive, cercle intérieur
                this.stateVisibility = 'visible';
                this.UIvisibility.anims.play('visible', true);
                this.kunaiTP.timeCD = 1;
            }
            else {
                this.stateVisibility = 'semivisible';
                this.UIvisibility.anims.play('semivisible', true);
                this.kunaiTP.timeCD = 5;
            }
        }
        else {
            this.stateVisibility = 'invisible';
            this.UIvisibility.anims.play('invisible', true);
            this.kunaiTP.timeCD = 8;
        }


        this.silhouette.alpha -= 0.003;

        if (this.player.dead == true) {
            if (this.player.checkDead == false) {
                this.player.checkDead = true;
                this.cameras.main.fadeOut(1000, 255, 255, 255);
                this.time.delayedCall(1000, () => {
                    this.player.x = this.spawnPlayerX;
                    this.player.y = this.spawnPlayerY;

                    this.cameras.main.fadeIn(1000, 255, 255, 255);
                    this.player.dead = false;
                    this.player.checkDead = false;

                    // reset du kunai
                    this.kunaiTP.isMouseClicked = false;
                    this.kunaiTP.Throw = false;
                    this.kunaiTP.kunaiCD = 630;
                    this.kunaiTP.cooldown = false;
                    this.kunaiTP.majCD();
                    this.player.tpReady = false;
                    this.kunaiTP.disableBody(true, true);
                });
            }

        }

        this.arrows.children.each(function (arrow) {
            if (arrow.spawn == true) {
                arrow.spawn = false;

                // tir en direction du joueur
                let dirX = this.player.x - arrow.x;
                let dirY = this.player.y - 128 - arrow.y;
                let length = Math.sqrt(dirX ** 2 + dirY ** 2);
                dirX /= length;
                dirY /= length;
                arrow.setVelocityX(dirX * 3000);
                arrow.setVelocityY(dirY * 3000); // tir légèrement plus haut que le joueur
            }
            // orientation de la flèche selon sa vitesse
            arrow.angle = Phaser.Math.RadToDeg(Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x));

            if (!arrow.body.blocked.none) { //destruction de la flèche au moindre collider
                arrow.destroy();
            }
        }, this);


        // COMPORTEMENT MOB
        if (this.spawn_mob == true) {
            this.mobs.children.each(function (mob) {

                const eye = mob.getData('eye');
                eye.setPosition(mob.x, mob.y - 160);
                eye.setScale(0.35);
                let circleEye = mob.getData('circleEye');
                circleEye.clear();
                circleEye.fillStyle(0xffffff).fillCircle(mob.x, mob.y - 160, mob.jauge);

                const symboleTraque = mob.getData('symboleTraque');
                symboleTraque.setPosition(mob.x, mob.y - 360);

                const symboleDistrait = mob.getData('symboleDistrait');
                symboleDistrait.setPosition(mob.x, mob.y - 360);

                // champ de vision selon sa direction
                if (mob.body.velocity.x == 0) {
                    mob.anims.stop('', true);
                }
                else if (mob.direction == 'right') {
                    mob.anims.play('mobMarche', true).setFlipX(false);
                    mob.angleVision = 0; // direction du regard
                    mob.borneMin = 0;
                    mob.borneMax = mob.angleFOV;
                    mob.FOV.clear();
                    mob.FOV.fillStyle(0xffffff, 0.1);
                    mob.FOV.slice(mob.x, mob.y - 60, mob.scope, Phaser.Math.DegToRad(360 - mob.angleFOV), Phaser.Math.DegToRad(mob.angleFOV), false);
                    mob.FOV.fillPath();
                }
                else if (mob.direction == 'left') {
                    mob.anims.play('mobMarche', true).setFlipX(true);
                    mob.angleVision = 180;
                    mob.borneMin = mob.angleVision - mob.angleFOV;
                    mob.borneMax = mob.angleVision;
                    mob.FOV.clear();
                    mob.FOV.fillStyle(0xffffff, 0.2);
                    mob.FOV.slice(mob.x, mob.y - 60, mob.scope, Phaser.Math.DegToRad(180 - mob.angleFOV), Phaser.Math.DegToRad(180 + mob.angleFOV), false);
                    mob.FOV.fillPath();
                }

                if (mob.seePlayer) {
                    this.silhouette.x = mob.seenXPlayer;
                    this.silhouette.y = mob.seenYPlayer + 128;
                    this.silhouette.alpha = 1;
                }

                if (mob.jauge <= 0) {
                    mob.jauge = 0;
                }

                switch (mob.state) {
                    case 'traque':
                        symboleDistrait.visible = false;
                        symboleTraque.visible = true;
                        if (mob.ATK == false) {
                            if (mob.x < this.player.x - 20) { // si mob à gauche
                                mob.setVelocityX(mob.speed * 1.7)
                                mob.direction = 'right';
                            }
                            else if (mob.x > this.player.x + 20) {
                                mob.setVelocityX(-mob.speed * 1.7)
                                mob.direction = 'left';
                            }
                        }
                        else {
                            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y - 60) < 128 * 12) {
                                // tir à l'arc                    
                                // si arrow overlap player alors, reset au dernier checkpoint avec fondu au noir
                                // flèches avec vélocité à 400 ? comme la vélocité max du kunai ?
                                // mettre une variable avant de pouvoir relacer une fleche
                                if (mob.shoot == false) {
                                    mob.shoot = true;
                                    this.createArrow(mob.x, mob.y);
                                    this.time.delayedCall(mob.cdATK * 1000, () => {
                                        mob.shoot = false;
                                    });
                                }
                            }
                        }
                        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y - 60) < 128 * 12) { // si mob est assez prêt il attaque
                            mob.ATK = true;
                        }
                        else {
                            mob.ATK = false;
                        }
                        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y) - 60 > 128 * 24) { // si le joueur est à 24 cases du mob, l'ennemi cesse la traque
                            mob.isWatching = false;
                            mob.state = 'watch'
                            break;
                        }
                        break;

                    case 'watch': // regarde autour, A CODER si j'ai le temps
                        symboleDistrait.visible = true;
                        symboleTraque.visible = false;
                        mob.setVelocityX(0);
                        if (mob.isWatching == false) {
                            mob.isWatching = true;
                            this.time.delayedCall(2000, () => { // demi tour après mob.waiting secondes
                                if (mob.jauge < mob.jaugeTraque && mob.state == 'watch') {
                                    mob.state = 'patrouille';
                                }
                                else {
                                    mob.state = 'traque'
                                };

                            });
                        }
                        if (this.checkDistance(mob.x, mob.y - 60, this.player.x, this.player.y) < mob.scope &&
                            (mob.borneMin <= Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y - 60, this.player.x, this.player.y))) &&
                                Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y - 60, this.player.x, this.player.y))) <= mob.borneMax) &&
                            (this.stateVisibility == 'visible' || this.stateVisibility == 'semivisible')) {
                            // joueur en vue
                            mob.seePlayer = true;
                        }
                        else {
                            mob.seePlayer = false;
                        }

                        if (mob.seePlayer) {
                            mob.jauge += 1.7;
                        }
                        else {
                            mob.jauge -= 0.8;
                        }

                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < 128) { // si le joueur est très près
                            mob.jauge += 2.4;
                        }

                        if (mob.jauge >= mob.jaugeTraque) {
                            mob.jauge = mob.jaugeTraque
                            mob.state = 'traque';
                            break;
                        }
                        break;

                    case 'distrait': // déplacement vers la dernière position du joueur vu
                        symboleDistrait.visible = true;
                        symboleTraque.visible = false;
                        if (this.checkDistance(mob.x, mob.y - 60, this.player.x, this.player.y) < mob.scope &&
                            (mob.borneMin <= Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y - 60, this.player.x, this.player.y))) &&
                                Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y - 60, this.player.x, this.player.y))) <= mob.borneMax) &&
                            (this.stateVisibility == 'visible' || this.stateVisibility == 'semivisible')) {
                            // joueur en vue
                            mob.seePlayer = true;
                        }
                        else {
                            mob.seePlayer = false;
                        }

                        if (mob.seePlayer) {
                            mob.seenXPlayer = this.player.x; // le mob garde en mémoire la dernière position visible du joueur
                            mob.seenYPlayer = this.player.y;
                            mob.jauge += 1.7
                        }
                        else if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < 128) {
                            mob.seenXPlayer = this.player.x;
                            mob.seenYPlayer = this.player.y;
                            mob.jauge += 1.7
                        }

                        if (mob.x < mob.seenXPlayer - 20) { // si mob à gauche
                            mob.setVelocityX(mob.speed * 1.2)
                            mob.direction = 'right';
                        }
                        else if (mob.x > mob.seenXPlayer + 20) {
                            mob.setVelocityX(-mob.speed * 1.2)
                            mob.direction = 'left';
                        }
                        else { // si le mob arrive à la dernière position X où il a vu le joueur
                            mob.state = 'watch';
                            break;
                        }
                        if (mob.body.blocked.right || mob.body.blocked.left) {
                            mob.jauge = mob.jaugeDistrait - 1;
                            mob.state = 'patrouille';
                        }


                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < 128) { // si le joueur est très près
                            mob.jauge += 2.4;
                        }

                        if (mob.jauge >= mob.jaugeTraque) {
                            mob.jauge = mob.jaugeTraque;
                            mob.state = 'traque';
                            break;
                        }
                        break;

                    case 'patrouille':
                        symboleDistrait.visible = false;
                        symboleTraque.visible = false;
                        mob.isWatching = false;
                        if (mob.move == true) { // déplacement en mode patrouille
                            if (mob.direction == 'left') {
                                mob.setVelocityX(-mob.speed);
                            }
                            else if (mob.direction == 'right') {
                                mob.setVelocityX(mob.speed);
                            }

                            if ((Math.abs(mob.x - mob.spawnX) > mob.distMaxSpawn || mob.body.blocked.right || mob.body.blocked.left) && !mob.retour) { // si mob s'éloigne trop de son point de spawn, arrêt puis demi tour
                                // vérif si il va vers son spawn ou pas
                                if ((mob.x > mob.spawnX && mob.body.velocity.x > 0) || (mob.x < mob.spawnX && mob.body.velocity.x < 0)) { // si mob est à droite de son spawn
                                    mob.move = false;
                                }

                            }
                        }
                        else { // arrêt entre les allers et retours
                            if (mob.retour == false) {
                                mob.setVelocityX(0);
                                mob.retour = true;
                                this.time.delayedCall(mob.waiting * 1000, () => { // demi tour après mob.waiting secondes
                                    if (mob.direction == 'left') {
                                        mob.direction = 'right'
                                    }
                                    else {
                                        mob.direction = 'left';
                                    }
                                    mob.move = true;

                                    this.time.delayedCall(200, () => { // délai avant de recheck direct la distMax
                                        mob.retour = false;
                                    });

                                });
                            }
                        }


                        // repérage du joueur
                        if (this.checkDistance(mob.x, mob.y - 60, this.player.x, this.player.y) < mob.scope) {  // si le joueur est assez proche du mob pour pouvoir être vu
                            if (mob.borneMin <= Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y - 60, this.player.x, this.player.y))) &&
                                Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y - 60, this.player.x, this.player.y))) <= mob.borneMax) { // en deux fois sinon trop de calcul
                                if (this.stateVisibility == 'visible') {
                                    mob.jauge += 1.9;
                                }
                                else if (this.stateVisibility == 'semivisible') {
                                    mob.jauge += 0.3
                                }
                                else {
                                    if (this.player.body.velocity.x != 0) {
                                        mob.jauge += 0.17;
                                    }
                                    else {
                                        if (mob.jauge > 0) {
                                            mob.jauge -= 0.2; // si player dans champ de vision mais dans l'ombre
                                        }
                                    }
                                }
                            }
                            else {
                                if (mob.jauge > 0) {
                                    mob.jauge -= 0.4; // si player dans le scope mais pas dans le champ de vision
                                }
                            }
                        }
                        else {
                            if (mob.jauge > 0) { // cas général
                                mob.jauge -= 0.8;
                            }
                        }

                        if (this.checkDistance(mob.x, mob.y - 60, this.player.x, this.player.y) < 160) { // si le joueur est très près
                            mob.state = 'traque'
                            mob.jauge = mob.jaugeTraque;

                        }

                        if (mob.jauge >= mob.jaugeDistrait) {
                            mob.state = 'distrait';
                            break;
                        }
                        break;
                }
            }, this)
        }


        // PLAYER ANIMATION ET DEPLACEMENT 2 DIRECTIONS

        // faire un switch case ou if else avec offset
        // if (this.player.directionPlayer == 'right'){
        //     this.cameras.main.followOffset.x = 512;
        // }
        // else {
        //     this.cameras.main.followOffset.x = -512;
        // }

        if (this.player.speedPlayer == 0) { // condition pour idle
            //this.cameras.main.setFollowOffset(0, 256);

        }
        // 2 DIRECTIONS

        if (this.cursors.left.isDown || this.keyQ.isDown) { // GAUCHE
            this.player.left();

        }
        else if (this.cursors.right.isDown || this.keyD.isDown) { // DROITE
            this.player.right();

        }


        // Offset camera en X
        if (this.player.directionPlayer == "right") {
            this.cameras.main.followOffset.x = -384;
        }
        else {
            this.cameras.main.followOffset.x = 384;
        }


        // Offset camera en Y
        if (this.keyS.isDown || this.player.anim == 'fall') {
            this.cameras.main.followOffset.y = -256;
        }
        else {
            if (this.player.anim == 'jump') {
                this.cameras.main.followOffset.y = 406;
            }
            else {
                this.cameras.main.followOffset.y = 128;
            }

        }


        // Frottements

        if (this.cursors.left.isUp && this.cursors.right.isUp && this.keyQ.isUp && this.keyD.isUp && this.player.speedPlayer != 0) {
            if (this.player.body.blocked.down/* || this.player.body.velocity.y == 0*/) { // friction au sol

                this.player.frictionAuSol();
            }
            else {
                this.player.frictionAirs();

            }
        }


        // demi tour au sol



        // SAUT (analogique)

        if ((this.cursors.up.isDown || this.keyZ.isDown || this.cursors.space.isDown) &&
            (this.player.body.blocked.down || this.player.coyoteTimer > 0) &&
            (this.cursors.down.isUp && this.keyS.isUp)) {
            this.player.jump();
        }

        if (this.player.jumpActif == true) { // pour le saut analogique, A CORRIGER
            this.player.jumpTimer -= 1;
            this.player.hauteurSautFinal += 3
            if ((this.cursors.up.isDown || this.keyZ.isDown || this.cursors.space.isDown) && this.player.jumpTimer > 0) {
                this.player.setVelocityY(this.player.hauteurSautFinal)
            }
        }


        if (this.player.falling == true && this.player.body.blocked.down) {
            this.animLand.x = this.player.x;
            this.animLand.y = this.player.y + 128;
            this.animLand.anims.play('animTP', true);
            this.player.falling = false;
        }

        if (this.player.dustJump == true) {
            this.animLand.x = this.player.x;
            this.animLand.y = this.player.y + 128;
            this.animLand.anims.play('animTP', true);
            this.jumpSound.play();
            this.player.dustJump = false;
        }



        // tant que je reste appuyé je garde une velocityY constante, cela s'arrête quand j'arrête d'appuyer ou au max du timer
        // mettre un délai pour différencier saut court et saut long analogique

        // AIR CONTROL

        // friction en l'air

        // demi tour en l'air




        // KUNAI

        if (this.kunaiTP.Throw) {
            this.emitter.setPosition(this.kunaiTP.x, this.kunaiTP.y);
            this.emitter.visible = true;
        }
        else {
            this.emitter.visible = false;
        }

        if (this.kunaiTP.isMouseClicked == true) {
            if (this.kunaiTP.Throw == false && this.kunaiTP.cooldown == false) { // LANCER DU KUNAI
                this.kunaiTP.isMouseClicked = false;
                this.kunaiTP.Throw = true;
                this.kunaiTP.onWood = false;

                if (this.kunaiTP.cooldown == false) {
                    this.kunaiAim();
                }
            }
            else if (this.player.tpReady == true && this.kunaiTP.Throw == true) { // Téléportation sur le kunai
                this.kunaiTP.isMouseClicked = false;
                this.kunaiTP.Throw = false;
                this.kunaiTP.kunaiCD = 270;
                //this.kunaiTP.time();
                this.kunaiTP.cooldown = true;

                // animation disparition
                this.animTP.x = this.player.x;
                this.animTP.y = this.player.y + 128;
                this.animTP.anims.play('animTP', true);
                this.player.visible = false; // joueur invisible mais toujours touchable
                // rajouter une diminution d'alpha très rapide ?
                // Rajouter une ligne pour dire que le joueur ne peut pas être vu

                this.time.delayedCall(150, () => { // délai entre disparation et apparition
                    this.player.visible = true;
                    switch (this.kunaiTP.kunaiPlant) {
                        case "up":
                            this.player.x = this.kunaiTP.x - 2;
                            this.player.y = this.kunaiTP.y + 106;
                            break;
                        case "down":
                            this.player.x = this.kunaiTP.x - 3;
                            this.player.y = this.kunaiTP.y - 126;
                            break;
                        case "left":
                            this.player.x = this.kunaiTP.x + 5;
                            this.player.y = this.kunaiTP.y;
                            break;
                        case "right":
                            this.player.x = this.kunaiTP.x - 10;
                            this.player.y = this.kunaiTP.y;
                            break;
                        case "air":
                            this.player.x = this.kunaiTP.x;
                            this.player.y = this.kunaiTP.y

                    }
                    this.player.speedPlayer = this.kunaiTP.body.velocity.x * 0.7;
                    this.player.setVelocityY(0);
                    if (this.kunaiTP.body.velocity.y < 0) {
                        this.player.setVelocityY(this.kunaiTP.body.velocity.y);
                    }
                    else {
                        this.player.setVelocityY(0);
                    }
                    // vélocité du joueur en fonction du kunai s'il est en l'air

                    // animation apparition
                    this.player.alpha = 0;
                    this.player.apparition = true;
                    this.animApparition.x = this.player.x;
                    this.animApparition.y = this.player.y + 40;
                    this.animApparition.anims.play('animApparition', true);


                    this.player.tpReady = false;

                    this.kunaiTP.disableBody(true, true);

                });
            }
        }

        if (this.kunaiTP.isMouseClicked == true) { // permet de faire un justDown sur le clic, à mettre après le code du tir
            this.kunaiTP.isMouseClicked = false;
        }

        if (this.kunaiTP.cooldown) {

            // fin à 270 + 360 = 630
            this.kunaiTP.kunaiCD += 360 / (this.kunaiTP.timeCD * 60); //360 divisé par le nombre de frame, si 3 sec alors 3*60
            this.kunaiTP.alphaCD = 1
            this.kunaiTP.majCD();


            if (this.kunaiTP.kunaiCD >= 627) {
                this.kunaiTP.cooldown = false
            }
        }


        if (this.kunaiTP.showTrajectory) {
            this.kunaiTP.trajectoire.clear();

            this.vitesse = (Phaser.Math.Distance.Between(this.player.x, this.player.y - 64, this.input.activePointer.worldX, this.input.activePointer.worldY)) * 4;
            if (this.vitesse < 1500) { // speed min
                this.vitesse = 1500
            }
            else if (this.vitesse > 2500) { // speed max
                this.vitesse = 2500
            }
            const gravite = -850 * 4;

            const deltaX = this.input.activePointer.worldX - this.player.x;
            const deltaY = this.input.activePointer.worldY - this.player.y - 64;
            const angle = Math.atan2(deltaY, deltaX);

            for (let t = 0; t <= 2; t += 0.03) {
                const x = this.player.x + this.vitesse * Math.cos(angle) * t;
                const y = this.player.y - 64 + this.vitesse * Math.sin(angle) * t - 0.5 * gravite * t * t;

                // Dessinez un point sur la trajectoire
                if (this.kunaiTP.Throw == false && !this.kunaiTP.cooldown) {
                    this.kunaiTP.trajectoire.fillStyle(0xffffff);
                }
                else {
                    this.kunaiTP.trajectoire.fillStyle(0xff0000);
                }

                this.kunaiTP.trajectoire.fillCircle(x, y, 5)
                //this.trajectoire.fillRect(x, y, 4, 4);
            }

        }

        if (Phaser.Input.Keyboard.JustDown(this.keyT)) {
            console.log(this.player.x, this.player.y);
            console.log(this.kunaiTP.cooldown)
        }

        if (this.player.x > 281 * 128 && !this.checkFin) {
            this.checkFin = true;
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.time.delayedCall(1000, () => {
                this.scene.start('ecranFin');
            })
        }


    }

    // FONCTIONS

    kunaiAim() {
        this.kunaiTP.kunaiPlant = "air";

        // vecteur
        var directionX = this.input.activePointer.worldX - this.player.x;
        var directionY = this.input.activePointer.worldY - (this.player.y - 64);

        // distance
        var length = Math.sqrt(directionX ** 2 + directionY ** 2);

        directionX /= length
        directionY /= length

        // if (Math.abs(directionX) < 0.05) { // si je met pas ça, le kunai reste figé
        //     directionX = 0.05
        // }

        this.kunaiTP.enableBody(true, this.player.x, this.player.y - 64, true, true);
        this.kunaiTP.body.allowGravity = true;
        this.player.tpReady = true;
        this.kunaiTP.setBounce(0)
        this.kunaiTP.x = this.player.x;
        this.kunaiTP.y = this.player.y - 64;
        var speed = (Phaser.Math.Distance.Between(this.player.x, this.player.y - 64, this.input.activePointer.worldX, this.input.activePointer.worldY)) * 4;
        if (speed < 1500) { // speed min
            speed = 1500
        }
        else if (speed > 2500) { // speed max
            speed = 2500
        }

        // Appliquer la vélocité en utilisant la direction et la vitesse
        this.kunaiTP.body.velocity.x = directionX * speed;

        this.kunaiTP.body.velocity.y = directionY * speed;
    }

    plant() {
        this.kunaiTP.onWood = true;
    }


    checkDistance(x1, y1, x2, y2) { // mesure la distance entre deux éléments
        return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
    }

    overlapExt(player, hitboxLightExt) {
        if (this.stateVisibility != 'visible') {
            this.stateVisibility = 'semivisible';
            this.UIvisibility.anims.play('semivisible', true);
        }

    }

    overlapInt(player, hitboxLightInt) {
        this.stateVisibility = 'visible';
        this.UIvisibility.anims.play('visible', true);
    }

    collidePlateformeTest(player, plateforme) {
        if ((this.cursors.down.isDown || this.keyS.isDown) && (this.cursors.up.isDown || this.keyZ.isDown || this.cursors.space.isDown)) {
            plateforme.body.checkCollision.up = false;
            this.time.delayedCall(600, () => {
                plateforme.body.checkCollision.up = true;
            });
        }
    }

    attaqueMob(mob, mobx, moby) {
        mob.cdATK = false;
        if (this.checkDistance(this.player.x, this.player.y, mobx, moby) <= 50) {
            if (!this.player.invulnerable) {
                this.player.invulnerable = true;
                this.stunPlayer = true;
                this.repoussement(mob, this.player);
                this.cameras.main.shake(50, 0.005, false, null); // durée, intensité
                this.time.delayedCall(1500, () => {
                    this.player.invulnerable = false;
                });
                this.time.delayedCall(600, () => {
                    this.stunPlayer = false;
                });
            }

        }
    }

    repoussement(objetQuiTape, cible) {
        cible.setVelocityX((cible.x - objetQuiTape.x) * 8);
        cible.setVelocityY((cible.y - objetQuiTape.y) * 8);
        this.time.delayedCall(200, () => {
            cible.setVelocity(0);
        });
    }

    createArrow(mobX, mobY) {

        this.arrows.create(mobX, mobY, 'arrow');
        this.arrows.children.each(function (arrow) {

            // mettre dans l'update une vérif de spawn pour ne pas impacter les flèches déjà créées
            arrow.setCircle(13).setScale(0.8);
            if (arrow.spawn != false) {
                arrow.spawn = true;
            }

            this.physics.add.collider(this.player, arrow, this.hitPlayer, null, this);

        }, this)
    }

    refreshCheckpoint() {
        this.spawnPlayerX = 113 * 128;
        this.spawnPlayerY = 50 * 128;
    }
    refreshCheckpoint2() {
        this.spawnPlayerX = 199 * 128;
        this.spawnPlayerY = 26 * 128;
    }

    hitPlayer() {
        // animation de mort puis restart au dernier checkpoint
        if (this.player.dead == false) {
            this.player.dead = true;
        }
    }

    pickUpKunai() {
        if (this.pickUp == false) {
            this.pickUp = true;
            this.cameras.main.fadeOut(2000, 255, 255, 255);
            this.time.delayedCall(2000, () => {
                //this.scene.start('niveau2', { })
                this.cameras.main.fadeIn(2000, 255, 255, 255);
            })
        }

    }


    spawn_mobs() {
        this.spawn_mob = true;
        this.mobs.children.each(function (mob) {
            mob.setScale(0.75).setSize(70, 370).setOffset(170, 150);


            const eye = this.add.sprite(mob.x, mob.y - 100, 'eye').setScale(0.35);
            mob.setData('eye', eye);

            mob.jauge = 0;

            let circleEye = this.add.graphics();
            circleEye.fillStyle(0xffffff).fillCircle(mob.x, mob.y - 100, mob.jauge);
            mob.setData('circleEye', circleEye);

            const symboleTraque = this.add.sprite(mob.x, mob.y - 360, 'symboleTraque').setScale(0.4);
            symboleTraque.visible = false;
            mob.setData('symboleTraque', symboleTraque);

            const symboleDistrait = this.add.sprite(mob.x, mob.y - 360, 'symboleDistrait').setScale(0.4);
            symboleDistrait.visible = false;
            mob.setData('symboleDistrait', symboleDistrait);

            mob.state = 'patrouille'
            mob.move = true;
            mob.cdATK = false;
            mob.direction = "left";

            mob.angleVision = 0;
            mob.speed = 200;
            mob.angleFOV = 23;
            mob.scope = 128 * 7; // voit jusqu'à 7 cases devant
            mob.borneMin = 0;
            mob.borneMax = 0;
            mob.modeAggro = false; // à modif plus tard
            mob.spawnX = mob.x // utile pour récup la position de base du mob et faire des rondes autour
            mob.distMaxSpawn = 128 * 5; // le garde ne s'éloigne pas plus loin que x de son spawn
            mob.waiting = 2; // le garde reste immobile x secondes au bout de sa marche
            mob.retour = false;
            mob.setPipeline('Light2D');
            mob.seePlayer = false;
            mob.seenXPlayer;
            mob.seenYPlayer;
            mob.isWatching = false;
            mob.ATK = false;
            mob.shoot = false;
            mob.cdATK = 1; //cooldown en secondes entre 2 attaques
            mob.jaugeTraque = 50;
            mob.jaugeDistrait = 14;

            /*this.segment = new Phaser.Geom.Line(this.player.x, this.player.y, mob.x, mob.y);
            this.segmentMur.strokeLineShape(this.segment);*/

            // Champ de vision des mob
            mob.FOV = this.add.graphics();
            mob.FOV.clear();
            mob.FOV.fillStyle(0xffffff, 0.4);
            mob.FOV.slice(mob.x, mob.y, mob.scope, Phaser.Math.DegToRad(315), Phaser.Math.DegToRad(45), false);
            mob.FOV.fillPath();


        }, this);
    };
}

export default niveau2
