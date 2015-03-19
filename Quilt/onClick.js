

$(document).ready(function() {
    init();
});

    var initialX;
    var initialY;

var svg = document.getElementById('svg1'), rect = {}, drag = false;
var colorPicker = document.getElementById('colorPicker');

function init() {
    svg.addEventListener("mousemove", mouseMove, false);
    svg.addEventListener('mousedown', mouseDown, false);
    svg.addEventListener('mouseup', mouseUp, false);
    svg.addEventListener("contextmenu", highlightShape, false);
}


offset_coords = $("#svg1").offset();

function mouseDown(event) {
    rect.startX = event.pageX - offset_coords.left;
    rect.startY = event.pageY - offset_coords.top;
    drag = true;
}

function mouseUp(event) {
    drag = false;

    rect.w = (event.pageX - offset_coords.left) - rect.startX;
    rect.h = (event.pageY - offset_coords.top) - rect.startY;


    draw();

    rect.id = shapeNumber;
    shapesArray[shapeNumber-2] = rect;


}

function mouseMove(event) {
    if (drag)
    {

        rect.w = (event.pageX - offset_coords.left) - rect.startX;
        rect.h = (event.pageY - offset_coords.top) - rect.startY;

        if (shapeNumber > 0)
            remove(--shapeNumber);

        draw();
    }
}


var shapeNumber = 0;

var shapesArray = {};

function draw()
{

    var color = colorPicker.value;

    svg.innerHTML += '<rect id=rect' + shapeNumber++ +' width="' + rect.w + '" height="' + rect.h + '" x="' + rect.startX + '" y="' + rect.startY +
        '" style="fill:#' + color.charAt(0) + color.charAt(1) + color.charAt(2) + color.charAt(3) + color.charAt(4)
        + color.charAt(5) +'"'+ ' />';


    //var array = [Math.abs(w), Math.abs(h), x, y, color, name];
    //rectArray[rectNum] = array; document.getElementById('rectArrayDisplay').innerHTML = rectArray;

}

function highlightShape(event)
{
    var i;

    var xLocation = event.pageX - offset_coords.left;
    var yLocation = event.pageY - offset_coords.top;

    for (i=0; i<shapeNumber; i++)
    {
        if (((xLocation > shapesArray[i].startX) && (xLocation < (shapesArray[i].startX+shapesArray[i].w))) &&
            ((yLocation > shapesArray[i].startY) && (yLocation < (shapesArray[i].startY+shapesArray[i].h))))
        {
            document.getElementById("rect"+i).style.fill = '#FFFFFF';
        }
    }

}

function remove(rectangleNumber)
{
    var toRemove = document.getElementById("rect"+rectangleNumber);

    svg.removeChild(toRemove);

}



