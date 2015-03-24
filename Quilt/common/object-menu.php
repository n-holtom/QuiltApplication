<div id="object-menu">


    <form>
        Shape ID:<br>
        <input type="text" id = "shapeId" name="shapeId">
        <br>
        <br>
        Color:<br>
        <input type="text" id = "shapeColor" name="shapeColor"
               onchange="handleChangedTextBox('shapeColor')" />
        <br>
        <br>
        X Coordinate(Top left):<br>
        <input type="text" id = "shapeXCoordinate" name="shapeXCoordinate"
               onchange="handleChangedTextBox('shapeXCoordinate')" />
        <br>
        <br>
        Y Coordinate(Top Left):<br>
        <input type="text" id = "shapeYCoordinate" name="shapeYCoordinate"
               onchange="handleChangedTextBox('shapeYCoordinate')" />
        <br>
        <br>
        Width:<br>
        <input type="text" id = "shapeWidth" name="shapeWidth"
               onchange="handleChangedTextBox('shapeWidth')" />
        <br>
        <br>
        Height:<br>
        <input type="text" id = "shapeHeight" name="shapeHeight"
               onchange="handleChangedTextBox('shapeHeight')" />
    </form>

    <br>
    <br>

    <input id="shapeDelete" type="button" value="Delete Selected Shape"
           onclick="deleteSelectedShape()" />

</div>