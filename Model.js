function Model(boardWidth,boardHeight, snakeID)
{
	this.snakeID		 = snakeID;// idea it gets ID from server or something.
	this.bonuses 	 	 = [];
	this.snakes 	 	 = [];
	this.boardWidth  	 = boardWidth;
	this.boardHeight 	 = boardHeight;
	this.isRunning   	 = 0;
	this.addSnake 		 = genAddSnake(this);
	this.getNumberSnakes = ()=>{return this.snakes.length};
	this.getSnake		 = genGetSnake(this);
	this.getSnakes		 = ()=>{return this.snakes};
	this.growSnake		 = genGrowSnake(this);
	
	this.changeDirection = genGetChangeDirection(this);
	
	this.getBonuses  	 = ()=>{return this.bonuses};
	this.makeBonus 		 = genMakeBonus(this);
	
	this.getBoardWidth   = ()=>{return this.boardWidth};
	this.getBoardHeight  = ()=>{return this.boardHeight};
	
	
	this.getClock
	this.incClock
	this.getIsRunning = ()=>{return this.isRunning};
};

function genAddSnake(model)
{
	function func(snake)
	{
		this.snakes = this.snakes.concat([snake]);
	}
	return func;
}

function genGetSnake(model)
{
	function func(ID)
	{
		var i = 0;
		for(; i < model.snakes.length; i++)
		{
			if(ID == model.snakes[i].getID())
			{
				break;
			}
		}
		return model.snakes[i];
	}
	return func;
}

function genGrowSnake(model)
{
	function func(ID)
	{
		var objList = [];
		var snakes  = model.snakes;
		for(var i = 0; i < snakes.length; i++)
		{
			objList = objList.concat(snakes[i].getBody());
		}
		model.getSnake(ID).addBody(objList);
	}
	return func;
}

function genGetChangeDirection(model)
{
	function func(direction)
	{
		snake = model.getSnake(model.snakeID);
		snake.changeDirection(direction);
	}
	return func;
}

function genMakeBonus(model)
{
	function inBounds(x,y)
	{
		return x >= 0 && y >= 0 && x <= model.boardWidth && y <= model.boardHeight;
	}
	function objectInTheWay(x,y)
	{
		var ret = false;
		var objList = [];
		model.snakes.map((x)=>{objList.concat(x.body)});
		objList.concat(model.bonuses);
		for(var i = 0; i < objList.length; i++)
		{
			var xy = convertVectorToArray(objList[i]);
			ret = x == xy[0] && y == xy[1];
			if(ret)
			{
				break;
			}
		}
		return ret;
	}
	function func()
	{
		var max = Math.max(model.boardHeight, model.boardWidth);
		var min = Math.min(model.boardHeight, model.boardWidth);
		var x = -1;
		var y = -1;
		while(!inBounds(x,y) || objectInTheWay(x,y))
		{
			x = Math.random() * (max - min) + min;
			y = Math.random() * (max - min) + min;
		}
		model.bonuses = model.bonuses.concat([x,y]);
	}
	return func;
}
						   