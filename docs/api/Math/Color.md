<a name="Color"></a>

## Color ⇐ <code>AttrValue</code>
Class representing a color.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Color ⇐ <code>AttrValue</code>](#Color)
    * [new Color(r, g, b, a)](#new-Color)
    * _instance_
        * [r ⇒ <code>number</code>](#r)
        * [r](#r)
        * [g ⇒ <code>number</code>](#g)
        * [g](#g)
        * [b ⇒ <code>number</code>](#b)
        * [b](#b)
        * [a ⇒ <code>number</code>](#a)
        * [a](#a)
        * [set(r, g, b, a)](#set)
        * [setFromOther(other)](#setFromOther)
        * [setFromScalarArray(vals)](#setFromScalarArray)
        * [getAsRGBArray() ⇒ <code>array</code>](#getAsRGBArray)
        * [getAsRGBDict() ⇒ <code>object</code>](#getAsRGBDict)
        * [setFromRGB(r, g, b, a)](#setFromRGB)
        * [setFromRGBArray(vals)](#setFromRGBArray)
        * [setFromRGBDict(vals)](#setFromRGBDict)
        * [setFromHex(hex)](#setFromHex)
        * [setFromCSSColorName(name)](#setFromCSSColorName)
        * [toHex() ⇒ <code>string</code>](#toHex)
        * [equal(other) ⇒ <code>boolean</code>](#equal)
        * [notequals(other) ⇒ <code>boolean</code>](#notequals)
        * [approxEqual(other, precision) ⇒ <code>boolean</code>](#approxEqual)
        * [add(other)](#add)
        * [subtract(other)](#subtract)
        * [scale(scalar)](#scale)
        * [scaleInPlace(scalar)](#scaleInPlace)
        * [applyGamma(gamma)](#applyGamma)
        * [toLinear(gamma)](#toLinear)
        * [toGamma(gamma)](#toGamma)
        * [luminance() ⇒ <code>number</code>](#luminance)
        * [lerp(other, t)](#lerp)
        * [clone()](#clone)
        * [asArray() ⇒ <code>array</code>](#asArray)
        * [toJSON() ⇒ <code>object</code>](#toJSON)
        * [fromJSON(j)](#fromJSON)
        * [toCSSString() ⇒ <code>string</code>](#toCSSString)
    * _static_
        * [random(gammaOffset, randomAlpha)](#random)

<a name="new_Color_new"></a>

### new Color
Creates a `Color` object with an RGBA structure.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> \| <code>string</code> \| <code>Float32Array</code> \| <code>ArrayBuffer</code> | <code>0</code> | The red channel of a color. |
| g | <code>number</code> | <code>0</code> | The green channel of a color. |
| b | <code>number</code> | <code>0</code> | The blue channel of a color. |
| a | <code>number</code> | <code>1</code> | The alpha (transparency) channel of a color. |

<a name="Color+r"></a>

### r 
Getter for red channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - Returns the red channel.  
<a name="Color+r"></a>

### color
Setter for red channel.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+g"></a>

### g 
Getter for green channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - Returns the green channel.  
<a name="Color+g"></a>

### color
Setter for green channel.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+b"></a>

### b 
Getter for blue channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - Returns the blue channel.  
<a name="Color+b"></a>

### color
Setter for blue channel.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+a"></a>

### a 
Getter for alpha channel.

**Kind**: instance property of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - Returns the alpha channel.  
<a name="Color+a"></a>

### color
Setter for alpha value.

**Kind**: instance property of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Color+set"></a>

### set
Setter from scalar components.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| r | <code>number</code> |  | The red channel. |
| g | <code>number</code> |  | The green channel. |
| b | <code>number</code> |  | The blue channel. |
| a | <code>number</code> | <code>1</code> | The alpha channel. |

<a name="Color+setFromOther"></a>

### setFromOther
Sets current color state with another `Color` object.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to set from. |

<a name="Color+setFromScalarArray"></a>

### setFromScalarArray
Setter from a scalar array.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>Float32Array</code> | The vals param. |

<a name="Color+getAsRGBArray"></a>

### getAsRGBArray
Getter from an RGB array.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>array</code> - - The return value.  
<a name="Color+getAsRGBDict"></a>

### getAsRGBDict
Getter from an RGB dict.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>object</code> - - The return value.  
<a name="Color+setFromRGB"></a>

### setFromRGB
Setter from a RGB value.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| r | <code>number</code> | The red channel. |
| g | <code>number</code> | The green channel. |
| b | <code>number</code> | The blue channel. |
| a | <code>number</code> | The alpha channel. |

<a name="Color+setFromRGBArray"></a>

### setFromRGBArray
Setter from an RGB array.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>Float32Array</code> | The vals param. |

<a name="Color+setFromRGBDict"></a>

### setFromRGBDict
Setter from an RGB dict.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| vals | <code>Float32Array</code> | The vals param. |

<a name="Color+setFromHex"></a>

### setFromHex
Setter from a hexadecimal value.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| hex | <code>number</code> | The hex value. |

<a name="Color+setFromCSSColorName"></a>

### setFromCSSColorName
Setter from a CSS color name.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The CSS color name. |

<a name="Color+toHex"></a>

### toHex
Returns the hexadecimal value of this color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>string</code> - - Returns the hex value.  
<a name="Color+equal"></a>

### equal
Returns true if this color is exactly the same as other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to compare with. |

<a name="Color+notequals"></a>

### notequals
Returns true if this color is NOT exactly the same as other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to compare with. |

<a name="Color+approxEqual"></a>

### approxEqual
Returns true if this color is approximately the same as other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Color+add"></a>

### add
Returns a new Color which is this Color added to other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to add. |

<a name="Color+subtract"></a>

### subtract
Returns a new color which is this color subtracted from other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to subtract. |

<a name="Color+scale"></a>

### scale
Scales this color by scalar and return the result as a new Vec4.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Color+scaleInPlace"></a>

### scaleInPlace
Scales this color by scalar.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Color+applyGamma"></a>

### applyGamma
Apply gamma correction to this color

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| gamma | <code>number</code> | The gamma value. |

<a name="Color+toLinear"></a>

### toLinear
Converts to linear color space and returns a new color

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="Color+toGamma"></a>

### toGamma
Converts to gamma color space and returns a new color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gamma | <code>number</code> | <code>2.2</code> | The gamma value. |

<a name="Color+luminance"></a>

### luminance
Calculates and returns the relative luminance of the linear RGB component.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>number</code> - - The return value.  
<a name="Color+lerp"></a>

### lerp
Performs a linear interpolation between this color and other.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Color</code>](#Color) | The other color to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Color+clone"></a>

### clone
Clones this color and returns a new color.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new color.  
<a name="Color+asArray"></a>

### asArray
Returns the type as an array. Often used to pass types to the GPU.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>array</code> - - Returns as an array.  
<a name="Color+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>object</code> - - The json object.  
<a name="Color+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Color</code>](#Color)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

<a name="Color+toCSSString"></a>

### toCSSString
Returns the CSS rgba string.

**Kind**: instance method of [<code>Color</code>](#Color)  
**Returns**: <code>string</code> - - The return value.  
<a name="Color.random"></a>

### random
Creates a random color.

**Kind**: static method of [<code>Color</code>](#Color)  
**Returns**: [<code>Color</code>](#Color) - - Returns a new random color.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| gammaOffset | <code>number</code> | <code>0</code> | The gamma offset. |
| randomAlpha | <code>boolean</code> | <code>false</code> | Determines whether the alpha channel is random. |
