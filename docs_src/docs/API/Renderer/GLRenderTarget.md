---
id: "Renderer_GLRenderTarget.GLRenderTarget"
title: "Class: GLRenderTarget"
sidebar_label: "GLRenderTarget"
custom_edit_url: null
---



The GLRenderTarget is used to generate a WebGL Framebuffer and its associated textures.
It can be used to create a FrameBuffer, several color textures and an optional depth texture, all bound to the Framebuffer.

```javascript
 const renderTarget = new GLRenderTarget(gl, {
   type: gl.FLOAT,
   format: gl.RGBA,
   minFilter: gl.NEAREST,
   magFilter: gl.NEAREST,
   width: 128,
   height: 64,
   depthType: gl.FLOAT,
   depthFormat: gl.DEPTH_COMPONENT,
   depthInternalFormat: gl.DEPTH_COMPONENT32F,
 })
```

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GLRenderTarget`**

  ↳↳ [`GLImageAtlas`](Renderer_GLImageAtlas.GLImageAtlas)

## Constructors

### constructor

• **new GLRenderTarget**(`gl`, `params?`)

Create a GL render target.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |
| `params?` | `Record`<`string`, `any`\> | The params value. |

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Renderer/GLRenderTarget.ts:52](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L52)

## Properties

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLRenderTarget.ts:26](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L26)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/BaseClass.ts#L11)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `any`

#### Defined in

[src/Renderer/GLRenderTarget.ts:46](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L46)

___

### clearColor

• **clearColor**: [`Color`](../Math/Math_Color.Color)

#### Defined in

[src/Renderer/GLRenderTarget.ts:42](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L42)

___

### colorMask

• `Protected` **colorMask**: `boolean`[]

#### Defined in

[src/Renderer/GLRenderTarget.ts:43](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L43)

___

### depthTexture

• `Protected` **depthTexture**: `WebGLTexture`

#### Defined in

[src/Renderer/GLRenderTarget.ts:28](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L28)

___

### flipY

• `Protected` **flipY**: `boolean` = `false`

#### Defined in

[src/Renderer/GLRenderTarget.ts:39](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L39)

___

### format

• `Protected` **format**: `number`

#### Defined in

[src/Renderer/GLRenderTarget.ts:34](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L34)

___

### frameBuffer

• `Protected` **frameBuffer**: `WebGLFramebuffer`

#### Defined in

[src/Renderer/GLRenderTarget.ts:30](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L30)

___

### height

• **height**: `number` = `0`

#### Defined in

[src/Renderer/GLRenderTarget.ts:41](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L41)

___

### internalFormat

• `Protected` **internalFormat**: `number`

#### Defined in

[src/Renderer/GLRenderTarget.ts:35](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L35)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/EventEmitter.ts#L26)

___

### maxFilter

• `Protected` **maxFilter**: `number`

#### Defined in

[src/Renderer/GLRenderTarget.ts:37](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L37)

___

### minFilter

• `Protected` **minFilter**: `number`

#### Defined in

[src/Renderer/GLRenderTarget.ts:36](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L36)

___

### params

• `Protected` **params**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[src/Renderer/GLRenderTarget.ts:32](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L32)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Defined in

[src/Renderer/GLRenderTarget.ts:29](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L29)

___

### textureTargets

• `Protected` **textureTargets**: `WebGLTexture`[]

#### Defined in

[src/Renderer/GLRenderTarget.ts:27](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L27)

___

### textureType

• `Protected` **textureType**: `any`

#### Defined in

[src/Renderer/GLRenderTarget.ts:44](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L44)

___

### type

• `Protected` **type**: `number`

#### Defined in

[src/Renderer/GLRenderTarget.ts:33](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L33)

___

### width

• **width**: `number` = `0`

#### Defined in

[src/Renderer/GLRenderTarget.ts:40](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L40)

___

### wrap

• `Protected` **wrap**: `any`

#### Defined in

[src/Renderer/GLRenderTarget.ts:38](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L38)

## Methods

### bindColorTexture

▸ **bindColorTexture**(`renderstate`, `unif`, `channelId?`): `boolean`

The bindColorTexture method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |

| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | `undefined` | - |
| `channelId` | `number` | `0` | The channelId value. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLRenderTarget.ts:270](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L270)

___

### bindDepthTexture

▸ **bindDepthTexture**(`renderstate`, `unif`): `boolean`

The bindDepthTexture method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The WebGL uniform |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLRenderTarget.ts:285](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L285)

___

### bindForReading

▸ **bindForReading**(): `void`

Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:249](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L249)

___

### bindForWriting

▸ **bindForWriting**(`renderstate?`, `clear?`): `void`

The bindForWriting method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |

| `clear` | `boolean` | `false` | The clear value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:207](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L207)

___

### bindToUniform

▸ **bindToUniform**(`renderstate`, `unif`, `bindings?`): `boolean`

The bindToUniform method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |

| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The WebGL uniform |
| `bindings?` | `any` | The bindings param. |

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLRenderTarget.ts:446](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L446)

___

### checkFramebuffer

▸ **checkFramebuffer**(): `void`

The checkFramebuffer method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:173](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L173)

___

### clear

▸ **clear**(`clearDepth?`): `void`

The clear method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `clearDepth` | `boolean` | `true` | The clearDepth value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:234](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L234)

___

### configure

▸ **configure**(`params`): `void`

The configure method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Record`<`string`, `any`\> | The params param. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:70](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L70)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:478](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L478)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/BaseClass.ts#L33)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/BaseClass.ts#L25)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[off](../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/EventEmitter.ts#L44)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[once](../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/EventEmitter.ts#L82)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/EventEmitter.ts#L134)

___

### resize

▸ **resize**(`width`, `height`, `preserveData?`): `void`

The resize method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `width` | `number` | `undefined` | The width value. |
| `height` | `number` | `undefined` | The height value. |
| `preserveData` | `boolean` | `false` | The preserveData value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:307](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L307)

___

### unbind

▸ **unbind**(`renderstate?`): `void`

The unbind method.

#### Parameters

| Name | Type |
| :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:297](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L297)

___

### unbindForReading

▸ **unbindForReading**(): `void`

The unbindForReading method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:258](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L258)

___

### unbindForWriting

▸ **unbindForWriting**(`renderstate?`): `void`

The unbindForWriting method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/GLRenderTarget.ts:223](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Renderer/GLRenderTarget.ts#L223)

