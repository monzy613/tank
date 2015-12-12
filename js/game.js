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
var BULLET_WIDTH = 16
var WIN_SCORE = 20
var BULLET_SPEED = 3
var moveSpeed = 1.5 

var my_tank
var eagle

var score = 0
//if score === 20 success


//map 
//0: empty
//1: redWall
//2: whiteWall


var redWallGroup
var worldWallGroup
var enemyGroup
var enemyBulletGroup
var bulletGroup

var isSpacePressed = false
var isGameOver = false

var enemyGeneratorIntervalID

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
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
	[0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0]	
]

function initGame() {
	score = 0
}

function preload() {
	my_tank = createSprite(UNIT_WIDTH * 9, UNIT_WIDTH * 25, UNIT_WIDTH * 2, UNIT_WIDTH * 2)
	my_tank.addImage("direction", loadImage(imageNames. my_tank_up))
	my_tank.name = "my_tank"
	my_tank.setCollider("rectangle", 0, 0, COLLIDE_WIDTH, COLLIDE_WIDTH)
	my_tank.direction = UP
	
	eagle = createSprite(SCREEN_WIDTH / 2, SCREEN_WIDTH - UNIT_WIDTH, UNIT_WIDTH * 2, UNIT_WIDTH * 2)
	eagle.addImage(loadImage(imageNames.eagle))
	
	redWallGroup = new Group()
	worldWallGroup = new Group()
	enemyGroup = new Group()
	enemyBulletGroup = new Group()
	bulletGroup = new Group()
	drawMap()
}

function setup() {
  createCanvas(SCREEN_WIDTH * 1.5, SCREEN_WIDTH)
  enemyGeneratorIntervalID = setInterval(enemyGenerator, 2000)
  enemyGenerator()
}

function draw() {
	background(0, 0, 0)
	showScore()
	detectCollide()
	drawSprites()
}

function showScore() {
	textSize(32)
	text(score, SCREEN_WIDTH, SCREEN_WIDTH / 2, SCREEN_WIDTH * 1.5, SCREEN_WIDTH / 2 + 100)
}

function drawMap() {
	console.log("drawMap " + my_map.length)
	for (var i = 0; i < my_map.length; ++i) {
		for (var j = 0; j < my_map[i].length; ++j) {
			if (my_map[j][i] === 1) {
				//redwall
				var tmp = createSprite((i + 0.5) * UNIT_WIDTH, (j + 0.5) * UNIT_WIDTH, UNIT_WIDTH, UNIT_WIDTH)
				tmp.addImage(loadImage(imageNames.red_wall))
				redWallGroup.add(tmp)
			}
		}
	}
	initWorldWalls()
}

function initWorldWalls() {
	var upW = createSprite(0, -1, SCREEN_WIDTH * 2, 1)
	var downW = createSprite(0, SCREEN_WIDTH, SCREEN_WIDTH * 2, 1)
	var leftW = createSprite(-1, 0, 1, SCREEN_WIDTH * 2)
	var rightW = createSprite(SCREEN_WIDTH, 0, 1, SCREEN_WIDTH * 2)
	rightW.shapeColor = "white"
	worldWallGroup.add(upW)
	worldWallGroup.add(downW)
	worldWallGroup.add(leftW)
	worldWallGroup.add(rightW)
}


function shot(sprite) {
	if (sprite.name === "my_tank") {
		if (isSpacePressed === true || bulletGroup.length >= 1) {
			return
		}
	}
	
	var blt = createSprite(sprite.position.x, sprite.position.y, BULLET_WIDTH, BULLET_WIDTH)
	blt.setCollider("rectangle", 0, 0, BULLET_WIDTH, BULLET_WIDTH)
	blt.from = sprite
	if (sprite.name === "my_tank") {
		bulletGroup.add(blt)	
	} else {
		enemyBulletGroup.add(blt)
	}
	
	switch (sprite.direction) {
		case UP:
		blt.position.y -= sprite.height / 2
		blt.addImage(loadImage(imageNames.bullet_up))
		blt.setVelocity(0, -BULLET_SPEED)
		break
		case DOWN:
		blt.position.y += sprite.height / 2
		blt.addImage(loadImage(imageNames.bullet_down))
		blt.setVelocity(0, BULLET_SPEED)
		break
		case LEFT:
		blt.position.x -= sprite.width / 2
		blt.addImage(loadImage(imageNames.bullet_left))
		blt.setVelocity(-BULLET_SPEED, 0)
		break
		case RIGHT:
		blt.position.x += sprite.width / 2
		blt.addImage(loadImage(imageNames.bullet_right))
		blt.setVelocity(BULLET_SPEED, 0)
		break
	} 
}

function gameOver() {
	isGameOver = true
	eagle.addImage(loadImage(imageNames.white_flag))
	clearInterval(enemyGeneratorIntervalID)	
}

function detectCollide() {
	
	//detect my_tank shot
	for (var j = 0; j < bulletGroup.length; ++j) {
		if (
		bulletGroup[j].collide(redWallGroup, function(bullet, wall) {
			bullet.remove()
			wall.remove()
		})
		||
		bulletGroup[j].collide(worldWallGroup, function(bullet, wall){
			bullet.remove()
		})
		||
		bulletGroup[j].collide(eagle, function(bullet, flag) {
			//gameOver
			gameOver()
			bullet.remove()
		})
		||
		bulletGroup[j].collide(enemyGroup, function(bullet, enemy) {
			bullet.remove()
			enemy.remove()
			clearInterval(enemy.enemyMoverIntervalID)
			clearInterval(enemy.moveEnemyIntervalID)
			clearInterval(enemy.shotID)
			scoreUp()
		})
		||
		bulletGroup[j].collide(enemyBulletGroup, function(bullet1, bullet2) {
			bullet1.remove()
			bullet2.remove()
		})
		||
		isOutOfRange(bulletGroup[j])
		) {
			
		}
	}
	
	//detect enemy shot
	for (var k = 0; k < enemyBulletGroup.length; ++k) {
		if (
			enemyBulletGroup[k].collide(redWallGroup, function(sp1, sp2) {
				sp1.remove()
				sp2.remove()	
			})
			||
			enemyBulletGroup[k].collide(worldWallGroup, function(sp1, sp2) {
				sp1.remove()
			})
			||
			enemyBulletGroup[k].collide(my_tank, function(sp1, sp2) {
				sp1.remove()
				gameOver()
			})
			||
			enemyBulletGroup[k].collide(eagle, function(sp1, sp2) {
				sp1.remove()
				gameOver()
			})
			||
			isOutOfRange(enemyBulletGroup[k])
		) {
		}
	}
	
	if (my_tank.collide(worldWallGroup)) {
		return
	}
	if (my_tank.collide(redWallGroup) === true) {
		return
	}
}

function scoreUp() {
	score++
	console.log("score: " + score)
	if (score >= WIN_SCORE) {
		console.log("success")
		isGameOver = true
		clearInterval(enemyGeneratorIntervalID)
		park(my_tank)
	}
}


function positionToAxis(sprite) {
	//0 ~ 16 -> 0 
	//17 ~ 32 -> 1
	//33 ~ 48
	//etc
	var pos = sprite.position
	function tmp(value) {
		var returnValue = 0
		for (var i = 0; i < 26; ++i) {
			if (value >= (i * (UNIT_WIDTH) + 1 * ((i === 0)? 0: 1)) && value <= (i + 1) * (UNIT_WIDTH)) {
				returnValue = i
				break
			}
		}
		return returnValue
	}
	var x = tmp(pos.x)
	var y = tmp(pos.y)
	return {x: x, y: y}
}

function keyPressed() {
	if (isGameOver === true) {
		return
	}
	
	if (keyCode === 38) {//up
		park(my_tank)
		move(my_tank, UP)
	} else if (keyCode === 40) {
		park(my_tank)
		move(my_tank, DOWN)
	} else if (keyCode === 37) {
		park(my_tank)
		move(my_tank, LEFT)		
	} else if (keyCode === 39) {
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
		sprite.setVelocity(0, -1 * moveSpeed)
		break
		case DOWN:
		sprite.setVelocity(0, 1 * moveSpeed)
		break
		case LEFT:
		sprite.setVelocity(-1 * moveSpeed, 0)
		break
		case RIGHT:
		sprite.setVelocity(1 * moveSpeed, 0)
		break
		default:
		console.log("error direction: " + direction)
		break
	}
	my_rotate(sprite)
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

function isOutOfRange(sprite) {
	if (sprite.position.x < 0 || sprite.position.x > SCREEN_WIDTH || sprite.position.y < 0 || sprite.position.y > SCREEN_WIDTH) {
		if (sprite.from !== undefined) {
			sprite.remove()
		}
		return true
	} else {
		return false
	}
}


function enemyGenerator() {
	//UNIT_WIDTH, UNIT_WIDTH
	if ((enemyGroup.length + score) >= WIN_SCORE) {
		clearInterval(enemyGeneratorIntervalID)
		return
	}
	if (enemyGroup.length >= 4) {
		return
	}
	
	var enemy = createSprite(UNIT_WIDTH, Math.floor(Math.random() * 10) * UNIT_WIDTH, UNIT_WIDTH * 2, UNIT_WIDTH * 2)
	enemy.addImage(loadImage(imageNames.light_enemy))
	enemyGroup.add(enemy)
	enemy.isMoving = false
	enemy.setCollider("rectangle", 0, 0, COLLIDE_WIDTH, COLLIDE_WIDTH)
	randomDirection(enemy)
	enemyMover(enemy)
	enemyShot(enemy)
	enemy.enemyMoverIntervalID = setInterval(enemyMover, 2000, enemy)
}

function enemyShot(enemy) {
	shot(enemy)
	enemy.shotID = setInterval(shot, 1000, enemy)
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
	moveEnemy(enemy, time)
	enemy.moveEnemyIntervalID = setInterval(moveEnemy, 1, enemy, time)
}

function moveEnemy(enemy, time) {

	if (enemy.collide(worldWallGroup) || enemy.collide(redWallGroup) || enemy.moveCount >= time) {
		clearInterval(enemy.moveEnemyIntervalID)
		enemy.isMoving = false
		park(enemy)
		randomDirection(enemy)
		startMoving(enemy)
		return
	} else {
		move(enemy, enemy.direction)
		enemy.moveCount++
	}
}