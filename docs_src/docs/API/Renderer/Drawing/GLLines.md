---
id: "Renderer_Drawing_GLLines.GLLines"
title: "Class: GLLines"
sidebar_label: "GLLines"
custom_edit_url: null
---



Class representing GL lines.

## Hierarchy

- [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom)

  ↳ **`GLLines`**

## Constructors

### constructor

• **new GLLines**(`gl`, `lines`)

Create a GL line.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |
| `lines` | [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) | The geom value. |

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[constructor](Renderer_Drawing_GLGeom.GLGeom#constructor)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L37)

## Properties

### \_\_buffersNeedUpload

• `Protected` **\_\_buffersNeedUpload**: `boolean` = `false`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L30)

___

### \_\_destroyed

• `Protected` **\_\_destroyed**: `boolean`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__destroyed](Renderer_Drawing_GLGeom.GLGeom#__destroyed)

#### Defined in

[src/SceneTree/RefCounted.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L15)

___

### \_\_fatBuffersNeedUpload

• `Protected` **\_\_fatBuffersNeedUpload**: `boolean` = `false`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L28)

___

### \_\_geom

• `Protected` **\_\_geom**: [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) \| [`Mesh`](../../SceneTree/Geometry/SceneTree_Geometry_Mesh.Mesh)

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__geom](Renderer_Drawing_GLGeom.GLGeom#__geom)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L11)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__gl](Renderer_Drawing_GLGeom.GLGeom#__gl)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:10](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L10)

___

### \_\_glattrbuffers

• `Protected` **\_\_glattrbuffers**: `Record`<`string`, `any`\>

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__glattrbuffers](Renderer_Drawing_GLGeom.GLGeom#__glattrbuffers)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:12](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L12)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__id](Renderer_Drawing_GLGeom.GLGeom#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_indexBuffer

• `Protected` **\_\_indexBuffer**: `WebGLBuffer` = `null`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__indexBuffer](Renderer_Drawing_GLGeom.GLGeom#__indexbuffer)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:16](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L16)

___

### \_\_indexDataType

• `Protected` **\_\_indexDataType**: `number` = `0`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L31)

___

### \_\_numSegIndices

• `Protected` **\_\_numSegIndices**: `number` = `0`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L26)

___

### \_\_numVertices

• `Protected` **\_\_numVertices**: `number` = `0`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L27)

___

### \_\_refs

• `Protected` **\_\_refs**: [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)[]

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__refs](Renderer_Drawing_GLGeom.GLGeom#__refs)

#### Defined in

[src/SceneTree/RefCounted.ts:14](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L14)

___

### \_\_shaderBindings

• `Protected` **\_\_shaderBindings**: `Record`<`string`, `any`\>

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[__shaderBindings](Renderer_Drawing_GLGeom.GLGeom#__shaderbindings)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:13](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L13)

___

### buffersDirty

• `Protected` **buffersDirty**: `boolean`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[buffersDirty](Renderer_Drawing_GLGeom.GLGeom#buffersdirty)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:14](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L14)

___

### fatBuffers

• `Protected` **fatBuffers**: `FatBuffers` = `null`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L29)

___

### genBufferOpts

• `Protected` **genBufferOpts**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[genBufferOpts](Renderer_Drawing_GLGeom.GLGeom#genbufferopts)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L15)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[listeners](Renderer_Drawing_GLGeom.GLGeom#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

## Methods

### addRef

▸ **addRef**(`referer`): `boolean`

The addRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[addRef](Renderer_Drawing_GLGeom.GLGeom#addref)

#### Defined in

[src/SceneTree/RefCounted.ts:51](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L51)

___

### bind

▸ **bind**(`renderstate`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[bind](Renderer_Drawing_GLGeom.GLGeom#bind)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:247](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L247)

___

### bindAndDraw

▸ **bindAndDraw**(`renderstate`): `void`

The bindAndDraw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[bindAndDraw](Renderer_Drawing_GLGeom.GLGeom#bindanddraw)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:139](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L139)

___

### clearBuffers

▸ **clearBuffers**(): `void`

The clearBuffers method.

#### Returns

`void`

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[clearBuffers](Renderer_Drawing_GLGeom.GLGeom#clearbuffers)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:58](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L58)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[destroy](Renderer_Drawing_GLGeom.GLGeom#destroy)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:169](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L169)

___

### dirtyBuffers

▸ **dirtyBuffers**(`opts`): `void`

The dirtyBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Record`<`string`, `any`\> | options passed when geomDataChanged is emitted. (Currently ony used by the FreehandLines tool) |

#### Returns

`void`

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[dirtyBuffers](Renderer_Drawing_GLGeom.GLGeom#dirtybuffers)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:49](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L49)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[draw](Renderer_Drawing_GLGeom.GLGeom#draw)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:298](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L298)

___

### drawInstanced

▸ **drawInstanced**(`renderstate`, `instanceCount`): `void`

The drawInstanced method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |
| `instanceCount` | `number` | The instanceCount value. |

#### Returns

`void`

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[drawInstanced](Renderer_Drawing_GLGeom.GLGeom#drawinstanced)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:314](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L314)

___

### drawPoints

▸ **drawPoints**(): `void`

The drawPoints method.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:287](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L287)

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

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[emit](Renderer_Drawing_GLGeom.GLGeom#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### genBuffers

▸ **genBuffers**(`renderstate?`): `void`

The genBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Overrides

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[genBuffers](Renderer_Drawing_GLGeom.GLGeom#genbuffers)

#### Defined in

[src/Renderer/Drawing/GLLines.ts:182](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L182)

___

### genFatBuffers

▸ **genFatBuffers**(`renderstate`): `void`

The genFatBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLLines.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLLines.ts#L82)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[getClassName](Renderer_Drawing_GLGeom.GLGeom#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getGeom

▸ **getGeom**(): [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)

Returns the owned Geometry object

#### Returns

[`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom)

- The geometry object.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[getGeom](Renderer_Drawing_GLGeom.GLGeom#getgeom)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L47)

___

### getId

▸ **getId**(): `number`

Returns the unique id of the object. Every Object has a unique
identifier which is based on a counter that is incremented.

#### Returns

`number`

- The return value.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[getId](Renderer_Drawing_GLGeom.GLGeom#getid)

#### Defined in

[src/SceneTree/RefCounted.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L34)

___

### getRefIndex

▸ **getRefIndex**(`referer`): `number`

The getRefIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`number`

- The return value.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[getRefIndex](Renderer_Drawing_GLGeom.GLGeom#getrefindex)

#### Defined in

[src/SceneTree/RefCounted.ts:89](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L89)

___

### getRefer

▸ **getRefer**(`index`): [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)

The getRefer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass)

- The return value.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[getRefer](Renderer_Drawing_GLGeom.GLGeom#getrefer)

#### Defined in

[src/SceneTree/RefCounted.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L80)

___

### isDestroyed

▸ **isDestroyed**(): `boolean`

Returns true if this object has already been destroyed.

#### Returns

`boolean`

- Returns true or false.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[isDestroyed](Renderer_Drawing_GLGeom.GLGeom#isdestroyed)

#### Defined in

[src/SceneTree/RefCounted.ts:97](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L97)

___

### numRefs

▸ **numRefs**(): `number`

The numRefs method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[numRefs](Renderer_Drawing_GLGeom.GLGeom#numrefs)

#### Defined in

[src/SceneTree/RefCounted.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L42)

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

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[off](Renderer_Drawing_GLGeom.GLGeom#off)

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

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[on](Renderer_Drawing_GLGeom.GLGeom#on)

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

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[once](Renderer_Drawing_GLGeom.GLGeom#once)

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

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[removeListenerById](Renderer_Drawing_GLGeom.GLGeom#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### removeRef

▸ **removeRef**(`referer`): `void`

The removeRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`void`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[removeRef](Renderer_Drawing_GLGeom.GLGeom#removeref)

#### Defined in

[src/SceneTree/RefCounted.ts:64](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/RefCounted.ts#L64)

___

### unbind

▸ **unbind**(`renderstate`): `void`

The unbind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[unbind](Renderer_Drawing_GLGeom.GLGeom#unbind)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:105](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L105)

___

### updateBuffers

▸ **updateBuffers**(`renderstate?`): `void`

The updateBuffers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLGeom](Renderer_Drawing_GLGeom.GLGeom).[updateBuffers](Renderer_Drawing_GLGeom.GLGeom#updatebuffers)

#### Defined in

[src/Renderer/Drawing/GLGeom.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeom.ts#L74)

