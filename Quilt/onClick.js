

/**
 * Created by Nick on 3/15/2015.


var initialX;
var initialY;


function mouseDown(event) {



}




function mouseUp(event) {



}

function init() {
    var x = document.getElementById("canvas");
    if(x) {
        x.addEventListener("mousedown", mouseDown, false);
    }
}

init();

 */

$(document).ready(function() {
    init();
});

    var initialX;
    var initialY;

var svg = document.getElementById('svg1'), rect = {}, drag = false;

function init() {
    svg.addEventListener("mousemove", mouseMove, false);
    svg.addEventListener('mousedown', mouseDown, false);
    svg.addEventListener('mouseup', mouseUp, false);
}

function mouseDown(event) {
    rect.startX = event.pageX - 240;
    rect.startY = event.pageY - 210;
    drag = true;
}
function mouseUp(event) {
    drag = false;

    rect.w = (event.pageX - 240) - rect.startX;
    rect.h = (event.pageY - 210) - rect.startY;

    draw();
}
function mouseMove(event) {
    //if (drag)
    //{

        //rect.w = (event.pageX - this.offsetLeft) - rect.startX;
        //rect.h = (event.pageY - this.offsetTop) - rect.startY;

        //draw();
    //}
}

var color = "blue";

function draw()
{

    svg.innerHTML += '<rect id=temp width="' + rect.w + '" height="' + rect.h + '" x="' + rect.startX + '" y="' + rect.startY + '" style="fill:rgb(48,159,200);stroke-width:3;stroke:rgb(0,0,0)"'+ ' />';
    //var array = [Math.abs(w), Math.abs(h), x, y, color, name];
    //rectArray[rectNum] = array; document.getElementById('rectArrayDisplay').innerHTML = rectArray;

}

