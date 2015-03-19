



$(document).ready(function() {
    init();
});

    var initialX;
    var initialY;

var svg = document.getElementById('svg1'), rect = {}, drag = false;
var colorPicker = document.getElementById('colorPicker');
var selectTool = document.getElementById('selectRectangle');
var addTool = document.getElementById('addRectangle');

function init() {
    svg.addEventListener("mousemove", mouseMove, false);
    svg.addEventListener('mousedown', mouseDown, false);
    svg.addEventListener('mouseup', mouseUp, false);
    svg.addEventListener("contextmenu", highlightShape, false);


}


offset_coords = $("#svg1").offset();

function mouseDown(event) {

    if (addTool.checked)
    {

        // Set start coordinates of rectangle
        rect.startX = event.pageX - offset_coords.left;
        rect.startY = event.pageY - offset_coords.top;
        rect.h = 1;
        rect.w = 1;
        rect.id = shapeNumber;

        draw();

        // Allow drag functionality
        drag = true;
    }
}

function mouseUp(event) {
    if (addTool.checked) {

        drag = false;

        shapesArray[shapeNumber] = {};

        shapesArray[shapeNumber].w = rect.w;
        shapesArray[shapeNumber].h = rect.h;
        shapesArray[shapeNumber].startX = rect.startX;
        shapesArray[shapeNumber].startY = rect.startY;
        shapesArray[shapeNumber].id = shapeNumber;
        shapesArray[shapeNumber].color = rect.color;


        shapeNumber++;
    }
}

function mouseMove(event) {
    if (addTool.checked)
    {
        if (drag) {
            rect.w = (event.pageX - offset_coords.left) - rect.startX;
            rect.h = (event.pageY - offset_coords.top) - rect.startY;

            update(shapeNumber);
        }
    }
}

function update(rectangleNumber)
{
    var toUpdate = document.getElementById("rect"+rectangleNumber);

    toUpdate.setAttribute("width", rect.w);
    toUpdate.setAttribute("height", rect.h);
}

var shapeNumber = 0;

var shapesArray = {};

function draw()
{
    rect.color = colorPicker.value;

    svg.innerHTML += '<rect id=rect' + shapeNumber +' width="' + rect.w + '" height="' + rect.h + '" x="' + rect.startX + '" y="' + rect.startY +
        '" style="fill:#' + rect.color +'"'+ ' />';

}

function highlightShape(event)
{
    if (selectTool.checked)
    {

        var i;

        var xLocation = event.pageX - offset_coords.left;
        var yLocation = event.pageY - offset_coords.top;

        for (i = 0; i < shapeNumber; i++)
        {
            if (((xLocation > shapesArray[i].startX) && (xLocation < (shapesArray[i].startX + shapesArray[i].w))) &&
                ((yLocation > shapesArray[i].startY) && (yLocation < (shapesArray[i].startY + shapesArray[i].h))))
            {
                var toHighlight = document.getElementById("rect" + i);

                if (toHighlight.getAttribute("stroke-width") == 0)
                {
                    document.getElementById("rect" + i).setAttribute("stroke-width", 3);
                    document.getElementById("rect" + i).setAttribute("stroke", "#000000");
                }
                else
                {
                    document.getElementById("rect" + i).setAttribute("stroke-width", 0);
                }
            }
        }
    }

}


function remove(rectangleNumber)
{
    var toRemove = document.getElementById("rect"+rectangleNumber);

    svg.removeChild(toRemove);

}



