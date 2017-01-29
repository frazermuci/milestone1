//MIGHT BE ASSUMING INCLUSIVE BOUNDS WHILE ITS 0 - (BOUND - 1)

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
	
	this.progressState  // can return 0 for continue, 1 for loss, 2 for draw 
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
	function objectInTheWay(x,y)
	{
		var ret = false;
		var objList = [];
		model.snakes.map((x)=>{objList.concat(x.body)});
		objList.concat(model.bonuses);
		for(var i = 0; i < objList.length; i++)
		{
			var xy = convertVectorToArray(objList[i]);
			ret = (x == xy[0] && y == xy[1]);
			if(ret)
			{
				break;
			}
		}
		return ret;
	}
	function func()
	{
		x = Math.round(Math.random() % model.boardWidth);
		y = Math.round(Math.random() % model.boardHeight);
		while(objectInTheWay(x,y))
		{
			x = Math.round(Math.random() % model.boardWidth);
			y = Math.round(Math.random() % model.boardHeight);
		}
		model.bonuses = model.bonuses.concat([[x,y]]);
	}
	return func;
}

function genProgressState(model)
{
	function giveObjList(ID)
	{
		var objList = [];
		var snakes = model.snakes.filter((x)=>{x.getID() != ID});
		snakes.map((x)=>{objList = objList.concat(x.body)});
		for(var i = 0; i < model.boardWidth; i++)//0 - excluse width
												  //with constant exclusive width
		{
			objList = objList.concat([[i, model.boardHeight-1]]);
		}
		for(var i = 0; i < model.boardHeight; i++)//0 - exclusive height
												   //with constant exclusive height
		{
			objList = objList.concat([[model.boardHeight-1,i]]);
		}
		return objList;
	}
	function func()
	{
		for(var i = 0; i < model.snakes.length; i++)
		{
			var snake = model.snakes[i]
			console.log(giveObjList(snake.getID(), model.bonuses));
			snake.move(giveObjList(snake.getID(), model.bonuses));
		}
	}
	return func;
}
						   