setInterval(() => {
    // console.clear();
    // console.table({
    //     FPS: fpscounter,
    //     Choose_Level: 'window.level(Level)'
    // });
    fpscounter = 0;
}, 1000);
function gameloop() {
    now = Date.now();
    delta = now - then;
    if (delta > interval) {

        FrameTimeMs = Date.now();
        
        fpscounter = fpscounter + 1;
        deltatime = ((FrameTimeMs - lastFrameTimeMs) / 1000) * 60;
        lastFrameTimeMs = Date.now();
        then = now - (delta % interval);

        //Actual game loop
        // Camera
        if (player.x * 4 * dim <= size.width * 3.5 * dim && player.x * 4 * dim >= size.width / 2 * dim) {
            transformX = -player.x * 4 * dim + size.width / 2 * dim;
        }
        if (player.y * 4 * dim <= size.height * 3.5 * dim && player.y * 4 * dim >= size.height / 2 * dim) {
            transformY = -player.y * 4 * dim + size.height / 2 * dim;
        }
        ctx.setTransform(4 * dim, 0, 0, 4 * dim, transformX, transformY);
        drawMap();

        //Moving block
        blockgen.forEach((element, index) => {
            drawMovingBlock(
                blockgen[index][posInMovesetArray[index]], //blockpos
                blockgen[index][posInMovesetArray[index] - 1], //previousBlockpos
                addpropgen[index].color, //blockColor
                element.length - 1, //moveLength
                index, //blockIndex
                Math.round(fps / addpropgen[index].speed) //blockSpeed
            );
        });
        chase(...allLevels[level].chasers);
        animatecharacter();
        checkCollision();
    }
    requestAnimationFrame(gameloop);
}
requestAnimationFrame(gameloop);