<a name="Box2"></a>

## Box2
Represents a box in 2D space. Needing two Vec2 vectors describing the corners

**Kind**: global class  

* [Box2](#Box2)
    * [new Box2(p0, p1)](#new-Box2)
    * [set(p0, p1)](#set)
    * [reset()](#reset)
    * [isValid() ⇒ <code>boolean</code>](#isValid)
    * [addPoint(point)](#addPoint)
    * [size()](#size)
    * [diagonal()](#diagonal)
    * [center() ⇒ <code>Vec2</code>](#center)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [toString() ⇒ <code>string</code>](#toString)

<a name="new_Box2_new"></a>

### new Box2
Creates a Box2 object using Vec2s.


| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Vec2</code> | A point representing the corners of a 2D box. |
| p1 | <code>Vec2</code> | A point representing the corners of a 2D box. |

<a name="Box2+set"></a>

### set
Sets both Vect2 points

**Kind**: instance method of [<code>Box2</code>](#Box2)  

| Param | Type | Description |
| --- | --- | --- |
| p0 | <code>Vec2</code> | A point representing the corners of a 2D box. |
| p1 | <code>Vec2</code> | A point representing the corners of a 2D box. |

<a name="Box2+reset"></a>

### reset
Resets the box2 back to an uninitialized state.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**See**: [`Number.POSITIVE_INFINITY`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)
<a name="Box2+isValid"></a>

### isValid
Returns `true` if the box has been expanded to contain a point.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>boolean</code> - - The return value.  
<a name="Box2+addPoint"></a>

### addPoint
Expands the Box2 to contain the new point.

**Kind**: instance method of [<code>Box2</code>](#Box2)  

| Param | Type | Description |
| --- | --- | --- |
| point | <code>Vec2</code> | A point represents the corners of a 2D box. |

<a name="Box2+size"></a>

### size
Returns the size of a Box2.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Box2</code>](#Box2) - - Returns a Box2.  
<a name="Box2+diagonal"></a>

### diagonal
Returns the size of a Box2 - the same as size().

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: [<code>Box2</code>](#Box2) - - Returns a Box2.  
<a name="Box2+center"></a>

### center
Returns the center point of a Box2.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>Vec2</code> - - Returns a Vec2.  
<a name="Box2+toJSON"></a>

### toJSON
Encodes `Box2` Class as a JSON object for persistence.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>object</code> - - The json object.  
<a name="Box2+toString"></a>

### toString
Calls `toJSON` method and stringifies it.

**Kind**: instance method of [<code>Box2</code>](#Box2)  
**Returns**: <code>string</code> - - The return value.  