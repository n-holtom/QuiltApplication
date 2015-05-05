// QuiltSquare constructor
var Command = function()
{

};

// Set "constructor" property to refer to Rect
Command.prototype.constructor = Command;

Command.prototype.addShape = function()
{

};


CreateShape.prototype = new Command();
CreateShape.prototype.constructor = CreateShape;

var CreateShape = function()
{

};



RemoveShape.prototype = new Command();
RemoveShape.prototype.constructor = RemoveShape;

var RemoveShape = function()
{

};




SelectShape.prototype = new Command();
SelectShape.prototype.constructor = SelectShape;

var SelectShape = function()
{

};


RedrawShape.prototype = new Command();
RedrawShape.prototype.constructor = RedrawShape;

var RedrawShape = function()
{

};
