



$(document).ready(function() {
    init();
});

    var initialX;
    var initialY;

var svg = document.getElementById('svg1');
rect = {};
drag = false;
var colorPicker = document.getElementById('colorPicker');
var selectTool = document.getElementById('selectRectangle');
var addTool = document.getElementById('addRectangle');
var offset_coords = $("#svg1").offset();

var handleSize = 8;
var currentHandle = false;


function init() {
    svg.addEventListener("mousemove", mouseMove, false);
    svg.addEventListener('mousedown', mouseDown, false);
    svg.addEventListener('mousedown', mouseHandle, false);
    svg.addEventListener('mouseup', mouseUp, false);
    svg.addEventListener("contextmenu", highlightShape, false);


}


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

function point(x, y) {
    return {
        x: x,
        y: y
    };
}

function dist(p1, p2) {
    return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}

function getHandle(mouse) {
    if (dist(mouse, point(rect.x, rect.y)) <= handleSize)
        return 'topLeft';
    if (dist(mouse, point(rect.x + rect.w, rect.y)) <= handleSize)
        return 'topRight';
    if (dist(mouse, point(rect.x, rect.y + rect.h)) <= handleSize)
        return 'bottomLeft';
    if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h)) <= handleSize)
        return 'bottomRight';
    if (dist(mouse, point(rect.x + rect.w / 2, rect.y)) <= handleSize)
        return 'top';
    if (dist(mouse, point(rect.x, rect.y + rect.h / 2)) <= handleSize)
        return 'left';
    if (dist(mouse, point(rect.x + rect.w /2, rect.y + rect.h)) <= handleSize)
        return 'bottom';
    if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h / 2)) <= handleSize)
        return 'right';
    return false;
}

function mouseHandle(e) {
    var previousHandle = currentHandle;
    if (!drag)
        currentHandle = getHandle(point(e.pageX - offset_coords.left, e.pageY - offset_coords.top));
    if (currentHandle && drag) {
        var mousePos = point(e.pageX - offset_coords.left, e.pageY - offset_coords.top);
        switch (currentHandle) {
            case 'topLeft':
                rect.w += rect.x - mousePos.x;
                rect.h += rect.y - mousePos.y;
                rect.x = mousePos.x;
                rect.y = mousePos.y;
                break;
            case 'topRight':
                rect.w = mousePos.x - rect.x;
                rect.h += rect.y - mousePos.y;
                rect.y = mousePos.y;
                break;
            case 'bottomLeft':
                rect.w += rect.x - mousePos.x;
                rect.x = mousePos.x;
                rect.h = mousePos.y - rect.y;
                break;
            case 'bottomRight':
                rect.w = mousePos.x - rect.x;
                rect.h = mousePos.y - rect.y;
                break;
            case 'top':
                rect.h += rect.y - mousePos.y;
                rect.y = mousePos.y;
                break;
            case 'left':
                rect.w += rect.x - mousePos.x;
                rect.x = mousePos.x;
                break;
            case 'bottom':
                rect.h = mousePos.y - rect.y;
                break;
            case 'right':
                rect.w = mousePos.x - rect.x;
                break;
        }
    }
    if (drag || currentHandle != previousHandle)
        update(shapeNumber);

}


