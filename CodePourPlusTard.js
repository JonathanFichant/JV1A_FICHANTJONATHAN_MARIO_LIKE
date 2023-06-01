/*


// pour plus tard, pour activer l'affichage de la trajectoire
        // mais le code s'effectue aussi longtemps qu'on reste cliqué donc à voir

        this.input.on('pointerdown', function (pointer) {
            if (pointer.rightButtonDown()) {
                if (this.varTest == 0){
                    this.varTest = 1;
                    console.log(this.varTest)Math.abs(Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(mob.x, mob.y, this.player.x, this.player.y)))
                }
                else {
                    this.varTest = 0
                    console.log(this.varTest)
                }
                this.varTest2 += 1;
                console.log(this.varTest2)
            }

        }, this);






//this.plateformeTest = this.physics.add.staticSprite(800, 1500, "plateformeTest");
        // this.murTest = this.physics.add.staticSprite(1132, 1412, 'murTest');
        // this.bounds = this.murTest.getBounds();

        // this.plateformeMove = this.physics.add.sprite(800, 1412, 'plateformeMove');
        // this.plateformeMove.body.allowGravity = false;
        // this.plateformeMove.body.checkCollision.down = false;
        // this.plateformeMove.body.checkCollision.left = false;
        // this.plateformeMove.body.checkCollision.right = false;

const collideCallback = (player, plateformeMove) => {
            // Appel de la première fonction de rappel
            this.collidePlateformeTest(player, plateformeMove);

            // Appel de la deuxième fonction de rappel
            this.plateformeFixe(player, plateformeMove);
        };


        // this.plateformeMove.x += this.speedPlateformeFixe;
        // this.plateformeMove.y = 0;

*/