// Quilt constructor
var Document = function(preferences, quilt, author)
{
    this.preferences = preferences;
    this.quilt = quilt;
    this.author = author;
};

//QuiltSquare.prototype = Object.create(Shape.prototype);

// Set "constructor" property to refer to Rect
Document.prototype.constructor = Document;

