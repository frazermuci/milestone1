function Socket(model){
	this.model = model;
	this.connection = new WebSocket('ws://127.0.0.1:21234', ['soap', 'xmpp']);
	


// Log errors
	this.scoreArray = [0,0];
	this.count = 1;
	this.connection.onerror = function (error) {
		console.log('WebSocket Error ' + error);
	};

// Log messages from the server
	this.connection.onmessage = (e)=> {
		console.log('Server Score: ' + e.data);
		//this is in scope?
		var array = e.data.split(":");
		if(this.count)
		{
		//assumes client 0 based ids
			this.connection.send("init:"+0+":"+1);
		}
		console.log(e.data)
		this.scoreArray[0] = array[0];
		this.scoreArray[1] = array[1];
		this.model.setScore(this.scoreArray);
		this.count =0;
		ViewRefresh();
	}
	this.sendMessage = function(inc)
	{
		this.connection.send(inc);
	}

	this.done = ()=>{this.connection.send("DONE")}
};