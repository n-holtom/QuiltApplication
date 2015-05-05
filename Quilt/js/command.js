// QuiltSquare constructor
var Command = function()
{

};

// Set "constructor" property to refer to Rect
Command.prototype.constructor = Command;

Command.prototype.execute = function()
{

};

Command.prototype.Unexecute = function()
{

};


CreateShape.prototype = new Command();
CreateShape.prototype.constructor = CreateShape;

var CreateShape = function()
{
    var state = "create";
};



RemoveShape.prototype = new Command();
RemoveShape.prototype.constructor = RemoveShape;

var RemoveShape = function()
{
    var state = "remove";
};




SelectShape.prototype = new Command();
SelectShape.prototype.constructor = SelectShape;

var SelectShape = function()
{
    var state = "select";
};


RedrawShape.prototype = new Command();
RedrawShape.prototype.constructor = RedrawShape;

var RedrawShape = function()
{
    var state = "redraw";
};
