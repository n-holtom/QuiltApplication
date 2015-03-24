$(document).ready(function() {
    init();
});

var initialX;
var initialY;
var selectedShape = null;

var svg = document.querySelector('#svg1');
var shapesByID = {};
var drag = false;
var colorPicker = document.getElementById('colorPicker');
var selectTool = document.getElementById('selectRectangle');
var addTool = document.getElementById('addRectangle');
var offset_coords = $("#svg1").offset();

var handleSize = 10;
var currentHandle = false;

var shapeNumber = 0;

var shapesArray = {};



function init() {
    svg.addEventListener("mousemove", mouseMove, false);
    svg.addEventListener('mousedown', mouseDown, false);
    svg.addEventListener('mousemove', mouseHandle, false);
    svg.addEventListener('mouseup', mouseUp, false);
}


function mouseDown(event) {
    if (addTool.checked)
    {
        // Allow drag functionality
        drag = true;
        svg.style.cursor = "crosshair";
        // Set start coordinates of rectangle
        startX = event.pageX - offset_coords.left;
        startY = event.pageY - offset_coords.top;
        height = 1;
        width = 1;
        shapesByID[shapeNumber] = new Rect('rect',shapeNumber,startX,startY,colorPicker.value,false,height,width);

        shapesByID[shapeNumber].draw();


    }
    else if (selectTool.checked && event.target !== event.currentTarget)
    {
        var clickedRectID = event.target.id.match(/[0-9]+/);
        shapesByID[clickedRectID].highlightShape();
        updateSelectedShapeData(clickedRectID);
        selectedShape = clickedRectID;
    }
    else if (selectTool.checked)
    {
        deselectAll();
    }
    event.stopPropagation();

}

function mouseUp(event) {
    currentHandle = false;
    if (addTool.checked) {

        drag = false;
        svg.style.cursor = "default";
        shapeNumber++;
    }
}

function mouseMove(event) {
    if (drag)
    {
        if (addTool.checked)
         {
            var currentRect = shapesByID[shapeNumber];
            var mx = mouseX(event);
            var my = mouseY(event);
            currentRect.width = Math.abs(mx - currentRect.startX);
            currentRect.height = Math.abs(my - currentRect.startY);

            currentRect.startX = (mx - currentRect.startX < 0) ? mx : currentRect.startX;
            currentRect.startY = (my - currentRect.startY < 0) ? my : currentRect.startY;

            currentRect.setStartX();
            currentRect.setStartY();
            currentRect.changeWidth();
            currentRect.changeHeight();
        }
    }
}

function mouseX(event) {
    mx = event.pageX - offset_coords.left;
    return mx;
}

function mouseY(event) {
    my = event.pageY - offset_coords.top;
    return my;
}

function deselectAll()
{
    for (i = 0; i < shapeNumber; i++)
    {
        if (document.getElementById("rect" + i) != null)
        {
            document.getElementById("rect" + i).setAttribute("stroke-width", 0);
        }
    }
    deleteSelectedShapeData();
}


function updateSelectedShapeData(clickedRectID)
{
    document.getElementById("shapeId").value = shapesByID[clickedRectID].id;
    document.getElementById("shapeColor").value = shapesByID[clickedRectID].color;
    document.getElementById("shapeXCoordinate").value = shapesByID[clickedRectID].startX;
    document.getElementById("shapeYCoordinate").value = shapesByID[clickedRectID].startY;
    document.getElementById("shapeWidth").value = shapesByID[clickedRectID].width;
    document.getElementById("shapeHeight").value = shapesByID[clickedRectID].height;

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
    shapesByID[selectedShape].remove();
    removeHandles(shapesByID[selectedShape].id);
    deselectAll();
    selectedShape = null;
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


