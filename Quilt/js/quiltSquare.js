// QuiltSquare constructor
var QuiltSquare = function()
{
    this.shapeArray = [];
};

//QuiltSquare.prototype = Object.create(Shape.prototype);

// Set "constructor" property to refer to Rect
QuiltSquare.prototype.constructor = QuiltSquare;

QuiltSquare.prototype.addShape = function(shapeToAdd)
{
    this.shapeArray[this.shapeArray.length] = shapeToAdd;
};

QuiltSquare.prototype.removeShape = function()
{
    this.shapeArray.length--;
};