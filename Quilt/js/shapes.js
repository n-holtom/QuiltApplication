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
    var toUpdate = document.getElementById(this.type+this.id);
    toUpdate.style.fill = ('#'+color);
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







