---
id: "Renderer_GLImageAtlas.GLImageAtlas"
title: "Class: GLImageAtlas"
sidebar_label: "GLImageAtlas"
custom_edit_url: null
---



An Image Atlas lays out multiple smaller images within a larger image atlas, and tracks their positions.

## Hierarchy

- [`GLRenderTarget`](Renderer_GLRenderTarget.GLRenderTarget)

  ↳ **`GLImageAtlas`**

  ↳↳ [`ImagePyramid`](Renderer_ImagePyramid.ImagePyramid)

## Constructors

### constructor

• **new GLImageAtlas**(`gl`, `name`, `format?`, `type?`)

Create an image atlas..

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | `undefined` | The webgl rendering context. |
| `name` | `string` | `undefined` | The name value. |
| `format` | `string` | `'RGBA'` | The format value. |
| `type` | `string` | `'FLOAT'` | The type value. |

#### Overrides

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[constructor](Renderer_GLRenderTarget.GLRenderTarget#constructor)

#### Defined in

[src/Renderer/GLImageAtlas.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L42)

## Properties

### \_\_asyncCount

• `Protected` **\_\_asyncCount**: `number` = `0`

#### Defined in

[src/Renderer/GLImageAtlas.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L27)

___

### \_\_atlasLayoutShader

• `Protected` **\_\_atlasLayoutShader**: [`GLShader`](Renderer_GLShader.GLShader) = `null`

#### Defined in

[src/Renderer/GLImageAtlas.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L34)

___

### \_\_atlasLayoutShaderBinding

• `Protected` **\_\_atlasLayoutShaderBinding**: [`IGeomShaderBinding`](Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Defined in

[src/Renderer/GLImageAtlas.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L33)

___

### \_\_atlasLayoutTexture

• `Protected` **\_\_atlasLayoutTexture**: `any`

#### Defined in

[src/Renderer/GLImageAtlas.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L31)

___

### \_\_formatParam

• `Protected` **\_\_formatParam**: `string`

#### Defined in

[src/Renderer/GLImageAtlas.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L22)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[__gl](Renderer_GLRenderTarget.GLRenderTarget#__gl)

#### Defined in

[src/Renderer/GLRenderTarget.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L27)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[__id](Renderer_GLRenderTarget.GLRenderTarget#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_layout

• `Protected` **\_\_layout**: [`LayoutItem`](types/Renderer_types_renderer.LayoutItem)[] = `[]`

#### Defined in

[src/Renderer/GLImageAtlas.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L30)

___

### \_\_layoutNeedsRegeneration

• `Protected` **\_\_layoutNeedsRegeneration**: `boolean`

#### Defined in

[src/Renderer/GLImageAtlas.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L26)

___

### \_\_layoutVec4s

• `Protected` **\_\_layoutVec4s**: `number`[][] = `[]`

#### Defined in

[src/Renderer/GLImageAtlas.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L32)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[src/Renderer/GLImageAtlas.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L21)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `any`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[__prevBoundFbo](Renderer_GLRenderTarget.GLRenderTarget#__prevboundfbo)

#### Defined in

[src/Renderer/GLRenderTarget.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L47)

___

### \_\_subImages

• `Protected` **\_\_subImages**: `any`[]

#### Defined in

[src/Renderer/GLImageAtlas.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L25)

___

### \_\_typeParam

• `Protected` **\_\_typeParam**: `string`

#### Defined in

[src/Renderer/GLImageAtlas.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L23)

___

### clearColor

• **clearColor**: [`Color`](../Math/Math_Color.Color)

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[clearColor](Renderer_GLRenderTarget.GLRenderTarget#clearcolor)

#### Defined in

[src/Renderer/GLRenderTarget.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L43)

___

### colorMask

• `Protected` **colorMask**: `boolean`[]

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[colorMask](Renderer_GLRenderTarget.GLRenderTarget#colormask)

#### Defined in

[src/Renderer/GLRenderTarget.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L44)

___

### depthTexture

• `Protected` **depthTexture**: `WebGLTexture`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[depthTexture](Renderer_GLRenderTarget.GLRenderTarget#depthtexture)

#### Defined in

[src/Renderer/GLRenderTarget.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L29)

___

### flipY

• `Protected` **flipY**: `boolean` = `false`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[flipY](Renderer_GLRenderTarget.GLRenderTarget#flipy)

#### Defined in

[src/Renderer/GLRenderTarget.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L40)

___

### format

• `Protected` **format**: `number`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[format](Renderer_GLRenderTarget.GLRenderTarget#format)

#### Defined in

[src/Renderer/GLRenderTarget.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L35)

___

### frameBuffer

• `Protected` **frameBuffer**: `WebGLFramebuffer`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[frameBuffer](Renderer_GLRenderTarget.GLRenderTarget#framebuffer)

#### Defined in

[src/Renderer/GLRenderTarget.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L31)

___

### height

• **height**: `number` = `0`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[height](Renderer_GLRenderTarget.GLRenderTarget#height)

#### Defined in

[src/Renderer/GLRenderTarget.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L42)

___

### internalFormat

• `Protected` **internalFormat**: `number`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[internalFormat](Renderer_GLRenderTarget.GLRenderTarget#internalformat)

#### Defined in

[src/Renderer/GLRenderTarget.ts:36](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L36)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[listeners](Renderer_GLRenderTarget.GLRenderTarget#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• `Protected` **loaded**: `boolean` = `false`

#### Defined in

[src/Renderer/GLImageAtlas.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L28)

___

### maxFilter

• `Protected` **maxFilter**: `number`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[maxFilter](Renderer_GLRenderTarget.GLRenderTarget#maxfilter)

#### Defined in

[src/Renderer/GLRenderTarget.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L38)

___

### minFilter

• `Protected` **minFilter**: `number`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[minFilter](Renderer_GLRenderTarget.GLRenderTarget#minfilter)

#### Defined in

[src/Renderer/GLRenderTarget.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L37)

___

### params

• `Protected` **params**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[params](Renderer_GLRenderTarget.GLRenderTarget#params)

#### Defined in

[src/Renderer/GLRenderTarget.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L33)

___

### ready

• `Protected` **ready**: `boolean` = `false`

#### Defined in

[src/Renderer/GLImageAtlas.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L29)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[textureDesc](Renderer_GLRenderTarget.GLRenderTarget#texturedesc)

#### Defined in

[src/Renderer/GLRenderTarget.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L30)

___

### textureTargets

• `Protected` **textureTargets**: `WebGLTexture`[]

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[textureTargets](Renderer_GLRenderTarget.GLRenderTarget#texturetargets)

#### Defined in

[src/Renderer/GLRenderTarget.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L28)

___

### textureType

• `Protected` **textureType**: `any`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[textureType](Renderer_GLRenderTarget.GLRenderTarget#texturetype)

#### Defined in

[src/Renderer/GLRenderTarget.ts:45](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L45)

___

### type

• `Protected` **type**: `number`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[type](Renderer_GLRenderTarget.GLRenderTarget#type)

#### Defined in

[src/Renderer/GLRenderTarget.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L34)

___

### width

• **width**: `number` = `0`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[width](Renderer_GLRenderTarget.GLRenderTarget#width)

#### Defined in

[src/Renderer/GLRenderTarget.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L41)

___

### wrap

• `Protected` **wrap**: `any`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[wrap](Renderer_GLRenderTarget.GLRenderTarget#wrap)

#### Defined in

[src/Renderer/GLRenderTarget.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L39)

## Methods

### addSubImage

▸ **addSubImage**(`subImage`): `number`

The addSubImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subImage` | [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) \| `WebGLTexture` | The subImage value. |

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLImageAtlas.ts:85](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L85)

___

### bindColorTexture

▸ **bindColorTexture**(`renderstate`, `unif`, `channelId?`): `boolean`

The bindColorTexture method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | `undefined` | The object tracking the current state of the renderer |
| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | `undefined` | - |
| `channelId` | `number` | `0` | The channelId value. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[bindColorTexture](Renderer_GLRenderTarget.GLRenderTarget#bindcolortexture)

#### Defined in

[src/Renderer/GLRenderTarget.ts:271](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L271)

___

### bindDepthTexture

▸ **bindDepthTexture**(`renderstate`, `unif`): `boolean`

The bindDepthTexture method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |
| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The WebGL uniform |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[bindDepthTexture](Renderer_GLRenderTarget.GLRenderTarget#binddepthtexture)

#### Defined in

[src/Renderer/GLRenderTarget.ts:286](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L286)

___

### bindForReading

▸ **bindForReading**(): `void`

Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.

#### Returns

`void`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[bindForReading](Renderer_GLRenderTarget.GLRenderTarget#bindforreading)

#### Defined in

[src/Renderer/GLRenderTarget.ts:250](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L250)

___

### bindForWriting

▸ **bindForWriting**(`renderstate?`, `clear?`): `void`

The bindForWriting method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `renderstate?` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | `undefined` | The object tracking the current state of the renderer |
| `clear` | `boolean` | `false` | The clear value. |

#### Returns

`void`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[bindForWriting](Renderer_GLRenderTarget.GLRenderTarget#bindforwriting)

#### Defined in

[src/Renderer/GLRenderTarget.ts:208](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L208)

___

### bindToUniform

▸ **bindToUniform**(`renderstate`, `unif`): `boolean`

The bindToUniform method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |
| `unif` | [`Uniform`](types/Renderer_types_renderer.Uniform) | The WebGL uniform |

#### Returns

`boolean`

- The return value.

#### Overrides

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[bindToUniform](Renderer_GLRenderTarget.GLRenderTarget#bindtouniform)

#### Defined in

[src/Renderer/GLImageAtlas.ts:360](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L360)

___

### checkFramebuffer

▸ **checkFramebuffer**(): `void`

The checkFramebuffer method.

#### Returns

`void`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[checkFramebuffer](Renderer_GLRenderTarget.GLRenderTarget#checkframebuffer)

#### Defined in

[src/Renderer/GLRenderTarget.ts:174](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L174)

___

### cleanup

▸ **cleanup**(): `void`

The cleanup method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLImageAtlas.ts:383](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L383)

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

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[clear](Renderer_GLRenderTarget.GLRenderTarget#clear)

#### Defined in

[src/Renderer/GLRenderTarget.ts:235](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L235)

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

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[configure](Renderer_GLRenderTarget.GLRenderTarget#configure)

#### Defined in

[src/Renderer/GLRenderTarget.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L71)

___

### decAsyncCount

▸ **decAsyncCount**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/GLImageAtlas.ts:61](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L61)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Overrides

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[destroy](Renderer_GLRenderTarget.GLRenderTarget#destroy)

#### Defined in

[src/Renderer/GLImageAtlas.ts:395](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L395)

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

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[emit](Renderer_GLRenderTarget.GLRenderTarget#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### generateAtlasLayout

▸ **generateAtlasLayout**(`minTileSize?`): `void`

The generateAtlasLayout method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `minTileSize?` | `any` |

#### Returns

`void`

#### Defined in

[src/Renderer/GLImageAtlas.ts:159](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L159)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[getClassName](Renderer_GLRenderTarget.GLRenderTarget#getclassname)

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

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[getId](Renderer_GLRenderTarget.GLRenderTarget#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getLayoutData

▸ **getLayoutData**(`index`): `number`[]

The getLayoutData method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`number`[]

- The return value.

#### Defined in

[src/Renderer/GLImageAtlas.ts:295](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L295)

___

### getSubImage

▸ **getSubImage**(`index`): [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

The getSubImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

- The image value.

#### Defined in

[src/Renderer/GLImageAtlas.ts:143](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L143)

___

### incAsyncCount

▸ **incAsyncCount**(`count?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `count` | `number` | `1` |

#### Returns

`void`

#### Defined in

[src/Renderer/GLImageAtlas.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L55)

___

### isLoaded

▸ **isLoaded**(): `boolean`

The isLoaded method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLImageAtlas.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L75)

___

### isReady

▸ **isReady**(): `boolean`

The isReady method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLImageAtlas.ts:350](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L350)

___

### numSubImages

▸ **numSubImages**(): `number`

The numSubImages method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLImageAtlas.ts:151](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L151)

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

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[off](Renderer_GLRenderTarget.GLRenderTarget#off)

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

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[on](Renderer_GLRenderTarget.GLRenderTarget#on)

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

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[once](Renderer_GLRenderTarget.GLRenderTarget#once)

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

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[removeListenerById](Renderer_GLRenderTarget.GLRenderTarget#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### removeSubImage

▸ **removeSubImage**(`subImage`): `void`

The removeSubImage method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subImage` | [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) | The subImage value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLImageAtlas.ts:121](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L121)

___

### renderAtlas

▸ **renderAtlas**(`cleanup?`, `off?`): `void`

The renderAtlas method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `cleanup` | `boolean` | `false` | The cleanup value. |
| `off` | `number` | `0` | The off value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLImageAtlas.ts:304](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L304)

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

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[resize](Renderer_GLRenderTarget.GLRenderTarget#resize)

#### Defined in

[src/Renderer/GLRenderTarget.ts:308](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L308)

___

### unbind

▸ **unbind**(`renderstate?`): `void`

The unbind method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate?` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) |

#### Returns

`void`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[unbind](Renderer_GLRenderTarget.GLRenderTarget#unbind)

#### Defined in

[src/Renderer/GLRenderTarget.ts:298](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L298)

___

### unbindForReading

▸ **unbindForReading**(): `void`

The unbindForReading method.

#### Returns

`void`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[unbindForReading](Renderer_GLRenderTarget.GLRenderTarget#unbindforreading)

#### Defined in

[src/Renderer/GLRenderTarget.ts:259](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L259)

___

### unbindForWriting

▸ **unbindForWriting**(`renderstate?`): `void`

The unbindForWriting method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate?` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLRenderTarget](Renderer_GLRenderTarget.GLRenderTarget).[unbindForWriting](Renderer_GLRenderTarget.GLRenderTarget#unbindforwriting)

#### Defined in

[src/Renderer/GLRenderTarget.ts:224](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L224)

