---
id: "Renderer_Drawing_GLGeomItemSetMultiDrawCompoundGeom.GLGeomItemSetMultiDrawCompoundGeom"
title: "Class: GLGeomItemSetMultiDrawCompoundGeom"
sidebar_label: "GLGeomItemSetMultiDrawCompoundGeom"
custom_edit_url: null
---



This class abstracts the rendering of a collection of geometries to screen.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLGeomItemSetMultiDrawCompoundGeom`**

## Constructors

### constructor

• **new GLGeomItemSetMultiDrawCompoundGeom**(`renderer`)

Create a GL geom item set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLBaseRenderer`](../Renderer_GLBaseRenderer.GLBaseRenderer) | The renderer object. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:83](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L83)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/BaseClass.ts#L11)

___

### dirtyGeomItems

• `Protected` **dirtyGeomItems**: `Set`<`number`\>

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:47](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L47)

___

### dirtyHighlightedGeomItems

• `Protected` **dirtyHighlightedGeomItems**: `Set`<`number`\>

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:71](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L71)

___

### drawElementCounts

• `Protected` **drawElementCounts**: `Record`<`string`, `Int32Array`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:54](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L54)

___

### drawElementOffsets

• `Protected` **drawElementOffsets**: `Record`<`string`, `Int32Array`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:55](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L55)

___

### drawIdsArrays

• `Protected` **drawIdsArrays**: `Record`<`string`, `Float32Array`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:52](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L52)

___

### drawIdsArraysAllocators

• `Protected` **drawIdsArraysAllocators**: `Record`<`string`, [`Allocator1D`](../../Utilities/Utilities_Allocator1D.Allocator1D)\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:51](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L51)

___

### drawIdsBufferDirty

• `Protected` **drawIdsBufferDirty**: `boolean` = `true`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:48](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L48)

___

### drawIdsTextures

• `Protected` **drawIdsTextures**: `Record`<`string`, [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D)\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:53](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L53)

___

### drawOrderToIndex

• `Protected` **drawOrderToIndex**: `number`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:56](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L56)

___

### fattenLinesShader

• `Protected` **fattenLinesShader**: [`FattenLinesShader`](../Shaders/Renderer_Shaders_FattenLinesShader.FattenLinesShader) = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:75](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L75)

___

### fbo

• `Protected` **fbo**: `WebGLFramebuffer` = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:77](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L77)

___

### freeIndices

• `Protected` **freeIndices**: `number`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:45](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L45)

___

### gl

• `Protected` **gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:41](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L41)

___

### glGeomIdsMapping

• `Protected` **glGeomIdsMapping**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:43](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L43)

___

### glGeomItems

• `Protected` **glGeomItems**: [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem)[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:42](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L42)

___

### glgeomItemEventHandlers

• `Protected` **glgeomItemEventHandlers**: `any`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:44](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L44)

___

### highlightElementCounts

• `Protected` **highlightElementCounts**: `Record`<`string`, `Int32Array`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:67](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L67)

___

### highlightElementOffsets

• `Protected` **highlightElementOffsets**: `Record`<`string`, `Int32Array`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:68](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L68)

___

### highlightedIdsArray

• `Protected` `Optional` **highlightedIdsArray**: `Record`<`string`, `Float32Array`\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:69](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L69)

___

### highlightedIdsArraysAllocators

• `Protected` **highlightedIdsArraysAllocators**: `Record`<`string`, [`Allocator1D`](../../Utilities/Utilities_Allocator1D.Allocator1D)\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:65](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L65)

___

### highlightedIdsBufferDirty

• `Protected` **highlightedIdsBufferDirty**: `boolean` = `true`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:72](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L72)

___

### highlightedIdsTextures

• `Protected` **highlightedIdsTextures**: `Record`<`string`, [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D)\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:70](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L70)

___

### highlightedItems

• `Protected` **highlightedItems**: `Record`<`number`, `number`[]\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:64](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L64)

___

### indexToDrawIndex

• `Protected` **indexToDrawIndex**: `number`[] = `[]`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:57](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L57)

___

### linesGeomDataBuffer

• `Protected` **linesGeomDataBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:74](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L74)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L26)

___

### quad

• `Protected` **quad**: [`GLMesh`](Renderer_Drawing_GLMesh.GLMesh) = `null`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:76](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L76)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:40](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L40)

## Methods

### addGLGeomItem

▸ **addGLGeomItem**(`glGeomItem`): `void`

The addGLGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:106](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L106)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1500](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1500)

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

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:817](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L817)

___

### drawGeomData

▸ **drawGeomData**(`renderstate`): `void`

The drawGeomData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`GeomDataRenderState`](../RenderStates/Renderer_RenderStates_GeomDataRenderState.GeomDataRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1064](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1064)

___

### drawHighlighted

▸ **drawHighlighted**(`renderstate`): `void`

The drawHighlighted method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`HighlightRenderState`](../RenderStates/Renderer_RenderStates_HighlightRenderState.HighlightRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1216](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1216)

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

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L154)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/BaseClass.ts#L33)

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

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/BaseClass.ts#L25)

___

### multiDrawLines

▸ **multiDrawLines**(`renderstate`, `drawIds`, `counts`, `offsets`, `drawCount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) |
| `drawIds` | `Float32Array` |
| `counts` | `Int32Array` |
| `offsets` | `Int32Array` |
| `drawCount` | `number` |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1314](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1314)

___

### multiDrawMeshes

▸ **multiDrawMeshes**(`renderstate`, `drawIds`, `counts`, `offsets`, `drawCount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) |
| `drawIds` | `Float32Array` |
| `counts` | `Int32Array` |
| `offsets` | `Int32Array` |
| `drawCount` | `number` |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1295](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1295)

___

### multiDrawPoints

▸ **multiDrawPoints**(`renderstate`, `drawIds`, `counts`, `offsets`, `drawCount`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) |
| `drawIds` | `Float32Array` |
| `counts` | `Int32Array` |
| `offsets` | `Int32Array` |
| `drawCount` | `number` |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1333](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1333)

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

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L97)

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

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L44)

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

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L82)

___

### removeGLGeomItem

▸ **removeGLGeomItem**(`glGeomItem`): `void`

The removeGLGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:247](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L247)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L134)

___

### sortItems

▸ **sortItems**(`viewPos`): `void`

Sorts the drawn items in order furthest to nearest when rendering transparent objects.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `viewPos` | [`Vec3`](../../Math/Math_Vec3.Vec3) | The position of the camera that we are sorting relative to. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:1372](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L1372)

___

### updateDrawIDsBuffer

▸ **updateDrawIDsBuffer**(`renderstate`): `void`

The updateDrawIDsBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object used to track state changes during rendering. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:302](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L302)

___

### updateHighlightedIDsBuffer

▸ **updateHighlightedIDsBuffer**(`renderstate`): `void`

The updateHighlightedIDsBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`HighlightRenderState`](../RenderStates/Renderer_RenderStates_HighlightRenderState.HighlightRenderState) | The object used to track state changes during rendering. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts:594](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/Drawing/GLGeomItemSetMultiDrawCompoundGeom.ts#L594)

