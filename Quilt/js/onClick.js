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

        shapesByID[shapeNumber].create();


    }
    else if (selectTool.checked && event.target !== event.currentTarget)
    {
        var clickedRectID = event.target.id.match(/[0-9]+/);
        selectedShape = clickedRectID;
        shapesByID[clickedRectID].highlightShape();
        updateSelectedShapeData();
        if (currentHandle)
        {
            drag = true;
        }
    }
    else if (selectTool.checked)
    {
        deselectAll();
    }
    event.stopPropagation();

}

function mouseUp(event) {
    currentHandle = false;
    drag = false;

    if (addTool.checked) {

        svg.style.cursor = "default";

        if (checkRectangleSize())
        {
            shapeNumber++;
        }
    }

    updateSelectedShapeData();
}

// Check if rectangle is big enough
function checkRectangleSize()
{
    var currentRect = shapesByID[shapeNumber];

    if ((currentRect.height < 10) || (currentRect.width < 10))
    {
        currentRect.remove();
        currentRect.removeHandles();
        return false;
    }

    return true;
}

function mouseMove(e) {
    if (drag)
    {
        if (addTool.checked)
         {
            var currentRect = shapesByID[shapeNumber];
            var mousePos = point(e.pageX - offset_coords.left, e.pageY - offset_coords.top);
            currentRect.width = Math.abs(mousePos.x - startX);
            currentRect.height = Math.abs(mousePos.y - startY);

            currentRect.startX = (mousePos.x - startX < 0) ? mousePos.x : startX;
            currentRect.startY = (mousePos.y - startY < 0) ? mousePos.y : startY;

            currentRect.redraw();
        }
    }
}

function deselectAll()
{
    for (var i = 0; i < shapeNumber; i++)
    {
        if (document.getElementById("rect" + i) != null)
        {
            document.getElementById("rect" + i).setAttribute("stroke-width", 0);
        }
    }
    selectedShape = null;
    deleteSelectedShapeData();
}


function updateSelectedShapeData()
{
    document.getElementById("shapeId").value = shapesByID[selectedShape].id;
    document.getElementById("shapeColor").value = shapesByID[selectedShape].color;
    document.getElementById("shapeXCoordinate").value = shapesByID[selectedShape].startX;
    document.getElementById("shapeYCoordinate").value = shapesByID[selectedShape].startY;
    document.getElementById("shapeWidth").value = shapesByID[selectedShape].width;
    document.getElementById("shapeHeight").value = shapesByID[selectedShape].height;

}

function handleChangedTextBox(checkBoxName) {

    if (checkBoxName == 'shapeHeight')
    {
        shapesByID[selectedShape].height = document.getElementById("shapeHeight").value;
    }
    else if (checkBoxName == 'shapeWidth')
    {
        shapesByID[selectedShape].width = document.getElementById("shapeWidth").value;
    }
    else if (checkBoxName == 'shapeYCoordinate')
    {
        shapesByID[selectedShape].startY = document.getElementById("shapeYCoordinate").value;
    }
    else if (checkBoxName == 'shapeXCoordinate')
    {
        shapesByID[selectedShape].startX = document.getElementById("shapeXCoordinate").value;
    }
    else if (checkBoxName == 'shapeColor')
    {
        shapesByID[selectedShape].color = document.getElementById("shapeColor").value;
        shapesByID[selectedShape].setColor(shapesByID[selectedShape].color);
    }

        shapesByID[selectedShape].redraw();
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
    shapesByID[selectedShape].removeHandles();
    deselectAll();
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
    var selectShape = shapesByID[selectedShape];
    if (dist(mouse, point(selectShape.startX, selectShape.startY)) <= handleSize)
        return 'topLeft';
    if (dist(mouse, point(selectShape.startX + selectShape.width, selectShape.startY)) <= handleSize)
        return 'topRight';
    if (dist(mouse, point(selectShape.startX, selectShape.startY + selectShape.height)) <= handleSize)
        return 'bottomLeft';
    if (dist(mouse, point(selectShape.startX + selectShape.width, selectShape.startY + selectShape.height)) <= handleSize)
        return 'bottomRight';
    if (dist(mouse, point(selectShape.startX + selectShape.width / 2, selectShape.startY)) <= handleSize)
        return 'top';
    if (dist(mouse, point(selectShape.startX, selectShape.startY + selectShape.height / 2)) <= handleSize)
        return 'left';
    if (dist(mouse, point(selectShape.startX + selectShape.width /2, selectShape.startY + selectShape.height)) <= handleSize)
        return 'bottom';
    if (dist(mouse, point(selectShape.startX + selectShape.width, selectShape.startY + selectShape.height / 2)) <= handleSize)
        return 'right';
    return false;
}



function mouseHandle(e) {
    var selectShape = shapesByID[selectedShape];
    if (selectTool.checked && selectedShape != null) {
        var previousHandle = currentHandle;
        if (!drag)
            currentHandle = getHandle(point(e.pageX - offset_coords.left, e.pageY - offset_coords.top));
        if (!currentHandle && previousHandle != false){
            selectShape.removeHandles();
        }
        if (currentHandle && drag) {
            var mousePos = point(e.pageX - offset_coords.left, e.pageY - offset_coords.top);
            switch (currentHandle) {
                case 'topLeft':
                    selectShape.width += selectShape.startX - mousePos.x;
                    selectShape.height += selectShape.startY - mousePos.y;
                    selectShape.startX = mousePos.x;
                    selectShape.startY = mousePos.y;
                    break;
                case 'topRight':
                    selectShape.width = mousePos.x - selectShape.startX;
                    selectShape.height += selectShape.startY - mousePos.y;
                    selectShape.startY = mousePos.y;
                    break;
                case 'bottomLeft':
                    selectShape.width += selectShape.startX - mousePos.x;
                    selectShape.startX = mousePos.x;
                    selectShape.height = mousePos.y - selectShape.startY;
                    break;
                case 'bottomRight':
                    selectShape.width = mousePos.x - selectShape.startX;
                    selectShape.height = mousePos.y - selectShape.startY;
                    break;
                case 'top':
                    selectShape.height += selectShape.startY - mousePos.y;
                    selectShape.startY = mousePos.y;
                    break;
                case 'left':
                    selectShape.width += selectShape.startX - mousePos.x;
                    selectShape.startX = mousePos.x;
                    break;
                case 'bottom':
                    selectShape.height = mousePos.y - selectShape.startY;
                    break;
                case 'right':
                    selectShape.width = mousePos.x - selectShape.startX;
                    break;
            }
        }
        if (drag || currentHandle != previousHandle)
            selectShape.drawHandle(currentHandle);
            selectShape.redraw();

    }

}


