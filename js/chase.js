function chase(amount, minSpeed, maxSpeed) {
    if (chasePos == 0) {
        chasePos = {
            x: [],
            y: [],
            speed: []
        }
        for (let i = 0; i < amount; i++) {
            chasePos.x[i] = (Math.floor(Math.random() * 80 * game.blocklength + spawn.x)/2)
            chasePos.y[i] = (Math.floor(Math.random() * 40 * game.blocklength + spawn.y)/2)
            chasePos.speed[i] = Math.random() * (maxSpeed - minSpeed) + minSpeed;
            console.log(chasePos.speed[i], minSpeed, maxSpeed)
        }
    }
    for (let i = 0; i < amount; i++) {
        ctx.drawImage(characterImage, chasePos.x[i], chasePos.y[i], player.size, player.size);
        if (player.x > chasePos.x[i]) chasePos.x[i] += chasePos.speed[i]
        if (player.x < chasePos.x[i]) chasePos.x[i] -= chasePos.speed[i]
        if (player.y > chasePos.y[i]) chasePos.y[i] += chasePos.speed[i]
        if (player.y < chasePos.y[i]) chasePos.y[i] -= chasePos.speed[i]
        if (
            player.x + 1 < chasePos.x[i] + game.blocklength &&
            player.x - 1 + game.blocklength > chasePos.x[i] &&
            player.y + 1 < chasePos.y[i] + game.blocklength &&
            player.y - 1 + game.blocklength > chasePos.y[i]
        ) {
            spawnplayer();
            break
        }
    }
}