---
id: "Renderer_VR_VRViewport.VRViewport"
title: "Class: VRViewport"
sidebar_label: "VRViewport"
custom_edit_url: null
---



This Viewport class is used for rendering stereoscopic views to VR controllers using the WebXR api.
 When the GLRenderer class detects a valid WebXF capable device is plugged in, this class is automatically
 instantiated ready for XR sessions

**Events**
* **presentingChanged:** Emitted when presenting is started or stopped
* **controllerAdded:** Emitted when a new XR controller is detected.
* **viewChanged:** Emitted during presentation each time the frame is rendered.
* **pointerDoublePressed:** Emitted when the user double clicks with an XR pointer.
* **pointerDown:** Emitted when the user presses an XR pointer
* **pointerUp:** Emitted when the user releases an XR pointer

## Hierarchy

- [`XRViewport`](Renderer_VR_XRViewport.XRViewport)

  ↳ **`VRViewport`**

## Constructors

### constructor

• **new VRViewport**(`renderer`, `sessionMode`)

Create a VR viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderer` | `any` | The renderer value. |
| `sessionMode` | `string` | - |

#### Overrides

[XRViewport](Renderer_VR_XRViewport.XRViewport).[constructor](Renderer_VR_XRViewport.XRViewport#constructor)

#### Defined in

[src/Renderer/VR/VRViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L47)

## Properties

### EXT\_frag\_depth

• `Protected` **EXT\_frag\_depth**: `EXT_frag_depth` = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[EXT_frag_depth](Renderer_VR_XRViewport.XRViewport#ext_frag_depth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:49](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L49)

___

### \_\_backgroundGLTexture

• `Protected` **\_\_backgroundGLTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) \| [`GLHDRImage`](../Renderer_GLHDRImage.GLHDRImage) = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__backgroundGLTexture](Renderer_VR_XRViewport.XRViewport#__backgroundgltexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L40)

___

### \_\_backgroundTexture

• `Protected` **\_\_backgroundTexture**: [`BaseImage`](../../SceneTree/SceneTree_BaseImage.BaseImage) = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__backgroundTexture](Renderer_VR_XRViewport.XRViewport#__backgroundtexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L39)

___

### \_\_canvasHeight

• `Protected` **\_\_canvasHeight**: `number` = `0`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__canvasHeight](Renderer_VR_XRViewport.XRViewport#__canvasheight)

#### Defined in

[src/Renderer/GLBaseViewport.ts:45](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L45)

___

### \_\_canvasWidth

• `Protected` **\_\_canvasWidth**: `number` = `0`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__canvasWidth](Renderer_VR_XRViewport.XRViewport#__canvaswidth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L44)

___

### \_\_fbo

• `Protected` **\_\_fbo**: `WebGLFramebuffer` = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__fbo](Renderer_VR_XRViewport.XRViewport#__fbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L33)

___

### \_\_gl

• `Protected` **\_\_gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__gl](Renderer_VR_XRViewport.XRViewport#__gl)

#### Defined in

[src/Renderer/GLBaseViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L30)

___

### \_\_height

• `Protected` **\_\_height**: `number` = `0`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__height](Renderer_VR_XRViewport.XRViewport#__height)

#### Defined in

[src/Renderer/GLBaseViewport.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L43)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__id](Renderer_VR_XRViewport.XRViewport#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_renderer

• `Protected` **\_\_renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__renderer](Renderer_VR_XRViewport.XRViewport#__renderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L32)

___

### \_\_width

• `Protected` **\_\_width**: `number` = `0`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[__width](Renderer_VR_XRViewport.XRViewport#__width)

#### Defined in

[src/Renderer/GLBaseViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L42)

___

### backgroundColorParam

• **backgroundColorParam**: [`ColorParameter`](../../SceneTree/Parameters/SceneTree_Parameters_ColorParameter.ColorParameter)

**`member`** backgroundColorParam - Changes background color of the scene

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[backgroundColorParam](Renderer_VR_XRViewport.XRViewport#backgroundcolorparam)

#### Defined in

[src/Renderer/GLBaseViewport.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L56)

___

### cameraMatrices

• `Protected` **cameraMatrices**: [`Mat4`](../../Math/Math_Mat4.Mat4)[] = `[]`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[cameraMatrices](Renderer_VR_XRViewport.XRViewport#cameramatrices)

#### Defined in

[src/Renderer/VR/XRViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L40)

___

### colorRenderbuffer

• `Protected` **colorRenderbuffer**: `WebGLRenderbuffer`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[colorRenderbuffer](Renderer_VR_XRViewport.XRViewport#colorrenderbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L47)

___

### controllerPointerDownTime

• `Private` **controllerPointerDownTime**: `number`[]

#### Defined in

[src/Renderer/VR/VRViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L41)

___

### controllers

• **controllers**: [`XRController`](Renderer_VR_XRController.XRController)[]

#### Defined in

[src/Renderer/VR/VRViewport.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L40)

___

### controllersMap

• `Private` **controllersMap**: `Record`<`string`, [`XRController`](Renderer_VR_XRController.XRController)\>

#### Defined in

[src/Renderer/VR/VRViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L39)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[deprecatedParamMapping](Renderer_VR_XRViewport.XRViewport#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### depthBuffer

• `Protected` **depthBuffer**: `WebGLRenderbuffer` = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[depthBuffer](Renderer_VR_XRViewport.XRViewport#depthbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:48](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L48)

___

### depthRange

• `Protected` **depthRange**: `number`[]

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[depthRange](Renderer_VR_XRViewport.XRViewport#depthrange)

#### Defined in

[src/Renderer/GLBaseViewport.ts:51](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L51)

___

### depthTexture

• `Protected` **depthTexture**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[depthTexture](Renderer_VR_XRViewport.XRViewport#depthtexture)

#### Defined in

[src/Renderer/GLBaseViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L36)

___

### doubleClickTimeParam

• **doubleClickTimeParam**: [`NumberParameter`](../../SceneTree/Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** doubleClickTimeParam - The maximum time between clicks for a double click to be registered.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[doubleClickTimeParam](Renderer_VR_XRViewport.XRViewport#doubleclicktimeparam)

#### Defined in

[src/Renderer/GLBaseViewport.ts:61](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L61)

___

### fb

• `Protected` **fb**: `WebGLFramebuffer`[] = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[fb](Renderer_VR_XRViewport.XRViewport#fb)

#### Defined in

[src/Renderer/GLBaseViewport.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L46)

___

### highlightedGeomsBuffer

• `Protected` **highlightedGeomsBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[highlightedGeomsBuffer](Renderer_VR_XRViewport.XRViewport#highlightedgeomsbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L37)

___

### highlightedGeomsBufferFbo

• `Protected` **highlightedGeomsBufferFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[highlightedGeomsBufferFbo](Renderer_VR_XRViewport.XRViewport#highlightedgeomsbufferfbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L38)

___

### hmd

• `Private` **hmd**: `string` = `''`

#### Defined in

[src/Renderer/VR/VRViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L34)

___

### hmdAssetPromise

• `Private` `Optional` **hmdAssetPromise**: `Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

#### Defined in

[src/Renderer/VR/VRViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L35)

___

### invStageMatrix

• `Protected` **invStageMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[invStageMatrix](Renderer_VR_XRViewport.XRViewport#invstagematrix)

#### Defined in

[src/Renderer/VR/XRViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L31)

___

### invStageXfo

• `Protected` **invStageXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[invStageXfo](Renderer_VR_XRViewport.XRViewport#invstagexfo)

#### Defined in

[src/Renderer/VR/XRViewport.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L30)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[listeners](Renderer_VR_XRViewport.XRViewport#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### manipulator

• `Protected` **manipulator**: [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[manipulator](Renderer_VR_XRViewport.XRViewport#manipulator)

#### Defined in

[src/Renderer/GLBaseViewport.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L50)

___

### offscreenBuffer

• `Protected` **offscreenBuffer**: [`GLTexture2D`](../Renderer_GLTexture2D.GLTexture2D) = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[offscreenBuffer](Renderer_VR_XRViewport.XRViewport#offscreenbuffer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L35)

___

### offscreenBufferFbo

• `Protected` **offscreenBufferFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo) = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[offscreenBufferFbo](Renderer_VR_XRViewport.XRViewport#offscreenbufferfbo)

#### Defined in

[src/Renderer/GLBaseViewport.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L41)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[paramEventListenerIDs](Renderer_VR_XRViewport.XRViewport#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[paramMapping](Renderer_VR_XRViewport.XRViewport#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[params](Renderer_VR_XRViewport.XRViewport#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

___

### projectionMatrices

• `Protected` **projectionMatrices**: [`Mat4`](../../Math/Math_Mat4.Mat4)[] = `[]`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[projectionMatrices](Renderer_VR_XRViewport.XRViewport#projectionmatrices)

#### Defined in

[src/Renderer/VR/XRViewport.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L38)

___

### projectionMatricesUpdated

• `Protected` **projectionMatricesUpdated**: `boolean`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[projectionMatricesUpdated](Renderer_VR_XRViewport.XRViewport#projectionmatricesupdated)

#### Defined in

[src/Renderer/VR/XRViewport.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L23)

___

### quad

• `Protected` **quad**: [`GLMesh`](../Drawing/Renderer_Drawing_GLMesh.GLMesh)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[quad](Renderer_VR_XRViewport.XRViewport#quad)

#### Defined in

[src/Renderer/GLBaseViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L34)

___

### refSpace

• `Protected` **refSpace**: `any`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[refSpace](Renderer_VR_XRViewport.XRViewport#refspace)

#### Defined in

[src/Renderer/VR/XRViewport.ts:36](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L36)

___

### region

• `Protected` **region**: `number`[] = `[]`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[region](Renderer_VR_XRViewport.XRViewport#region)

#### Defined in

[src/Renderer/VR/XRViewport.ts:34](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L34)

___

### renderer

• `Protected` **renderer**: [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[renderer](Renderer_VR_XRViewport.XRViewport#renderer)

#### Defined in

[src/Renderer/GLBaseViewport.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L31)

___

### session

• `Protected` **session**: `any` = `null`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[session](Renderer_VR_XRViewport.XRViewport#session)

#### Defined in

[src/Renderer/VR/XRViewport.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L32)

___

### sessionMode

• `Protected` **sessionMode**: `string` = `'immersive-vr'`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[sessionMode](Renderer_VR_XRViewport.XRViewport#sessionmode)

#### Defined in

[src/Renderer/VR/XRViewport.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L42)

___

### stageScale

• **stageScale**: `number`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[stageScale](Renderer_VR_XRViewport.XRViewport#stagescale)

#### Defined in

[src/Renderer/VR/XRViewport.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L26)

___

### stageTreeItem

• `Protected` **stageTreeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[stageTreeItem](Renderer_VR_XRViewport.XRViewport#stagetreeitem)

#### Defined in

[src/Renderer/VR/XRViewport.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L24)

___

### stageXfo

• `Protected` **stageXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[stageXfo](Renderer_VR_XRViewport.XRViewport#stagexfo)

#### Defined in

[src/Renderer/VR/XRViewport.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L29)

___

### tick

• `Protected` **tick**: `number`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[tick](Renderer_VR_XRViewport.XRViewport#tick)

#### Defined in

[src/Renderer/VR/XRViewport.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L25)

___

### viewMatrices

• `Protected` **viewMatrices**: [`Mat4`](../../Math/Math_Mat4.Mat4)[] = `[]`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[viewMatrices](Renderer_VR_XRViewport.XRViewport#viewmatrices)

#### Defined in

[src/Renderer/VR/XRViewport.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L39)

___

### viewXfo

• `Protected` **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[viewXfo](Renderer_VR_XRViewport.XRViewport#viewxfo)

#### Defined in

[src/Renderer/VR/XRViewport.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L28)

___

### vrAsset

• `Private` `Optional` **vrAsset**: [`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

#### Defined in

[src/Renderer/VR/VRViewport.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L33)

___

### xrhead

• `Private` **xrhead**: [`XRHead`](Renderer_VR_XRHead.XRHead)

#### Defined in

[src/Renderer/VR/VRViewport.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L37)

## Methods

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[addParameter](Renderer_VR_XRViewport.XRViewport#addparameter)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[addParameterDeprecationMapping](Renderer_VR_XRViewport.XRViewport#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../../SceneTree/SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[copyFrom](Renderer_VR_XRViewport.XRViewport#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L316)

___

### draw

▸ **draw**(`renderstate`): `void`

The draw method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`ColorRenderState`](../RenderStates/Renderer_RenderStates_ColorRenderState.ColorRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[draw](Renderer_VR_XRViewport.XRViewport#draw)

#### Defined in

[src/Renderer/GLBaseViewport.ts:280](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L280)

___

### drawHighlights

▸ `Private` **drawHighlights**(`renderstate`): `void`

Draws the highlights around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`HighlightRenderState`](../RenderStates/Renderer_RenderStates_HighlightRenderState.HighlightRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[drawHighlights](Renderer_VR_XRViewport.XRViewport#drawhighlights)

#### Defined in

[src/Renderer/GLBaseViewport.ts:427](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L427)

___

### drawSilhouettes

▸ `Private` **drawSilhouettes**(`renderstate`): `void`

Draws the Silhouettes around geometries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](../RenderStates/Renderer_RenderStates_RenderState.RenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[drawSilhouettes](Renderer_VR_XRViewport.XRViewport#drawsilhouettes)

#### Defined in

[src/Renderer/GLBaseViewport.ts:361](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L361)

___

### drawXRFrame

▸ **drawXRFrame**(`xrFrame`): `void`

The drawXRFrame method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrFrame` | `any` | The xrFrame value. |

#### Returns

`void`

#### Overrides

[XRViewport](Renderer_VR_XRViewport.XRViewport).[drawXRFrame](Renderer_VR_XRViewport.XRViewport#drawxrframe)

#### Defined in

[src/Renderer/VR/VRViewport.ts:333](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L333)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[emit](Renderer_VR_XRViewport.XRViewport#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[fromJSON](Renderer_VR_XRViewport.XRViewport#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L241)

___

### getAsset

▸ **getAsset**(): [`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

The getAsset method.

#### Returns

[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)

- The return value.

#### Defined in

[src/Renderer/VR/VRViewport.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L62)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getClassName](Renderer_VR_XRViewport.XRViewport#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getControllers

▸ **getControllers**(): [`XRController`](Renderer_VR_XRController.XRController)[]

The getControllers method.

#### Returns

[`XRController`](Renderer_VR_XRController.XRController)[]

- The return value.

#### Defined in

[src/Renderer/VR/VRViewport.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L78)

___

### getHMDName

▸ **getHMDName**(): `string`

Returns the name of the HMD being used.

#### Returns

`string`

- The return value.

#### Defined in

[src/Renderer/VR/VRViewport.ts:86](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L86)

___

### getHeight

▸ **getHeight**(): `number`

The getHeight method.

#### Returns

`number`

- The return value.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getHeight](Renderer_VR_XRViewport.XRViewport#getheight)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getId](Renderer_VR_XRViewport.XRViewport#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getManipulator

▸ **getManipulator**(): [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

The getManipulator method.

#### Returns

[`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

- The return value.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getManipulator](Renderer_VR_XRViewport.XRViewport#getmanipulator)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getNumParameters](Renderer_VR_XRViewport.XRViewport#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getParameter](Renderer_VR_XRViewport.XRViewport#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getParameterByIndex](Renderer_VR_XRViewport.XRViewport#getparameterbyindex)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getParameterIndex](Renderer_VR_XRViewport.XRViewport#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getParameters](Renderer_VR_XRViewport.XRViewport#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### getRenderer

▸ **getRenderer**(): [`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

Returns the renderer this viewport is bound to.

#### Returns

[`GLRenderer`](../Renderer_GLRenderer.GLRenderer)

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getRenderer](Renderer_VR_XRViewport.XRViewport#getrenderer)

#### Defined in

[src/Renderer/VR/XRViewport.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L75)

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getTreeItem](Renderer_VR_XRViewport.XRViewport#gettreeitem)

#### Defined in

[src/Renderer/VR/XRViewport.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L83)

___

### getVRHead

▸ **getVRHead**(): [`XRHead`](Renderer_VR_XRHead.XRHead)

The getVRHead method.

#### Returns

[`XRHead`](Renderer_VR_XRHead.XRHead)

- The return value.

#### Defined in

[src/Renderer/VR/VRViewport.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L70)

___

### getWidth

▸ **getWidth**(): `number`

The getWidth method.

#### Returns

`number`

- The return value.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getWidth](Renderer_VR_XRViewport.XRViewport#getwidth)

#### Defined in

[src/Renderer/GLBaseViewport.ts:155](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L155)

___

### getXfo

▸ **getXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[getXfo](Renderer_VR_XRViewport.XRViewport#getxfo)

#### Defined in

[src/Renderer/VR/XRViewport.ts:91](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L91)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[hasParameter](Renderer_VR_XRViewport.XRViewport#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

___

### initCullingRenderState

▸ **initCullingRenderState**(`renderstate`): `void`

The initRenderState method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`GeomDataRenderState`](../RenderStates/Renderer_RenderStates_GeomDataRenderState.GeomDataRenderState) | The object tracking the current state of the renderer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[initCullingRenderState](Renderer_VR_XRViewport.XRViewport#initcullingrenderstate)

#### Defined in

[src/Renderer/VR/XRViewport.ts:158](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L158)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[insertParameter](Renderer_VR_XRViewport.XRViewport#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

___

### isPresenting

▸ **isPresenting**(): `boolean`

The isPresenting method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[isPresenting](Renderer_VR_XRViewport.XRViewport#ispresenting)

#### Defined in

[src/Renderer/VR/XRViewport.ts:115](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L115)

___

### loadHMDResources

▸ **loadHMDResources**(): `Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

The loadHMDResources method.

#### Returns

`Promise`<[`VLAAsset`](../../SceneTree/SceneTree_VLAAsset.VLAAsset)\>

- The return value.

#### Defined in

[src/Renderer/VR/VRViewport.ts:94](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L94)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[off](Renderer_VR_XRViewport.XRViewport#off)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[on](Renderer_VR_XRViewport.XRViewport#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Invoked when the user is pressing a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onKeyDown](Renderer_VR_XRViewport.XRViewport#onkeydown)

#### Defined in

[src/Renderer/GLBaseViewport.ts:563](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L563)

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Causes an event to occur  when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onKeyUp](Renderer_VR_XRViewport.XRViewport#onkeyup)

#### Defined in

[src/Renderer/GLBaseViewport.ts:569](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L569)

___

### onMouseLeave

▸ **onMouseLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event that occurs. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onMouseLeave](Renderer_VR_XRViewport.XRViewport#onmouseleave)

#### Defined in

[src/Renderer/GLBaseViewport.ts:557](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L557)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Handler of the `pointerdown` event fired when the pointer device is initially pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Overrides

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onPointerDown](Renderer_VR_XRViewport.XRViewport#onpointerdown)

#### Defined in

[src/Renderer/VR/VRViewport.ts:443](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L443)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Invoked when the mouse pointer is moved into this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onPointerEnter](Renderer_VR_XRViewport.XRViewport#onpointerenter)

#### Defined in

[src/Renderer/GLBaseViewport.ts:540](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L540)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Invoked when the mouse pointer is moved out of this viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onPointerLeave](Renderer_VR_XRViewport.XRViewport#onpointerleave)

#### Defined in

[src/Renderer/GLBaseViewport.ts:549](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L549)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Handler of the `pointermove` event fired when the pointer device changes coordinates, and the pointer has not been cancelled

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The DOM event produced by a pointer |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onPointerMove](Renderer_VR_XRViewport.XRViewport#onpointermove)

#### Defined in

[src/Renderer/GLBaseViewport.ts:531](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L531)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Causes an event to occur when a user releases a mouse button over a element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The event that occurs. |

#### Returns

`void`

#### Overrides

[XRViewport](Renderer_VR_XRViewport.XRViewport).[onPointerUp](Renderer_VR_XRViewport.XRViewport#onpointerup)

#### Defined in

[src/Renderer/VR/VRViewport.ts:492](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L492)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[once](Renderer_VR_XRViewport.XRViewport#once)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[parameterValueChanged](Renderer_VR_XRViewport.XRViewport#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L124)

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
| `reader` | [`BinReader`](../../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[readBinary](Renderer_VR_XRViewport.XRViewport#readbinary)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[removeListenerById](Renderer_VR_XRViewport.XRViewport#removelistenerbyid)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[removeParameter](Renderer_VR_XRViewport.XRViewport#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[replaceParameter](Renderer_VR_XRViewport.XRViewport#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### resize

▸ **resize**(`canvasWidth`, `canvasHeight`): `void`

The resize method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `canvasWidth` | `number` | The canvasWidth value. |
| `canvasHeight` | `number` | The canvasHeight value. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[resize](Renderer_VR_XRViewport.XRViewport#resize)

#### Defined in

[src/Renderer/GLBaseViewport.ts:172](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L172)

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

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[resizeRenderTargets](Renderer_VR_XRViewport.XRViewport#resizerendertargets)

#### Defined in

[src/Renderer/GLBaseViewport.ts:189](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L189)

___

### setManipulator

▸ **setManipulator**(`tool`): `void`

Sets the tool that will receive mouse, touch and keyboard events from the viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `tool` | [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) | The manipulator value. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[setManipulator](Renderer_VR_XRViewport.XRViewport#setmanipulator)

#### Defined in

[src/Renderer/GLBaseViewport.ts:494](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseViewport.ts#L494)

___

### setXfo

▸ **setXfo**(`xfo`): `void`

Sets the stage Xfo, which is the Xfo that transforms the user into the world.
The local displacement of the user within their volume is applied on top of this Xfo.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) | The xfo value. |

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[setXfo](Renderer_VR_XRViewport.XRViewport#setxfo)

#### Defined in

[src/Renderer/VR/XRViewport.ts:100](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L100)

___

### startPresenting

▸ **startPresenting**(): `Promise`<`void`\>

The startPresenting method.

#### Returns

`Promise`<`void`\>

#### Overrides

[XRViewport](Renderer_VR_XRViewport.XRViewport).[startPresenting](Renderer_VR_XRViewport.XRViewport#startpresenting)

#### Defined in

[src/Renderer/VR/VRViewport.ts:157](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L157)

___

### startSession

▸ `Protected` **startSession**(): `void`

Lanuches the session loop

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[startSession](Renderer_VR_XRViewport.XRViewport#startsession)

#### Defined in

[src/Renderer/VR/XRViewport.ts:122](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L122)

___

### stopPresenting

▸ **stopPresenting**(): `void`

The stopPresenting method.

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[stopPresenting](Renderer_VR_XRViewport.XRViewport#stoppresenting)

#### Defined in

[src/Renderer/VR/XRViewport.ts:140](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L140)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[toJSON](Renderer_VR_XRViewport.XRViewport#tojson)

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

[XRViewport](Renderer_VR_XRViewport.XRViewport).[toString](Renderer_VR_XRViewport.XRViewport#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L303)

___

### togglePresenting

▸ **togglePresenting**(): `void`

The togglePresenting method.

#### Returns

`void`

#### Inherited from

[XRViewport](Renderer_VR_XRViewport.XRViewport).[togglePresenting](Renderer_VR_XRViewport.XRViewport#togglepresenting)

#### Defined in

[src/Renderer/VR/XRViewport.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewport.ts#L149)

___

### updateControllers

▸ **updateControllers**(`xrFrame`): `void`

The updateControllers method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrFrame` | `any` | The xrFrame value. |

#### Returns

`void`

#### Defined in

[src/Renderer/VR/VRViewport.ts:311](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/VRViewport.ts#L311)

