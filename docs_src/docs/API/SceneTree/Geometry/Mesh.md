---
id: "SceneTree_Geometry_Mesh.Mesh"
title: "Class: Mesh"
sidebar_label: "Mesh"
custom_edit_url: null
---



The Mesh class provides a flexible and fast polygon mesh representation. It supports polygons of arbitrary complexity,
from basic triangles and quads to pentagons more.
It supports storing per face attributes, and per edge attributes.
The Mesh class handles converting its internal representation of polygons into a simpler triangles representation for rendering.

```
const mesh = new Mesh()
```

**Events**
* **geomDataTopologyChanged:** Triggered when the topology of the mesh has been changed.
* **geomDataChanged:** Triggered when the vertices of the mesh have changed, but not necessarily the topology.

## Hierarchy

- [`BaseGeom`](SceneTree_Geometry_BaseGeom.BaseGeom)

  ↳ **`Mesh`**

  ↳↳ [`ProceduralMesh`](Shapes/SceneTree_Geometry_Shapes_ProceduralMesh.ProceduralMesh)

## Constructors

### constructor

• **new Mesh**()

Creates an instance of Mesh.

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[constructor](SceneTree_Geometry_BaseGeom.BaseGeom#constructor)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:48](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L48)

## Properties

### \_\_boundingBox

• `Protected` **\_\_boundingBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__boundingBox](SceneTree_Geometry_BaseGeom.BaseGeom#__boundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:109](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L109)

___

### \_\_boundingBoxDirty

• `Protected` **\_\_boundingBoxDirty**: `boolean` = `true`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__boundingBoxDirty](SceneTree_Geometry_BaseGeom.BaseGeom#__boundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:110](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L110)

___

### \_\_edgeAttributes

• `Protected` **\_\_edgeAttributes**: `Map`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L34)

___

### \_\_faceAttributes

• `Protected` **\_\_faceAttributes**: `Map`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L35)

___

### \_\_faceVertexIndices

• `Protected` **\_\_faceVertexIndices**: `Uint32Array`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L31)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__id](SceneTree_Geometry_BaseGeom.BaseGeom#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_logTopologyWarnings

• `Protected` **\_\_logTopologyWarnings**: `boolean`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L32)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Map`<`string`, `any`\>

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__metaData](SceneTree_Geometry_BaseGeom.BaseGeom#__metadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:111](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L111)

___

### \_\_name

• `Protected` **\_\_name**: `string` = `''`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__name](SceneTree_Geometry_BaseGeom.BaseGeom#__name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:112](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L112)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__numVertices](SceneTree_Geometry_BaseGeom.BaseGeom#__numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:113](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L113)

___

### \_\_vertexAttributes

• `Protected` **\_\_vertexAttributes**: `Map`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[__vertexAttributes](SceneTree_Geometry_BaseGeom.BaseGeom#__vertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:114](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L114)

___

### debugColor

• **debugColor**: [`Color`](../../Math/Math_Color.Color)

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[debugColor](SceneTree_Geometry_BaseGeom.BaseGeom#debugcolor)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:115](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L115)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[deprecatedParamMapping](SceneTree_Geometry_BaseGeom.BaseGeom#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### edgeAngles

• `Protected` **edgeAngles**: `Float32Array`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L39)

___

### edgeFaces

• `Protected` **edgeFaces**: `number`[]

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L41)

___

### edgeVecs

• `Protected` **edgeVecs**: [`Vec3`](../../Math/Math_Vec3.Vec3)[]

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L40)

___

### edgeVerts

• **edgeVerts**: `number`[]

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L38)

___

### faceCounts

• `Protected` **faceCounts**: `number`[]

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L30)

___

### faceEdges

• `Protected` **faceEdges**: `number`[][]

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L42)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[listeners](SceneTree_Geometry_BaseGeom.BaseGeom#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### name

• **name**: `string` = `''`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[name](SceneTree_Geometry_BaseGeom.BaseGeom#name)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:116](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L116)

___

### numEdges

• `Protected` **numEdges**: `number`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L37)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[paramEventListenerIDs](SceneTree_Geometry_BaseGeom.BaseGeom#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[paramMapping](SceneTree_Geometry_BaseGeom.BaseGeom#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[params](SceneTree_Geometry_BaseGeom.BaseGeom#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

___

### vertexEdges

• `Protected` **vertexEdges**: `Set`<`number`\>[]

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L43)

## Accessors

### positions

• `get` **positions**(): [`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Returns 'positions' vertex attribute.

#### Returns

[`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

#### Inherited from

BaseGeom.positions

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:189](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L189)

## Methods

### addEdgeAttribute

▸ **addEdgeAttribute**(`name`, `attr`): `void`

The addEdgeAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the edge attribute to add. |
| `attr` | [`Attribute`](SceneTree_Geometry_Attribute.Attribute) | The attr value |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:316](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L316)

___

### addFace

▸ **addFace**(`vertexIndices`): `number`

Adds a new face to the mesh

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vertexIndices` | `number`[] | The vertex indices of the face. |

#### Returns

`number`

- The index of the face in the mesh.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:223](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L223)

___

### addFaceAttribute

▸ **addFaceAttribute**(`name`, `attr`): [`Attribute`](SceneTree_Geometry_Attribute.Attribute)

The addFaceAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the face attribute to add. |
| `attr` | [`Attribute`](SceneTree_Geometry_Attribute.Attribute) | The attr value |

#### Returns

[`Attribute`](SceneTree_Geometry_Attribute.Attribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:284](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L284)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[addParameter](SceneTree_Geometry_BaseGeom.BaseGeom#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L135)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[addParameterDeprecationMapping](SceneTree_Geometry_BaseGeom.BaseGeom#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### addVertexAttribute

▸ **addVertexAttribute**(`name`, `attr`): `void`

Adds a new vertex attribute to the geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |
| `attr` | [`Attribute`](SceneTree_Geometry_Attribute.Attribute) | The attribute to add to the geometry |

#### Returns

`void`

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[addVertexAttribute](SceneTree_Geometry_BaseGeom.BaseGeom#addvertexattribute)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:89](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L89)

___

### calculateEdgeAngles

▸ **calculateEdgeAngles**(): `void`

Calculates the angles at each edge between the adjoining faces

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:473](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L473)

___

### clear

▸ **clear**(): `void`

The clear method.

#### Returns

`void`

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[clear](SceneTree_Geometry_BaseGeom.BaseGeom#clear)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L71)

___

### computeFaceNormals

▸ **computeFaceNormals**(): `void`

Computes a normal value per face by averaging the triangle normals of the face.

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:442](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L442)

___

### computeHardEdgesIndices

▸ **computeHardEdgesIndices**(`hardAngle?`): `Uint32Array`

The computeHardEdgesIndices method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `hardAngle` | `number` | `1.0` | The hardAngle value in radians. |

#### Returns

`Uint32Array`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:626](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L626)

___

### computeNumTriangles

▸ **computeNumTriangles**(): `number`

Compute the number of triangles. For higher degree polygons, they are divided into multiple triangles for rendering.

#### Returns

`number`

- Returns the number of triangles.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:832](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L832)

___

### computeVertexNormals

▸ **computeVertexNormals**(`hardAngle?`): [`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

Compute vertex normals.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `hardAngle` | `number` | `1.0` | The hardAngle value in radians. |

#### Returns

[`Vec3Attribute`](SceneTree_Geometry_Vec3Attribute.Vec3Attribute)

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:508](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L508)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[copyFrom](SceneTree_Geometry_BaseGeom.BaseGeom#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L316)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[deleteMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#deletemetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:297](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L297)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[emit](SceneTree_Geometry_BaseGeom.BaseGeom#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### freeBuffers

▸ **freeBuffers**(): `void`

Once the buffers have been uploaded to the GPU, we are free to release them.
The GLGeomLibrary may call this function to let the geometry know it can release any handles.

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[freeBuffers](SceneTree_Geometry_BaseGeom.BaseGeom#freebuffers)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:323](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L323)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

e.g. to load data into the mesh class, provide a json structure similar to the following.
Note: faceCounts is an array of count values, starting with the number of triangles, then the number of quads. See #setFaceCounts
The faceVertexIndices array should also be sorted to contain all the triangles first, followed by the quads, and then the pentagons etc..
```json
// This code will define a mesh made up of 2 triangles and then a quad.
const mesh = new Mesh()
mesh.fromJSON({
  faceCounts:[2, 1],
  faceVertexIndices: [0, 1, 2, 0, 2, 3, 3, 2, 4, 5],
  numVertices: 6,
  vertexAttributes: {
    positions: {
      dataType: 'Vec3'
      defaultScalarValue: 0.0,
      data: [0,0,0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 2, 1, 0, 2, 0, 0]
    }
  }
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[fromJSON](SceneTree_Geometry_BaseGeom.BaseGeom#fromjson)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:1000](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L1000)

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

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[genBuffers](SceneTree_Geometry_BaseGeom.BaseGeom#genbuffers)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:650](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L650)

___

### genTopologyInfo

▸ **genTopologyInfo**(): `void`

The genTopologyInfo method.

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:344](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L344)

___

### generateTriangulatedIndices

▸ **generateTriangulatedIndices**(`totalNumVertices`, `numUnSplitVertices`, `splitIndices`): `Uint32Array` \| `Uint8Array` \| `Uint16Array`

To prepare data for rendering, the indices for the polygons is used to compute a new index buffer based on
only triangles. This is used during rendering and the resulting indices uploaded ot the GPU  by GLMesh class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `totalNumVertices` | `number` | The total number of vertices. |
| `numUnSplitVertices` | `number` | The total number of un-split vertices. |
| `splitIndices` | `Record`<`number`, `Record`<`number`, `number`\>\> | The splitIndices value. |

#### Returns

`Uint32Array` \| `Uint8Array` \| `Uint16Array`

- Returns a typed array containing the triangulated indices.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:851](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L851)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getBoundingBox](SceneTree_Geometry_BaseGeom.BaseGeom#getboundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:230](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L230)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getClassName](SceneTree_Geometry_BaseGeom.BaseGeom#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getEdgeAttribute

▸ **getEdgeAttribute**(`name`): [`Attribute`](SceneTree_Geometry_Attribute.Attribute)

The getEdgeAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the edge attribute. |

#### Returns

[`Attribute`](SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:335](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L335)

___

### getFaceAttribute

▸ **getFaceAttribute**(`name`): [`Attribute`](SceneTree_Geometry_Attribute.Attribute)

The getFaceAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the face attribute. |

#### Returns

[`Attribute`](SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:304](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L304)

___

### getFaceCounts

▸ **getFaceCounts**(): `number`[]

The getFaceCounts method.

#### Returns

`number`[]

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:98](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L98)

___

### getFaceVertexCount

▸ **getFaceVertexCount**(`faceIndex`): `number`

Returns the number of vertices indexed by this face

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:168](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L168)

___

### getFaceVertexIndex

▸ **getFaceVertexIndex**(`faceIndex`, `faceVertex`): `number`

Returns a single vertex index for a given face and faceVertex.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |
| `faceVertex` | `number` | The face vertex is the index within the face. So the first vertex index is 0. |

#### Returns

`number`

- The vertex index

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:271](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L271)

___

### getFaceVertexIndices

▸ **getFaceVertexIndices**(`faceIndex`): `number`[]

Returns the vertex indices of the specified face.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The index of the specified face |

#### Returns

`number`[]

- An array of indices into the vertex attributes

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:255](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L255)

___

### getFaceVertexOffset

▸ **getFaceVertexOffset**(`faceIndex`): `number`

Returns the offset of the face indices within the entire index array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:187](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L187)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getId](SceneTree_Geometry_BaseGeom.BaseGeom#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#getmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:268](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L268)

___

### getNumFaces

▸ **getNumFaces**(): `number`

The getNumFaces method.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:106](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L106)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getNumParameters](SceneTree_Geometry_BaseGeom.BaseGeom#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getNumTriangles

▸ **getNumTriangles**(): `number`

The getNumTriangles method.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:114](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L114)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getNumVertices](SceneTree_Geometry_BaseGeom.BaseGeom#getnumvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:207](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L207)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameter](SceneTree_Geometry_BaseGeom.BaseGeom#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameterByIndex](SceneTree_Geometry_BaseGeom.BaseGeom#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L70)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameterIndex](SceneTree_Geometry_BaseGeom.BaseGeom#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getParameters](SceneTree_Geometry_BaseGeom.BaseGeom#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### getVertexAttribute

▸ **getVertexAttribute**(`name`): [`Attribute`](SceneTree_Geometry_Attribute.Attribute)

Returns vertex attribute with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the vertex attribute. |

#### Returns

[`Attribute`](SceneTree_Geometry_Attribute.Attribute)

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getVertexAttribute](SceneTree_Geometry_BaseGeom.BaseGeom#getvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:170](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L170)

___

### getVertexAttributes

▸ **getVertexAttributes**(): `Record`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

Returns all vertex attributes in an object with their names.

#### Returns

`Record`<`string`, [`Attribute`](SceneTree_Geometry_Attribute.Attribute)\>

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[getVertexAttributes](SceneTree_Geometry_BaseGeom.BaseGeom#getvertexattributes)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:179](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L179)

___

### hasEdgeAttribute

▸ **hasEdgeAttribute**(`name`): `boolean`

The hasEdgeAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the edge attribute. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:326](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L326)

___

### hasFaceAttribute

▸ **hasFaceAttribute**(`name`): `boolean`

The hasFaceAttribute method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the face attribute. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:295](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L295)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[hasMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#hasmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:278](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L278)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[hasParameter](SceneTree_Geometry_BaseGeom.BaseGeom#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[hasVertexAttribute](SceneTree_Geometry_BaseGeom.BaseGeom#hasvertexattribute)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:160](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L160)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[insertParameter](SceneTree_Geometry_BaseGeom.BaseGeom#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

___

### loadBaseGeomBinary

▸ **loadBaseGeomBinary**(`reader`, `context?`): `void`

Sets state of current Geometry(Including Vertices and Bounding Box) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | `Record`<`string`, `any`\> | - |

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[loadBaseGeomBinary](SceneTree_Geometry_BaseGeom.BaseGeom#loadbasegeombinary)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:332](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L332)

___

### numVertices

▸ **numVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[numVertices](SceneTree_Geometry_BaseGeom.BaseGeom#numvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L198)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[off](SceneTree_Geometry_BaseGeom.BaseGeom#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L97)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[on](SceneTree_Geometry_BaseGeom.BaseGeom#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: `any`) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[once](SceneTree_Geometry_BaseGeom.BaseGeom#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[parameterValueChanged](SceneTree_Geometry_BaseGeom.BaseGeom#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L124)

___

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

Restores mesh properties from a binary reader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[readBinary](SceneTree_Geometry_BaseGeom.BaseGeom#readbinary)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:894](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L894)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[removeListenerById](SceneTree_Geometry_BaseGeom.BaseGeom#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[removeParameter](SceneTree_Geometry_BaseGeom.BaseGeom#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[replaceParameter](SceneTree_Geometry_BaseGeom.BaseGeom#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### setBoundingBoxDirty

▸ **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setBoundingBoxDirty](SceneTree_Geometry_BaseGeom.BaseGeom#setboundingboxdirty)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:238](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L238)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setDebugName](SceneTree_Geometry_BaseGeom.BaseGeom#setdebugname)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:138](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L138)

___

### setFaceCounts

▸ **setFaceCounts**(`faceCounts`): `void`

Sets the number of faces on the mesh using an array specifying the counts per polygon size.
The first item in the array specifies the number of triangles, the second, the number of quads, the 3rd, the number of 5 sided polygons etc..
e.g. to specify 2 triangles, and 7 quads, we would pass [2, 7]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceCounts` | `number`[] | The faceCounts value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:130](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L130)

___

### setFaceVertexIndices

▸ **setFaceVertexIndices**(`faceIndex`, `vertexIndices`): `void`

The setFaceVertexIndices method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `faceIndex` | `number` | The faceIndex value. |
| `vertexIndices` | `number`[] | The array of vertex indices for this face value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:207](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L207)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setMetadata](SceneTree_Geometry_BaseGeom.BaseGeom#setmetadata)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:288](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L288)

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

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[setNumVertices](SceneTree_Geometry_BaseGeom.BaseGeom#setnumvertices)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:216](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L216)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Overrides

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[toJSON](SceneTree_Geometry_BaseGeom.BaseGeom#tojson)

#### Defined in

[src/SceneTree/Geometry/Mesh.ts:964](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/Mesh.ts#L964)

___

### toString

▸ **toString**(): `string`

Returns geometry data value in json format.

#### Returns

`string`

- The return value.

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[toString](SceneTree_Geometry_BaseGeom.BaseGeom#tostring)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:539](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L539)

___

### updateBoundingBox

▸ **updateBoundingBox**(): `void`

The updateBoundingBox method.

#### Returns

`void`

#### Inherited from

[BaseGeom](SceneTree_Geometry_BaseGeom.BaseGeom).[updateBoundingBox](SceneTree_Geometry_BaseGeom.BaseGeom#updateboundingbox)

#### Defined in

[src/SceneTree/Geometry/BaseGeom.ts:246](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/BaseGeom.ts#L246)

