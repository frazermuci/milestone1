function ControllerTick()
{
    var m = getModel();

    // Grow both snakes
    m.growSnake(0);
    m.growSnake(1);

    var snake1 = m.getSnake(1);
    var snake2 = m.getSnake(2);

    var head1 = snake1.getHead();
    var head2 = snake2.getHead();

    // Check collision for first snake (head not colliding)
    var lose1 = false;

    if(head1.equals(head2))
        lose1 = true;
    if(head1.x >= 0 && head1.x < board.x && y)
        lose1 = true;
    foreach (part in snake1.getBody())
        if(head1.equals(part))
            lose1=true;
    //      Head not on head
    //      Head not body
    //      Head not wall

    // Check collision for second snake
    var lose2 = false;
    //      Head not on head
    //      Head not body
    //      Head not wall

    // Check victory condition (+ tie)
    if(lose1 && lose2)
        tie
    else if(lose1)
        gameEnd 2 win
    else if(lose2)
        game end 1 win


    // Check bonus (head at bonus position)
    // Increment Clock

}

function ControllerChangeDirection(id, vector)
{
    var m = getModel();
    m.changeDirection(id, )
}

function ControllerMainLoop()
{
    while (gameStarted)
    {
        wait();
        Tick();
    }
}

function ControllerNewGame()
{
    ControllerMainLoop();
}

function ControllerStopGame()
{

}