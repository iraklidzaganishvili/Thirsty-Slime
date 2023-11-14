document.addEventListener("keydown", function (event) {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = true;
    }
});

document.addEventListener("keyup", function (event) {
    if (keys.hasOwnProperty(event.key)) {
        keys[event.key] = false;
    }
    [player.vel.w, player.vel.a, player.vel.s, player.vel.d] = [0, 0, 0, 0]
});

// player
let player = {
    size: game.blocklength,
    x: spawn.x,
    y: spawn.y,
    vx: 0,
    vy: 0,
    move: game.blocklength / 8,
    color: 'green',
    // exactPosition: (spawn.x+spawn.y*game.w)/game.blocklength
    vel: {
        w: 0,
        a: 0,
        s: 0,
        d: 0
    }
};

//spawn
function spawnplayer() {
    // ctx.fillStyle = player.color;
    ctx.drawImage(characterImage, spawn.x, spawn.y, player.size, player.size);
    ctx.clearRect(player.x, player.y, player.size, player.size);
    player.x = spawn.x;
    player.y = spawn.y;
    drawMap();
    keys = { w: false, a: false, s: false, d: false };
    mapgen = [...allLevels[level].map];
    chasePos = 0
}

//movement
function animatecharacter() {
    ctx.drawImage(characterImage, player.x, player.y, player.size, player.size);

    if (keys.w == true) {
        if (player.vel.w < 1) player.vel.w += 0.25;
        player.y = player.y - player.move * deltatime * player.vel.w;
        player.y = Math.round(player.y);
    }
    if (keys.s == true) {
        if (player.vel.a < 1) player.vel.a += 0.25;
        player.y = player.y + player.move * deltatime * player.vel.a;
        player.y = Math.round(player.y);
    }
    if (keys.a == true) {
        if (player.vel.s < 1) player.vel.s += 0.25;
        player.x = player.x - player.move * deltatime * player.vel.s;
        player.x = Math.round(player.x);
    }
    if (keys.d == true) {
        if (player.vel.d < 1) player.vel.d += 0.25;
        player.x = player.x + player.move * deltatime * player.vel.d;
        player.x = Math.round(player.x);
    }
    // ctx.fillStyle = player.color;
    // player.exactPosition = (player.x+player.y*game.w)/game.blocklength;
}

//colision logic
var HitNextLVLOnce = true;
function checkCollision() { // For unmoving blocks
    bordcord.minXMinY =
        Math.floor(player.y / game.blocklength) * game.w + Math.floor(player.x / game.blocklength);
    bordcord.minXMaxY =
        Math.floor(player.y / game.blocklength) * game.w + Math.ceil(player.x / game.blocklength);
    bordcord.maXXminY =
        Math.ceil(player.y / game.blocklength) * game.w + Math.floor(player.x / game.blocklength);
    bordcord.maXXmaxY =
        Math.ceil(player.y / game.blocklength) * game.w + Math.ceil(player.x / game.blocklength);

    for (let element in bordcord) {

        if (mapgen[bordcord[element]] == -3) {
            for (var i = 0; i < doorgen.length; i++) {
                if (doorgen[i][0] == bordcord[element]) {
                    for (var m = 1; m < doorgen[i].length; m++) {
                        mapgen[doorgen[i][m]] = -4;
                    }
                    mapgen[doorgen[i][0]] = -5;
                }
            }
        }

        if (mapgen[bordcord[element]] > 0) {
            spawnplayer();
        }

        if (mapgen[bordcord[element]] == -2 && HitNextLVLOnce == true) {
            HitNextLVLOnce = false;
            level = level + 1;
            nextlevel(level);
            spawnplayer();
        }
    }
    HitNextLVLOnce = true;
}
