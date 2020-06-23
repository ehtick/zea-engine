<a name="VertexAttribute"></a>

## VertexAttribute ⇐ <code>Attribute</code>
Class representing vertex attributes.

**Kind**: global class  
**Extends**: <code>Attribute</code>  

* [VertexAttribute ⇐ <code>Attribute</code>](#VertexAttribute)
    * [new VertexAttribute(geom, dataType, expectedSize, defaultScalarValue)](#new-VertexAttribute)
    * [getFaceVertexValueRef(face, facevertex) ⇒ <code>any</code>](#getFaceVertexValueRef)
    * [setFaceVertexValue(face, facevertex, value)](#setFaceVertexValue)
    * [setFaceVertexValue_ByVertexIndex(face, vertex, value)](#setFaceVertexValue_ByVertexIndex)
    * [setSplitVertexValue(vertex, face, value)](#setSplitVertexValue)
    * [setSplitVertexValues(vertex, faceGroup, value)](#setSplitVertexValues)
    * [getSplits() ⇒ <code>any</code>](#getSplits)
    * [getSplitCount() ⇒ <code>any</code>](#getSplitCount)
    * [generateSplitValues(splitIndices, splitCount) ⇒ <code>any</code>](#generateSplitValues)
    * [toJSON(context, flags) ⇒ <code>object</code>](#toJSON)
    * [fromJSON(json, context, flags)](#fromJSON)
    * [loadSplitValues(reader)](#loadSplitValues)

<a name="new_VertexAttribute_new"></a>

### new VertexAttribute
Create vertex attributes


| Param | Type | Description |
| --- | --- | --- |
| geom | <code>any</code> | The geom value. |
| dataType | <code>any</code> | The dataType value. |
| expectedSize | <code>any</code> | The expectedSize value. |
| defaultScalarValue | <code>number</code> | The default scalar value. |

<a name="VertexAttribute+getFaceVertexValueRef"></a>

### getFaceVertexValueRef
The getFaceVertexValueRef method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| face | <code>any</code> | The face value. |
| facevertex | <code>any</code> | The facevertex value. |

<a name="VertexAttribute+setFaceVertexValue"></a>

### setFaceVertexValue
The setFaceVertexValue method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  

| Param | Type | Description |
| --- | --- | --- |
| face | <code>any</code> | The face value. |
| facevertex | <code>any</code> | The facevertex value. |
| value | <code>any</code> | The value value. |

<a name="VertexAttribute+setFaceVertexValue_ByVertexIndex"></a>

### setFaceVertexValue
The setFaceVertexValue_ByVertexIndex method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  

| Param | Type | Description |
| --- | --- | --- |
| face | <code>any</code> | The face value. |
| vertex | <code>any</code> | The vertex value. |
| value | <code>any</code> | The value value. |

<a name="VertexAttribute+setSplitVertexValue"></a>

### setSplitVertexValue
The setSplitVertexValue method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>any</code> | The vertex value. |
| face | <code>any</code> | The face value. |
| value | <code>any</code> | The value value. |

<a name="VertexAttribute+setSplitVertexValues"></a>

### setSplitVertexValues
The setSplitVertexValues method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  

| Param | Type | Description |
| --- | --- | --- |
| vertex | <code>any</code> | The vertex value. |
| faceGroup | <code>any</code> | The faceGroup value. |
| value | <code>any</code> | The value value. |

<a name="VertexAttribute+getSplits"></a>

### getSplits
The getSplits method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  
**Returns**: <code>any</code> - - The return value.  
<a name="VertexAttribute+getSplitCount"></a>

### getSplitCount
The getSplitCount method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  
**Returns**: <code>any</code> - - The return value.  
<a name="VertexAttribute+generateSplitValues"></a>

### generateSplitValues
The generateSplitValues method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  
**Returns**: <code>any</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| splitIndices | <code>any</code> | The splitIndices value. |
| splitCount | <code>number</code> | The splitCount value. |

<a name="VertexAttribute+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  
**Returns**: <code>object</code> - - Returns the json object.  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="VertexAttribute+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>object</code> | The json object this item must decode. |
| context | <code>object</code> | The context value. |
| flags | <code>number</code> | The flags value. |

<a name="VertexAttribute+loadSplitValues"></a>

### loadSplitValues
The loadSplitValues method.

**Kind**: instance method of [<code>VertexAttribute</code>](#VertexAttribute)  

| Param | Type | Description |
| --- | --- | --- |
| reader | <code>object</code> | The reader value. |
