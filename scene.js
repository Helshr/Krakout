var Scene = function(game) {
    var paddle = Paddle(game)
    var ball = Ball(game)
    var score = 0
    var blocks = loadLevel(game, 1)
        game.registerAction('a', function () {
            paddle.moveLeft()
        })
        game.registerAction('d', function () {
            paddle.moveRight()
        })
        game.registerAction('f', function () {
            ball.fire()
        })
    var s = {
        game: game,
    }
    s.draw = () =>{
         // draw
         game.drawImage(paddle)
         game.drawImage(ball)
         // draw blocks
         for (var i = 0; i < blocks.length; i++) {
             var block = blocks[i]
             if (block.alive) {
                 game.drawImage(block)
             }
         }
         // draw labels
         game.context.fillText('分数: ' + score, 10, 290)
    }
    s.update = () => {
        if (window.paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            var end = SceneEnd(game)
            game.replaceScene(end)
            return 
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            // 这里应该调用一个 ball.反弹() 来实现
            ball.反弹()
        }
        // 判断 ball 和 blocks 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                // log('block 相撞')
                block.kill()
                ball.反弹()
                // 更新分数
                score += 100
            }
        }
    }
    // mouse event
    let enableDrag = false
    game.canvas.addEventListener('mousedown', (event) => {
        let x = event.offsetX
        let y = event.offsetY
        if (ball.hasPoint(x, y)) {
            log('click here')
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', (event) => {
        let x = event.offsetX
        let y = event.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', (event) => {
        let x = event.offsetX
        let y = event.offsetY
        enableDrag = false
    })
    return s
}