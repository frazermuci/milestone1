function Snake(x, y, direction, ID)
{
	this.ID = ID;
	//body is a list of vectors
	this.body = genBodyList(x, y, direction);
	this.direction = convertVectorToArray(direction);
	this.changeDirection = giveChangeDirection(this);
	this.addBody = giveAddBody(this);
	this.move = giveMove(this);
	this.getBody = ()=>{return this.body};
	this.getID = ()=>{return this.ID};
	
	//checks if snake has ran into some object
	this.isDead = 0;
	this.getIsDead = ()=>{return this.isDead};
};

//initializes bodyList
function genBodyList(x, y, direction)//start at some coords and build snake from there
{
	direction = convertVectorToArray(direction);
	var body = [];
	var cdirection = [0,0];
	var dx = x;
	var dy = y;
	for(var i = 0; i< 3; i++)
	{
		body = body.concat([giveV2(dx,dy,cdirection)])
		dx = body[i].getX();
		dy = body[i].getY();
		cdirection = [-1*direction[0], -1*direction[1]];
	}
	return body;
}

//generates function addBody which adds body to bodyList
function giveAddBody(snake)
{
	//probs don't wanna pass in body, probs just construct new body huh.
	var func = function(objList)//obj list of everythin on map
	{
		lastBody = snake.body[snake.body.length-1];
		x = lastBody.x;
		y = lastBody.y;
		
		var xy = addHelper(x, y, snake.direction, objList);
		body = new Vector(xy[0], xy[1]);
		snake.body = snake.body.concat([body]);
	}
	return func;
}

//generates function move which progresses all bodies 
//in bodyList
function giveMove(snake)
{
	var func = function(objList, bList)
	{
		var head = snake.body[0];
		for(var i = snake.body.length-1; i != 0; i--)
		{
			snake.body[i].x = snake.body[i-1].x;
			snake.body[i].y = snake.body[i-1].y;
		}
		head.add(snake.direction);
		//Code that handles death condition and grow condition
		for(var i = 0; i < objList.length; i++) //needs to make sure that's its own
												//head is not in objList
		{
			var obj   = convertVectorToArray(objList[i]);
			var sbody = convertVectorToArray(snake.body[0]); 
			if(obj[0] == sbody[0] && obj[1] == sbody[1])
			{
				snake.isDead = 1;
			}
		}
		
		//logic that checks if bonus was ran into
		for(var i = 0; i < bList.length; i++)
		{
			var obj = convertVectorToArray(bList[i]);
			var sbody = convertVectorToArray(snake.body[0]); 
			if(obj[0] == sbody[0] && obj[1] == sbody[1])
			{
				snake.addBody();
			}
		}
	}
	return func;
}


//check for whether or not change happens in oppo direction
function giveChangeDirection(snake)
{
	var func = function(xy)
	{
		xy = convertVectorToArray(xy);
		var dir  = translateDirection([xy[0], xy[1]]);
		var sdir = translateDirection([snake.direction[0], snake.direction[1]]);
		//checks so that snake doesn't
		//change direction and go backwards
		//over itself
		if(!checkOppo(dir, sdir))
		{
			snake.direction = xy;
		}
	}
	return func;
}