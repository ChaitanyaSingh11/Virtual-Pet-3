// database variables
let database;
let fedTime;
let NAme;
let state;
// button variables
let feed, add;
// time variables
let min, h, t;
let currentTime;
let hr, hrs;
// variables for storing values from database
let Name;
let lastFed;
// character variable
let dog;
let gameState = "hungry";
let food;

function preload() {
  // dog_idle animation
  idle = loadImage('Assets/Dog.png');
  // dog_happy image
  happy = loadImage("Assets/Happy.png");
  // dog howling image
  howl = loadImage("Assets/howl.png");
}

function setup() {
  // creating canvas 
  createCanvas(1000, 1000);
  // initialising database
  database = firebase.database();
  // creating object of Food class
  food = new Food();
  // adding butons
  buttons()
  // input box for name
  Start();
  // getting gameState
  gState = new GameState();
  gState.getState();
  // creating dog character
  Character_dog();
  // keeping track of time
  fedTime = database.ref('Time');
  fedTime.on("value", (data) => {
    lastFed = data.val();
  });

  hrs = database.ref('hour');
  hrs.on('value', (data) => {
    hr = data.val();
  })
}

function draw() {
  if (frameCount % 500 == 0 && gameState == "happy") {
    dog.changeImage('idle', idle);
    gameState = "hungry";
    gState.update(gameState);
  }
  if (gameState == "hungry" || gameState == "happy") {
    background('#32a852');
    drawSprites();
    food.display();
    feed.show();
    add.show();
  } else if (gameState != "hungry" & gameState != "happy") {
    feed.hide();
    add.hide();
  } else if (gameState != "hungry" & gameState != "happy")
    dog.remove();

  fill(255, 255, 254);
  textSize(48);
  text("Last Time Fed - " + lastFed, 20, 90);
  if (gameState == "happy") {
    textSize(32);
    stroke(255, 0, 0);
    fill("Yellow");
    text(Name + " : 😋🥰", 430, 500);
  }

  currentTime = hour();
  if (currentTime == (hr + 1)) {
    gameState = "Playing";
    gState.update(gameState);
    food.Garden();
  } else if (currentTime == (hr + 2)) {
    gameState = "Sleeping";
    gState.update(gameState);
    food.bedroom();
  } else if (currentTime == (hr + 3)) {
    gameState = "Bathing";
    gState.update(gameState);
    food.washroom();
  } else if (currentTime > (hr + 4)) {
    gameState = "hungry";
    gState.update(gameState);
  }
}

function Feed() {
  if (gameState == "hungry") {
    gameState = "happy";
    gState.update(gameState);
    dog.changeImage('happy', happy);
    food.updateFoodStock(foodStock);
    time();
  }
}

function time() {
  h = hour();
  min = minute();
  t = "AM";

  if (min < 10)
    min = "0" + minute();

  if (h > 12)
    t = "PM";
  lastFed = (String)(h % 12 + ":" + min + " " + t);
  database.ref('/').update({
    Time: lastFed
  });
  database.ref('/').update({
    hour: h
  });
}

function NAME() {
  database.ref('/').update({
    Name: input.value()
  });
  input.hide();
  sub.hide();
}

function Start() {
  // input box for pet name
  input = createInput('🐾🐕Pet Name🐕🐾');
  input.position(650, 250);
  input.size(350, 50);
  // styling the box
  input.style('font-size: 32px');
  input.style('background-color:');
  input.style('background-color:#ad07fa');
  input.style('color:#ffffff');
  // creating the change-name button
  sub = createButton('🥰 Name ! 🥰');
  sub.position(680, 320);
  sub.size(220, 50);
  // styling the button
  sub.style('font-size: 26px');
  sub.style('background-color:#1cd922');
  sub.style('border-radius: 12px');
  sub.style('color:#ffffff');
  sub.mousePressed(NAME);
}

// creating the dog character
function Character_dog() {
  dog = createSprite(width / 2, 600);
  dog.addImage("idle", idle);
  dog.addImage("happy", happy);
  dog.addImage("howl", howl);
  dog.scale = 0.5;
  NAme = database.ref('Name');
  NAme.on("value", (data) => {
    Name = data.val();
  });
}

// FEED and ADD Buttons
function buttons() {
  // creating the feed button
  feed = createButton('🐶Feed🐶');
  feed.position(950, 100);
  // styling the button
  feed.size(180, 50);
  feed.style('font-size: 32px');
  feed.style('background-color:#2e7bff');
  feed.style('border-radius: 12px');
  feed.style('color:#ffffff');
  feed.mousePressed(Feed);
  // creating the add button
  add = createButton('🍼Add🍼');
  add.position(1150, 100);
  add.size(150, 50);
  // styling the button
  add.style('font-size: 32px');
  add.style('background-color:#1cd922');
  add.style('border-radius: 12px');
  add.style('color:#ffffff');
  add.mousePressed(() => {
    food.addFood(foodStock)
  });
}