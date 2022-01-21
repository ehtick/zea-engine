---
id: "Renderer_GLTexture2D.GLTexture2D"
title: "Class: GLTexture2D"
sidebar_label: "GLTexture2D"
custom_edit_url: null
---



Represents a texture that contains 2-dimensional images.
Images have width and height, but no depth.

## Hierarchy

- [`RefCounted`](../SceneTree/SceneTree_RefCounted.RefCounted)

  ↳ **`GLTexture2D`**

  ↳↳ [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage)

## Constructors

### constructor

• **new GLTexture2D**(`gl`, `params?`)

Create a GL texture 2D.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | The gl value. |
| `params?` | `Record`<`string`, `any`\> \| [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) | The params value. |

#### Overrides

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[constructor](../SceneTree/SceneTree_RefCounted.RefCounted#constructor)

#### Defined in

[src/Renderer/GLTexture2D.ts:49](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L49)

## Properties

### \_\_bound

• `Protected` **\_\_bound**: `boolean`

#### Defined in

[src/Renderer/GLTexture2D.ts:22](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L22)

___

### \_\_destroyed

• `Protected` **\_\_destroyed**: `boolean`

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[__destroyed](../SceneTree/SceneTree_RefCounted.RefCounted#__destroyed)

#### Defined in

[src/SceneTree/RefCounted.ts:15](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L15)

___

### \_\_flipY

• `Protected` **\_\_flipY**: `boolean` = `false`

#### Defined in

[src/Renderer/GLTexture2D.ts:35](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L35)

___

### \_\_format

• `Protected` **\_\_format**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:27](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L27)

___

### \_\_formatParam

• `Protected` **\_\_formatParam**: `string` = `''`

#### Defined in

[src/Renderer/GLTexture2D.ts:42](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L42)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLTexture2D.ts:15](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L15)

___

### \_\_gltex

• `Protected` **\_\_gltex**: `WebGLTexture` = `null`

#### Defined in

[src/Renderer/GLTexture2D.ts:40](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L40)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[__id](../SceneTree/SceneTree_RefCounted.RefCounted#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/BaseClass.ts#L11)

___

### \_\_image

• `Protected` **\_\_image**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Defined in

[src/Renderer/GLTexture2D.ts:24](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L24)

___

### \_\_internalFormat

• `Protected` **\_\_internalFormat**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:25](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L25)

___

### \_\_loaded

• `Protected` **\_\_loaded**: `boolean`

#### Defined in

[src/Renderer/GLTexture2D.ts:21](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L21)

___

### \_\_magFilter

• `Protected` **\_\_magFilter**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:32](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L32)

___

### \_\_minFilter

• `Protected` **\_\_minFilter**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:31](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L31)

___

### \_\_mipMapped

• `Protected` **\_\_mipMapped**: `boolean` = `false`

#### Defined in

[src/Renderer/GLTexture2D.ts:36](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L36)

___

### \_\_refs

• `Protected` **\_\_refs**: [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)[]

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[__refs](../SceneTree/SceneTree_RefCounted.RefCounted#__refs)

#### Defined in

[src/SceneTree/RefCounted.ts:14](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L14)

___

### \_\_type

• `Protected` **\_\_type**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:26](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L26)

___

### \_\_typeParam

• `Protected` **\_\_typeParam**: `string` = `''`

#### Defined in

[src/Renderer/GLTexture2D.ts:41](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L41)

___

### \_\_wrapParam

• `Protected` **\_\_wrapParam**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:28](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L28)

___

### \_\_wrapS

• `Protected` **\_\_wrapS**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:33](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L33)

___

### \_\_wrapT

• `Protected` **\_\_wrapT**: `number` = `0`

#### Defined in

[src/Renderer/GLTexture2D.ts:34](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L34)

___

### alphaFromLuminance

• **alphaFromLuminance**: `boolean` = `false`

#### Defined in

[src/Renderer/GLTexture2D.ts:38](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L38)

___

### height

• **height**: `number`

#### Defined in

[src/Renderer/GLTexture2D.ts:18](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L18)

___

### invert

• **invert**: `boolean` = `false`

#### Defined in

[src/Renderer/GLTexture2D.ts:37](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L37)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[listeners](../SceneTree/SceneTree_RefCounted.RefCounted#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/EventEmitter.ts#L26)

___

### params

• `Protected` **params**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[src/Renderer/GLTexture2D.ts:30](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L30)

___

### ready

• `Protected` **ready**: `boolean`

#### Defined in

[src/Renderer/GLTexture2D.ts:16](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L16)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Defined in

[src/Renderer/GLTexture2D.ts:20](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L20)

___

### textureType

• `Protected` **textureType**: `number`

#### Defined in

[src/Renderer/GLTexture2D.ts:19](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L19)

___

### width

• **width**: `number`

#### Defined in

[src/Renderer/GLTexture2D.ts:17](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L17)

## Accessors

### glTex

• `get` **glTex**(): `WebGLTexture`

Returns the value of the WebGLTexture value

#### Returns

`WebGLTexture`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:554](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L554)

## Methods

### \_\_updateGLTexParams

▸ `Private` **__updateGLTexParams**(): `void`

The __updateGLTexParams method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLTexture2D.ts:209](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L209)

___

### addRef

▸ **addRef**(`referer`): `boolean`

The addRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[addRef](../SceneTree/SceneTree_RefCounted.RefCounted#addref)

#### Defined in

[src/SceneTree/RefCounted.ts:51](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L51)

___

### bindToUniform

▸ **bindToUniform**(`renderstate`, `unif`, `bindings?`): `boolean`

Binds Texture to the Uniform attribute.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The unif value. |
| `bindings?` | `Record`<`string`, `any`\> | The bindings value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:588](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L588)

___

### bufferData

▸ **bufferData**(`data`, `width?`, `height?`, `bind?`, `emit?`): `void`

Initializes and creates the buffer of the object's data store.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `data` | `Float32Array` \| `Uint8Array` \| `Uint16Array` \| `HTMLCanvasElement` \| `WebGLTexture` \| `HTMLImageElement` \| `ImageData` \| `HTMLVideoElement` \| `Uint8ClampedArray` | `undefined` | The data value. |
| `width` | `number` | `-1` | The width value. |
| `height` | `number` | `-1` | The height value. |
| `bind` | `boolean` | `true` | The bind value. |
| `emit` | `boolean` | `true` | The emit value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLTexture2D.ts:235](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L235)

___

### clear

▸ **clear**(): `void`

Clears the buffers to preset values

#### Returns

`void`

#### Defined in

[src/Renderer/GLTexture2D.ts:394](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L394)

___

### configure

▸ **configure**(`params`): `void`

Builds the GLTexture2D using the specified parameters object.
Parameters must have the `BaseImage` properties structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Record`<`string`, `any`\> | The params value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLTexture2D.ts:158](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L158)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[destroy](../SceneTree/SceneTree_RefCounted.RefCounted#destroy)

#### Defined in

[src/Renderer/GLTexture2D.ts:619](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L619)

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

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[emit](../SceneTree/SceneTree_RefCounted.RefCounted#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[getClassName](../SceneTree/SceneTree_RefCounted.RefCounted#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/BaseClass.ts#L33)

___

### getFormat

▸ **getFormat**(): `number`

Returns the value of the specified texel data. It must be the same as the `internalFormat`

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:128](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L128)

___

### getId

▸ **getId**(): `number`

Returns the unique id of the object. Every Object has a unique
identifier which is based on a counter that is incremented.

#### Returns

`number`

- The return value.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[getId](../SceneTree/SceneTree_RefCounted.RefCounted#getid)

#### Defined in

[src/SceneTree/RefCounted.ts:34](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L34)

___

### getImage

▸ **getImage**(): [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage)

Returns the `BaseImage` of the GL Texture

#### Returns

[`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage)

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:101](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L101)

___

### getInternalFormat

▸ **getInternalFormat**(): `number`

Returns the specified value of the color components in the texture.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:110](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L110)

___

### getMipMapped

▸ **getMipMapped**(): `boolean`

Returns the value of the specified binding point.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:146](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L146)

___

### getRefIndex

▸ **getRefIndex**(`referer`): `number`

The getRefIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`number`

- The return value.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[getRefIndex](../SceneTree/SceneTree_RefCounted.RefCounted#getrefindex)

#### Defined in

[src/SceneTree/RefCounted.ts:89](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L89)

___

### getRefer

▸ **getRefer**(`index`): [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)

The getRefer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass)

- The return value.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[getRefer](../SceneTree/SceneTree_RefCounted.RefCounted#getrefer)

#### Defined in

[src/SceneTree/RefCounted.ts:80](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L80)

___

### getSize

▸ **getSize**(): `number`[]

Returns the `width`(Index 0) and the `height`(Index 1) of the GL Texture.

#### Returns

`number`[]

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:545](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L545)

___

### getTexHdl

▸ **getTexHdl**(): `WebGLTexture`

Returns the value of the WebGLTexture value

#### Returns

`WebGLTexture`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:563](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L563)

___

### getType

▸ **getType**(): `number`

Returns the value of the specified data type of the texel data.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:119](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L119)

___

### getWrap

▸ **getWrap**(): `number`

Returns the value of the specified wrapping function for texture coordinate

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:137](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L137)

___

### isDestroyed

▸ **isDestroyed**(): `boolean`

Returns true if this object has already been destroyed.

#### Returns

`boolean`

- Returns true or false.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[isDestroyed](../SceneTree/SceneTree_RefCounted.RefCounted#isdestroyed)

#### Defined in

[src/SceneTree/RefCounted.ts:97](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L97)

___

### isLoaded

▸ **isLoaded**(): `boolean`

Returns the loaded status of the 2D Texture

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:92](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L92)

___

### numRefs

▸ **numRefs**(): `number`

The numRefs method.

#### Returns

`number`

- The return value.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[numRefs](../SceneTree/SceneTree_RefCounted.RefCounted#numrefs)

#### Defined in

[src/SceneTree/RefCounted.ts:42](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L42)

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

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[off](../SceneTree/SceneTree_RefCounted.RefCounted#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/EventEmitter.ts#L97)

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

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[on](../SceneTree/SceneTree_RefCounted.RefCounted#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/EventEmitter.ts#L44)

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
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[once](../SceneTree/SceneTree_RefCounted.RefCounted#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/EventEmitter.ts#L82)

___

### populate

▸ **populate**(`dataArray`, `width`, `height`, `offsetX?`, `offsetY?`, `bind?`): `void`

Upload data for the image to the GPU.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `dataArray` | `Float32Array` \| `Uint16Array` | `undefined` | The dataArray value. |
| `width` | `number` | `undefined` | The width value |
| `height` | `number` | `undefined` | The height value |
| `offsetX` | `number` | `0` | The offsetX value |
| `offsetY` | `number` | `0` | The offsetY value |
| `bind` | `boolean` | `true` | The bind value |

#### Returns

`void`

#### Defined in

[src/Renderer/GLTexture2D.ts:527](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L527)

___

### preBind

▸ **preBind**(`unif`, `unifs`): `Record`<`string`, [`Uniform`](types/Renderer_types_renderer.Uniform)\>

The preBind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The unif value. |


#### Returns

`Record`<`string`, [`Uniform`](types/Renderer_types_renderer.Uniform)\>

- The return value.

#### Defined in

[src/Renderer/GLTexture2D.ts:573](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L573)

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

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[removeListenerById](../SceneTree/SceneTree_RefCounted.RefCounted#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/EventEmitter.ts#L134)

___

### removeRef

▸ **removeRef**(`referer`): `void`

The removeRef method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `referer` | [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) | The referer value. |

#### Returns

`void`

#### Inherited from

[RefCounted](../SceneTree/SceneTree_RefCounted.RefCounted).[removeRef](../SceneTree/SceneTree_RefCounted.RefCounted#removeref)

#### Defined in

[src/SceneTree/RefCounted.ts:64](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/SceneTree/RefCounted.ts#L64)

___

### resize

▸ **resize**(`width`, `height`, `preserveData?`, `emit?`): `void`

The resize method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `width` | `number` | `undefined` | The width value. |
| `height` | `number` | `undefined` | The height value. |
| `preserveData` | `boolean` | `false` | The preserveData value. |
| `emit` | `boolean` | `true` | The emit value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLTexture2D.ts:468](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/GLTexture2D.ts#L468)

