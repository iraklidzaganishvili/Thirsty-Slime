allblocks = allblocks.map((element) =>
    element.map((innerArray) => innerArray.map((coord) => coord[1] * game.w + coord[0]))
);
mapgen = allmaps[level];
// ctx.scale(32, 32);
for (var y = 0; y < game.h; y++) {
    for (var x = 0; x < game.w; x++) {
        if (mapgen[y * game.w + x] == -1) {
            ctx.setTransform(4 * dim, 0, 0, 4 * dim, -x * game.blocklength * 4 * dim + size.width / 2 * dim, -y * game.blocklength * 4 * dim + size.height / 2 * dim);
        }
    }
}
function drawMap() {
    // ctx.clearRect(0, 0, game.w * game.blocklength, game.h * game.blocklength);
    ctx.drawImage(
        document.getElementById('grass'),
        0,
        0,
        game.w * game.blocklength,
        game.h * game.blocklength
    );
    mapgen = allmaps[level];
    blockgen = allblocks[level];
    addpropgen = addallblocks[level];
    for (var y = 0; y < game.h; y++) {
        for (var x = 0; x < game.w; x++) {
            switch (mapgen[y * game.w + x]) {
                case 1:
                    ctx.drawImage(
                        document.getElementById('wall_roof'),
                        x * game.blocklength,
                        y * game.blocklength,
                        game.blocklength,
                        game.blocklength
                    );
                    if (mapgen[y * game.w + x - 1] < 1) {
                        ctx.drawImage(
                            document.getElementById('wall_side'),
                            x * game.blocklength,
                            y * game.blocklength,
                            game.blocklength / 4,
                            game.blocklength
                        );
                    }
                    if (mapgen[y * game.w + x + 1] < 1) {
                        ctx.drawImage(
                            document.getElementById('wall_side'),
                            (x + 0.75) * game.blocklength,
                            y * game.blocklength,
                            game.blocklength / 4,
                            game.blocklength
                        );
                    }
                    if (mapgen[(y + 1) * game.w + x] < 1) {
                        ctx.drawImage(
                            document.getElementById('wall_bottom'),
                            x * game.blocklength,
                            (y + 0.5) * game.blocklength,
                            game.blocklength,
                            game.blocklength / 2
                        );
                    }
                    if (mapgen[(y - 1) * game.w + x] < 1) {
                        ctx.drawImage(
                            document.getElementById('wall_top'),
                            x * game.blocklength,
                            y * game.blocklength,
                            game.blocklength,
                            game.blocklength / 4
                        );
                    }
                    break;
                case -1:
                    spawn = { x: x * game.blocklength, y: y * game.blocklength };
                    break;
                case -2:
                    ctx.fillStyle = 'blue';
                    ctx.drawImage(
                        document.getElementById('goal'),
                        x * game.blocklength,
                        y * game.blocklength,
                        game.blocklength,
                        game.blocklength
                    );
                    break;
            }
        }
    }
}
drawMap();
function nextlevel(level) {
    console.log('level:' + level);
    spawnplayer();
    posInMovesetArray = [];
    smoother = [];
    exactBlockPosition = [];
}
window.level = nextlevel;