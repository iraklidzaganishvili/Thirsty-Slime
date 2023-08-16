//block that moves to all array positions (thats a lot of inputs past me what the f**k where you thinking)
// The ungodly demon
function drawMovingBlock(
    blockpos,
    previousBlockpos,
    blockColor,
    moveLength,
    blockIndex,
    blockSpeed
) {
    let blockY;
    let blockX;
    let prevBlockY;
    let prevBlockX;
    if (!smoother[blockIndex]) {
        smoother[blockIndex] = 0;
    }
    if (!posInMovesetArray[blockIndex]) {
        posInMovesetArray[blockIndex] = 0;
    }
    if (!exactBlockPosition[blockIndex]) {
        exactBlockPosition[blockIndex] = {
            x: Math.floor(
                (prevBlockX + ((blockX - prevBlockX) / blockSpeed) * smoother[blockIndex]) *
                game.blocklength
            ),
            y: Math.floor(
                (prevBlockY + ((blockY - prevBlockY) / blockSpeed) * smoother[blockIndex]) *
                game.blocklength
            )
        };
    }

    // ctx.clearRect(
    //     exactBlockPosition[blockIndex].x,
    //     exactBlockPosition[blockIndex].y,
    //     game.blocklength,
    //     game.blocklength
    // );

    //positions
    blockY = Math.floor(blockpos / game.w);
    blockX = blockpos - blockY * game.w;
    prevBlockY = Math.floor(previousBlockpos / game.w);
    prevBlockX = previousBlockpos - prevBlockY * game.w;
    exactBlockPosition[blockIndex].x = Math.floor(
        (prevBlockX + ((blockX - prevBlockX) / blockSpeed) * smoother[blockIndex]) *
        game.blocklength
    );
    exactBlockPosition[blockIndex].y = Math.floor(
        (prevBlockY + ((blockY - prevBlockY) / blockSpeed) * smoother[blockIndex]) *
        game.blocklength
    );

    //filling
    // ctx.fillStyle = blockColor;
    ctx.drawImage(
        characterImage,
        exactBlockPosition[blockIndex].x,
        exactBlockPosition[blockIndex].y,
        game.blocklength,
        game.blocklength
    );

    smoother[blockIndex] = smoother[blockIndex] + 1;

    if (posInMovesetArray[blockIndex] == moveLength && smoother[blockIndex] > blockSpeed) {
        posInMovesetArray[blockIndex] = 0;
    }

    if (smoother[blockIndex] > blockSpeed) {
        smoother[blockIndex] = 0;
        posInMovesetArray[blockIndex] = posInMovesetArray[blockIndex] + 1;
    }

    if (
        player.x + 1 < exactBlockPosition[blockIndex].x + game.blocklength &&
        player.x - 1 + game.blocklength > exactBlockPosition[blockIndex].x &&
        player.y + 1 < exactBlockPosition[blockIndex].y + game.blocklength &&
        player.y - 1 + game.blocklength > exactBlockPosition[blockIndex].y
    ) {
        spawnplayer();
    }
}