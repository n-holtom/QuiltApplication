// Quilt constructor
var Quilt = function(dimensionsX, dimensionsY)
{
    this.squareArray = [];
    this.dimensionsX = dimensionsX;
    this.dimensionsY = dimensionsY;
};

//QuiltSquare.prototype = Object.create(Shape.prototype);

// Set "constructor" property to refer to Rect
Quilt.prototype.constructor = Quilt;

Quilt.prototype.addQuiltSquare(squareToAdd)
{
    this.squareArray[this.squareArray.length] = squareToAdd;
}

Quilt.prototype.removeQuiltSquar()
{
    this.squareArray.length--;
}
