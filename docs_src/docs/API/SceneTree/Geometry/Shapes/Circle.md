---
id: "SceneTree_Geometry_Shapes_Circle.Circle"
title: "Class: Circle"
sidebar_label: "Circle"
custom_edit_url: null
---



A class for generating a circle shape using line segments.

```
const circle = new Circle(2.2, 12)
```

**Parameters**
* **Radius(`NumberParameter`):** Radius of the circle.
* **Angle(`NumberParameter`):** Number of segments used to build the circle.
* **Sides(`NumberParameter`):** Segments angle in radiants.

## Hierarchy

- [`ProceduralLines`](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines)

  ↳ **`Circle`**

## Constructors

### constructor

• **new Circle**(`radius?`, `sides?`, `angle?`)

Creates an instance of Circle.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `radius` | `number` | `1.0` | The radius of the circle. |
| `sides` | `number` | `32` | The number of segments. |
| `angle` | `number` | `undefined` | Arc segments angle(radians) |

#### Overrides

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[constructor](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#constructor)

#### Defined in

[src/SceneTree/Geometry/Shapes/Circle.ts:43](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/Circle.ts#L43)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../../Math/Math_Box3.Box3)

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__boundingBox](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__boundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:109](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L109)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__boundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__boundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:110](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L110)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__id](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L11)

___

### \_\_indices

• `Protected` **\_\_indices**: `Uint32Array` \| `Uint8Array` \| `Uint16Array`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__indices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__indices)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:24](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L24)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__metaData](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__metadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:111](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L111)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__name](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:112](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L112)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__numVertices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:113](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L113)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[__vertexAttributes](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#__vertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:114](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L114)

___

### angleParam

• **angleParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** angleParam - TODO

#### Defined in

[src/SceneTree/Geometry/Shapes/Circle.ts:24](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/Circle.ts#L24)

___

### debugColor

• **debugColor**: [`Color`](../../../Math/Math_Color.Color)

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[debugColor](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#debugcolor)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:115](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L115)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[deprecatedParamMapping](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L25)

___

### dirtyTopology

• **dirtyTopology**: `boolean`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[dirtyTopology](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#dirtytopology)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:11](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L11)

___

### dirtyVertices

• **dirtyVertices**: `boolean`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[dirtyVertices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#dirtyvertices)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:12](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L12)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[listeners](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[name](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:116](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L116)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[paramEventListenerIDs](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[paramMapping](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[params](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L24)

___

### radiusParam

• **radiusParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** radiusParam - The radius of the circle

#### Defined in

[src/SceneTree/Geometry/Shapes/Circle.ts:34](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/Circle.ts#L34)

___

### sidesParam

• **sidesParam**: [`NumberParameter`](../../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** sidesParam - The number of sides that compose the circle (e.g. 3 creates a triangle)

#### Defined in

[src/SceneTree/Geometry/Shapes/Circle.ts:29](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/Circle.ts#L29)

___

### topologyParams

• **topologyParams**: `string`[]

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[topologyParams](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#topologyparams)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:13](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L13)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](../SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Inherited from

ProceduralLines.positions

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:189](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L189)

## Methods

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[addParameter](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L135)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[addParameterDeprecationMapping](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L92)

___

### addVertexAttribute

▸ **addVertexAttribute**(`name`, `attr`): `void`

Adds a new vertex attribute to the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |
| `attr` | [`Attribute`](../SceneTree_Geometry_Attribute.Attribute) | - |

#### Returns

`void`

- Returns an attribute.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[addVertexAttribute](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#addvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:149](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L149)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[clear](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#clear)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:37](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L37)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../../SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[copyFrom](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L316)

___

### deleteMetadata

▸ **deleteMetadata**(`key`): `void`

Removes metadata value from the geometry with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[deleteMetadata](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#deletemetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:297](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L297)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[emit](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[fromJSON](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#fromjson)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:177](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L177)

___

### genBuffers

▸ **genBuffers**(`opts?`): `Record`<`string`, `any`\>

The genBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts?` | `Record`<`string`, `any`\> | The opts value. |

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[genBuffers](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#genbuffers)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:97](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L97)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getBoundingBox](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getboundingbox)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:74](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L74)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getClassName](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L33)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getId](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L25)

___

### getIndices

▸ **getIndices**(): `Float32Array` \| `Uint32Array` \| `Uint8Array` \| `Int32Array` \| `Uint16Array` \| `Int16Array` \| `Int8Array`

Returns the specified indices(Vertex connectors)

#### Returns

`Float32Array` \| `Uint32Array` \| `Uint8Array` \| `Int32Array` \| `Uint16Array` \| `Int16Array` \| `Int8Array`

- The indices index array.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getIndices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getindices)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:49](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L49)

___

### getMetadata

▸ **getMetadata**(`key`): `any`

Returns metadata value of the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`any`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getMetadata](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:268](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L268)

___

### getNumLineSegments

▸ **getNumLineSegments**(): `number`

Returns the number of line segments.

#### Returns

`number`

- Returns the number of segments.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getNumLineSegments](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getnumlinesegments)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:67](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L67)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getNumParameters](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L41)

___

### getNumSegments

▸ **getNumSegments**(): `number`

Returns the number of line segments.

#### Returns

`number`

- Returns the number of segments.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getNumSegments](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getnumsegments)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:58](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L58)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getNumVertices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getnumvertices)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:84](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L84)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getParameter](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getParameterByIndex](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L70)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getParameterIndex](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getParameters](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L50)

___

### getSegmentVertexIndex

▸ `Private` **getSegmentVertexIndex**(`line`, `lineVertex`): `number`

The getSegmentVertexIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `line` | `number` | The line value. |
| `lineVertex` | `number` | The lineVertex value. |

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getSegmentVertexIndex](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getsegmentvertexindex)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:109](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L109)

___

### getVertexAttribute

▸ **getVertexAttribute**(`name`): [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

Returns vertex attribute with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |

#### Returns

[`Attribute`](../SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getVertexAttribute](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:170](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L170)

___

### getVertexAttributes

▸ **getVertexAttributes**(): `Record`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

Returns all vertex attributes in an object with their names.

#### Returns

`Record`<`string`, [`Attribute`](../SceneTree_Geometry_Attribute.Attribute)\>

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[getVertexAttributes](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#getvertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:179](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L179)

___

### hasMetadata

▸ **hasMetadata**(`key`): `boolean`

Verifies if geometry's metadata contains a value with the specified key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[hasMetadata](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#hasmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:278](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L278)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[hasParameter](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L80)

___

### hasVertexAttribute

▸ **hasVertexAttribute**(`name`): `boolean`

Checks if the the geometry has an attribute with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[hasVertexAttribute](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#hasvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:160](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L160)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[insertParameter](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L149)

___

### loadBaseGeomBinary

▸ **loadBaseGeomBinary**(`reader`, `context?`): `void`

Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | `Record`<`string`, `any`\> | - |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[loadBaseGeomBinary](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#loadbasegeombinary)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:326](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L326)

___

### numVertices

▸ **numVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[numVertices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:198](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L198)

___

### off

▸ **off**(`eventName`, `listener?`): `void`

Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function or the id number. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[off](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L97)

___

### on

▸ **on**(`eventName`, `listener?`): `number`

Adds a listener function for a given event name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function(callback). |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[on](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L44)

___

### once

▸ **once**(`eventName`, `listener`): `number`

Similar to the `on` method with the difference that when the event is triggered,
it is automatically unregistered meaning that the event listener will be triggered at most one time.

Useful for events that we expect to trigger one time, such as when assets load.
```javascript
const asset = new Asset();
asset.once('loaded', () => {
  console.log("Yay! the asset is loaded")
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The eventName value |
| `listener` | (`event`: [`BaseEvent`](../../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[once](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[parameterValueChanged](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#parametervaluechanged)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:38](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L38)

___

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

Sets state of current geometry(Including line segments) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[readBinary](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#readbinary)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:147](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L147)

___

### rebuild

▸ `Private` **rebuild**(): `void`

The rebuild method.

#### Returns

`void`

#### Overrides

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[rebuild](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#rebuild)

#### Defined in

[src/SceneTree/Geometry/Shapes/Circle.ts:61](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/Circle.ts#L61)

___

### removeListenerById

▸ **removeListenerById**(`eventName`, `id`): `void`

remove listener by ID returned from #on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `id` | `number` | The id returned by addListener |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[removeListenerById](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L134)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[removeParameter](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[replaceParameter](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L198)

___

### resize

▸ `Private` **resize**(): `void`

The resize method.

#### Returns

`void`

#### Overrides

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[resize](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#resize)

#### Defined in

[src/SceneTree/Geometry/Shapes/Circle.ts:76](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/Circle.ts#L76)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[setBoundingBoxDirty](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#setboundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:238](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L238)

___

### setDebugName

▸ **setDebugName**(`name`): `void`

Establishes a name for the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The debug name value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[setDebugName](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#setdebugname)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:138](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L138)

___

### setMetadata

▸ **setMetadata**(`key`, `metaData`): `void`

Sets metadata value to the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |
| `metaData` | `Record`<`string`, `any`\> | The metaData value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[setMetadata](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#setmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:288](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L288)

___

### setNumSegments

▸ **setNumSegments**(`numOfSegments`): `void`

Sets the number of line segments in the lines geometry.
**Important:** It resets indices values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numOfSegments` | `number` | The count value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[setNumSegments](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#setnumsegments)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:77](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L77)

___

### setNumVertices

▸ **setNumVertices**(`count`): `void`

Sets the number of vertices the geometry has.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `count` | `number` | The count value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[setNumVertices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#setnumvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:216](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L216)

___

### setSegmentVertexIndices

▸ **setSegmentVertexIndices**(`index`, `p0`, `p1`): `void`

Sets segment values in the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `p0` | `number` | The p0 value. |
| `p1` | `number` | The p1 value. |

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[setSegmentVertexIndices](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#setsegmentvertexindices)

#### Defined in

[src/SceneTree/Geometry/Lines.ts:94](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Lines.ts#L94)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[toJSON](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#tojson)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:110](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L110)

___

### toString

▸ **toString**(): `string`

Returns geometry data value in json format.

#### Returns

`string`

- The return value.

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[toString](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#tostring)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:533](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L533)

___

### update

▸ **update**(): `void`

If the Procedural geometry is out of date, for example if a parameter has been changed,
this method explicitly forces the geometry to be recomputed.

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[update](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#update)

#### Defined in

[src/SceneTree/Geometry/Shapes/ProceduralLines.ts:57](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/Shapes/ProceduralLines.ts#L57)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Inherited from

[ProceduralLines](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines).[updateBoundingBox](SceneTree_Geometry_Shapes_ProceduralLines.ProceduralLines#updateboundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:246](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/Geometry/BaseGeom.ts#L246)

