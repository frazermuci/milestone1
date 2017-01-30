//ASSUMING EXCLUSIVE BOUNDS WHILE ITS 0 - (BOUND - 1)

function Model(boardWidth,boardHeight, snakeID)
{
	this.snakeID		 = snakeID;// idea it gets ID from server and associates that snake
								   // with local model
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
	this.getModel 	     = ()=>{return this};
	this.getIsRunning    = ()=>{return this.isRunning};
	
	this.progressState  
};

function genAddSnake(model) // snake adder
{
	function func(snake)
	{
		this.snakes = this.snakes.concat([snake]);
	}
	return func;
}

function genGetSnake(model) // finds snake that is associated with model
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

function genGrowSnake(model) // adds new body part
{
	function func(ID)
	{
		var objList = [];
		var snakes  = model.snakes;
		//constructs objList to check if where to put new body part
		for(var i = 0; i < snakes.length; i++)
		{
			objList = objList.concat(snakes[i].getBody());
		}
		model.getSnake(ID).addBody(objList);
	}
	return func;
}

function genGetChangeDirection(model) //changes direction of snake associated with model
{
	function func(direction)
	{
		snake = model.getSnake(model.snakeID);
		snake.changeDirection(direction);
	}
	return func;
}

//generates makeBonus ///////////perhaps we can have a wrapper that checks if bonuses is
							   //under thresh and then call so that every tick you can call
							   //this no issue
function genMakeBonus(model)
{
	//helper function 
	//checks an x y to see if there already is object there
	function objectInTheWay(x,y) 
	{
		var ret = false;
		var objList = [];
		//constructs objList to compare x y
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
	//generated function 
	// keeps generating random x and y in bounds
	//until there is no object in the way and returns that x y
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
	
	/* //wrapper
	function wrapper()
	{
		if (model.bonuses.length < model.bonusNumber)
		{
			func();
		}
	}
	*/
	return wrapper;
}

//generates progressState
function genProgressState(model)
{
	// helper that constructs objList for checking if snake dies
	function giveObjList(ID) 
	{
		var objList = [];
		//maps over snake objects and fills out objList
		var mapFunc = (x)=>
						{
							if(x.getID() == ID)
							{
								objList = objList.concat(x.body.slice(1,x.length));
							}
							else
							{
								objList = objList.concat(x.body);
							}
						};
		model.snakes.map(mapFunc);
		//iterate over map bounds
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
	//generated function
	//progresses all the snakes
	function func()
	{
		//iterates through snakes and moves them
		for(var i = 0; i < model.snakes.length; i++)
		{
			var snake = model.snakes[i];
			var checkLength = snake.length;
			snake.move(giveObjList(snake.getID(), model.bonuses));
			//logic to check if snake grew to know if a bonus needs
			//to be removed
			if(snake.body.length > checkLength)
			{
				var snakeCheck = convertVectorToArray(snake.body[0]);
				for(var i =0; i < model.bonuses.length; i++)
				{
					var bonusCheck = convertVectorToArray(model.bonuses[i]);
					if(bonusCheck[0] == snakeCheck[0] && bonusCheck[1] == snakeCheck[1])
					{
						model.bonuses.splice(i, 1);
						break;
					}
				}
			}
		}
	}
	return func;
}
						   