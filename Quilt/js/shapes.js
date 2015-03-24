// Shape constructor
var Shape = function(type, id, startX, startY, color, selected)
{
    this.type = type;
    this.id = id;
    this.startX = startX;
    this.startY = startY;
    this.color = color;
    this.selected = selected;
};

Shape.prototype.setStartX = function()
{
    var toUpdate = document.getElementById(this.type+this.id);
    toUpdate.setAttribute("x", this.startX);
};

Shape.prototype.setStartY = function()
{
    var toUpdate = document.getElementById(this.type+this.id);
    toUpdate.setAttribute("y", this.startY);
};

Shape.prototype.setColor = function(color)
{
    this.color = color;
};

Shape.prototype.highlightShape = function()
{
    // Deselect all shapes
    deselectAll();


    var toHighlight = document.getElementById(this.type+this.id);
    selectedShape = this.id;
    if (toHighlight.getAttribute("stroke-width") == 0) {
        toHighlight.setAttribute("stroke-width", 3);
        toHighlight.setAttribute("stroke", "#000000");

        updateSelectedShapeData();
    }
};

Shape.prototype.isNear = function()
{
    // Put code in to check if mouse cursor is near any rectangle vertices
    // 1. Get mouse position
    // 2. Get rectangle vertices from getHandle and put in array
    // 3. Check if within specified distance
    return false;
};

Shape.prototype.remove = function()
{
    var toRemove = document.getElementById(this.type+this.id);
    svg.removeChild(toRemove);

    //DELETE FROM OBJECT ARRAY?
};


// Rectangle constructor
function Rect(type, id, startX, startY, color, selected, height, width)
{
    // Inherits from shape object
    Shape.call(this, type, id, startX, startY, color, selected);

    this.height = height;
    this.width = width;
};

Rect.prototype = Object.create(Shape.prototype);

// Set "constructor" property to refer to Rect
Rect.prototype.constructor = Rect;

// Change height of rectangle (in pixels)
Rect.prototype.changeHeight = function()
{
    var toUpdate = document.getElementById("rect"+this.id);
    toUpdate.setAttribute("height", this.height);
};

// Change width of rectangle (in pixels)
Rect.prototype.changeWidth = function()
{
    var toUpdate = document.getElementById("rect"+this.id);
    toUpdate.setAttribute("width", this.width);
};

// Creates HTML code based upon Rect properties and current ColorPicker value
Rect.prototype.create = function() {
    svg.innerHTML += '<' + this.type + ' id=' + this.type + this.id +' width="' + this.width + '" height="' + this.height + '" x="' + this.startX + '" y="' + this.startY +
    '" style="fill:#' + this.color +'"'+ ' />';
};

Rect.prototype.redraw = function() {
    this.setStartX();
    this.setStartY();
    this.changeWidth();
    this.changeHeight();
};

Rect.prototype.drawHandle = function(currentHandle) {
    if (currentHandle) {
        this.removeHandles();
        var posHandle = point(0,0);
        switch (currentHandle) {
            case 'topLeft':
                posHandle.x = this.startX;
                posHandle.y = this.startY;
                break;
            case 'topRight':
                posHandle.x = this.startX + this.width;
                posHandle.y = this.startY;
                break;
            case 'bottomLeft':
                posHandle.x = this.startX;
                posHandle.y = this.startY + this.height;
                break;
            case 'bottomRight':
                posHandle.x = this.startX + this.width;
                posHandle.y = this.startY + this.height;
                break;
            case 'top':
                posHandle.x = this.startX + this.width / 2;
                posHandle.y = this.startY;
                break;
            case 'left':
                posHandle.x = this.startX;
                posHandle.y = this.startY + this.height / 2;
                break;
            case 'bottom':
                posHandle.x = this.startX + this.width / 2;
                posHandle.y = this.startY + this.height;
                break;
            case 'right':
                posHandle.x = this.startX + this.width;
                posHandle.y = this.startY + this.height / 2;
                break;
        }
        this.drawCorner(currentHandle,posHandle.x, posHandle.y, handleSize)
    }
};

Rect.prototype.drawCorner = function(handle, x, y, handleSize) {
    svg.innerHTML += '<circle id=' + this.type + this.id + handle +' cx="' + x + '" cy="' + y + '" r="' + handleSize + '" fill=black" />';
};

Rect.prototype.removeHandles = function removeHandles() {
    var rectID = this.type + this.id;
    var toRemove = document.getElementById(rectID + 'topLeft');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'topRight');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'top');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'bottomLeft');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'bottomRight');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'bottom');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'left');
    if (toRemove != null)
        svg.removeChild(toRemove);
    toRemove = document.getElementById(rectID + 'right');
    if (toRemove != null)
        svg.removeChild(toRemove);
};
