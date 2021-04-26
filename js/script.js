// Each time this function is called a GameObject
// is create based on the arguments
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


// get a handle to the canvas context
var canvas = document.getElementById("the_canvas");

// get 2D context for this canvas
var context = canvas.getContext("2d");

// Update Heads Up Display with Weapon Information
function weaponSelection() {
    var selection = document.getElementById("equipment").value;
    var active = document.getElementById("active");

    if (active.checked == true) {
        document.getElementById("HUD").innerHTML = selection + " active ";
        console.log("Weapon Active");
    } else {
        document.getElementById("HUD").innerHTML = selection + " selected ";
        console.log("Weapon Selected");
    }
}

// Array of Weapon Options
var options = [{
        "text": "Select a Weapon",
        "value": "No Weapon",
        "selected": true
    },
    {
        "text": "Fireball",
        "value": "Fireball"
    },
    {
        "text": "Sword",
        "value": "Longsword"
    },
    {
        "text": "Crossbow",
        "value": "Crossbow"
    }
];

var selectBox = document.getElementById('equipment');

for (var i = 0; i < options.length; i++) {
    var option = options[i];
    selectBox.options.add(new Option(option.text, option.value, option.selected));
}


// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

var playerImage = new Image();
playerImage.src = "./img/poke.png";

var enemyImage = new Image();
playerImage.src = "./img/enemy.png";


// Default Player
var sprite = new GameObject("Sprite", playerImage, 100);

var sprite2 = new GameObject("Sprite2", enemyImage, 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [sprite, sprite2];

// Draw a HealthBar on Canvas, can be used to indicate players health
function drawHealthbar() {
    console.log("drawHealthbar");
    var width = 100;
    var height = 20;
    var max = 100;
    var val = 10;

    // Draw the background
    context.fillStyle = "#000000";
    context.fillRect(gameobjects[0].x, gameobjects[0].y, width, height);

    // Draw the fill
    context.fillStyle = "#00FF00";
    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(gameobjects[0].x, gameobjects[0].y, fillVal * width, height);
}


function attackButton() {
    gamerInput = new GamerInput("Attack");
    console.log("Attack");
}

function buttonNotPressed() {
    gamerInput = new GamerInput("None");
    console.log("Action Stopped");
}




function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) {

        console.log("Current gamer input:" + gamerInput.action);

        if (gamerInput.action === "Attack") {
            player_health -= 10;
            console.log(player_health);
        }

    }

}
var player_health = 100;


var x = 0,
    y = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

// Total Frames
var frames = 6;

// Current Frame
var currentFrame = 0;

// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
    context.clearRect(0, 0, canvas.width, canvas.height); // clear canvas
    console.log("Draw  ...");

    current = new Date().getTime(); // update current
    if (current - initial >= 500) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    }

    // Draw image
    context.drawImage(sprite.img, 0, 0, 72, 77, sprite.x, sprite.y, 72, 77);
    context.drawImage(sprite.img, sprite.x, sprite.y, 912, 512);
    drawHealthbar();

    context.drawImage(sprite2.img, x, y, 81, 133, sprite2.x, sprite2.y, 81, 133);

    //draw players health
    context.font = "50px Verdana";
    context.fillStyle = "black";
    context.fillText("Enemy Health" + " " + player_health, 255, 120);
    console.log(player_health);

}

function gameloop() {
    update();
    draw();
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);