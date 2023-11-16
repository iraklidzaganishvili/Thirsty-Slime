//map
let level = 0;
let mapgen;
let blockgen;
let addpropgen;
let spawn;
let doorgen;
let alldoorsnum = 0;

//Moving block
let posInMovesetArray = [];
let smoother = [];
let exactBlockPosition = [];

//Chase
let chasePos = 0

//Keys
let keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

//colision logic
let bordcord = {
    minXMinY: 0,
    minXMaxY: 0,
    maXXminY: 0,
    maXXmaxY: 0
};

let game = {
    speed: 1000 / 20,
    w: 80,
    h: 40,
    blocklength: 0
};

let characterImage = document.getElementById('character');

let dim = 2;
let canvas = document.getElementById("gameboard");
let ctx = canvas.getContext('2d');
let size = canvas.getBoundingClientRect();
canvas.width = size.width * dim;
canvas.height = size.height * dim;
//Background image
canvas.style.backgroundImage = `url(./Sprites/biggrass.png)`;

//blocklength
game.blocklength = size.width / game.w;


//gameloop
let fps = 60;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;
let fpscounter = 0;
let deltatime = 1;
let transformX;
let transformY;

let lastFrameTimeMs = Date.now();
let FrameTimeMs;

//select map
var menuLVLBtn;

let prevPos = {
    x: [],
    y: []
}