---
id: "Renderer_ImagePyramid.ImagePyramid"
title: "Class: ImagePyramid"
sidebar_label: "ImagePyramid"
custom_edit_url: null
---



Class representing an image pyramid.

## Hierarchy

- [`GLImageAtlas`](Renderer_GLImageAtlas.GLImageAtlas)

  ↳ **`ImagePyramid`**

## Constructors

### constructor

• **new ImagePyramid**(`gl`, `name`, `srcGLTex`, `screenQuad`, `destroySrcImage?`, `minTileSize?`)

Create an image pyramid.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) | `undefined` | The webgl rendering context. |
| `name` | `string` | `undefined` | The name value. |
| `srcGLTex` | [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) | `undefined` | The srcGLTex value. |
| `screenQuad` | [`GLScreenQuad`](Renderer_GLScreenQuad.GLScreenQuad) | `undefined` | - |
| `destroySrcImage` | `boolean` | `true` | The destroySrcImage value. |
| `minTileSize` | `number` | `16` | The minTileSize value. |

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[constructor](Renderer_GLImageAtlas.GLImageAtlas#constructor)

#### Defined in

[src/Renderer/ImagePyramid.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L32)

## Properties

### \_\_asyncCount

• `Protected` **\_\_asyncCount**: `number` = `0`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__asyncCount](Renderer_GLImageAtlas.GLImageAtlas#__asynccount)

#### Defined in

[src/Renderer/GLImageAtlas.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L27)

___

### \_\_atlasLayoutShader

• `Protected` **\_\_atlasLayoutShader**: [`GLShader`](Renderer_GLShader.GLShader) = `null`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__atlasLayoutShader](Renderer_GLImageAtlas.GLImageAtlas#__atlaslayoutshader)

#### Defined in

[src/Renderer/GLImageAtlas.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L34)

___

### \_\_atlasLayoutShaderBinding

• `Protected` **\_\_atlasLayoutShaderBinding**: [`IGeomShaderBinding`](Drawing/Renderer_Drawing_GeomShaderBinding.IGeomShaderBinding) = `null`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__atlasLayoutShaderBinding](Renderer_GLImageAtlas.GLImageAtlas#__atlaslayoutshaderbinding)

#### Defined in

[src/Renderer/GLImageAtlas.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L33)

___

### \_\_atlasLayoutTexture

• `Protected` **\_\_atlasLayoutTexture**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__atlasLayoutTexture](Renderer_GLImageAtlas.GLImageAtlas#__atlaslayouttexture)

#### Defined in

[src/Renderer/GLImageAtlas.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L31)

___

### \_\_fbos

• `Protected` **\_\_fbos**: [`GLFbo`](Renderer_GLFbo.GLFbo)[]

#### Defined in

[src/Renderer/ImagePyramid.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L21)

___

### \_\_formatParam

• `Protected` **\_\_formatParam**: `string`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__formatParam](Renderer_GLImageAtlas.GLImageAtlas#__formatparam)

#### Defined in

[src/Renderer/GLImageAtlas.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L22)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__gl](Renderer_GLImageAtlas.GLImageAtlas#__gl)

#### Defined in

[src/Renderer/GLRenderTarget.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L27)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__id](Renderer_GLImageAtlas.GLImageAtlas#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_layout

• `Protected` **\_\_layout**: [`LayoutItem`](types/Renderer_types_renderer.LayoutItem)[] = `[]`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__layout](Renderer_GLImageAtlas.GLImageAtlas#__layout)

#### Defined in

[src/Renderer/GLImageAtlas.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L30)

___

### \_\_layoutNeedsRegeneration

• `Protected` **\_\_layoutNeedsRegeneration**: `boolean`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__layoutNeedsRegeneration](Renderer_GLImageAtlas.GLImageAtlas#__layoutneedsregeneration)

#### Defined in

[src/Renderer/GLImageAtlas.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L26)

___

### \_\_layoutVec4s

• `Protected` **\_\_layoutVec4s**: `number`[][] = `[]`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__layoutVec4s](Renderer_GLImageAtlas.GLImageAtlas#__layoutvec4s)

#### Defined in

[src/Renderer/GLImageAtlas.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L32)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__name](Renderer_GLImageAtlas.GLImageAtlas#__name)

#### Defined in

[src/Renderer/GLImageAtlas.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L21)

___

### \_\_prevBoundFbo

• `Protected` **\_\_prevBoundFbo**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__prevBoundFbo](Renderer_GLImageAtlas.GLImageAtlas#__prevboundfbo)

#### Defined in

[src/Renderer/GLRenderTarget.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L47)

___

### \_\_srcGLTex

• `Protected` **\_\_srcGLTex**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[src/Renderer/ImagePyramid.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L20)

___

### \_\_subImages

• `Protected` **\_\_subImages**: `any`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__subImages](Renderer_GLImageAtlas.GLImageAtlas#__subimages)

#### Defined in

[src/Renderer/GLImageAtlas.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L25)

___

### \_\_typeParam

• `Protected` **\_\_typeParam**: `string`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[__typeParam](Renderer_GLImageAtlas.GLImageAtlas#__typeparam)

#### Defined in

[src/Renderer/GLImageAtlas.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L23)

___

### clearColor

• **clearColor**: [`Color`](../Math/Math_Color.Color)

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[clearColor](Renderer_GLImageAtlas.GLImageAtlas#clearcolor)

#### Defined in

[src/Renderer/GLRenderTarget.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L43)

___

### colorMask

• `Protected` **colorMask**: `boolean`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[colorMask](Renderer_GLImageAtlas.GLImageAtlas#colormask)

#### Defined in

[src/Renderer/GLRenderTarget.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L44)

___

### depthTexture

• `Protected` **depthTexture**: `WebGLTexture`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[depthTexture](Renderer_GLImageAtlas.GLImageAtlas#depthtexture)

#### Defined in

[src/Renderer/GLRenderTarget.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L29)

___

### flipY

• `Protected` **flipY**: `boolean` = `false`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[flipY](Renderer_GLImageAtlas.GLImageAtlas#flipy)

#### Defined in

[src/Renderer/GLRenderTarget.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L40)

___

### format

• `Protected` **format**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[format](Renderer_GLImageAtlas.GLImageAtlas#format)

#### Defined in

[src/Renderer/GLRenderTarget.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L35)

___

### frameBuffer

• `Protected` **frameBuffer**: `WebGLFramebuffer`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[frameBuffer](Renderer_GLImageAtlas.GLImageAtlas#framebuffer)

#### Defined in

[src/Renderer/GLRenderTarget.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L31)

___

### height

• **height**: `number` = `0`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[height](Renderer_GLImageAtlas.GLImageAtlas#height)

#### Defined in

[src/Renderer/GLRenderTarget.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L42)

___

### internalFormat

• `Protected` **internalFormat**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[internalFormat](Renderer_GLImageAtlas.GLImageAtlas#internalformat)

#### Defined in

[src/Renderer/GLRenderTarget.ts:36](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L36)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[listeners](Renderer_GLImageAtlas.GLImageAtlas#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• `Protected` **loaded**: `boolean` = `false`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[loaded](Renderer_GLImageAtlas.GLImageAtlas#loaded)

#### Defined in

[src/Renderer/GLImageAtlas.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L28)

___

### maxFilter

• `Protected` **maxFilter**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[maxFilter](Renderer_GLImageAtlas.GLImageAtlas#maxfilter)

#### Defined in

[src/Renderer/GLRenderTarget.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L38)

___

### minFilter

• `Protected` **minFilter**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[minFilter](Renderer_GLImageAtlas.GLImageAtlas#minfilter)

#### Defined in

[src/Renderer/GLRenderTarget.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L37)

___

### params

• `Protected` **params**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[params](Renderer_GLImageAtlas.GLImageAtlas#params)

#### Defined in

[src/Renderer/GLRenderTarget.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L33)

___

### ready

• `Protected` **ready**: `boolean` = `false`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[ready](Renderer_GLImageAtlas.GLImageAtlas#ready)

#### Defined in

[src/Renderer/GLImageAtlas.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L29)

___

### screenQuad

• `Protected` **screenQuad**: [`GLScreenQuad`](Renderer_GLScreenQuad.GLScreenQuad)

#### Defined in

[src/Renderer/ImagePyramid.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L22)

___

### size

• `Protected` **size**: `number`

#### Defined in

[src/Renderer/ImagePyramid.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L19)

___

### textureDesc

• `Protected` **textureDesc**: `number`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[textureDesc](Renderer_GLImageAtlas.GLImageAtlas#texturedesc)

#### Defined in

[src/Renderer/GLRenderTarget.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L30)

___

### textureTargets

• `Protected` **textureTargets**: `WebGLTexture`[]

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[textureTargets](Renderer_GLImageAtlas.GLImageAtlas#texturetargets)

#### Defined in

[src/Renderer/GLRenderTarget.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L28)

___

### textureType

• `Protected` **textureType**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[textureType](Renderer_GLImageAtlas.GLImageAtlas#texturetype)

#### Defined in

[src/Renderer/GLRenderTarget.ts:45](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L45)

___

### type

• `Protected` **type**: `number`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[type](Renderer_GLImageAtlas.GLImageAtlas#type)

#### Defined in

[src/Renderer/GLRenderTarget.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L34)

___

### width

• **width**: `number` = `0`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[width](Renderer_GLImageAtlas.GLImageAtlas#width)

#### Defined in

[src/Renderer/GLRenderTarget.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L41)

___

### wrap

• `Protected` **wrap**: `any`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[wrap](Renderer_GLImageAtlas.GLImageAtlas#wrap)

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

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[addSubImage](Renderer_GLImageAtlas.GLImageAtlas#addsubimage)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindColorTexture](Renderer_GLImageAtlas.GLImageAtlas#bindcolortexture)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindDepthTexture](Renderer_GLImageAtlas.GLImageAtlas#binddepthtexture)

#### Defined in

[src/Renderer/GLRenderTarget.ts:286](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L286)

___

### bindForReading

▸ **bindForReading**(): `void`

Binds the render target in preparation for 'readPixels' calls to pull data back to main memory.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindForReading](Renderer_GLImageAtlas.GLImageAtlas#bindforreading)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindForWriting](Renderer_GLImageAtlas.GLImageAtlas#bindforwriting)

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

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[bindToUniform](Renderer_GLImageAtlas.GLImageAtlas#bindtouniform)

#### Defined in

[src/Renderer/GLImageAtlas.ts:360](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L360)

___

### checkFramebuffer

▸ **checkFramebuffer**(): `void`

The checkFramebuffer method.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[checkFramebuffer](Renderer_GLImageAtlas.GLImageAtlas#checkframebuffer)

#### Defined in

[src/Renderer/GLRenderTarget.ts:174](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L174)

___

### cleanup

▸ **cleanup**(): `void`

The cleanup method.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[cleanup](Renderer_GLImageAtlas.GLImageAtlas#cleanup)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[clear](Renderer_GLImageAtlas.GLImageAtlas#clear)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[configure](Renderer_GLImageAtlas.GLImageAtlas#configure)

#### Defined in

[src/Renderer/GLRenderTarget.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L71)

___

### decAsyncCount

▸ **decAsyncCount**(): `void`

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[decAsyncCount](Renderer_GLImageAtlas.GLImageAtlas#decasynccount)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[destroy](Renderer_GLImageAtlas.GLImageAtlas#destroy)

#### Defined in

[src/Renderer/ImagePyramid.ts:116](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L116)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[emit](Renderer_GLImageAtlas.GLImageAtlas#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### generateAtlasLayout

▸ **generateAtlasLayout**(`minTileSize`): `void`

The generateAtlasLayout method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `minTileSize` | `any` | The minTileSize value. |

#### Returns

`void`

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[generateAtlasLayout](Renderer_GLImageAtlas.GLImageAtlas#generateatlaslayout)

#### Defined in

[src/Renderer/ImagePyramid.ts:67](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L67)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getClassName](Renderer_GLImageAtlas.GLImageAtlas#getclassname)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getId](Renderer_GLImageAtlas.GLImageAtlas#getid)

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

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getLayoutData](Renderer_GLImageAtlas.GLImageAtlas#getlayoutdata)

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

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[getSubImage](Renderer_GLImageAtlas.GLImageAtlas#getsubimage)

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

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[incAsyncCount](Renderer_GLImageAtlas.GLImageAtlas#incasynccount)

#### Defined in

[src/Renderer/GLImageAtlas.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L55)

___

### isLoaded

▸ **isLoaded**(): `boolean`

The isLoaded method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[isLoaded](Renderer_GLImageAtlas.GLImageAtlas#isloaded)

#### Defined in

[src/Renderer/GLImageAtlas.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L75)

___

### isReady

▸ **isReady**(): `boolean`

The isReady method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[isReady](Renderer_GLImageAtlas.GLImageAtlas#isready)

#### Defined in

[src/Renderer/GLImageAtlas.ts:350](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L350)

___

### numSubImages

▸ **numSubImages**(): `number`

The numSubImages method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[numSubImages](Renderer_GLImageAtlas.GLImageAtlas#numsubimages)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[off](Renderer_GLImageAtlas.GLImageAtlas#off)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[on](Renderer_GLImageAtlas.GLImageAtlas#on)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[once](Renderer_GLImageAtlas.GLImageAtlas#once)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[removeListenerById](Renderer_GLImageAtlas.GLImageAtlas#removelistenerbyid)

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

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[removeSubImage](Renderer_GLImageAtlas.GLImageAtlas#removesubimage)

#### Defined in

[src/Renderer/GLImageAtlas.ts:121](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLImageAtlas.ts#L121)

___

### renderAtlas

▸ **renderAtlas**(`cleanup?`): `void`

The renderAtlas method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `cleanup` | `boolean` | `true` | The cleanup value. |

#### Returns

`void`

#### Overrides

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[renderAtlas](Renderer_GLImageAtlas.GLImageAtlas#renderatlas)

#### Defined in

[src/Renderer/ImagePyramid.ts:99](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/ImagePyramid.ts#L99)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[resize](Renderer_GLImageAtlas.GLImageAtlas#resize)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[unbind](Renderer_GLImageAtlas.GLImageAtlas#unbind)

#### Defined in

[src/Renderer/GLRenderTarget.ts:298](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L298)

___

### unbindForReading

▸ **unbindForReading**(): `void`

The unbindForReading method.

#### Returns

`void`

#### Inherited from

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[unbindForReading](Renderer_GLImageAtlas.GLImageAtlas#unbindforreading)

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

[GLImageAtlas](Renderer_GLImageAtlas.GLImageAtlas).[unbindForWriting](Renderer_GLImageAtlas.GLImageAtlas#unbindforwriting)

#### Defined in

[src/Renderer/GLRenderTarget.ts:224](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLRenderTarget.ts#L224)

