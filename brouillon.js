 //Création d'une jauge
        /*this.graphics = this.add.graphics();
        this.graphics.fillStyle(0x000000, 1); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(800, 1500, 128, 32); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xff0000, 0.5) // couleur de la partie remplie de la jauge
        this.jaugeValeur = 0; //pourcentage de la jauge
        this.jauge = this.graphics.fillRect(800, 1500, 128 * (this.jaugeValeur / 100), 32);
        this.majJauge();*/

           /*majJauge() {
        this.graphics.clear();
        this.graphics.fillStyle(0x000000, 1); // couleur, alpha du fond de la jauge
        this.graphics.fillRect(800, 1500, 128, 32); // position x,y, largeur, hauteur du fond de la jauge
        this.graphics.fillStyle(0xff0000, 0.5) // couleur de la partie remplie de la jauge
        this.jauge = this.graphics.fillRect(800, 1500, 128 * (this.jaugeValeur / 100), 32);
    }*/


// Dialogues
        /*this.dialogueBox.visible = true;
            this.dialogueEnCours = true;
            this.time.delayedCall(1500, function () { // Cooldown avant de pouvoir bouger
                this.dialogueEnCours = false;
            }, [], this);
            this.dialogueText.setText(this.dialogueA[0]);
            this.time.delayedCall(6000, function () {
                this.dialogueBox.visible = false;
                this.dialogueText.setText('');
            }, [], this);
        }*/

        //if (this.gameOver) { return; } // ça freeze le jeu
        /*if (this.speedPlayer != 0) {
            this.drawDashTrail(); // test de trainée derrière le joueur
        }*/

        // image rémanante
        //this.dashTrail = this.physics.add.group({ allowGravity: false, collideWorldBounds: true });


        /*// SAUT (classique sans variations)

        if ((this.cursors.up.isDown || this.keyZ.isDown || this.controller.up || this.cursors.space.isDown) &&
            (this.player.body.blocked.down || this.coyoteTimer > 0) &&
            (this.cursors.down.isUp && this.keyS.isUp && !this.controller.down)) {
            this.player.setVelocityY(this.hauteurSaut)
            this.coyoteTimer = 0;
        }*/


        /*this.marqueTP = this.add.sprite(0, 0, 'marqueTP');
        this.marqueTP.visible = false*/

        /*if (Phaser.Input.Keyboard.JustDown(this.keyA)) { // téléportation sur la marque ou le kunai
            if (this.tpReady == true && this.kunaiThrow == false) {
                this.player.x = this.marqueTP.x;
                this.player.y = this.marqueTP.y - 16;
                this.tpReady = false;
                this.marqueTP.visible = false;
            } // accélérer le mouvement de caméra lors du TP 
        }*/

        /*if (Phaser.Input.Keyboard.JustDown(this.keyE)) { // pose de la marque
            if (this.player.body.blocked.down) {
                this.tpReady = true;
                this.marqueTP.x = this.player.x;
                this.marqueTP.y = this.player.y + 16;
                this.marqueTP.visible = true;
            }
        }*/



        /*checkAngle2(x1, y1, x2, y2) {  // x1,y1 : mob, x2,y2 : player
            //console.log ((Math.atan2(y2-y1,x2-x1)*180)/Math.PI); //+360)%360)) //SENS HORAIRE en partant de la droite
            return ((Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI); // +360 % 360 si on veut passer tout en degré
        }*/



        /*drawDashTrail() { // pour plus tard, trainée derrière le perso
        }*/


        /*refreshVisibility() {
            this.player.setTint(0xff0000);
        }
        refreshVisibility2() {
            this.player.setTint(0x00ff00);
        }*/

        /*clignotementRouge1(objet) { // à voir si je laisse le clignotement rouge
            objet.setTint(0xff0000);
            this.time.delayedCall(300, () => {
                this.clignotementRouge2(objet);
            });
        }
    
    droite(mob, mobAggro) {
        if (mobAggro == false) {
            mob.setVelocityX(1);

            this.droite1 = this.tweens.add({
                targets: mob,
                x: mob.x + 60, // destination
                duration: 1500, // durée pour se rendre à destination
                hold: Phaser.Math.Between(700, 2000), // temps d'attente après être arrivé
                onComplete: function () { // on lance le retour après le temps d'attente
                    if (mobAggro == false) {
                        this.gauche(mob, mobAggro)
                    }
                }.bind(this)
            });
        }
    }

    gauche(mob, mobAggro) { //pattern gauche
        if (mobAggro == false) {
            mob.setVelocityX(-1);

            this.gauche1 = this.tweens.add({
                targets: mob,
                x: mob.x - 60,
                duration: 1500,
                hold: Phaser.Math.Between(700, 2000),
                onComplete: function () {
                    if (mobAggro == false) {
                        this.droite(mob, mobAggro)
                    }
                }.bind(this)
            });
        }
    }

        clignotementRouge2(objet) {
            if (this.cdClignotement > 0) {
                this.cdClignotement -= 1;
                objet.setTint();
                this.time.delayedCall(300, () => {
                    this.clignotementRouge1(objet);
                });
            }
            else {
                objet.setTint();
            }
        }*/


         /*else if (this.onMetal == true) { // ne se plante pas // mettre une collision qui appelle une fonction pour vérifier le type de texture si je veux utiliser le bounce

                this.setBounce(0.5, 0.4);
                if (Math.abs(this.body.velocity.x) < 25 && this.body.blocked.down) { // fin de course au sol du kunai
                    this.setVelocityX(0);
                    this.angle = this.kunaiAngleFinal;
                    this.disableBody(false, false);
                }
                if (this.body.blocked.down) {
                    if (this.body.velocity.x > 0) {
                        this.setVelocityX(this.body.velocity.x - 30) // vitesse de ralentissement quand le kunai touche le sol
                    }
                    else if (this.body.velocity.x < 0) {
                        this.setVelocityX(this.body.velocity.x + 30)
                    }
                }
             }*/
             
             /*
             
             
             Pour rendre invisible les mob, dans l'update des mob
             /*this.segment.setTo(this.player.x, this.player.y, mob.x, mob.y)
                this.segmentMur.clear();*/
                //this.graphics.lineStyle(1, 0x00ff00);
                //this.graphics.strokeLineShape(this.segment);

                /*if (Phaser.Geom.Intersects.LineToRectangle(this.segment, this.murTest.getBounds())) {
                    mob.visible = false;
                }
                else {
                    mob.visible = true;
                }*/



                /*majJauge() {
        this.jaugeVisibility.clear();
        this.jaugeVisibility.fillStyle(0xffffff, 1); // couleur, alpha du fond de la jauge
        this.jaugeVisibility.fillRect(764, 388, 128, 24); // position x,y, largeur, hauteur du fond de la jauge
        this.jaugeVisibility.fillStyle(0xff0000, 1) // couleur de la partie remplie de la jauge
        this.jauge = this.jaugeVisibility.fillRect(764, 388, 128 * (this.jaugeValeurVisibility / 100), 24);
    }*/

  /*this.segmentMur = this.add.graphics();
        this.segmentMur.lineStyle(2, 0x00ff00);*/

    /*this.physics.overlap(this.hitboxLight, this.player, function () {
            if (this.stateVisibility != 'visible') {
                this.stateVisibility = 'semivisible'
                //this.majJauge();
            }
        }, null, this);*/
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             