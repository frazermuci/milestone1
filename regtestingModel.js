function testModelInit()
{
	var model = new Model(8, 16, 1);
	console.assert(model.getBoardWidth() == 16 && model.getBoardHeight() == 8,
					"width, heighth problem", model);
	console.assert(model.snakeID == 1, "snake ID", model);
	console.assert(!model.getIsRunning(), "is running", model);
	console.assert(model.getSnakes().length == 0, "length of snakes",model);
}
testModelInit();

function testModelGrowSnake()
{
	var model = new Model(8, 16, 1);
	model.addSnake(new Snake(7, 4, [1,0]));
	model.growSnake(1);
	//console.assert(model.getSnake(1).getBody().length == 4,
	//				"didn't grow snake", model);
}
testModelGrowSnake();