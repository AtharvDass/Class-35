//Create variables here
var foodS,fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dogImg=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png");
}

function setup() {
  createCanvas(800, 700);
  database=firebase.database();
  dog=createSprite(400,600);
  dog.addImage('hi',dogImg);
  dog.addImage('why',happyDog);
  dog.scale=0.2;
  feed=createButton('Feed the Dog');
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton('Add Food');
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

  foodObj=new Food
}


function draw() {  
  background(46,139,87);
  fedTime=database.ref('FeedTime');
  fedTime.on('value',function(data){
    lastFed=data.val();
  })
  foodObj.display();
  foodObj.getFoodStock();
  drawSprites();
  //add styles here
  textSize(15);
  fill(255,255,254);
  text('Food left: '+foodS,200,30)
  if(lastFed>=12){
    text('Last Fed: '+lastFed%12+'PM',350,30)
  }
  else if(lastFed===0){
    text('Last Fed: 12 AM ',350,30)
  }
  else{
    text('Last Fed: '+lastFed+'AM',350,30)
  }
}

function feedDog(){
  dog.changeImage('why');
  foodS=foodS-1;
  foodObj.updateFoodStock();
  database.ref('/').update({
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



