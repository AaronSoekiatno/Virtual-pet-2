//Create variables here
var dog, happyDog, hungryDog, database, foodS, foodStock;
var petButton, foodButton, fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  hungryDog = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250,250,30,30);
  dog.addImage(hungryDog);
  dog.scale = 0.2;
  foodObj = new food();
  foodStock = database.ref("Food");
  foodStock.on("value",addFood);

  feed = createButton("Feed the Dog");
  feed.position(525,95);
  feed.mousePressed(feedDog);

  add = createButton("Add Food");
  add.position(625,95);
  add.mousePressed(addFood);
}


function draw() {  
  background(255,255,254);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  })
  drawSprites();
  //add styles here
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + " PM",350,30);
  }else if(lastFed = 0){
    text("Last Feed: 12 AM",350,30);
  }else{
    text("Last Feed: "+ lastFed + "AM",350,30);
  }
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    Feedtime: hour()
  })
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}