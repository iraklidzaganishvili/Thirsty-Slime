document.addEventListener("keydown", function (event) {
    keys[event.key] = true;
});

document.addEventListener("keyup", function (event) {
    keys[event.key] = false;
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
};

//spawn
function spawnplayer() {
    ctx.fillStyle = player.color;
    ctx.drawImage(characterImage, spawn.x, spawn.y, player.size, player.size);
    ctx.clearRect(player.x, player.y, player.size, player.size);
    player.x = spawn.x;
    player.y = spawn.y;
    drawMap();
    keys = { w: false, a: false, s: false, d: false };
}

//movement
function animatecharacter() {
    if (keys.w == true) {
        player.y = player.y - player.move * deltatime;
        player.y = Math.round(player.y);
    }
    if (keys.s == true) {
        player.y = player.y + player.move * deltatime;
        player.y = Math.round(player.y);
    }
    if (keys.a == true) {
        player.x = player.x - player.move * deltatime;
        player.x = Math.round(player.x);
    }
    if (keys.d == true) {
        player.x = player.x + player.move * deltatime;
        player.x = Math.round(player.x);
    }
    ctx.fillStyle = player.color;
    ctx.drawImage(characterImage, player.x, player.y, player.size, player.size);
    // player.exactPosition = (player.x+player.y*game.w)/game.blocklength;
}

//colision logic
var HitNextLVLOnce = true;
function checkCollision() {
    bordcord.minXMinY =
        Math.floor(player.y / game.blocklength) * game.w + Math.floor(player.x / game.blocklength);
    bordcord.minXMaxY =
        Math.floor(player.y / game.blocklength) * game.w + Math.ceil(player.x / game.blocklength);
    bordcord.maXXminY =
        Math.ceil(player.y / game.blocklength) * game.w + Math.floor(player.x / game.blocklength);
    bordcord.maXXmaxY =
        Math.ceil(player.y / game.blocklength) * game.w + Math.ceil(player.x / game.blocklength);
    for (let element in bordcord) {
        if (mapgen[bordcord[element]] == 1) {
            spawnplayer();
        } else {
            if (mapgen[bordcord[element]] == -2 && HitNextLVLOnce == true) {
                HitNextLVLOnce = false;
                level = level + 1;
                nextlevel(level);
                spawnplayer();
            }
        }
    }
    HitNextLVLOnce = true;
}