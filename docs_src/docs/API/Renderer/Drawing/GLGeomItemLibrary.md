---
id: "Renderer_Drawing_GLGeomItemLibrary.GLGeomItemLibrary"
title: "Class: GLGeomItemLibrary"
sidebar_label: "GLGeomItemLibrary"
custom_edit_url: null
---



Class for managing all the GeomItems discovered in the SceneTree.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLGeomItemLibrary`**

## Constructors

### constructor

• **new GLGeomItemLibrary**(`renderer`, `options`)

Create a GLGeomItemLibrary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer instance |
| `options` | [`RendererOptions`](../Renderer_GLBaseRenderer.RendererOptions) | The options object passed to the GLRenderer constructor. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:109](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L109)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### bbox

• `Protected` **bbox**: [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:93](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L93)

___

### boundingBoxShader

• `Protected` **boundingBoxShader**: [`BoundingBoxShader`](../Shaders/Renderer_Shaders_BoundingBoxShader.BoundingBoxShader)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:95](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L95)

___

### debugOcclusionBuffer

• `Protected` **debugOcclusionBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:88](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L88)

___

### dirtyItemIndices

• `Protected` **dirtyItemIndices**: `number`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:72](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L72)

___

### dirtyWorkerItemIndices

• `Protected` **dirtyWorkerItemIndices**: `Set`<`number`\>

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L75)

___

### drawIdsBufferDirty

• `Protected` **drawIdsBufferDirty**: `boolean` = `false`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:97](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L97)

___

### enableFrustumCulling

• `Protected` **enableFrustumCulling**: `boolean`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:79](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L79)

___

### enableOcclusionCulling

• `Protected` **enableOcclusionCulling**: `boolean`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:87](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L87)

___

### glGeomItemEventHandlers

• `Protected` **glGeomItemEventHandlers**: `any`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:69](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L69)

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[]

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:68](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L68)

___

### glGeomItemsIndexFreeList

• `Protected` **glGeomItemsIndexFreeList**: `number`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L71)

___

### glGeomItemsMap

• `Protected` **glGeomItemsMap**: `Map`<[`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem), `number`\>

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L70)

___

### glGeomItemsTexture

• `Protected` **glGeomItemsTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L78)

___

### inFrustumDrawIdsBuffer

• `Protected` **inFrustumDrawIdsBuffer**: `WebGLBuffer`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:98](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L98)

___

### inFrustumIndicesCount

• `Protected` **inFrustumIndicesCount**: `number` = `0`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:96](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L96)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### occlusionDataBuffer

• `Protected` **occlusionDataBuffer**: [`GLRenderTarget`](../Renderer_GLRenderTarget.GLRenderTarget)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:89](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L89)

___

### occlusionImage

• `Protected` **occlusionImage**: [`DataImage`](../../SceneTree/Images/SceneTree_Images_DataImage.DataImage)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:90](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L90)

___

### occlusionImageItem

• `Protected` **occlusionImageItem**: [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:91](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L91)

___

### reductionDataArray

• `Protected` **reductionDataArray**: `Uint8Array`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:99](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L99)

___

### reductionDataBuffer

• `Protected` **reductionDataBuffer**: [`GLRenderTarget`](../Renderer_GLRenderTarget.GLRenderTarget)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L92)

___

### reductionShader

• `Protected` **reductionShader**: [`ReductionShader`](../Shaders/Renderer_Shaders_ReductionShader.ReductionShader)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:94](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L94)

___

### removedItemIndices

• `Protected` **removedItemIndices**: `number`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:76](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L76)

___

### renderer

• `Protected` **renderer**: [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:65](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L65)

___

### timer\_query\_ext

• `Private` **timer\_query\_ext**: `any` = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:101](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L101)

___

### worker

• `Private` **worker**: `GLGeomItemLibraryCullingWorker`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L102)

___

### xrFovY

• `Protected` **xrFovY**: `number` = `0.0`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L83)

___

### xrPresenting

• `Protected` **xrPresenting**: `boolean` = `false`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L82)

___

### xrProjectionMatrix

• `Protected` **xrProjectionMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:84](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L84)

___

### xrViewport

• `Protected` `Optional` **xrViewport**: [`XRViewport`](../VR/Renderer_VR_XRViewport.XRViewport)

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:81](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L81)

## Methods

### addGeomItem

▸ **addGeomItem**(`geomItem`): [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

The addGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

[`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

- The index of GLGeomItem

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:734](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L734)

___

### applyCullResults

▸ **applyCullResults**(`data`): `void`

Handles applying the culling results received from the GLGeomItemLibraryCullingWorker

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Record`<`string`, `any`\> | The object containing the newlyCulled and newlyUnCulled results. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:434](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L434)

___

### bind

▸ **bind**(`renderstate`): `void`

Updates the GPU state if any update is needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:1190](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L1190)

___

### calculateOcclusionCulling

▸ **calculateOcclusionCulling**(`inFrustumIndices`): `void`

Calculate a further refinement of the culling by using the GPU to see which items are actually visible.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inFrustumIndices` | `Float32Array` | The array of indices of items we know are in the frustum. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:507](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L507)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### emitCullingUpdateData

▸ `Private` **emitCullingUpdateData**(`data`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:454](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L454)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getCullingWorkerData

▸ **getCullingWorkerData**(`geomItem`, `material`, `index`): `Record`<`string`, `any`\>

Gathers data to pass to the culling worker.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The GeomItem to gether the data for. |
| `material` | [`Material`](../../SceneTree/SceneTree_Material.Material) | The material of GeomItem. |
| `index` | `number` | The index of the item to gether the data for. |

#### Returns

`Record`<`string`, `any`\>

- the JSON data that will be passed to the worker.

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:1016](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L1016)

___

### getGLGeomItem

▸ **getGLGeomItem**(`geomItem`): [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

The getGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

[`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

- The GLGeomItem that wraps the provided GeomItem

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:917](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L917)

___

### getGeomItem

▸ **getGeomItem**(`index`): [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

The getGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem)

- The GLGeomItem that wraps the provided GeomItem

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:904](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L904)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[off](../../Utilities/Utilities_EventEmitter.EventEmitter#off)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### populateDrawItemDataArray

▸ `Private` **populateDrawItemDataArray**(`index`, `subIndex`, `dataArray`): `void`

The populateDrawItemDataArray method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the item in the library. |
| `subIndex` | `number` | The index of the item within the block being uploaded. |
| `dataArray` | `Float32Array` | The dataArray value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:936](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L936)

___

### removeGeomItem

▸ **removeGeomItem**(`geomItem`): [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

The removeGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomItem` | [`GeomItem`](../../SceneTree/SceneTree_GeomItem.GeomItem) | The geomItem value. |

#### Returns

[`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)

- The return value.

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:849](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L849)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setupCullingWorker

▸ **setupCullingWorker**(`renderer`): `void`

Sets up the Culling Worker to start calculating frustum culling.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer instance |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L135)

___

### updateCulledDrawIDsBuffer

▸ **updateCulledDrawIDsBuffer**(`inFrustumIndices`): `void`

Given the IDs of the items we know are in the frustum, setup an instanced attribute we can use
to render bounding boxes for these items if they do not show up in the initial GPU buffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inFrustumIndices` | `Float32Array` | The array of indices of items we know are in the frustum. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:473](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L473)

___

### uploadGeomItems

▸ **uploadGeomItems**(`renderstate`): `void`

The uploadGeomItems method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:1110](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L1110)

___

### uploadGeomItemsToWorker

▸ **uploadGeomItemsToWorker**(): `void`

Any items that need to be updated on the worker are now pushed.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemLibrary.ts:1080](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLGeomItemLibrary.ts#L1080)

