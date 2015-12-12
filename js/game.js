//game.js
// the logic of tank game


var imageNames = {
	my_tank_up: "Assets/image/myTank.png",
	my_tank_down: "Assets/image/myTank_down.png",
	my_tank_left: "Assets/image/myTank_l.png",
	my_tank_right: "Assets/image/myTank_r.png",
    bullet_up: "Assets/image/bullet.png",
    bullet_down: "Assets/image/bullet_d.png",
    bullet_left: "Assets/image/bullet_l.png",
    bullet_right: "Assets/image/bullet_r.png",
    red_wall: "Assets/image/redWall.png",
	eagle: "Assets/image/eagle.png",
	white_flag: "Assets/image/white_flag.png",
	light_enemy: "Assets/image/light_tank.png"
}


var UP = "up"
var DOWN = "down"
var LEFT = "left"
var RIGHT = "right"

var UNIT_WIDTH = 16
var COLLIDE_WIDTH = 24
var SCREEN_WIDTH = UNIT_WIDTH * 26
var my_tank
var eagle

//map 
//0: empty
//1: redWall
//2: whiteWall

var redWalls = []
var bullets = []
var enemys = []

var isSpacePressed = false
var isGameOver = false

var my_map = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],	
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]	
]

function preload() {
	my_tank = createSprite(UNIT_WIDTH * 9, UNIT_WIDTH * 25, UNIT_WIDTH * 2, UNIT_WIDTH * 2)
	my_tank.addImage("direction", loadImage(imageNames. my_tank_up))
	my_tank.setCollider("rectangle", 0, 0, COLLIDE_WIDTH, COLLIDE_WIDTH)
	my_tank.direction = UP
	
	eagle = createSprite(SCREEN_WIDTH / 2, SCREEN_WIDTH - UNIT_WIDTH, UNIT_WIDTH * 2, UNIT_WIDTH * 2)
	eagle.addImage(loadImage(imageNames.eagle))
	
	drawMap()
}

function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_WIDTH)
  setInterval(enemyGenerator, 5000)
  enemyGenerator()
}

function draw() {
	background(0, 0, 0)
	detectCollide()
	drawSprites()
}

function drawMap() {
	console.log("drawMap " + my_map.length)
	for (var i = 0; i < my_map.length; ++i) {
		for (var j = 0; j < my_map[i].length; ++j) {
			if (my_map[j][i] === 1) {
				//redwall
				var tmp = createSprite((i + 0.5) * UNIT_WIDTH, (j + 0.5) * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH)
				tmp.addImage(loadImage(imageNames.red_wall))
				redWalls.push({"i": i, "j": j, "wall": tmp})
			}
		}
	}
}


function shot(sprite) {
	if (isSpacePressed === true) {
		return
	}
	var blt = createSprite(sprite.position.x, sprite.position.y, 3, 3)
	bullets.push(blt)
	switch (sprite.direction) {
		case UP:
		blt.position.y -= sprite.height / 2
		blt.addImage(loadImage(imageNames.bullet_up))
		blt.setVelocity(0, -2)
		break
		case DOWN:
		blt.position.y += sprite.height / 2
		blt.addImage(loadImage(imageNames.bullet_down))
		blt.setVelocity(0, 2)
		break
		case LEFT:
		blt.position.x -= sprite.width / 2
		blt.addImage(loadImage(imageNames.bullet_left))
		blt.setVelocity(-2, 0)
		break
		case RIGHT:
		blt.position.x += sprite.width / 2
		blt.addImage(loadImage(imageNames.bullet_right))
		blt.setVelocity(2, 0)
		break
	} 
}

function detectCollide() {
	for (var i in redWalls) {
		my_tank.collide(redWalls[i]['wall'])
		for (var j in bullets) {
			if (bullets[j].collide(redWalls[i]['wall'])) {
				redWalls[i]['wall'].remove()
				redWalls.splice(i, 1)
				bullets[j].remove()
				bullets.splice(j, 1)				
			} else if (bullets[j].collide(eagle)) {
				//gameOver
				isGameOver = true
				eagle.addImage(loadImage(imageNames.white_flag))
				bullets[j].remove()
				bullets.splice(j, 1)	
			} else if (bullets[j].position.x < 0 || bullets[j].position.x > SCREEN_WIDTH || bullets[j].position.y < 0 || bullets[j].position.y > SCREEN_WIDTH) {
				bullets[j].remove()
				bullets.splice(j, 1)				
			}
		}
	}
}

function keyPressed() {
	if (isGameOver === true) {
		return
	}
	
	if (keyCode === 38) {//up
		my_tank.addImage("direction", loadImage(imageNames.my_tank_up))
		park(my_tank)
		move(my_tank, UP)
	} else if (keyCode === 40) {
		my_tank.addImage("direction", loadImage(imageNames.my_tank_down))
		park(my_tank)
		move(my_tank, DOWN)
	} else if (keyCode === 37) {
		my_tank.addImage("direction", loadImage(imageNames.my_tank_left))
		park(my_tank)
		move(my_tank, LEFT)		
	} else if (keyCode === 39) {
		my_tank.addImage("direction", loadImage(imageNames.my_tank_right))
		park(my_tank)
		move(my_tank, RIGHT)		
	} else if (keyCode === 32) {
		shot(my_tank)
		isSpacePressed = true
	}
}

function keyReleased() {
	if (keyCode === 38 || keyCode === 40) {//up
		parkDirection(my_tank, UP)
	} else if (keyCode === 37 || keyCode === 39) {
		parkDirection(my_tank, LEFT)
	} else if (keyCode === 32) {
		isSpacePressed = false
	}
}

function move(sprite, direction) {
	//direction: UP, "down", "left", "right"
	sprite.direction = direction
	switch (direction) {
		case UP:
		sprite.setVelocity(0, -1)
		break
		case DOWN:
		sprite.setVelocity(0, 1)
		break
		case LEFT:
		sprite.setVelocity(-1, 0)
		break
		case RIGHT:
		sprite.setVelocity(1, 0)
		break
		default:
		console.log("error direction: " + direction)
		break
	}
}

function park(sprite) {
	sprite.setVelocity(0, 0)
}

function parkDirection(sprite, direction) {
	switch (direction) {
		case UP:
		case DOWN:
		sprite.setVelocity(sprite.velocity.x, 0)
		break
		case LEFT:
		case RIGHT:
		sprite.setVelocity(0, sprite.velocity.y)
		break
		default:
		alert("error direction")
		break
	}	
}


function enemyGenerator() {
	//UNIT_WIDTH, UNIT_WIDTH
	//
	var enemy = createSprite(UNIT_WIDTH, Math.floor(Math.random() * 10) * UNIT_WIDTH, UNIT_WIDTH * 2, UNIT_WIDTH * 2)
	enemy.addImage(loadImage(imageNames.light_enemy))
	enemys.push(enemy)
	enemy.isMoving = false
	enemy.setCollider("rectangle", 0, 0, COLLIDE_WIDTH, COLLIDE_WIDTH)
	randomDirection(enemy)
	enemyMover(enemy)
	setInterval(enemyMover, 2000, enemy)
}

function enemyMover(enemy) {
	if (enemy.isMoving === true ){
		return
	}
	
	var doMove = (Math.floor(Math.random() * 10) % 2) === 1? true: false
	if (doMove === true) {
		//move
		enemy.isMoving = true
		startMoving(enemy)
		return	
	}
	
	randomDirection(enemy)
}

function randomDirection(sprite) {
	var dir = Math.floor(Math.random() * 10) % 4
	switch(dir) {
		case 0://up
		sprite.direction = UP
		break
		case 1://down
		sprite.direction = DOWN
		break
		case 2://left
		sprite.direction = LEFT
		break
		case 3://right
		sprite.direction = RIGHT
		default:
	}
	my_rotate(sprite)
}

function my_rotate(sprite) {
	switch (sprite.direction) {
		case UP:
		sprite.rotation = 0
		break
		case DOWN:
		sprite.rotation = 180
		break
		case LEFT:
		sprite.rotation = -90
		break
		case RIGHT:
		sprite.rotation = 90
		break
		default:
		alert("error direction")
		break
	}		
}

function startMoving(enemy) {
	//time 200 ~ 300
	var time = Math.floor(Math.random() * 1000) % 100 + 200
	enemy.moveCount = 0
	enemy.moveEnemyIntervalID = setInterval(moveEnemy, 1, enemy, time)
}

function moveEnemy(enemy, time) {
	for (var i in redWalls) {
		if (enemy.collide(redWalls[i]['wall'])) {
			clearInterval(enemy.moveEnemyIntervalID)
			enemy.isMoving = false
			park(enemy) 
			return
		}
	}
	if (enemy.moveCount >= time) {
		clearInterval(enemy.moveEnemyIntervalID)
		enemy.isMoving = false
		park(enemy)
		return
	}
	move(enemy, enemy.direction)
	enemy.moveCount++
}