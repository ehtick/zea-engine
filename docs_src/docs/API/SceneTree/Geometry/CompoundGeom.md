---
id: "SceneTree_Geometry_CompoundGeom.CompoundGeom"
title: "Class: CompoundGeom"
sidebar_label: "CompoundGeom"
custom_edit_url: null
---



Class representing a point primitive drawing type, every vertex specified is a point.

```
const compoundGeom = new CompoundGeom()
```

* **Events**
* **boundingBoxChanged:** Triggered when the bounding box changes.

## Hierarchy

- [`BaseProxy`](SceneTree_Geometry_GeomProxies.BaseProxy)

  ↳ **`CompoundGeom`**

## Constructors

### constructor

• **new CompoundGeom**(`data`, `materialLibrary`)

Create points.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `materialLibrary` | [`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary) |

#### Overrides

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[constructor](SceneTree_Geometry_GeomProxies.BaseProxy#constructor)

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:36](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L36)

## Properties

### \_\_buffers

• **\_\_buffers**: `any`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[__buffers](SceneTree_Geometry_GeomProxies.BaseProxy#__buffers)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:13](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L13)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[__id](SceneTree_Geometry_GeomProxies.BaseProxy#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `any`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[__metaData](SceneTree_Geometry_GeomProxies.BaseProxy#__metadata)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L15)

___

### boundingBox

• `Protected` **boundingBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[boundingBox](SceneTree_Geometry_GeomProxies.BaseProxy#boundingbox)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:14](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L14)

___

### counts

• `Private` **counts**: `Record`<`string`, `number`\>

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L30)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[listeners](SceneTree_Geometry_GeomProxies.BaseProxy#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### materials

• **materials**: [`Material`](../SceneTree_Material.Material)[] = `[]`

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L31)

___

### name

• `Protected` **name**: `string`

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[name](SceneTree_Geometry_GeomProxies.BaseProxy#name)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:12](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L12)

___

### subGeoms

• **subGeoms**: `SubGeom`[] = `[]`

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L32)

## Methods

### assignSubGeomMaterial

▸ **assignSubGeomMaterial**(`subGeomId`, `material`): `void`

Assigns a material to a sub-geom by ID;

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subGeomId` | `number` | The ID of the sub-geom to assign the material. |
| `material` | [`Material`](../SceneTree_Material.Material) | The material to assign. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:114](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L114)

___

### calcMaterialGroups

▸ `Private` **calcMaterialGroups**(): `void`

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:141](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L141)

___

### clearMaterials

▸ **clearMaterials**(): `void`

Clears all sub--geom material assignments. This means the geometry will be drawn
using only the material of the GeomItem or CADBody.

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L135)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[emit](SceneTree_Geometry_GeomProxies.BaseProxy#emit)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[freeBuffers](SceneTree_Geometry_GeomProxies.BaseProxy#freebuffers)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L70)

___

### genBuffers

▸ **genBuffers**(): `any`

The genBuffers method.

#### Returns

`any`

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[genBuffers](SceneTree_Geometry_GeomProxies.BaseProxy#genbuffers)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L62)

___

### getBoundingBox

▸ **getBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns the bounding box for geometry.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getBoundingBox](SceneTree_Geometry_GeomProxies.BaseProxy#getboundingbox)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:54](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L54)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getClassName](SceneTree_Geometry_GeomProxies.BaseProxy#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getId](SceneTree_Geometry_GeomProxies.BaseProxy#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getNumEdges

▸ **getNumEdges**(): `any`

Returns the number of Edge sub-geoms in this compound geom.

#### Returns

`any`

- The return value.

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L75)

___

### getNumFaces

▸ **getNumFaces**(): `any`

Returns the number of Face sub-geoms in this compound geom.

#### Returns

`any`

- The return value.

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:66](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L66)

___

### getNumLineSegments

▸ **getNumLineSegments**(): `number`

Returns the number line segments in this lines proxy geometry

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:93](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L93)

___

### getNumPoints

▸ **getNumPoints**(): `number`

Returns the number line segments in this lines proxy geometry

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L102)

___

### getNumSubGeoms

▸ **getNumSubGeoms**(): `any`

Returns the number of faces, edges and point sub-geoms in this compound geom.

#### Returns

`any`

- The return value.

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:57](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L57)

___

### getNumTriangles

▸ **getNumTriangles**(): `number`

Returns the number of triangles in this compound geom.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:84](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L84)

___

### getNumVertices

▸ **getNumVertices**(): `number`

Returns the number of vertex attributes.

#### Returns

`number`

- The return value.

#### Inherited from

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[getNumVertices](SceneTree_Geometry_GeomProxies.BaseProxy#getnumvertices)

#### Defined in

[src/SceneTree/Geometry/GeomProxies.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/GeomProxies.ts#L46)

___

### loadMetadata

▸ **loadMetadata**(`metadataReader`, `context`): `void`

Sets state of current geometry(Including line segments) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `metadataReader` | [`BinReader`](../SceneTree_BinReader.BinReader) | - |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Geometry/CompoundGeom.ts:205](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Geometry/CompoundGeom.ts#L205)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[off](SceneTree_Geometry_GeomProxies.BaseProxy#off)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[on](SceneTree_Geometry_GeomProxies.BaseProxy#on)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[once](SceneTree_Geometry_GeomProxies.BaseProxy#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

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

[BaseProxy](SceneTree_Geometry_GeomProxies.BaseProxy).[removeListenerById](SceneTree_Geometry_GeomProxies.BaseProxy#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

