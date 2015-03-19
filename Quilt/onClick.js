$(document).ready(function() {
    init();
});

var initialX;
var initialY;
var selectedShape = {};

var svg = document.getElementById('svg1');
var rect = {};
var drag = false;
var colorPicker = document.getElementById('colorPicker');
var selectTool = document.getElementById('selectRectangle');
var addTool = document.getElementById('addRectangle');
var offset_coords = $("#svg1").offset();

var handleSize = 10;
var currentHandle = false;



function init() {
    svg.addEventListener("mousemove", mouseMove, false);
    svg.addEventListener('mousedown', mouseDown, false);
    svg.addEventListener('mousemove', mouseHandle, false);
    svg.addEventListener('mouseup', mouseUp, false);
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
    else if (selectTool.checked)
    {
        highlightShape(event.pageX, event.pageY);
    }

}

function mouseUp(event) {
    currentHandle = false;
    if (addTool.checked) {

        drag = false;

        shapesArray[shapeNumber] = {};

        shapesArray[shapeNumber].w = rect.w;
        shapesArray[shapeNumber].h = rect.h;
        shapesArray[shapeNumber].startX = rect.startX;
        shapesArray[shapeNumber].startY = rect.startY;
        shapesArray[shapeNumber].id = shapeNumber;
        shapesArray[shapeNumber].color = rect.color;
        shapesArray[shapeNumber].selected = false;


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

function highlightShape(x, y)
{
         var i;

        var xLocation = x - offset_coords.left;
        var yLocation = y - offset_coords.top;

        // Deselect all shapes
        for (i = 0; i < shapeNumber; i++)
        {
            if (document.getElementById("rect" + i) != null)
            {
                document.getElementById("rect" + i).setAttribute("stroke-width", 0);
                deleteSelectedShapeData();
            }
        }

        for (i = 0; i < shapeNumber; i++)
        {

            if (((xLocation > shapesArray[i].startX) && (xLocation < (shapesArray[i].startX + shapesArray[i].w))) &&
                ((yLocation > shapesArray[i].startY) && (yLocation < (shapesArray[i].startY + shapesArray[i].h)))) {
                var toHighlight = document.getElementById("rect" + i);

                if (toHighlight.getAttribute("stroke-width") == 0) {
                    document.getElementById("rect" + i).setAttribute("stroke-width", 3);
                    document.getElementById("rect" + i).setAttribute("stroke", "#000000");
                    selectedShape = shapesArray[i];

                    updateSelectedShapeData();
                }
                else {
                    document.getElementById("rect" + i).setAttribute("stroke-width", 0);
                }
            }
        }

}

function updateSelectedShapeData()
{
    document.getElementById("shapeId").value = selectedShape.id;
    document.getElementById("shapeColor").value = selectedShape.color;
    document.getElementById("shapeXCoordinate").value = selectedShape.startX;
    document.getElementById("shapeYCoordinate").value = selectedShape.startY;
    document.getElementById("shapeWidth").value = selectedShape.w;
    document.getElementById("shapeHeight").value = selectedShape.h;

}

function deleteSelectedShapeData()
{
    document.getElementById("shapeId").value = " ";
    document.getElementById("shapeColor").value = " ";
    document.getElementById("shapeXCoordinate").value = " ";
    document.getElementById("shapeYCoordinate").value = " ";
    document.getElementById("shapeWidth").value = " ";
    document.getElementById("shapeHeight").value = " ";
}

function deleteSelectedShape()
{
    remove(selectedShape.id);
    removeHandles(selectedShape.id)
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
    if (dist(mouse, point(rect.startX, rect.startY)) <= handleSize)
        return 'topLeft';
    if (dist(mouse, point(rect.startX + rect.w, rect.startY)) <= handleSize)
        return 'topRight';
    if (dist(mouse, point(rect.startX, rect.startY + rect.h)) <= handleSize)
        return 'bottomLeft';
    if (dist(mouse, point(rect.startX + rect.w, rect.startY + rect.h)) <= handleSize)
        return 'bottomRight';
    if (dist(mouse, point(rect.startX + rect.w / 2, rect.startY)) <= handleSize)
        return 'top';
    if (dist(mouse, point(rect.startX, rect.startY + rect.h / 2)) <= handleSize)
        return 'left';
    if (dist(mouse, point(rect.startX + rect.w /2, rect.startY + rect.h)) <= handleSize)
        return 'bottom';
    if (dist(mouse, point(rect.startX + rect.w, rect.startY + rect.h / 2)) <= handleSize)
        return 'right';
    return false;
}

function mouseHandle(e) {
    if (selectTool.checked) {
        var previousHandle = currentHandle;
        if (!drag)
            currentHandle = getHandle(point(e.pageX - offset_coords.left, e.pageY - offset_coords.top));
        if (!currentHandle && previousHandle != false){
            removeHandles(selectedShape.id);
        }
        if (currentHandle && drag) {
            var mousePos = point(e.pageX - offset_coords.left, e.pageY - offset_coords.top);
            switch (currentHandle) {
                case 'topLeft':
                    rect.w += rect.startX - mousePos.x;
                    rect.h += rect.startY - mousePos.y;
                    rect.startX = mousePos.x;
                    rect.startY = mousePos.y;
                    break;
                case 'topRight':
                    rect.w = mousePos.x - rect.startX;
                    rect.h += rect.startY - mousePos.y;
                    rect.startY = mousePos.y;
                    break;
                case 'bottomLeft':
                    rect.w += rect.startX - mousePos.x;
                    rect.startX = mousePos.x;
                    rect.h = mousePos.y - rect.startY;
                    break;
                case 'bottomRight':
                    rect.w = mousePos.x - rect.startX;
                    rect.h = mousePos.y - rect.startY;
                    break;
                case 'top':
                    rect.h += rect.startY - mousePos.y;
                    rect.startY = mousePos.y;
                    break;
                case 'left':
                    rect.w += rect.startX - mousePos.x;
                    rect.startX = mousePos.x;
                    break;
                case 'bottom':
                    rect.h = mousePos.y - rect.startY;
                    break;
                case 'right':
                    rect.w = mousePos.x - rect.startX;
                    break;
            }
        }
        if (drag || currentHandle != previousHandle)
            drawHandle(shapeNumber-1);
    }

}

function drawHandle() {
    if (currentHandle) {
        var posHandle = point(0,0);
        switch (currentHandle) {
            case 'topLeft':
                posHandle.x = rect.startX;
                posHandle.y = rect.startY;
                break;
            case 'topRight':
                posHandle.x = rect.startX + rect.w;
                posHandle.y = rect.startY;
                break;
            case 'bottomLeft':
                posHandle.x = rect.startX;
                posHandle.y = rect.startY + rect.h;
                break;
            case 'bottomRight':
                posHandle.x = rect.startX + rect.w;
                posHandle.y = rect.startY + rect.h;
                break;
            case 'top':
                posHandle.x = rect.startX + rect.w / 2;
                posHandle.y = rect.startY;
                break;
            case 'left':
                posHandle.x = rect.startX;
                posHandle.y = rect.startY + rect.h / 2;
                break;
            case 'bottom':
                posHandle.x = rect.startX + rect.w / 2;
                posHandle.y = rect.startY + rect.h;
                break;
            case 'right':
                posHandle.x = rect.startX + rect.w;
                posHandle.y = rect.startY + rect.h / 2;
                break;
        }
        drawCorner(selectedShape.id,currentHandle,posHandle.x, posHandle.y, handleSize)
    }
}

function drawCorner(shapeID, handle, x, y, handleSize) {
    svg.innerHTML += '<circle id=' + shapeID + handle +' cx="' + x + '" cy="' + y + '" r="' + handleSize + '" fill=black" />';
}

function removeHandles(shapeID) {
    var toRemove = document.getElementById(shapeID + 'topLeft');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'topRight');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'top');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'bottomLeft');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'bottomRight');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'bottom');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'left');
    if (toRemove != null)
        svg.removeChild(toRemove);
    var toRemove = document.getElementById(shapeID + 'right');
    if (toRemove != null)
        svg.removeChild(toRemove);
}


