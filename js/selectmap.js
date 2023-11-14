
for (var i = 0; i < allLevels.length; i++) {
    menuLVLBtn = document.createElement('button');
    menuLVLBtn.innerHTML =(i + 1);
    menuLVLBtn.classList.add('lvlbtn');
    menuLVLBtn.classList.add('custom-btn');
    menuLVLBtn.setAttribute("onclick", "nextlevel(" + i + "); document.getElementById('gameboard').style.opacity=1; closeFullMenu(); document.getElementsByTagName('body')[0].style.overflow = 'visible'");
    document.getElementById("lvlpage").appendChild(menuLVLBtn);
}
function closeLVLMenu() {
    document.getElementById('lvlpage').style.display = 'none';
}
function closeFullMenu() {
    document.getElementById('mainpage').style.display = 'none';
}

