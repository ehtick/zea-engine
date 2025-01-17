---
id: "Renderer_Drawing_GLMaterialGeomItemSets.GLMaterialGeomItemSets"
title: "Class: GLMaterialGeomItemSets"
sidebar_label: "GLMaterialGeomItemSets"
custom_edit_url: null
---



Class representing GL material geom item sets.

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLMaterialGeomItemSets`**

## Constructors

### constructor

• **new GLMaterialGeomItemSets**(`pass`, `glMaterial`)

Create a GL material geom item set.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pass` | [`GLStandardGeomsPass`](../Passes/Renderer_Passes_GLStandardGeomsPass.GLStandardGeomsPass) | The pass that owns the GLMaterialGeomItemSets. |
| `glMaterial` | [`GLMaterial`](Renderer_Drawing_GLMaterial.GLMaterial) | The glMaterial value. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L25)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:16](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L16)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### drawCount

• `Protected` **drawCount**: `number` = `0`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L19)

___

### glGeomItemSets

• `Protected` **glGeomItemSets**: `Map`<[`GLGeom`](Renderer_Drawing_GLGeom.GLGeom), [`GLGeomItemSet`](Renderer_Drawing_GLGeomItemSet.GLGeomItemSet)\>

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L18)

___

### glMaterial

• **glMaterial**: [`GLMaterial`](Renderer_Drawing_GLMaterial.GLMaterial)

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:17](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L17)

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

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L15)

## Methods

### \_\_materialChanged

▸ `Private` **__materialChanged**(): `void`

The __materialChanged method.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L83)

___

### addGLGeomItem

▸ `Private` **addGLGeomItem**(`glGeomItem`, `glGeom`): `void`

The addGLGeomItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItem` | [`GLGeomItem`](Renderer_Drawing_GLGeomItem.GLGeomItem) | The glGeomItem value. |
| `glGeom` | [`GLGeom`](Renderer_Drawing_GLGeom.GLGeom) | The glGeomItem value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L60)

___

### addGeomItemSet

▸ **addGeomItemSet**(`glGeomItemSet`): `void`

The addGeomItemSet method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `glGeomItemSet` | [`GLGeomItemSet`](Renderer_Drawing_GLGeomItemSet.GLGeomItemSet) | The glGeomItemSet value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:100](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L100)

___

### draw

▸ **draw**(`renderstate`): `void`

Draws all elements, binding the shader and continuing into the GLGeomItemSet

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`ColorRenderState`](../RenderStates/Renderer_RenderStates_ColorRenderState.ColorRenderState) | The render state for the current draw traversal |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:129](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L129)

___

### drawCountChanged

▸ `Private` **drawCountChanged**(`event`): `void`

The drawCountChanged method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The change value. |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L74)

___

### drawGeomData

▸ **drawGeomData**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`GeomDataRenderState`](../RenderStates/Renderer_RenderStates_GeomDataRenderState.GeomDataRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:155](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L155)

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

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:143](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L143)

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

### getGLMaterial

▸ **getGLMaterial**(): [`GLMaterial`](Renderer_Drawing_GLMaterial.GLMaterial)

The getGLMaterial method.

#### Returns

[`GLMaterial`](Renderer_Drawing_GLMaterial.GLMaterial)

- The return value.

#### Defined in

[src/Renderer/Drawing/GLMaterialGeomItemSets.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/Drawing/GLMaterialGeomItemSets.ts#L50)

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

