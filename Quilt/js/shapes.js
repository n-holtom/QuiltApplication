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

Shape.prototype.setStartX = function(startX)
{
    this.startX = startX;
};

Shape.prototype.setStartY = function(startY)
{
    this.startY = startY;
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

    if (toHighlight.getAttribute("stroke-width") == 0) {
        toHighlight.setAttribute("stroke-width", 3);
        toHighlight.setAttribute("stroke", "#000000");

        updateSelectedShapeData(this.id);
    }
};

Shape.prototype.isNear = function()
{
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
Rect.prototype.draw = function() {
    svg.innerHTML += '<' + this.type + ' id=' + this.type + this.id +' width="' + this.width + '" height="' + this.height + '" x="' + this.startX + '" y="' + this.startY +
    '" style="fill:#' + this.color +'"'+ ' />';
};
