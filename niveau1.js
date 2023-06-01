import Player from "./player.js";
import Kunai from "./kunai.js";
//import Ennemy from "./ennemy.js";

class niveau1 extends Phaser.Scene {
    constructor() {
        super("niveau1");
    }

    init(data) {
        this.entrance = data.entrance;
        if (this.entrance == "menuScene") {
            this.cameras.main.fadeIn(1400, 0, 0, 0);
        }
        else {
            this.cameras.main.fadeIn(500, 0, 0, 0);
        }
    }

    preload() { };

    create() { // Création des éléments dès l'initialisation du jeu

        this.varTest = 0;
        this.varTest2 = 0;
        //this.background = this.add.image(212, 653, 'background');
        //this.background.setOrigin(0, 0).setScale(2);

        this.map1 = this.add.tilemap('lvl1');
        this.tileset = this.map1.addTilesetImage('tilesetMario', 'tileset1');
        // Import de tous les calques



        this.calque_background4 = this.map1.createLayer('Background 4', this.tileset);
        this.calque_background3 = this.map1.createLayer('Background 3', this.tileset);
        this.calque_background2 = this.map1.createLayer('Background 2', this.tileset);
        this.calque_background1 = this.map1.createLayer('Background 1', this.tileset);
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



        


        // LIGHTS



        this.variationIntensity = 3.2;
        this.lightVar = 'down';
        this.lightRayon = 512;

        this.lumiereTest = this.lights.addLight(512, 1200, this.lightRayon).setIntensity(this.variationIntensity).setColor(0xfe1b00); // x,y, rayon ou diamètre


        this.lightPlayer = this.lights.addLight(0, 0, this.lightRayon).setIntensity(0).setColor(0xfe1b00); // pour activer le système de lumière partout

        this.lights.enable().setAmbientColor(0x999999); // quand c'est pas éclairé


        this.calque_light = this.map1.getObjectLayer('Light');
        this.flammes = this.physics.add.staticGroup();
        this.calque_light.objects.forEach(eachflammes => {
            this.flamme = this.flammes.create(eachflammes.x + 64, eachflammes.y - 70, 'animFlammes');
            this.flamme.anims.play('animFlammes', true);
            this.lumiere = this.lights.addLight(this.flamme.x, this.flamme.y, this.lightRayon).setIntensity(this.variationIntensity).setColor(0xfe1b00);
        });

        this.lumieres = [];
        this.calque_light.objects.forEach(eachLumiere => {
            const lumiere = this.lights.addLight(eachLumiere.x + 64, eachLumiere - 74, this.lightRayon).setIntensity(this.variationIntensity).setColor(0xfe1b00);
            this.lumieres.push(lumiere); // Ajouter la lumière à un tableau
        });

        this.calque_murs.setPipeline('Light2D');
        this.calque_bois.setPipeline('Light2D');
        this.calque_background1.setPipeline('Light2D');
        this.calque_background2.setPipeline('Light2D');
        this.calque_background3.setPipeline('Light2D');
        this.calque_background4.setPipeline('Light2D');
        this.calque_herbe.setPipeline('Light2D');

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

        //INPUT

        this.cursors = this.input.keyboard.createCursorKeys(); // variable pour input
        this.controller = false;
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.input.gamepad.once('connected', function (pad) {
            this.controller = pad;
        }, this);


        this.speedPlateformeFixe;




        // Variable du mob
        this.spawn_mob = false;
        this.angleMob = 0; // sa direction, pas défaut à droite, (gauche : Math.PI, haut : Math.PI/2, bas : -Math.PI/2)
        this.fovMob = Math.PI / 2 // son champ de vision, 90 degrés ici

        // SPAWN joueur
        this.player = new Player(this, 128, 1280, 'ninja').setScale(0.2, 0.2).setOffset(0, 0).setOrigin(0.4, 1).setSize(512, 1024);

        this.stateVisibility = 'invisible';

        this.physics.add.collider(this.player, this.calque_murs);
        this.physics.add.collider(this.player, this.calque_bois);

        //this.physics.add.collider(this.player, this.plateformeTest, this.collidePlateformeTest, null, this);
        //this.plateformeTest.body.checkCollision.down = false;
        //this.physics.add.collider(this.player, this.murTest);
        this.physics.add.collider(this.player, this.plateformes, this.collidePlateformeTest, null, this);
        //this.physics.add.collider(this.player, this.plateformeMove, collideCallback, null, this);


        this.animApparition = this.add.sprite(0, 0, 'animApparition').setScale(2.4).setOrigin(0.5, 1)

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

        // KUNAI

        this.kunaiTP = new Kunai(this, 0, 0, 'kunaiTP').setOrigin(0.3, 0.5).setScale(0.8).setCircle(13);


        //this.physics.add.collider(this.plateformeMove, this.kunaiTP);
        this.physics.add.collider(this.plateformes, this.kunaiTP);
        this.physics.add.collider(this.calque_murs, this.kunaiTP);
        this.physics.add.collider(this.kunaiTP, this.calque_bois, this.plant, null, this);



        this.silhouette = this.add.sprite(0, 0, 'silhouette').setScale(0.1132).setOrigin(0.5, 1);
        this.testPerso = this.add.sprite(9 * 128, 11 * 128 + 22, 'testPerso').setScale(0.12).setPipeline('Light2D');


        /*this.segmentMur = this.add.graphics();
        this.segmentMur.lineStyle(2, 0x00ff00);*/

        // Spawn mob

        this.spawn_mob = false;
        this.mobs = this.physics.add.group({ collideWorldBounds: true });
        this.mobs.setOrigin(0.5, 0.5);
        //this.physics.add.collider(this.mobs, this.player);
        this.physics.add.collider(this.mobs, this.calque_murs);
        this.physics.add.collider(this.mobs, this.calque_bois);
        //this.physics.add.collider(this.mobs, this.mobs);
        //this.physics.add.collider(this.mobs, this.kunaiTP);

        this.arrows = this.physics.add.group({ collideWorldsBounds: true });
        this.arrows.setOrigin(0.3, 0.5);
        this.physics.add.collider(this.arrows, this.calque_murs);
        this.physics.add.collider(this.arrows, this.calque_bois);
        this.physics.add.collider(this.arrows, this.plateformes);




        // CAMERA

        this.physics.world.setBounds(0, 0, 100 * 128, 13 * 128); // Défini les limites où le joueur peut aller, limites où la physiques s'appliquent ?
        this.cameras.main.setBounds(0, 0, 100 * 128, 13 * 128); // Défini les limites de la caméra (début x, début y, fin x, fin y)
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05); //ancrage de la caméra sur l'objet player
        this.cameras.main.setZoom(1);


        // Anim mob
        this.anims.create({
            key: 'mobDroite',
            frames: this.anims.generateFrameNumbers('marcheSamurai', { start: 0, end: 7 }),
            repeat: -1,
            frameRate: 13,
        });
        this.anims.create({
            key: 'mobGauche',
            frames: this.anims.generateFrameNumbers('marcheSamurai', { start: 8, end: 15 }),
            repeat: -1,
            frameRate: 13,
        });

        // faire une classe UI
        this.UIvisibility = this.add.sprite(160, 160, 'visibility'); // a régler à la main si on change le spawn
        this.UIvisibility.setOrigin(0.5, 0.5).setScale(0.5);
        this.UIvisibility.setScrollFactor(0);

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

    }

    // attribuer la fonction sur un groupe et non un élément pour les hitbox des lumières

    update() {

      



        this.lumiereTest.setIntensity(this.variationIntensity);
        //this.lumiere.setIntensity(this.variationIntensity);

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
            }
            else {
                this.stateVisibility = 'semivisible';
                this.UIvisibility.anims.play('semivisible', true);
            }
        }
        else {
            this.stateVisibility = 'invisible';
            this.UIvisibility.anims.play('invisible', true);
        }


        this.silhouette.alpha -= 0.003;

        this.arrows.children.each(function (arrow) {
            if (arrow.spawn == true) {
                arrow.spawn = false;

                // tir en direction du joueur
                let dirX = this.player.x - arrow.x;
                let dirY = this.player.y - arrow.y;
                let length = Math.sqrt(dirX ** 2 + dirY ** 2);
                dirX /= length;
                dirY /= length;
                arrow.setVelocityX(dirX * 2400);
                arrow.setVelocityY(dirY * 3600); // tir légèrement plus haut que le joueur
            }
            // orientation de la flèche selon sa vitesse
            arrow.angle = Phaser.Math.RadToDeg(Math.atan2(arrow.body.velocity.y, arrow.body.velocity.x));

            if (!arrow.body.blocked.none) { //destruction de la flèche au moindre collider
                arrow.destroy();
            }
        }, this);


        // Spawn des ennemis
        if (this.spawn_mob == false) {
            this.spawn_mobs();
        }

        // COMPORTEMENT MOB
        if (this.spawn_mob == true) {
            this.mobs.children.each(function (mob) {

                const eye = mob.getData('eye');
                eye.setPosition(mob.x, mob.y - 260);
                eye.setScale(0.5);
                let circleEye = mob.getData('circleEye');
                circleEye.clear();
                circleEye.fillStyle(0xffffff).fillCircle(mob.x, mob.y - 260, mob.jauge);

                //console.log(mob.state)


                // champ de vision selon sa direction
                if (mob.body.velocity.x == 0) {
                    mob.anims.stop('', true);
                }
                else if (mob.direction == 'right') {
                    mob.anims.play('mobDroite', true);
                    mob.angleVision = 0; // direction du regard
                    mob.borneMin = 0;
                    mob.borneMax = mob.angleFOV;
                    mob.FOV.clear();
                    mob.FOV.fillStyle(0xffffff, 0.1);
                    mob.FOV.slice(mob.x, mob.y - 24, mob.scope, Phaser.Math.DegToRad(360 - mob.angleFOV), Phaser.Math.DegToRad(mob.angleFOV), false);
                    mob.FOV.fillPath();
                }
                else if (mob.direction == 'left') {
                    mob.anims.play('mobGauche', true);
                    mob.angleVision = 180;
                    mob.borneMin = mob.angleVision - mob.angleFOV;
                    mob.borneMax = mob.angleVision;
                    mob.FOV.clear();
                    mob.FOV.fillStyle(0xffffff, 0.2);
                    mob.FOV.slice(mob.x, mob.y, mob.scope, Phaser.Math.DegToRad(180 - mob.angleFOV), Phaser.Math.DegToRad(180 + mob.angleFOV), false);
                    mob.FOV.fillPath();
                }

                if (mob.seePlayer) {
                    this.silhouette.x = mob.seenXPlayer;
                    this.silhouette.y = mob.seenYPlayer + 18;
                    this.silhouette.alpha = 1;
                }


                switch (mob.state) {
                    case 'traque':
                        if (mob.ATK == false) {
                            if (mob.x < this.player.x - 20) { // si mob à gauche
                                mob.setVelocityX(mob.speed * 1.5)
                                mob.direction = 'right';
                            }
                            else if (mob.x > this.player.x + 20) {
                                mob.setVelocityX(-mob.speed * 1.5)
                                mob.direction = 'left';
                            }
                        }
                        else {
                            /*if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y) < 32 * 1) {
                                // coup de katana qui tape à 64 pixels devant
                                // si katana overlap player alors, reset au dernier checkpoint avec fondu au noir

                            }
                            else*/
                            if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y) < 128 * 5) {
                                // importer objet arrow et faire meme orientation en temps réel que le kunai
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


                        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y) < 128 * 5) { // si mob est assez prêt il attaque
                            mob.ATK = true;
                        }
                        else {
                            mob.ATK = false;
                        }

                        if (Phaser.Math.Distance.Between(this.player.x, this.player.y, mob.x, mob.y) > 128 * 10) { // si le joueur est à 10 cases du mob, l'ennemi cesse la traque
                            mob.isWatching = false;
                            mob.state = 'watch'
                            break;
                        }

                        break;

                    case 'watch': // regarde autour, A CODER si j'ai le temps
                        mob.setVelocityX(0);
                        if (mob.isWatching == false) {
                            mob.isWatching = true;
                            this.time.delayedCall(2000, () => { // demi tour après mob.waiting secondes
                                if (mob.jauge < mob.jaugeTraque) {
                                    mob.state = 'patrouille';
                                }
                                else {
                                    mob.state = 'traque'
                                };

                            });
                        }
                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < mob.scope &&
                            (mob.borneMin <= Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y))) &&
                                Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y))) <= mob.borneMax) &&
                            (this.stateVisibility == 'visible' || this.stateVisibility == 'semivisible')) {
                            // joueur en vue
                            mob.seePlayer = true;
                        }
                        else {
                            mob.seePlayer = false;
                        }

                        if (mob.seePlayer) {
                            mob.jauge += 0.8;
                        }
                        else {
                            mob.jauge -= 0.8;
                        }

                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < 160) { // si le joueur est très près
                            mob.jauge += 2.4;
                        }

                        if (mob.jauge >= mob.jaugeTraque) {
                            mob.jauge = mob.jaugeTraque
                            mob.state = 'traque';
                            break;
                        }
                        break;

                    case 'distrait': // déplacement vers la dernière position du joueur vu
                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < mob.scope &&
                            (mob.borneMin <= Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y))) &&
                                Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y))) <= mob.borneMax) &&
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
                            mob.jauge += 0.8
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

                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < 160) { // si le joueur est très près
                            mob.jauge += 1.6;
                        }

                        if (mob.jauge >= mob.jaugeTraque) {
                            mob.jauge = mob.jaugeTraque;
                            mob.state = 'traque';
                            break;
                        }
                        break;

                    case 'patrouille':
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
                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < mob.scope) {  // si le joueur est assez proche du mob pour pouvoir être vu
                            if (mob.borneMin <= Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y))) &&
                                Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y))) <= mob.borneMax) { // en deux fois sinon trop de calcul
                                if (this.stateVisibility == 'visible') {
                                    mob.jauge += 1.6;
                                }
                                else if (this.stateVisibility == 'semivisible') {
                                    mob.jauge += 0.2
                                }
                                else {
                                    if (mob.jauge > 0) {
                                        mob.jauge -= 0.2; // si player dans champ de vision mais dans l'ombre
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

                        if (this.checkDistance(mob.x, mob.y, this.player.x, this.player.y) < 160) { // si le joueur est très près
                            mob.jauge += 1.6;
                        }

                        if (mob.jauge >= mob.jaugeDistrait) {
                            mob.state = 'distrait';
                            break;
                        }
                        break;
                }

            }, this)
        }


        // ANIMATION ET DEPLACEMENT 2 DIRECTIONS

        if (this.player.speedPlayer == 0) { // condition pour idle
            this.player.facing();
            this.cameras.main.setFollowOffset(0, 0);

        }
        // 2 DIRECTIONS

        if ((this.cursors.left.isDown || this.keyQ.isDown || this.controller.left)) { // GAUCHE
            this.player.left();
            this.cameras.main.setFollowOffset(128, 0)
        }
        else if ((this.cursors.right.isDown || this.keyD.isDown || this.controller.right)) { // DROITE
            this.player.right();
            this.cameras.main.setFollowOffset(-128, 0)
        }

        // Frottement au sol

        if (this.cursors.left.isUp && this.cursors.right.isUp && this.keyQ.isUp && this.keyD.isUp && !this.controller.left
            && !this.controller.right && (this.player.body.blocked.down || this.player.body.velocity.y == 0) && this.player.speedPlayer != 0) {
            this.player.friction();
        }

        // demi tour au sol



        // SAUT (analogique)

        if ((this.cursors.up.isDown || this.keyZ.isDown || this.controller.up || this.cursors.space.isDown) &&
            (this.player.body.blocked.down || this.player.coyoteTimer > 0) &&
            (this.cursors.down.isUp && this.keyS.isUp && !this.controller.down)) {
            this.player.jump();
        }

        if (this.player.jumpActif == true) { // pour le saut analogique, A CORRIGER
            this.player.jumpTimer -= 1;
            this.player.hauteurSautFinal += 2
            if ((this.cursors.up.isDown || this.keyZ.isDown || this.controller.up || this.cursors.space.isDown) && this.player.jumpTimer > 0) {
                this.player.setVelocityY(this.player.hauteurSautFinal)
            }
        }


        if (this.player.falling == true && this.player.body.blocked.down) {
            this.animLand.x = this.player.x;
            this.animLand.y = this.player.y + 18;
            this.animLand.anims.play('animTP', true);
            this.player.falling = false;
        }



        // tant que je reste appuyé je garde une velocityY constante, cela s'arrête quand j'arrête d'appuyer ou au max du timer
        // mettre un délai pour différencier saut court et saut long analogique

        // AIR CONTROL

        // friction en l'air

        // demi tour en l'air




        // KUNAI

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
                this.kunaiTP.time();

                // animation disparition
                this.animTP.x = this.player.x;
                this.animTP.y = this.player.y + 17;
                this.animTP.anims.play('animTP', true);
                this.player.visible = false; // joueur invisible mais toujours touchable
                // rajouter une diminution d'alpha très rapide ?
                // Rajouter une ligne pour dire que le joueur ne peut pas être vu

                this.time.delayedCall(150, () => { // délai entre disparation et apparition
                    this.player.visible = true;
                    switch (this.kunaiTP.kunaiPlant) {
                        case "up":
                            this.player.x = this.kunaiTP.x - 2;
                            this.player.y = this.kunaiTP.y + 16;
                            break;
                        case "down":
                            this.player.x = this.kunaiTP.x - 3;
                            this.player.y = this.kunaiTP.y - 16;
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

        // check variable test


        if (this.kunaiTP.cooldown) { // à mettre dans classe kunai avec majCD()
            this.kunaiTP.kunaiCD += 360 / (this.kunaiTP.timeCD * 60); //360 divisé par le nombre de frame, si 3 sec alors 3*60
            this.kunaiTP.alphaCD = 1
            this.majCD();
        }
        else {
            if (this.kunaiTP.alphaCD > 0) {
                this.kunaiTP.alphaCD -= 0.02
                this.majCD();
            }
        }


        if (this.kunaiTP.showTrajectory) {
            this.kunaiTP.trajectoire.clear();

            this.vitesse = (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY)) * 4;
            if (this.vitesse < 1200) { // speed min
                this.vitesse = 1200
            }
            else if (this.vitesse > 2800) { // speed max
                this.vitesse = 2800
            }
            const gravite = -850 * 4;

            const deltaX = this.input.activePointer.worldX - this.player.x;
            const deltaY = this.input.activePointer.worldY - this.player.y;
            const angle = Math.atan2(deltaY, deltaX);

            for (let t = 0; t <= 2; t += 0.03) { // à ajuster selon le niveau de zoom et le LD
                const x = this.player.x + this.vitesse * Math.cos(angle) * t;
                const y = this.player.y + this.vitesse * Math.sin(angle) * t - 0.5 * gravite * t * t;

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
            //console.log(this.player.body.gravity.y)
        }
    }


    // Bug demi tour empiete avec friction


    // FONCTIONS

    kunaiAim() {
        this.kunaiTP.kunaiPlant = "air";

        // vecteur
        var directionX = this.input.activePointer.worldX - this.player.x;
        var directionY = this.input.activePointer.worldY - this.player.y;

        // distance
        var length = Math.sqrt(directionX ** 2 + directionY ** 2);

        directionX /= length
        directionY /= length

        // if (Math.abs(directionX) < 0.05) { // si je met pas ça, le kunai reste figé
        //     directionX = 0.05
        // }

        this.kunaiTP.enableBody(true, this.player.x, this.player.y, true, true);
        this.kunaiTP.body.allowGravity = true;
        this.player.tpReady = true;
        this.kunaiTP.setBounce(0)
        this.kunaiTP.x = this.player.x;
        this.kunaiTP.y = this.player.y;
        var speed = (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.input.activePointer.worldX, this.input.activePointer.worldY)) * 4;
        if (speed < 1200) { // speed min
            speed = 1200
        }
        else if (speed > 2800) { // speed max
            speed = 2800
        }

        // Appliquer la vélocité en utilisant la direction et la vitesse
        this.kunaiTP.body.velocity.x = directionX * speed;

        this.kunaiTP.body.velocity.y = directionY * speed;
    }

    majCD() { // à mettre dans la classe kunai après avoir refait l'UI
        this.kunaiTP.showCD.clear();
        this.kunaiTP.showCD.fillStyle(0xffffff, this.kunaiTP.alphaCD);
        this.kunaiTP.showCD.slice(this.player.x + 10, this.player.y + 64, 50, Phaser.Math.DegToRad(270), Phaser.Math.DegToRad(this.kunaiTP.kunaiCD));
        this.kunaiTP.showCD.fillPath();
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
        if ((this.cursors.down.isDown || this.keyS.isDown || this.controller.down) && (this.cursors.up.isDown || this.keyZ.isDown || this.controller.up || this.cursors.space.isDown)) {
            plateforme.body.checkCollision.up = false;
            this.time.delayedCall(200, () => {
                plateforme.body.checkCollision.up = true;
            });
        }
    }

    plateformeFixe(player, plateforme) {
        player.setVelocityY(0);
        plateforme.setVelocityY(0);
        //player.x += this.speedPlateformeFixe;
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

    hitPlayer() {
        // animation de mort puis restart au dernier checkpoint
    }



    spawn_mobs() {
        this.spawn_mob = true;

        this.mobs.create(1080, 256, 'marcheSamurai').anims.play('mobGauche', true).setScale(4,7);
        // this.mobs.create(1215, 1400, 'marcheSamurai').anims.play('mobGauche', true).setScale(4);
        // this.mobs.create(1350, 1400, 'marcheSamurai').anims.play('mobGauche', true).setScale(4);

        this.mobs.children.each(function (mob) {

            const eye = this.add.sprite(mob.x, mob.y - 100, 'eye').setScale(0.6);
            mob.setData('eye', eye);

            mob.jauge = 0;

            let circleEye = this.add.graphics();
            circleEye.fillStyle(0xffffff).fillCircle(mob.x, mob.y - 100, mob.jauge);
            mob.setData('circleEye', circleEye);

            //this.physics.add.collider(this.player, mob);
            //this.physics.add.collider(this.kunaiTP, mob);
            mob.state = 'patrouille'
            mob.move = true;
            mob.cdATK = false;
            if (Math.random() < 0.5) {
                mob.direction = 'left'
            }
            else {
                mob.direction = 'right';
            }

            mob.angleVision = 0;
            mob.speed = 200;
            mob.angleFOV = 10;
            mob.scope = 128 * 7;
            mob.borneMin = 0;
            mob.borneMax = 0;
            mob.modeAggro = false; // à modif plus tard
            mob.spawnX = mob.x // utile pour récup la position de base du mob et faire des rondes autour
            mob.distMaxSpawn = 128 * 3; // le garde ne s'éloigne pas plus loin que x de son spawn
            mob.waiting = 2; // le garde reste immobile x secondes au bout de sa marche
            mob.retour = false;
            mob.setSize(12, 28); //resize hitbox
            mob.setPipeline('Light2D');
            mob.seePlayer = false;
            mob.seenXPlayer;
            mob.seenYPlayer;
            mob.isWatching = false;
            mob.ATK = false;
            mob.shoot = false;
            mob.cdATK = 1; //cooldown en secondes entre 2 attaques
            mob.jaugeTraque = 80;
            mob.jaugeDistrait = 24;

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

export default niveau1