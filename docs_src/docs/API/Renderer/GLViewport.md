---
id: "Renderer_GLViewport.GLViewport"
title: "Class: GLViewport"
sidebar_label: "GLViewport"
custom_edit_url: null
---



Class representing a GL viewport.

**Events**
* **resized:** Emitted when the GLViewport resizes
* **updated:** Emitted when the GLViewport needs updating. The Renderer will trigger a redraw when this occurs.
* **viewChanged:** Emitted when the view changes. Usually caused by the camera moving.
* **pointerDoublePressed:** Emitted when the user double clicks with the mouse, or double taps in the viewport.
* **pointerDown:** Emitted when the user presses a pointer
* **pointerUp:** Emitted when the user releases a pointer
* **pointerOverGeom:** Emitted when the pointer is moved over a geometry
* **pointerLeaveGeom:** Emitted when the pointer is moved off a geometry
* **pointerMove:** Emitted when the pointer is moved
* **pointerEnter:** Emitted when the pointer is moved into thg viewport
* **pointerLeave:** Emitted when the mouse leaves the viewport.
* **keyDown:** Emitted when the user presses a key on the keyboard
* **keyUp:** Emitted when the user releases a key on the keyboard
* **touchCancel:** Emitted when the user cancels a touch interaction

## Hierarchy

- [`GLBaseViewport`](Renderer_GLBaseViewport.GLBaseViewport)

  ↳ **`GLViewport`**

## Constructors

### constructor

• **new GLViewport**(`renderer`, `name`, `width`, `height`)

Create a GL viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | [`GLRenderer`](Renderer_GLRenderer.GLRenderer) | The renderer value. |
| `name` | `string` | The name value. |
| `width` | `number` | The width of the viewport |
| `height` | `number` | The height of the viewport |

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[constructor](Renderer_GLBaseViewport.GLBaseViewport#constructor)

#### Defined in

[src/Renderer/GLViewport.ts:87](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L87)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[EXT_frag_depth](Renderer_GLBaseViewport.GLBaseViewport#ext_frag_depth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L49)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](Renderer_GLHDRImage.GLHDRImage) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__backgroundGLTexture](Renderer_GLBaseViewport.GLBaseViewport#__backgroundgltexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L40)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__backgroundTexture](Renderer_GLBaseViewport.GLBaseViewport#__backgroundtexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L39)

___

### \_\_bl

• `Protected` **\_\_bl**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[src/Renderer/GLViewport.ts:59](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L59)

___

### \_\_camera

• `Protected` **\_\_camera**: [`Camera`](../SceneTree/SceneTree_Camera.Camera)

#### Defined in

[src/Renderer/GLViewport.ts:57](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L57)

___

### \_\_cameraMat

• `Protected` **\_\_cameraMat**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/GLViewport.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L71)

___

### \_\_cameraXfo

• `Protected` **\_\_cameraXfo**: [`Xfo`](../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/GLViewport.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L70)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__canvasHeight](Renderer_GLBaseViewport.GLBaseViewport#__canvasheight)

#### Defined in

[src/Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L45)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__canvasWidth](Renderer_GLBaseViewport.GLBaseViewport#__canvaswidth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L44)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__fbo](Renderer_GLBaseViewport.GLBaseViewport#__fbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L33)

___

### \_\_frustumDim

• `Protected` **\_\_frustumDim**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[src/Renderer/GLViewport.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L56)

___

### \_\_geomDataBuffer

• `Protected` **\_\_geomDataBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Defined in

[src/Renderer/GLViewport.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L62)

___

### \_\_geomDataBufferFbo

• `Protected` **\_\_geomDataBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Defined in

[src/Renderer/GLViewport.ts:64](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L64)

___

### \_\_geomDataBufferInvalid

• `Protected` **\_\_geomDataBufferInvalid**: `boolean` = `true`

#### Defined in

[src/Renderer/GLViewport.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L74)

___

### \_\_geomDataBufferSizeFactor

• `Protected` **\_\_geomDataBufferSizeFactor**: `number` = `1`

#### Defined in

[src/Renderer/GLViewport.ts:63](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L63)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__gl](Renderer_GLBaseViewport.GLBaseViewport#__gl)

#### Defined in

[src/Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L30)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__height](Renderer_GLBaseViewport.GLBaseViewport#__height)

#### Defined in

[src/Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L43)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__id](Renderer_GLBaseViewport.GLBaseViewport#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_intersectionData

• `Protected` **\_\_intersectionData**: [`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

#### Defined in

[src/Renderer/GLViewport.ts:76](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L76)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Defined in

[src/Renderer/GLViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L46)

___

### \_\_prevDownTime

• `Protected` **\_\_prevDownTime**: `number`

#### Defined in

[src/Renderer/GLViewport.ts:61](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L61)

___

### \_\_projectionMatrix

• `Protected` **\_\_projectionMatrix**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/GLViewport.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L55)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__renderer](Renderer_GLBaseViewport.GLBaseViewport#__renderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L32)

___

### \_\_screenPos

• `Protected` **\_\_screenPos**: [`Vec2`](../Math/Math_Vec2.Vec2) = `null`

#### Defined in

[src/Renderer/GLViewport.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L75)

___

### \_\_tr

• `Protected` **\_\_tr**: [`Vec2`](../Math/Math_Vec2.Vec2)

#### Defined in

[src/Renderer/GLViewport.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L60)

___

### \_\_viewMat

• `Protected` **\_\_viewMat**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/GLViewport.ts:72](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L72)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[__width](Renderer_GLBaseViewport.GLBaseViewport#__width)

#### Defined in

[src/Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L42)

___

### \_\_x

• `Protected` **\_\_x**: `number` = `0`

#### Defined in

[src/Renderer/GLViewport.ts:66](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L66)

___

### \_\_y

• `Protected` **\_\_y**: `number` = `0`

#### Defined in

[src/Renderer/GLViewport.ts:67](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L67)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[backgroundColorParam](Renderer_GLBaseViewport.GLBaseViewport#backgroundcolorparam)

#### Defined in

[src/Renderer/GLBaseViewport.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L56)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `WebGLRenderbuffer`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[colorRenderbuffer](Renderer_GLBaseViewport.GLBaseViewport#colorrenderbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L47)

___

### debugGeomDataBuffer

• **debugGeomDataBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/GLViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L47)

___

### debugHighlightedGeomsBuffer

• **debugHighlightedGeomsBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/GLViewport.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L50)

___

### debugOcclusionBuffer

• **debugOcclusionBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/GLViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L48)

___

### debugReductionBuffer

• **debugReductionBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/GLViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L49)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[deprecatedParamMapping](Renderer_GLBaseViewport.GLBaseViewport#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthBuffer](Renderer_GLBaseViewport.GLBaseViewport#depthbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L48)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthRange](Renderer_GLBaseViewport.GLBaseViewport#depthrange)

#### Defined in

[src/Renderer/GLBaseViewport.ts:51](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L51)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[depthTexture](Renderer_GLBaseViewport.GLBaseViewport#depthtexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L36)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[doubleClickTimeParam](Renderer_GLBaseViewport.GLBaseViewport#doubleclicktimeparam)

#### Defined in

[src/Renderer/GLBaseViewport.ts:61](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L61)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[fb](Renderer_GLBaseViewport.GLBaseViewport#fb)

#### Defined in

[src/Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L46)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBuffer](Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L37)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[highlightedGeomsBufferFbo](Renderer_GLBaseViewport.GLBaseViewport#highlightedgeomsbufferfbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L38)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[listeners](Renderer_GLBaseViewport.GLBaseViewport#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[manipulator](Renderer_GLBaseViewport.GLBaseViewport#manipulator)

#### Defined in

[src/Renderer/GLBaseViewport.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L50)

___

### mousePointerSearchArea

• **mousePointerSearchArea**: `number` = `5`

#### Defined in

[src/Renderer/GLViewport.ts:52](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L52)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[offscreenBuffer](Renderer_GLBaseViewport.GLBaseViewport#offscreenbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L35)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](Renderer_GLFbo.GLFbo) = `null`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[offscreenBufferFbo](Renderer_GLBaseViewport.GLBaseViewport#offscreenbufferfbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L41)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[paramEventListenerIDs](Renderer_GLBaseViewport.GLBaseViewport#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[paramMapping](Renderer_GLBaseViewport.GLBaseViewport#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[params](Renderer_GLBaseViewport.GLBaseViewport#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

___

### pointerOverItem

• `Protected` **pointerOverItem**: [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)

#### Defined in

[src/Renderer/GLViewport.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L78)

___

### quad

• `Protected` **quad**: [`GLMesh`](Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[quad](Renderer_GLBaseViewport.GLBaseViewport#quad)

#### Defined in

[src/Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L34)

___

### region

• `Protected` **region**: `number`[]

#### Defined in

[src/Renderer/GLViewport.ts:68](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L68)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[renderer](Renderer_GLBaseViewport.GLBaseViewport#renderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L31)

___

### touchPointerSearchArea

• **touchPointerSearchArea**: `number` = `45`

#### Defined in

[src/Renderer/GLViewport.ts:53](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L53)

## Methods

### \_\_getPointerPos

▸ `Private` **__getPointerPos**(`rendererX`, `rendererY`): [`Vec2`](../Math/Math_Vec2.Vec2)

Calculates the event coordinates relative to the viewport.
There could be multiple viewports connected to the current renderer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `rendererX` | `number` | The rendererX value |
| `rendererY` | `number` | The rendererY value |

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- Returns a new Vec2.

#### Defined in

[src/Renderer/GLViewport.ts:618](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L618)

___

### \_\_updateProjectionMatrix

▸ **__updateProjectionMatrix**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:260](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L260)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[addParameter](Renderer_GLBaseViewport.GLBaseViewport#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L135)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[addParameterDeprecationMapping](Renderer_GLBaseViewport.GLBaseViewport#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### calcRayFromScreenPos

▸ **calcRayFromScreenPos**(`screenPos`): [`Ray`](../Math/Math_Ray.Ray)

Compute a ray into the scene based on a mouse coordinate.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `screenPos` | [`Vec2`](../Math/Math_Vec2.Vec2) | The screen position. |

#### Returns

[`Ray`](../Math/Math_Ray.Ray)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:320](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L320)

___

### calcScreenPosFromWorldPos

▸ **calcScreenPosFromWorldPos**(`worldPos`): [`Vec2`](../Math/Math_Vec2.Vec2)

Compute the screen space position of an item from a world space coordinate.

#### Parameters

| Name | Type |
| :------ | :------ |
| `worldPos` | [`Vec3`](../Math/Math_Vec3.Vec3) |

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:306](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L306)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../SceneTree/SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[copyFrom](Renderer_GLBaseViewport.GLBaseViewport#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L316)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `renderstate` | [`ColorRenderState`](RenderStates/Renderer_RenderStates_ColorRenderState.ColorRenderState) |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[draw](Renderer_GLBaseViewport.GLBaseViewport#draw)

#### Defined in

[src/Renderer/GLViewport.ts:975](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L975)

___

### drawHighlights

▸ `Private` **drawHighlights**(`renderstate`): `void`

Draws the highlights around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`HighlightRenderState`](RenderStates/Renderer_RenderStates_HighlightRenderState.HighlightRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[drawHighlights](Renderer_GLBaseViewport.GLBaseViewport#drawhighlights)

#### Defined in

[src/Renderer/GLBaseViewport.ts:427](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L427)

___

### drawSilhouettes

▸ `Private` **drawSilhouettes**(`renderstate`): `void`

Draws the Silhouettes around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[drawSilhouettes](Renderer_GLBaseViewport.GLBaseViewport#drawsilhouettes)

#### Defined in

[src/Renderer/GLBaseViewport.ts:361](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L361)

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

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[emit](Renderer_GLBaseViewport.GLBaseViewport#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### frameView

▸ **frameView**(`treeItems?`): `void`

Calculates a new camera position that frames all the items passed in `treeItems` array, moving
the camera to a point where we can see all of them.
> See Camera.frameView

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItems?` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)[] | The array of TreeItem. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:291](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L291)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[fromJSON](Renderer_GLBaseViewport.GLBaseViewport#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L241)

___

### getBl

▸ **getBl**(): [`Vec2`](../Math/Math_Vec2.Vec2)

The getBl method.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:129](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L129)

___

### getCamera

▸ **getCamera**(): [`Camera`](../SceneTree/SceneTree_Camera.Camera)

Returns current camera object

#### Returns

[`Camera`](../SceneTree/SceneTree_Camera.Camera)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:223](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L223)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getClassName](Renderer_GLBaseViewport.GLBaseViewport#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getGeomDataAtPos

▸ **getGeomDataAtPos**(`screenPos`, `pointerRay`, `searchArea?`): [`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

The getGeomDataAtPos method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `screenPos` | [`Vec2`](../Math/Math_Vec2.Vec2) | `undefined` | The screen position. |
| `pointerRay` | [`Ray`](../Math/Math_Ray.Ray) | `undefined` | The pointerRay value. |
| `searchArea` | `number` | `5` | - |

#### Returns

[`IntersectionData`](../Utilities/Utilities_IntersectionData.IntersectionData)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:398](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L398)

___

### getGeomItemsInRect

▸ **getGeomItemsInRect**(`tl`, `br`): `Set`<[`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)\>

getGeomItemsInRect
Gathers all the geoms renders in a given rectangle of the viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tl` | [`Vec2`](../Math/Math_Vec2.Vec2) | The top left value of the rectangle. |
| `br` | [`Vec2`](../Math/Math_Vec2.Vec2) | The bottom right corner of the rectangle. |

#### Returns

`Set`<[`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem)\>

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:549](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L549)

___

### getHeight

▸ **getHeight**(): `number`

The getHeight method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getHeight](Renderer_GLBaseViewport.GLBaseViewport#getheight)

#### Defined in

[src/Renderer/GLBaseViewport.ts:163](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L163)

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

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getId](Renderer_GLBaseViewport.GLBaseViewport#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getManipulator

▸ **getManipulator**(): [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

The getManipulator method.

#### Returns

[`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getManipulator](Renderer_GLBaseViewport.GLBaseViewport#getmanipulator)

#### Defined in

[src/Renderer/GLBaseViewport.ts:486](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L486)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getNumParameters](Renderer_GLBaseViewport.GLBaseViewport#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameter](Renderer_GLBaseViewport.GLBaseViewport#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameterByIndex](Renderer_GLBaseViewport.GLBaseViewport#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L70)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameterIndex](Renderer_GLBaseViewport.GLBaseViewport#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getParameters](Renderer_GLBaseViewport.GLBaseViewport#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### getPosX

▸ **getPosX**(): `number`

The getPosX method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:165](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L165)

___

### getPosY

▸ **getPosY**(): `number`

The getPosY method.

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:173](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L173)

___

### getProjectionMatrix

▸ **getProjectionMatrix**(): [`Mat4`](../Math/Math_Mat4.Mat4)

The getProjectionMatrix method.

#### Returns

[`Mat4`](../Math/Math_Mat4.Mat4)

- The return projection matrix for the viewport.

#### Defined in

[src/Renderer/GLViewport.ts:273](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L273)

___

### getRenderer

▸ **getRenderer**(): [`GLBaseRenderer`](Renderer_GLBaseRenderer.GLBaseRenderer)

Returns the renderer this viewport is bound to.

#### Returns

[`GLBaseRenderer`](Renderer_GLBaseRenderer.GLBaseRenderer)

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getRenderer](Renderer_GLBaseViewport.GLBaseViewport#getrenderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:147](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L147)

___

### getTr

▸ **getTr**(): [`Vec2`](../Math/Math_Vec2.Vec2)

The getTr method.

#### Returns

[`Vec2`](../Math/Math_Vec2.Vec2)

- The return value.

#### Defined in

[src/Renderer/GLViewport.ts:147](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L147)

___

### getViewMatrix

▸ **getViewMatrix**(): [`Mat4`](../Math/Math_Mat4.Mat4)

The getProjectionMatrix method.

#### Returns

[`Mat4`](../Math/Math_Mat4.Mat4)

- The return projection matrix for the viewport.

#### Defined in

[src/Renderer/GLViewport.ts:281](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L281)

___

### getWidth

▸ **getWidth**(): `number`

The getWidth method.

#### Returns

`number`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[getWidth](Renderer_GLBaseViewport.GLBaseViewport#getwidth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:155](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L155)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[hasParameter](Renderer_GLBaseViewport.GLBaseViewport#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

___

### initRenderState

▸ `Private` **initRenderState**(`renderstate`): `void`

The initRenderState method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:952](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L952)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[insertParameter](Renderer_GLBaseViewport.GLBaseViewport#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

___

### invalidateGeomDataBuffer

▸ **invalidateGeomDataBuffer**(): `void`

The invalidateGeomDataBuffer method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:388](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L388)

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

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[off](Renderer_GLBaseViewport.GLBaseViewport#off)

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

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[on](Renderer_GLBaseViewport.GLBaseViewport#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Causes an event to occur when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onKeyDown](Renderer_GLBaseViewport.GLBaseViewport#onkeydown)

#### Defined in

[src/Renderer/GLViewport.ts:875](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L875)

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Causes an event to occur  when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onKeyUp](Renderer_GLBaseViewport.GLBaseViewport#onkeyup)

#### Defined in

[src/Renderer/GLViewport.ts:888](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L888)

___

### onMouseLeave

▸ **onMouseLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onMouseLeave](Renderer_GLBaseViewport.GLBaseViewport#onmouseleave)

#### Defined in

[src/Renderer/GLBaseViewport.ts:557](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L557)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Handler of the `pointerdown` event fired when the pointer device is initially pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerDown](Renderer_GLBaseViewport.GLBaseViewport#onpointerdown)

#### Defined in

[src/Renderer/GLViewport.ts:640](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L640)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Causes an event to occur when the mouse pointer is moved into this viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerEnter](Renderer_GLBaseViewport.GLBaseViewport#onpointerenter)

#### Defined in

[src/Renderer/GLViewport.ts:845](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L845)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Causes an event to occur when the mouse pointer is moved out of this viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerLeave](Renderer_GLBaseViewport.GLBaseViewport#onpointerleave)

#### Defined in

[src/Renderer/GLViewport.ts:860](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L860)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Causes an event to occur when the pointer device is moving.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerMove](Renderer_GLBaseViewport.GLBaseViewport#onpointermove)

#### Defined in

[src/Renderer/GLViewport.ts:770](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L770)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Causes an event to occur when a user releases a mouse button over a element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[onPointerUp](Renderer_GLBaseViewport.GLBaseViewport#onpointerup)

#### Defined in

[src/Renderer/GLViewport.ts:716](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L716)

___

### onTouchCancel

▸ **onTouchCancel**(`event`): `void`

Causes an event to occur when the touch event gets interrupted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The event that occurs. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:926](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L926)

___

### onWheel

▸ **onWheel**(`event`): `void`

Causes an event to occur when the mouse wheel is rolled up or down over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaWheelEvent`](../Utilities/Events/Utilities_Events_ZeaWheelEvent.ZeaWheelEvent) | The event that occurs. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:901](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L901)

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

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[once](Renderer_GLBaseViewport.GLBaseViewport#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[parameterValueChanged](Renderer_GLBaseViewport.GLBaseViewport#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L124)

___

### prepareUIEvent

▸ `Private` **prepareUIEvent**(`event`): `void`

Prepares pointer event by adding properties of the engine to it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaUIEvent`](../Utilities/Events/Utilities_Events_ZeaUIEvent.ZeaUIEvent) | The event that occurs in the canvas |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:631](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L631)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.

In each iteration of the array, propType and propName are extracted and
used to build the right `Parameter` class. Then all of them are added to the object.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[readBinary](Renderer_GLBaseViewport.GLBaseViewport#readbinary)

#### Defined in

[src/SceneTree/ParameterOwner.ts:276](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L276)

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

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[removeListenerById](Renderer_GLBaseViewport.GLBaseViewport#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[removeParameter](Renderer_GLBaseViewport.GLBaseViewport#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L176)

___

### renderGeomDataFbo

▸ **renderGeomDataFbo**(): `void`

Renders the scene geometry to the viewport's geom data buffer
in preparation for mouse picking.

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:369](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L369)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[replaceParameter](Renderer_GLBaseViewport.GLBaseViewport#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### resize

▸ **resize**(`canvasWidth`, `canvasHeight`): `void`

Dynamically resizes viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvasWidth` | `number` | The canvasWidth value. |
| `canvasHeight` | `number` | The canvasHeight value. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[resize](Renderer_GLBaseViewport.GLBaseViewport#resize)

#### Defined in

[src/Renderer/GLViewport.ts:183](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L183)

___

### resizeRenderTargets

▸ **resizeRenderTargets**(`width`, `height`): `void`

Resize any offscreen render targets.
> Note: Values ,ay not be the entire canvas with if multiple viewports exists.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The width used by this viewport. |
| `height` | `number` | The height  used by this viewport. |

#### Returns

`void`

#### Overrides

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[resizeRenderTargets](Renderer_GLBaseViewport.GLBaseViewport#resizerendertargets)

#### Defined in

[src/Renderer/GLViewport.ts:206](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L206)

___

### setBl

▸ **setBl**(`bl`): `void`

The setBl method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bl` | `number` | The bl value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:137](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L137)

___

### setCamera

▸ **setCamera**(`camera`): `void`

Sets current camera object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `camera` | [`Camera`](../SceneTree/SceneTree_Camera.Camera) | The camera value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:232](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L232)

___

### setManipulator

▸ **setManipulator**(`tool`): `void`

Sets the tool that will receive mouse, touch and keyboard events from the viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`default`](../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) | The manipulator value. |

#### Returns

`void`

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[setManipulator](Renderer_GLBaseViewport.GLBaseViewport#setmanipulator)

#### Defined in

[src/Renderer/GLBaseViewport.ts:494](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L494)

___

### setTr

▸ **setTr**(`tr`): `void`

The setTr method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tr` | `number` | The tr value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLViewport.ts:155](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLViewport.ts#L155)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[toJSON](Renderer_GLBaseViewport.GLBaseViewport#tojson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:218](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L218)

___

### toString

▸ **toString**(`context`): `string`

Converts object's JSON value and converts it to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- String of object's parameter list state.

#### Inherited from

[GLBaseViewport](Renderer_GLBaseViewport.GLBaseViewport).[toString](Renderer_GLBaseViewport.GLBaseViewport#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L303)

