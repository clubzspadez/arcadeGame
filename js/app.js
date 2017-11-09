const allEnemies = [];
let myModal = $('.modal2');
let close = $('.close');
let repeat = $('.play');
let modal = $('.modal');

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.moving = false;
    this.originX = x;
    this.width = 60;
    this.height = 70;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     this.x += this.speed * dt;
     if(this.x > 500){
        this.reset();
        }
    this.collisionObj(this);
    if(this.collisionObj(this)) {
        player.x = player.initialX;
        player.y = player.initialY;
        player.playerLives -= 1
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset= function(){
        this.x = this.originX;
}

Enemy.prototype.collisionObj = function(ob1){
    let currentEn = ob1;
    if(currentEn.x < player.x + player.width &&
        currentEn.x + currentEn.width > player.x &&
        currentEn.y < player.y + player.height &&
        currentEn.height + currentEn.y > player.y) {
        // collision detected!
        console.log("collision with enemy " + currentEn);
        return true;

    }
}
Enemy.prototype.collision = function(){
    for (var i = 0; i < allEnemies.length; i++) {
        for(var x = 0; x < allEnemies.length; x++){
            let currentEn = allEnemies[x];
            if(currentEn.x < player.x + player.width &&
               currentEn.x + currentEn.width > player.x &&
               currentEn.y < player.y + player.height &&
               currentEn.height + currentEn.y > player.y) {
                // collision detected!
                console.log("collision with enemy " + currentEn);
                player.reset();

            }
        }
    }
}
function entityCollision(ent1, ent2){
    let entity1 = ent1;
    if(entity1.x < player.x + player.width &&
               entity1.x + entity1.width > player.x &&
               entity1.y < player.y + player.height &&
               entity1.height + entity1.y > player.y) {
                // collision detected!
                console.log("collision with entity " + entity1);
                return true;
            }
            return false;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const colorsArray = ['green', 'blue', 'orange'];

var Gem = function(x, y){
     this.changeGem();
     this.randomGem();
     this.width = 80;
     this.height = 60;
     this.score = 0;
}
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'right';
    ctx.fillText('Score: ' + this.score, 100, 100);
}

Gem.prototype.update = function(){
    this.entityCollision(this);
    if(this.entityCollision(this)){
        this.score += this.value;
        this.changeGem();
        this.randomGem();
    }
}
Gem.prototype.entityCollision = function(ent1){
    let entity1 = ent1;
    if(entity1.x < player.x + player.width &&
               entity1.x + entity1.width > player.x &&
               entity1.y < player.y + player.height &&
               entity1.height + entity1.y > player.y) {
                // collision detected!
                console.log("collision with entity " + entity1);
                return true;
            }
            return false;
}
Gem.prototype.randomGem = function(){
    this.x = getRandomInt(0, 300);
    this.y = getRandomInt(0, 220);
}
Gem.prototype.changeGem = function(){
    this.color = colorsArray[getRandomInt(0,3)];
     if(this.color === 'blue'){
        this.sprite = 'images/GemBlue.png';
        this.value = 1;
     } else if(this.color === 'green'){
        this.sprite = 'images/GemGreen.png';
        this.value = 2;
     } else if(this.color === 'orange'){
        this.sprite = 'images/GemOrange.png';
        this.value = 3;
     }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    //position relative to rows and columns on board
    this.x = 200;
    this.y = 400;
    this.moving = false;
    this.playerLives = 3;
    this.width = 50;
    this.height = 70;
    this.initialY = this.y;
    this.initialX = this.x;
    this.playerLives = 3;


    //update player
    this.update = function(){
        if(this.playerLives === 0) {
            game.end();
        }
    }
    //render player
    this.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = '20px Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'right';
    ctx.fillText('Lives: ' + this.playerLives, 450, 100);
    }
    //handle input
    this.handleInput = function(key){
        if(key === 'up' && this.y > 5){
            if(this.y < 90){
                this.reset();
            }
            this.y -= 90
        }else if(key === 'down' && this.y < 400 ){
            this.y += 90
        }else if(key === 'left' && this.x > 0){
            this.x -= 100
        } else if(key === 'right' && this.x < 400){
            this.x += 100
        }
    }
    //reset method
    this.reset = function(){
    this.x = this.initialX;
    this.y = this.initialY;
    this.moving = true;
    }
    this.lives = function(){
        playerLives = 3;
        // if(this.playerLives < 3){
        //     player.reset();
        // } else{
        //     this.playerLives--;
        // }

    }
}
var game = {
    start : function(){
        //run if the game counter condition is met
            myModal.css('display', 'block');
        // When the user clicks on <span> (x), close the modal
            close.click(function() {
                myModal.css('display', 'none');
            });
            repeat.click(function(){
                myModal.css('display', 'none');
            });
    },
    end : function(){
        modal.css('display', 'block');
        close.click(function() {
            modal.css('display', 'none');
            player.playerLives = 3;
            gem.score = 0;
        });
        repeat.click(function(){
            modal.css('display', 'none');
            player.playerLives = 3;
            gem.score = 0;
        });
    },
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
//first row enemy
const enemyOne = new Enemy(-1000, 220, 500);
const enemyOneSec = new Enemy(-2000, 220, 500);
const enemyTwo = new Enemy(-500, 130, 550);
const enemyTwoSec = new Enemy(-1500, 130, 550);
const enemyThree = new Enemy(-400, 50, 600);
const enemyThreeSec = new Enemy(-1400, 50,  600);
const gem = new Gem();
game.start();

allEnemies.push(enemyOne);
allEnemies.push(enemyOneSec);
allEnemies.push(enemyTwo);
allEnemies.push(enemyTwoSec);
allEnemies.push(enemyThree);
allEnemies.push(enemyThreeSec);

//provided by mdn https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
