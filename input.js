function Controller (model, render)
{
	this.model = model;
	this.render = render;
};

addEventListener("keypress", handleKeyPress);

function handleKeyPress(event)
{
	var code = event.which || event.keyCode;
	if (code == 37)
	{
		//Controller.changeDirection(ID, left);
		console.log("left");
		
	}
	else if (code == 38)
	{
		//Controller.changeDirection(ID, up);
		console.log("up");
	}
	else if (code == 39)
	{
		//Controller.changeDirection(ID, right);
		console.log("right");
	}
	else if (code == 40)
	{
		//Controller.changeDirection(ID, down);
		console.log("down");
	}
}