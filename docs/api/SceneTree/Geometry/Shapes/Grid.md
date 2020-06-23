<a name="Grid"></a>

## Grid ⇐ <code>Lines</code>
A class for generating a grid.

**Kind**: global class  
**Extends**: <code>Lines</code>  

* [Grid ⇐ <code>Lines</code>](#Grid)
    * [new Grid(x, y, xDivisions, yDivisions, skipCenterLines)](#new-Grid)
    * [sizeX ⇒ <code>number</code>](#sizeX)
    * [sizeX](#sizeX)
    * [sizeY ⇒ <code>number</code>](#sizeY)
    * [sizeY](#sizeY)
    * [divisionsX ⇒ <code>number</code>](#divisionsX)
    * [divisionsX](#divisionsX)
    * [divisionsY ⇒ <code>number</code>](#divisionsY)
    * [divisionsY](#divisionsY)
    * [setSize(x, y)](#setSize)
    * [toJSON() ⇒ <code>object</code>](#toJSON)

<a name="new_Grid_new"></a>

### new Grid
Create a grid.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> | <code>1</code> | The length of the grid along the X axis. |
| y | <code>number</code> | <code>1</code> | The length of the grid along the Y axis. |
| xDivisions | <code>number</code> | <code>10</code> | The number of divisions along the X axis. |
| yDivisions | <code>number</code> | <code>10</code> | The number of divisions along the X axis. |
| skipCenterLines | <code>boolean</code> | <code>false</code> | A boolean indicating whether to display the center grid lines or not. |

<a name="Grid+sizeX"></a>

### sizeX 
Getter for the length of the grid along the X axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Grid+sizeX"></a>

### size
Setter for the length of the grid along the X axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the X axis. |

<a name="Grid+sizeY"></a>

### sizeY 
Getter for the length of the grid along the Y axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Grid+sizeY"></a>

### size
Setter for the length of the grid along the U axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The length along the Y axis. |

<a name="Grid+divisionsX"></a>

### divisionsX 
Getter for the number of divisions along the X axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  
**Returns**: <code>number</code> - - Returns the number of divisions.  
<a name="Grid+divisionsX"></a>

### divisions
Setter for the number of divisions along the X axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The number of divisions. |

<a name="Grid+divisionsY"></a>

### divisionsY 
Getter for the number of divisions along the Y axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  
**Returns**: <code>number</code> - - Returns the number of divisions.  
<a name="Grid+divisionsY"></a>

### divisions
Setter for the number of divisions along the Y axis.

**Kind**: instance property of [<code>Grid</code>](#Grid)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The number of divisions. |

<a name="Grid+setSize"></a>

### setSize
Setter for the size of the grid.

**Kind**: instance method of [<code>Grid</code>](#Grid)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The length along the X axis. |
| y | <code>number</code> | The length along the Y axis. |

<a name="Grid+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Grid</code>](#Grid)  
**Returns**: <code>object</code> - - Returns the json object.  