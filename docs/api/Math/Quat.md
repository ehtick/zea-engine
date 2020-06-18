<a name="Quat"></a>

### Quat 
Class representing a quaternion. Quaternions are used to represent rotations
without encountering gimble lock. Based on complex numbers that are not easy
to understand intuitively.

**Kind**: global class  
**Extends**: <code>AttrValue</code>  

* [Quat ⇐ <code>AttrValue</code>](#Quat)
    * [new Quat(x, y, z, w)](#new-Quat)
    * [x ⇒ <code>number</code>](#x)
    * [x](#x)
    * [y ⇒ <code>number</code>](#y)
    * [y](#y)
    * [z ⇒ <code>number</code>](#z)
    * [z](#z)
    * [w ⇒ <code>number</code>](#w)
    * [w](#w)
    * [set(x, y, z, w)](#set)
    * [setDataArray(float32Array)](#setDataArray)
    * [setFromOther(other)](#setFromOther)
    * [setFromEulerAngles(eulerAngles)](#setFromEulerAngles)
    * [toEulerAngles(rotationOrder) ⇒ <code>EulerAngles</code>](#toEulerAngles)
    * [setFromAxisAndAngle(axis, angle)](#setFromAxisAndAngle)
    * [setFromDirectionAndUpvector(dir, up)](#setFromDirectionAndUpvector)
    * [setFrom2Vectors(v0, v1)](#setFrom2Vectors)
    * [setFromMat3(mat3)](#setFromMat3)
    * [setFromMat4(mat4)](#setFromMat4)
    * [isIdentity() ⇒ <code>boolean</code>](#isIdentity)
    * [getAngle() ⇒ <code>number</code>](#getAngle)
    * [equal(other) ⇒ <code>boolean</code>](#equal)
    * [notequals(other) ⇒ <code>boolean</code>](#notequals)
    * [approxEqual(other, precision) ⇒ <code>boolean</code>](#approxEqual)
    * [add(other)](#add)
    * [addInPlace(other)](#addInPlace)
    * [subtract(other)](#subtract)
    * [scale(scalar)](#scale)
    * [scaleInPlace(scalar)](#scaleInPlace)
    * [length() ⇒ <code>number</code>](#length)
    * [lengthSquared() ⇒ <code>number</code>](#lengthSquared)
    * [normalize()](#normalize)
    * [normalizeInPlace()](#normalizeInPlace)
    * [dot(other) ⇒ <code>number</code>](#dot)
    * [cross(other)](#cross)
    * [conjugate()](#conjugate)
    * [inverse()](#inverse)
    * [alignWith(other)](#alignWith)
    * [multiply(other)](#multiply)
    * [multiplyInPlace(other)](#multiplyInPlace)
    * [rotateVec3(vec3) ⇒ <code>Vec3</code>](#rotateVec3)
    * [rotateX(rad)](#rotateX)
    * [rotateY(rad)](#rotateY)
    * [rotateZ(rad)](#rotateZ)
    * [toMat3() ⇒ <code>Mat3</code>](#toMat3)
    * [getXaxis() ⇒ <code>Vec3</code>](#getXaxis)
    * [getYaxis() ⇒ <code>Vec3</code>](#getYaxis)
    * [getZaxis() ⇒ <code>Vec3</code>](#getZaxis)
    * [mirror(axisIndex)](#mirror)
    * [toMat4() ⇒ <code>Mat4</code>](#toMat4)
    * [lerp(other, t)](#lerp)
    * [clone()](#clone)
    * [toJSON() ⇒ <code>object</code>](#toJSON)
    * [fromJSON(j)](#fromJSON)

<a name="new_Quat_new"></a>

### new Quat
Creates a quaternion.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| x | <code>number</code> \| <code>ArrayBuffer</code> \| <code>object</code> | <code>0</code> | The angle of the x axis. Default is 0. |
| y | <code>number</code> | <code>0</code> | The angle of the y axis. Default is 0. |
| z | <code>number</code> | <code>0</code> | The angle of the z axis. Default is 0. |
| w | <code>number</code> | <code>1</code> | The w value. Default is 1. |

<a name="Quat+x"></a>

### x 
Getter for `x` axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the x axis rotation.  
<a name="Quat+x"></a>

### x
Setter for `x` axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+y"></a>

### y 
Getter for `y` axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the y axis rotation.  
<a name="Quat+y"></a>

### y
Setter for `y` axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+z"></a>

### z 
Getter for `z` axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the z axis rotation.  
<a name="Quat+z"></a>

### z
Setter for `z` axis rotation.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+w"></a>

### w 
Getter for `w` value.

**Kind**: instance property of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the w value.  
<a name="Quat+w"></a>

### w
Setter for `w`.

**Kind**: instance property of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>number</code> | The val param. |

<a name="Quat+set"></a>

### set
Setter from scalar components.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| x | <code>number</code> | The x axis rotation. |
| y | <code>number</code> | The y axis rotation. |
| z | <code>number</code> | The z axis rotation. |
| w | <code>number</code> | The w value. |

<a name="Quat+setDataArray"></a>

### setDataArray
Sets the state of the Quat class using a Float32Array.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| float32Array | <code>Float32Array</code> | The float32Array value. |

<a name="Quat+setFromOther"></a>

### setFromOther
Setter from another vector.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other vector to set from. |

<a name="Quat+setFromEulerAngles"></a>

### setFromEulerAngles
Set this quat from a euler rotation.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| eulerAngles | <code>EulerAngles</code> | The euler angles rotation. |

<a name="Quat+toEulerAngles"></a>

### toEulerAngles
Converts Quat to an EulerAngles

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>EulerAngles</code> - - The return value.  

| Param | Type | Description |
| --- | --- | --- |
| rotationOrder | <code>number</code> \| <code>string</code> | The order in which the rotations are applied. |

<a name="Quat+setFromAxisAndAngle"></a>

### setFromAxisAndAngle
Set this quat to a rotation defined by an axis and an angle (in radians).

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| axis | <code>Vec3</code> | The axis value. |
| angle | <code>number</code> | The axis angle. |

<a name="Quat+setFromDirectionAndUpvector"></a>

### setFromDirectionAndUpvector
Scales and calculates the cross product of the `Vec3` and sets the result in the Mat3

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>Vec3</code> | The direction value. |
| up | <code>Vec3</code> | The up angle. |

<a name="Quat+setFrom2Vectors"></a>

### setFrom2Vectors
Sets the state of the `Quat` from two `Vec3`.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| v0 | <code>Vec3</code> | The v0 vector. |
| v1 | <code>Vec3</code> | The v1 vector. |

<a name="Quat+setFromMat3"></a>

### setFromMat3
Set the quat from a Mat3.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| mat3 | <code>Mat3</code> | The mat3 value. |

<a name="Quat+setFromMat4"></a>

### setFromMat4
Set the quat from a Mat4.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| mat4 | <code>Mat4</code> | The mat4 value. |

<a name="Quat+isIdentity"></a>

### isIdentity
Checks if the angle of the Quat is less that ` Number.EPSILON`

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  
<a name="Quat+getAngle"></a>

### getAngle
Return the angle of the Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - The return value.  
<a name="Quat+equal"></a>

### equal
Returns true if this Quat is exactly the same as other.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |

<a name="Quat+notequals"></a>

### notequals
Returns true if this Quat is NOT exactly the same other.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |

<a name="Quat+approxEqual"></a>

### approxEqual
Returns true if this Quat is approximately the same as other

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>boolean</code> - - Returns true or false.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |
| precision | <code>number</code> | The precision to which the values must match. |

<a name="Quat+add"></a>

### add
Adds other to this Quat and return the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to add. |

<a name="Quat+addInPlace"></a>

### addInPlace
Adds other to this Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to add. |

<a name="Quat+subtract"></a>

### subtract
Subtracts other from this Quat and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to subtract. |

<a name="Quat+scale"></a>

### scale
Scales this Quat by scalar and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Quat+scaleInPlace"></a>

### scaleInPlace
Scales this Quat by scalar.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| scalar | <code>number</code> | The scalar value. |

<a name="Quat+length"></a>

### length
Calculates the length of this Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Quat+lengthSquared"></a>

### lengthSquared
Calculates the squared length of this Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the length.  
<a name="Quat+normalize"></a>

### normalize
Normalizes the Quat and returns it as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns the Quat normalized.  
<a name="Quat+normalizeInPlace"></a>

### normalizeInPlace
Normalizes the Quat, modifying it and returning it normalized.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
<a name="Quat+dot"></a>

### dot
Calculates the dot product of two Quats.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>number</code> - - Returns the dot product.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to compare with. |

<a name="Quat+cross"></a>

### cross
Calculates the cross product of two Quats and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns the cross product as a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to calculate with. |

<a name="Quat+conjugate"></a>

### conjugate
Returns the rotational conjugate of this Quat.
Conjugation represents the same rotation of the Quat but
in the opposite direction around the rotational axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - the return value.  
<a name="Quat+inverse"></a>

### inverse
Return the inverse of the `Quat`

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  
<a name="Quat+alignWith"></a>

### alignWith
Aligns this quaternion with another one ensuring that the delta between
the Quat values is the shortest path over the hypersphere.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to divide by. |

<a name="Quat+multiply"></a>

### multiply
Multiplies two Quats and returns the result as a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to multiply. |

<a name="Quat+multiplyInPlace"></a>

### multiplyInPlace
Multiplies two Quats.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to multiply. |

<a name="Quat+rotateVec3"></a>

### rotateVec3
Rotates a vector by this quaterion.
Don't forget to normalize the quaternion unless
you want axial translation as well as rotation.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Vec3</code> - - Returns a new Vec3.  

| Param | Type | Description |
| --- | --- | --- |
| vec3 | <code>Vec3</code> | The vec3 value. |

<a name="Quat+rotateX"></a>

### rotateX
Rotates a quaternion by the given angle about the X axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Angle (in radians) to rotate. |

<a name="Quat+rotateY"></a>

### rotateY
Rotates a quaternion by the given angle about the Y axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Angle (in radians) to rotate. |

<a name="Quat+rotateZ"></a>

### rotateZ
Rotates a quaternion by the given angle about the Z axis.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| rad | <code>number</code> | Angle (in radians) to rotate. |

<a name="Quat+toMat3"></a>

### toMat3
Converts this Quat to a Mat3 (a 3x3 matrix).

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Mat3</code> - - TReturns a new Mat3.  
<a name="Quat+getXaxis"></a>

### getXaxis
Returns the X axis of this quaternion.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Vec3</code> - - Returns the X axis as a Vec3.  
<a name="Quat+getYaxis"></a>

### getYaxis
Returns the Y axis of this quaternion.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Vec3</code> - - Returns the Y axis as a Vec3.  
<a name="Quat+getZaxis"></a>

### getZaxis
Returns the Z axis of this quaternion.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Vec3</code> - - Returns the Z axis as a Vec3.  
<a name="Quat+mirror"></a>

### mirror
Reflects this quaternion according to the axis provided.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| axisIndex | <code>number</code> | An integer with value of 0 for the X axis, 1 for the Y axis, and 2 for the Z axis. |

<a name="Quat+toMat4"></a>

### toMat4
Converts this Quat to a Mat4 (a 4x4 matrix).

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>Mat4</code> - - Returns a new Mat4.  
<a name="Quat+lerp"></a>

### lerp
Performs a linear interpolation between two Quats.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  

| Param | Type | Description |
| --- | --- | --- |
| other | [<code>Quat</code>](#Quat) | The other Quat to interpolate between. |
| t | <code>number</code> | Interpolation amount between the two inputs. |

<a name="Quat+clone"></a>

### clone
Clones this Quat and returns a new Quat.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: [<code>Quat</code>](#Quat) - - Returns a new Quat.  
<a name="Quat+toJSON"></a>

### toJSON
The toJSON method encodes this type as a json object for persistences.

**Kind**: instance method of [<code>Quat</code>](#Quat)  
**Returns**: <code>object</code> - - The json object.  
<a name="Quat+fromJSON"></a>

### fromJSON
The fromJSON method decodes a json object for this type.

**Kind**: instance method of [<code>Quat</code>](#Quat)  

| Param | Type | Description |
| --- | --- | --- |
| j | <code>object</code> | The json object. |

