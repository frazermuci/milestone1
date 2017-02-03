function Controller (model, render)
{
	this.model = model;
	this.render = render;
};

addEventListener("keypress", handleKeyPress);

function handleKeyPress(event)
{
	var model = new Model(8, 6, 0);
	var code = event.which || event.keyCode;
	var vector = new Vector(0, 0);
	if (code == 37)
	{
	 	vector.setX(-1);
		ControllerChangeDirection(0, vector);
		console.log("left");
		
	}
	else if (code == 38)
	{
		vector.setY(1);
		ControllerChangeDirection(0, vector);
		console.log("up");
	}
	else if (code == 39)
	{
		vector.setX(1);
		ControllerChangeDirection(0, vector);
		console.log("right");
	}
	else if (code == 40)
	{
		vector.setY(-1);
		ControllerChangeDirection(0, vector);
		console.log("down");
	}
}