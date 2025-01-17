---
id: "Renderer_GLEnvMap.GLEnvMap"
title: "Class: GLEnvMap"
sidebar_label: "GLEnvMap"
custom_edit_url: null
---



Class representing a GL environment map.

## Hierarchy

- [`GLProbe`](Renderer_GLProbe.GLProbe)

  ↳ **`GLEnvMap`**

## Constructors

### constructor

• **new GLEnvMap**(`renderer`, `envMap`)

Create a GL env map.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLRenderer`](Renderer_GLRenderer.GLRenderer) | The renderer value. |
| `envMap` | [`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap) | The environment map. |

#### Overrides

[GLProbe](Renderer_GLProbe.GLProbe).[constructor](Renderer_GLProbe.GLProbe#constructor)

#### Defined in

[src/Renderer/GLEnvMap.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L26)

## Properties

### \_\_backgroundFocus

• `Protected` **\_\_backgroundFocus**: `number`

#### Defined in

[src/Renderer/GLEnvMap.ts:16](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L16)

___

### \_\_convolved

• `Protected` **\_\_convolved**: `boolean`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__convolved](Renderer_GLProbe.GLProbe#__convolved)

#### Defined in

[src/Renderer/GLProbe.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L19)

___

### \_\_envMap

• `Protected` **\_\_envMap**: [`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap)

#### Defined in

[src/Renderer/GLEnvMap.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L15)

___

### \_\_envMapShader

• `Protected` **\_\_envMapShader**: [`EnvMapShader`](Shaders/Renderer_Shaders_EnvMapShader.EnvMapShader) = `null`

#### Defined in

[src/Renderer/GLEnvMap.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L18)

___

### \_\_envMapShaderBinding

• `Protected` **\_\_envMapShaderBinding**: [`IGeomShaderBinding`](Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Defined in

[src/Renderer/GLEnvMap.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L19)

___

### \_\_fbos

• `Protected` **\_\_fbos**: `any`[]

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__fbos](Renderer_GLProbe.GLProbe#__fbos)

#### Defined in

[src/Renderer/GLProbe.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L20)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__gl](Renderer_GLProbe.GLProbe#__gl)

#### Defined in

[src/Renderer/GLProbe.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L15)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[__id](Renderer_GLProbe.GLProbe#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_lodPyramid

• `Protected` **\_\_lodPyramid**: `any`

#### Defined in

[src/Renderer/GLEnvMap.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L20)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Defined in

[src/Renderer/GLEnvMap.ts:14](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L14)

___

### \_\_srcGLTex

• `Protected` **\_\_srcGLTex**: [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Defined in

[src/Renderer/GLEnvMap.ts:17](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L17)

___

### brdfLUTTexture

• `Protected` **brdfLUTTexture**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[brdfLUTTexture](Renderer_GLProbe.GLProbe#brdfluttexture)

#### Defined in

[src/Renderer/GLProbe.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L21)

___

### irradianceCubeTex

• `Protected` **irradianceCubeTex**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[irradianceCubeTex](Renderer_GLProbe.GLProbe#irradiancecubetex)

#### Defined in

[src/Renderer/GLProbe.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L22)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[listeners](Renderer_GLProbe.GLProbe#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### maxFragmentShaderTextureUnits

• `Protected` **maxFragmentShaderTextureUnits**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[maxFragmentShaderTextureUnits](Renderer_GLProbe.GLProbe#maxfragmentshadertextureunits)

#### Defined in

[src/Renderer/GLProbe.ts:16](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L16)

___

### specularCubetex

• `Protected` **specularCubetex**: `any`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[specularCubetex](Renderer_GLProbe.GLProbe#specularcubetex)

#### Defined in

[src/Renderer/GLProbe.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L23)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[textureDesc](Renderer_GLProbe.GLProbe#texturedesc)

#### Defined in

[src/Renderer/GLProbe.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L18)

___

### textureType

• `Protected` **textureType**: `number`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[textureType](Renderer_GLProbe.GLProbe#texturetype)

#### Defined in

[src/Renderer/GLProbe.ts:17](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L17)

## Methods

### bind

▸ **bind**(`renderstate`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`boolean`

- Returns true if the Probe was successfully bound.

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[bind](Renderer_GLProbe.GLProbe#bind)

#### Defined in

[src/Renderer/GLProbe.ts:240](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L240)

___

### convolveProbe

▸ **convolveProbe**(`srcGLTex`): `void`

The convolveProbe method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `srcGLTex` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | The srcGLTex value. |

#### Returns

`void`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[convolveProbe](Renderer_GLProbe.GLProbe#convolveprobe)

#### Defined in

[src/Renderer/GLProbe.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLProbe.ts#L50)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[GLProbe](Renderer_GLProbe.GLProbe).[destroy](Renderer_GLProbe.GLProbe#destroy)

#### Defined in

[src/Renderer/GLEnvMap.ts:161](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L161)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`ColorRenderState`](RenderStates/Renderer_RenderStates_ColorRenderState.ColorRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLEnvMap.ts:109](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L109)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[emit](Renderer_GLProbe.GLProbe#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### getBackgroundFocus

▸ **getBackgroundFocus**(): `number`

The getBackgroundFocus method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLEnvMap.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L92)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLProbe](Renderer_GLProbe.GLProbe).[getClassName](Renderer_GLProbe.GLProbe#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getEnvMap

▸ **getEnvMap**(): [`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap)

The getEnvMap method.

#### Returns

[`EnvMap`](../SceneTree/Images/SceneTree_Images_EnvMap.EnvMap)

- The return value.

#### Defined in

[src/Renderer/GLEnvMap.ts:84](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L84)

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

[GLProbe](Renderer_GLProbe.GLProbe).[getId](Renderer_GLProbe.GLProbe#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### init

▸ `Private` **init**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/GLEnvMap.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L44)

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

[GLProbe](Renderer_GLProbe.GLProbe).[off](Renderer_GLProbe.GLProbe#off)

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

[GLProbe](Renderer_GLProbe.GLProbe).[on](Renderer_GLProbe.GLProbe#on)

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

[GLProbe](Renderer_GLProbe.GLProbe).[once](Renderer_GLProbe.GLProbe#once)

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

[GLProbe](Renderer_GLProbe.GLProbe).[removeListenerById](Renderer_GLProbe.GLProbe#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setBackgroundFocus

▸ **setBackgroundFocus**(`val`): `void`

The setBackgroundFocus method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLEnvMap.ts:100](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLEnvMap.ts#L100)

