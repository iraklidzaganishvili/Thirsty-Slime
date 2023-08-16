//Styling stuff
window.addEventListener('resize', resize);
function resize() {
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    if (canvas.offsetWidth > viewportWidth || canvas.offsetHeight > viewportHeight) {
        canvas.style.left = '0%';
        canvas.style.top = '0%';
        canvas.style.transform = 'translate(0%, 0%)';
    } else {
        canvas.style.left = '50%';
        canvas.style.top = '50%';
        canvas.style.transform = 'translate(-50%, -50%)';
    }
}
resize();