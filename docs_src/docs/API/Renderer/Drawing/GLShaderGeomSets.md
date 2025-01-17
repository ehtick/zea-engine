---
id: "Renderer_Drawing_GLShaderGeomSets.GLShaderGeomSets"
title: "Class: GLShaderGeomSets"
sidebar_label: "GLShaderGeomSets"
custom_edit_url: null
---



Class representing GL shader materials.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLShaderGeomSets`**

## Constructors

### constructor

• **new GLShaderGeomSets**(`pass`, `gl`, `shaders`)

Create a GL shader material.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pass` | [`GLStandardGeomsPass`](../Passes/Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass) | The pass that owns this object. |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) | The glShader value. |
| `shaders` | `Record`<`string`, `any`\> | The shader value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L37)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### gl

• `Protected` **gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L22)

___

### glGeomDataShader

• `Protected` **glGeomDataShader**: `any`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L24)

___

### glGeomDataShaderKey

• `Protected` **glGeomDataShaderKey**: `string` = `''`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L29)

___

### glGeomItemSets

• `Protected` **glGeomItemSets**: `Record`<`string`, [`GLGeomItemSetMultiDraw`](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw) \| [`GLGeomItemSetMultiDrawCompoundGeom`](Renderer_Drawing_GLGeomItemSetMultiDrawCompoundGeom.GLGeomItemSetMultiDrawCompoundGeom)\> = `{}`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L26)

___

### glHighlightShader

• `Protected` **glHighlightShader**: `any`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L25)

___

### glHighlightShaderKey

• `Protected` **glHighlightShaderKey**: `string` = `''`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L30)

___

### glShader

• `Protected` **glShader**: `any`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L23)

___

### glShaderKey

• `Protected` **glShaderKey**: `string`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L28)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### pass

• `Protected` **pass**: [`GLStandardGeomsPass`](../Passes/Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass)

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L21)

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

[src/Renderer/Drawing/GLShaderGeomSets.ts:89](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L89)

___

### bindShader

▸ `Private` **bindShader**(`glShader`, `renderstate`, `key`): `void`

Binds one of its shaders for rendering, and also the other textures and values needed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glShader` | `Record`<`string`, `any`\> | The shader to bind |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The render state for the current draw traversal |
| `key` | `string` | The key to use to cache the shader binding. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:113](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L113)

___

### draw

▸ **draw**(`renderstate`): `void`

Draws all elements, binding the shader and continuing into the GLGLGeomSetGeomItemSets

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`ColorRenderState`](../RenderStates/Renderer_RenderStates_ColorRenderState.ColorRenderState) | The render state for the current draw traversal |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:138](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L138)

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

[src/Renderer/Drawing/GLShaderGeomSets.ts:166](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L166)

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`HighlightRenderState`](../RenderStates/Renderer_RenderStates_HighlightRenderState.HighlightRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:152](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L152)

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

### getOrCreateGLGeomItemSet

▸ `Private` **getOrCreateGLGeomItemSet**(`geom`): [`GLGeomItemSetMultiDraw`](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw) \| [`GLGeomItemSetMultiDrawCompoundGeom`](Renderer_Drawing_GLGeomItemSetMultiDrawCompoundGeom.GLGeomItemSetMultiDrawCompoundGeom)

Given a GeomItem, constructs the GLGeomItemSet that handles drawing that type of geometry.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geom` | [`BaseGeom`](../../SceneTree/Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) | The geomitem value. |

#### Returns

[`GLGeomItemSetMultiDraw`](Renderer_Drawing_GLGeomItemSetMultiDraw.GLGeomItemSetMultiDraw) \| [`GLGeomItemSetMultiDrawCompoundGeom`](Renderer_Drawing_GLGeomItemSetMultiDrawCompoundGeom.GLGeomItemSetMultiDrawCompoundGeom)

- The return value.

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:57](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L57)

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

### removeGLGeomItem

▸ **removeGLGeomItem**(`glGeomItem`): `void`

 Called by the GLPass to remove an item from this GLShaderGeomSets object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLShaderGeomSets.ts:100](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L100)

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

[src/Renderer/Drawing/GLShaderGeomSets.ts:193](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLShaderGeomSets.ts#L193)

