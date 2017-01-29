function Model(boardHeight, boardWidth, snakeID)
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
	this.makeBonus //random number in bounds and check all objs
	
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
		/*var i = 0;
		for(; i < model.snakes.length; i++)
		{
			if(ID == model.snakes[i].getID())
			{
				break;
			}
		}
		return model.snakes[i];*/
		return madel.snakes.filter((x)=>{x.getID() == ID})[0];
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
			objList.concat(snakes[i].getBody());
		}
		//model.getSnake(ID).addBody(objList);
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
						   