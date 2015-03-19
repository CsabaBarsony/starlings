var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var nodes = [];
var minX = 10;
var maxX = 990;
var minY = 10;
var maxY = 690;
var intervalID;

for(var i = 0; i < 100; i++){
	nodes.push({
		id: i,
		position: {
			x: Math.random() * (maxX - minX) + minX,
			y: Math.random() * (maxY - minY) + minY
		},
		speed: {
			x: Math.random() * 2 - 1,
			y: Math.random() * 2 - 1
		}
	})
}

function start(){
	return setInterval(function(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0, l = nodes.length; i < l; i++){
			var node = nodes[i];
			ctx.fillRect(node.position.x, node.position.y, 3, 3);
			node.position.x += node.speed.x;
			node.position.y += node.speed.y;
			setNeighbour(node);
			setSpeed(node);
		}
	}, 30);
}

function startButtonClick(){
	intervalID = start();
}

function stopButtonClick(){
	clearInterval(intervalID);
}

function setSpeed(node){
	/*node.speed.x += Math.random() * 2 - 1;
	node.speed.y += Math.random() * 2 - 1;*/
	node.speed.x += node.neighbour.position.x - node.position.x;
	node.speed.y += node.neighbour.position.y - node.position.y;
	if(node.speed.x > 5.0) node.speed.x = 5.0;
	if(node.speed.y > 5.0) node.speed.y = 5.0;
	if(node.position.x > maxX || node.position.x < minX) node.speed.x *= -1;
	if(node.position.y > maxY || node.position.y < minY) node.speed.y *= -1;
}

function setNeighbour(node){
	var neighbour = {
		position: {
			x: 9000000000,
			y: 9000000000
		}
	};
	for(var i = 0, l = nodes.length; i < l; i++){
		if(nodes[i].id === node.id) continue;
		if(getDistance(node.position, nodes[i].position) < getDistance(node.position, neighbour.position)){
			neighbour = nodes[i];
		}
	}
	node.neighbour = neighbour;
}

function getDistance(position1, position2){
	var dx = position1.x - position2.x;
	var dy = position1.y - position2.y;
	return (dx * dx + dy * dy) * 0.5;
}