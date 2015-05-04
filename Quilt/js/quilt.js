// Quilt constructor
var Quilt = function(dimensionsX, dimensionsY)
{
    this.squareArray = [];
    this.dimensionsX = dimensionsX;
    this.dimensionsY = dimensionsY;
};

//QuiltSquare.prototype = Object.create(Shape.prototype);

// Set "constructor" property to refer to Quilt
Quilt.prototype.constructor = Quilt;

Quilt.prototype.addQuiltSquare = function(squareToAdd)
{
    this.squareArray[this.squareArray.length] = squareToAdd;
};

Quilt.prototype.removeQuiltSquare = function()
{
    this.squareArray.length--;
};
