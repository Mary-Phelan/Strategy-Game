// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions

function GameObject(name, img, health) {
    this.name = name;
    this.img = img;
    this.health = health;
}


// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}

// log the URL the page request came from
function onPageLoad() {

    var href = window.location.href;
    alert(protocol);

    var protocol = window.location.protocol;
    alert(protocol);

    var host = window.location.host;
    alert(host);


    var pathname = window.location.pathname;
    alert(pathname);

    var search = window.location.search;
    alert(search);

}

// get a handle to the canvas context
var canvas = document.getElementById("the_canvas");

// get 2D context for this canvas
var context = canvas.getContext("2d");

// Array of Weapon Options
var options = [{
        "text": "Select a Weapon",
        "value": "No Weapon",
        "selected": true
    },
    {
        "text": "Sword"
    },
    {
        "text": "Fireball"
    },
    {
        "text": "Crossbow"
    }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
    var option = options[i];
    selectBox.options.add(new Option(option.text, option.value, option.selected));
}


// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

//Player
var sprite = new GameObject("Sprite", "./img/poke.png", 400);

//Enemy
var sprite2 = new GameObject("NPC", "./img/enemy.png", 400);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [sprite, sprite2];

// Draw a HealthBar on Canvas, indicates players health
function drawHealthbar() {
    //console.log("drawHealthbar");
    var width = 100;
    var height = 20;

    // Draw the background
    context.fillStyle = "#000000";

    context.fillRect(360, 250, width, height);

    // Draw the fill
    context.fillStyle = "#03a56a";
    var fillVal = gameobjects[0].health;
    context.fillRect(360, 250, fillVal / 4, height);
}

// Draw a HealthBar on Canvas, indicates enemy's health
function enemyHealthbar() {
    //console.log("enemyHealthbar");
    var width = 100;
    var height = 20;

    // Draw the background
    context.fillStyle = "#000000";
    context.fillRect(100, 20, width, height);

    // Draw the fill
    context.fillStyle = "#03a56a";
    var fillVal = gameobjects[1].health;
    context.fillRect(100, 20, fillVal / 4, height);
}

//bool for the turn based system
var playerTurn = true;

// Run when attack clicked
function attack() {
    if (playerTurn == true) {
        gamerInput = new GamerInput("Attack");

        var weaponChoice = selectBox.options[selectBox.selectedIndex].text;
        console.log(weaponChoice);

        if (weaponChoice == "Sword") {
            gameobjects[1].health = gameobjects[1].health - 25;
            playerTurn = false;
        } else if (weaponChoice == "Fireball") {
            gameobjects[1].health = gameobjects[1].health - 30;
            playerTurn = false;
        } else if (weaponChoice == "Crossbow") {
            gameobjects[1].health = gameobjects[1].health - 15;
            playerTurn = false;
        }
    }
}

//bool for the game to end
var gameEnd = false;

function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");

    // Check is input is Attack

    if (playerTurn == false) {
        gameobjects[0].health = gameobjects[0].health - (Math.random() * 15 + 15);
        playerTurn = true;
    }

    if (gameobjects[0].health <= 0) {
        gameEnd = true;
        var winImage = new Image();
        winImage.src = "./img/winning_screen.jpg";
        context.drawImage(winImage, 0, 0, 540, 360);
    } else if (gameobjects[1].health <= 0) {
        gameEnd = true;
        var loseImage = new Image();
        loseImage.src = "./img/losing_screen.png";
        context.drawImage(loseImage, 0, 0, 540, 360);
    }


}

var x = 0,
    y = 0;

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");

    if (gameEnd == false) {
        // Draw image
        var player = new Image();
        player.src = gameobjects[0].img;
        context.drawImage(player, x, y, 200, 200, gameobjects[0].x = 80, gameobjects[0].y = 250, 256, 256);
        drawHealthbar();

        var npc = new Image();
        npc.src = gameobjects[1].img;
        context.drawImage(npc, x, y, 81, 113, gameobjects[1].x = 340, gameobjects[1].y = 20, 81, 113);
        enemyHealthbar();
    }
}

// Initial time set
var initial = new Date().getTime();
var current; // current time

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);