function Model(boardHeight, boardWidth, snakeID)
{
	this.snakeID		 = snakeID;
	this.bonuses 	 	 = [];
	this.snakes 	 	 = [];
	this.boardWidth  	 = boardWidth;
	this.boardHeight 	 = boardHeight;
	this.isRunning   	 =  0;
	this.addSnake 		 = (snake)=>{this.snakes.concat([snake])};
	this.getNumberSnakes = ()=>{return this.snakes.length};
	this.getSnake		 = (ID)=>
						   {
							   return this.snakes.filter((x)=>{x.getID() == ID})[0];
						   }
	this.growSnake		 = genGrowSnake(this);
	this.changeDirection = (direction)=>
							{
								snake = this.getSnake(this.snakeID);
								snake.changeDirection(direction);
							};
	
	this.getBonuses  	 = ()=>{return this.bonuses};
	this.makeBonus
	
	this.getBoardWidth   = ()=>{return this.BoardWidth};
	this.getBoardHeight  = ()=>{return this.BoardHeight};
	
	
	this.getClock
	this.incClock
	this.getIsRunning = ()=>{return this.isRunning};
};

function genGrowSnake(model)
{
	function func(ID)
	{
		var objList = [];
		var snakes  = model.getSnakes;
		for(var i = 0; i < snakes.length; i++)
		{
			objList.concat([snakes[i].getBody()]);
		}
		model.getSnake(ID).addBody(objList);
	}
	return func;
}
