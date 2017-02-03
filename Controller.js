var controllerInterval;

function ControllerTie()
{

}

function ControllerWin(id)
{

}

function ControllerTick()
{
    var m = getModel();

    // Grow both snakes
    m.growSnake(0);
    m.growSnake(1);

    var snake1 = m.getSnake(0);
    var snake2 = m.getSnake(1);

    var head1 = snake1.getHead();
    var head2 = snake2.getHead();

    var body1 = snake1.getBody();
    var body2 = snake2.getBody();

    // Check collision for snakes
    var lose1 = false;
    var lose2 = false;

    // Heads colliding
    if(head1.equals(head2))
    {
        lose1 = true;
        lose2 = true;
    }

    // Out of the board
    if(head1.x >= 0 && head1.x < getModel().boardWidth && head2.x >= 0 && head2.x < getModel().boardHeight)
        lose1 = true;

    // Colliding with other snake
    for(var i = 0; i < body1.length; i++)
    {
        if(head2.equals(body1[i]))
            lose2=true;
    }
    for(var i = 0; i < body2.length; i++)
    {
        if(head1.equals(body2[i]))
            lose1=true;
    }

    // Check victory condition (+ tie)
    if(lose1 && lose2)
        ControllerTie();
    else if(lose1)
        ControllerWin(2);
    else if(lose2)
        ControllerWin(1);


    // Check bonus (head at bonus position)
    // Increment Clock
    ViewRefresh();
}

function ControllerChangeDirection(id, vector)
{
    var m = getModel();
    m.changeDirection(id, vector);
}

function ControllerMainLoop()
{
    if (getModel().isRunning == 1)
    {
        ControllerTick();
    }
}

function ControllerNewGame()
{
    getModel().newGame();
    getModel().isRunning = 1;
}

function ControllerStopGame()
{
    getModel().isRunning = 0;
}

controllerInterval = window.setInterval(ControllerMainLoop, 1000);
ControllerNewGame();
