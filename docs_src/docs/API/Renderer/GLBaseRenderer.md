---
id: "Renderer_GLBaseRenderer.GLBaseRenderer"
title: "Class: GLBaseRenderer"
sidebar_label: "GLBaseRenderer"
custom_edit_url: null
---



Class representing a GL base renderer.

## Hierarchy

- [`ParameterOwner`](../SceneTree/SceneTree_ParameterOwner.ParameterOwner)

  ↳ **`GLBaseRenderer`**

  ↳↳ [`GLRenderer`](Renderer_GLRenderer.GLRenderer)

## Constructors

### constructor

• **new GLBaseRenderer**(`$canvas`, `options?`)

Create a GL base renderer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$canvas` | `HTMLCanvasElement` | The canvas element. |
| `options` | [`RendererOptions`](Renderer_GLBaseRenderer.RendererOptions) | The options value. |

#### Overrides

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[constructor](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#constructor)

#### Defined in

[src/Renderer/GLBaseRenderer.ts:152](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L152)

## Properties

### \_\_activeViewport

• `Protected` **\_\_activeViewport**: [`GLViewport`](Renderer_GLViewport.GLViewport) = `undefined`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:125](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L125)

___

### \_\_continuousDrawing

• `Protected` **\_\_continuousDrawing**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:126](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L126)

___

### \_\_drawSuspensionLevel

• `Protected` **\_\_drawSuspensionLevel**: `number` = `0`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:129](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L129)

___

### \_\_gl

• **\_\_gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLBaseRenderer.ts:112](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L112)

___

### \_\_glcanvas

• `Protected` **\_\_glcanvas**: `HTMLCanvasElement` = `null`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:113](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L113)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[__id](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_isMobile

• `Protected` **\_\_isMobile**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:128](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L128)

___

### \_\_passCallbacks

• `Protected` **\_\_passCallbacks**: `any`[] = `[]`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:122](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L122)

___

### \_\_passes

• `Protected` **\_\_passes**: `Record`<`number`, [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)[]\> = `{}`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:119](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L119)

___

### \_\_passesRegistrationOrder

• `Protected` **\_\_passesRegistrationOrder**: [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)[] = `[]`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:121](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L121)

___

### \_\_redrawRequested

• `Protected` **\_\_redrawRequested**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:127](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L127)

___

### \_\_renderGeomDataFbosRequested

• `Protected` **\_\_renderGeomDataFbosRequested**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:117](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L117)

___

### \_\_scene

• `Protected` **\_\_scene**: [`Scene`](../SceneTree/SceneTree_Scene.Scene) = `null`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:114](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L114)

___

### \_\_shaderDirectives

• `Protected` **\_\_shaderDirectives**: `Record`<`string`, `string`\> = `{}`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:116](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L116)

___

### \_\_shaders

• `Protected` **\_\_shaders**: `Record`<`string`, [`GLShader`](Renderer_GLShader.GLShader)\> = `{}`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:118](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L118)

___

### \_\_supportXR

• `Protected` **\_\_supportXR**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L134)

___

### \_\_viewports

• `Protected` **\_\_viewports**: [`GLViewport`](Renderer_GLViewport.GLViewport)[] = `[]`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L124)

___

### \_\_xrViewport

• `Protected` **\_\_xrViewport**: [`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport) = `undefined`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L135)

___

### \_\_xrViewportPresenting

• **\_\_xrViewportPresenting**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:130](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L130)

___

### \_\_xrViewportPromise

• `Protected` **\_\_xrViewportPromise**: `Promise`<[`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)\>

#### Defined in

[src/Renderer/GLBaseRenderer.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L136)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[deprecatedParamMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### directives

• **directives**: `string`[] = `[]`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:109](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L109)

___

### floatGeomBuffer

• **floatGeomBuffer**: `boolean` = `true`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:131](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L131)

___

### glGeomItemLibrary

• **glGeomItemLibrary**: [`GLGeomItemLibrary`](Drawing/Renderer_Drawing_GLGeomItemLibrary.GLGeomItemLibrary)

#### Defined in

[src/Renderer/GLBaseRenderer.ts:139](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L139)

___

### glGeomLibrary

• **glGeomLibrary**: [`GLGeomLibrary`](Drawing/Renderer_Drawing_GLGeomLibrary.GLGeomLibrary)

#### Defined in

[src/Renderer/GLBaseRenderer.ts:140](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L140)

___

### glMaterialLibrary

• **glMaterialLibrary**: `GLMaterialLibrary`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:138](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L138)

___

### listenerIDs

• `Protected` **listenerIDs**: `Map`<[`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem), `Record`<`string`, `number`\>\>

#### Defined in

[src/Renderer/GLBaseRenderer.ts:108](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L108)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[listeners](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### multiSampledScreenBuffer

• **multiSampledScreenBuffer**: `boolean` = `false`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:132](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L132)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramEventListenerIDs](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[paramMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[params](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

___

### passAssignments

• `Private` **passAssignments**: `Map`<[`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem), [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)\>

#### Defined in

[src/Renderer/GLBaseRenderer.ts:120](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L120)

___

### resizeObserver

• `Private` `Optional` **resizeObserver**: `ResizeObserver`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:145](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L145)

___

### screenQuad

• **screenQuad**: [`GLScreenQuad`](Renderer_GLScreenQuad.GLScreenQuad) = `null`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:142](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L142)

___

### solidAngleLimit

• **solidAngleLimit**: `number` = `0.004`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:110](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L110)

## Accessors

### gl

• `get` **gl**(): [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

Getter for gl.

#### Returns

[`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLBaseRenderer.ts:548](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L548)

## Methods

### \_\_setupXRViewport

▸ `Private` **__setupXRViewport**(`sessionMode`): [`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)

The __setupXRViewport method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionMode` | `string` |

#### Returns

[`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1072](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1072)

___

### activateViewport

▸ **activateViewport**(`vp`): `void`

Sets as `active` the specified viewport.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vp` | [`GLViewport`](Renderer_GLViewport.GLViewport) | The viewport. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:333](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L333)

___

### activateViewportAtPos

▸ **activateViewportAtPos**(`offsetX`, `offsetY`): `void`

Sets as àctive` the viewport under the specified XY coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetX` | `number` | The viewport offset in the X axis. |
| `offsetY` | `number` | The viewport offset in the Y axis. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:345](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L345)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameter)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[addParameterDeprecationMapping](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### addPass

▸ **addPass**(`pass`, `passType?`, `updateIndices?`): `number`

The addPass method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `pass` | [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass) | `undefined` | The pass value. |
| `passType` | `number` | `-1` | The passType value. |
| `updateIndices` | `boolean` | `true` | The updateIndices value. |

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:983](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L983)

___

### addShaderPreprocessorDirective

▸ **addShaderPreprocessorDirective**(`name`, `value?`): `void`

The addShaderPreprocessorDirective method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |
| `value?` | `string` | The value param. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:241](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L241)

___

### addTreeItem

▸ **addTreeItem**(`treeItem`): `void`

Adds tree items to the renderer, selecting the correct pass to delegate rendering too, and listens to future changes in the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem) | The tree item to add. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:422](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L422)

___

### addViewport

▸ **addViewport**(`name`): [`GLViewport`](Renderer_GLViewport.GLViewport)

Adds a new viewport(viewing region) to the scene.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the viewport. |

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:279](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L279)

___

### assignTreeItemToGLPass

▸ **assignTreeItemToGLPass**(`treeItem`): `void`

Searches through the passes and finds the appropriate pass to draw the given tree items.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem) | The tree item to assign. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:465](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L465)

___

### bindEventHandlers

▸ **bindEventHandlers**(): `void`

Binds IO event handlers to the canvas

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:743](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L743)

___

### bindGLBaseRenderer

▸ **bindGLBaseRenderer**(`renderstate`): `void`

The bindGLBaseRenderer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The renderstate value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1246](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1246)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[copyFrom](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L316)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1400](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1400)

___

### drawHighlightedGeoms

▸ **drawHighlightedGeoms**(`renderstate`): `void`

The drawHighlightedGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`HighlightRenderState`](RenderStates/Renderer_RenderStates_HighlightRenderState.HighlightRenderState) | The renderstate value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1338](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1338)

___

### drawItemChanged

▸ **drawItemChanged**(): `void`

The drawItemChanged method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1191](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1191)

___

### drawScene

▸ **drawScene**(`renderstate`): `void`

The drawScene method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `renderstate` | [`RenderState`](RenderStates/Renderer_RenderStates_RenderState.RenderState) | The renderstate value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1320](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1320)

___

### drawSceneGeomData

▸ **drawSceneGeomData**(`renderstate`, `mask?`): `void`

The drawSceneGeomData method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `renderstate` | [`GeomDataRenderState`](RenderStates/Renderer_RenderStates_GeomDataRenderState.GeomDataRenderState) | `undefined` | The renderstate value. |
| `mask` | `number` | `255` | The mask value |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1357](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1357)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[emit](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### findPassIndex

▸ **findPassIndex**(`cls`): `number`

Find a pass given a class type. Used by the GPViewport to find the GLOverlayPass.

#### Parameters

| Name | Type |
| :------ | :------ |
| `cls` | typeof [`BaseClass`](../Utilities/Utilities_BaseClass.BaseClass) |

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1043](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1043)

___

### forceRender

▸ **forceRender**(): `void`

Forces a redraw of the viewports

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1229](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1229)

___

### frameAll

▸ **frameAll**(`viewportIndex?`): `void`

Frames the specified viewport to the entire scene.
> See also: ${Viewport#frameView}

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `viewportIndex` | `number` | `0` | The viewportIndex value. If multiple viewports are configured, a viewport index will need to be provided. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:952](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L952)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[fromJSON](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L241)

___

### getActiveViewport

▸ **getActiveViewport**(): [`GLViewport`](Renderer_GLViewport.GLViewport)

Returns current active viewport.

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:356](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L356)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getClassName](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getDiv

▸ **getDiv**(): `HTMLElement`

Returns host div of the canvas element.

#### Returns

`HTMLElement`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:593](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L593)

___

### getGL

▸ **getGL**(): [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

The getGL method.

#### Returns

[`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:556](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L556)

___

### getGLCanvas

▸ **getGLCanvas**(): `HTMLCanvasElement`

Returns canvas that was used to generate the gl context.

#### Returns

`HTMLCanvasElement`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:943](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L943)

___

### getHeight

▸ **getHeight**(): `number`

Returns HTMLCanvasElement's Height

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:266](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L266)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getId](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getNumParameters](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getOrCreateShader

▸ **getOrCreateShader**(`shaderName`): [`GLShader`](Renderer_GLShader.GLShader)

A factory function used to construct new shader objects. If that specified shader has already been constructed, it returns the existing shader.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `shaderName` | `string` | The shader name. |

#### Returns

[`GLShader`](Renderer_GLShader.GLShader)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:964](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L964)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameter)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterByIndex](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterbyindex)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameterIndex](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameterindex)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[getParameters](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### getPass

▸ **getPass**(`index`): [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)

The getPass method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`GLPass`](Passes/Renderer_Passes_GLPass.GLPass)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1028](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1028)

___

### getScene

▸ **getScene**(): [`Scene`](../SceneTree/SceneTree_Scene.Scene)

Returns current scene(Environment where all assets live) object.

#### Returns

[`Scene`](../SceneTree/SceneTree_Scene.Scene)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:400](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L400)

___

### getVRViewport

▸ **getVRViewport**(): [`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)

The getVRViewport method.

#### Returns

[`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1123](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1123)

___

### getViewport

▸ **getViewport**(`index?`): [`GLViewport`](Renderer_GLViewport.GLViewport)

Returns a viewport element by specifying its index in the list of viewports.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `0` | The index value. |

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:306](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L306)

___

### getViewportAtPos

▸ **getViewportAtPos**(`offsetX`, `offsetY`): [`GLViewport`](Renderer_GLViewport.GLViewport)

Returns a viewport element under the specified XY coordinates.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `offsetX` | `number` | The viewport offset in the X axis. |
| `offsetY` | `number` | The viewport offset in the Y axis. |

#### Returns

[`GLViewport`](Renderer_GLViewport.GLViewport)

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:317](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L317)

___

### getWidth

▸ **getWidth**(): `number`

Returns HTMLCanvasElement's width

#### Returns

`number`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:258](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L258)

___

### getXRViewport

▸ **getXRViewport**(): `Promise`<[`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)\>

The getXRViewport method.

#### Returns

`Promise`<[`XRViewport`](VR/Renderer_VR_XRViewport.XRViewport)\>

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1131](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1131)

___

### handleResize

▸ `Private` **handleResize**(`newWidth`, `newHeight`): `void`

Handle the canvas's parent resizing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newWidth` | `number` | The new width of the canvas. |
| `newHeight` | `number` | The new height of the canvas. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:568](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L568)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[hasParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[insertParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

___

### isContinuouslyDrawing

▸ **isContinuouslyDrawing**(): `boolean`

The isContinuouslyDrawing method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1150](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1150)

___

### isXRViewportPresenting

▸ **isXRViewportPresenting**(): `boolean`

The isXRViewportPresenting method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1139](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1139)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[off](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#off)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[on](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#on)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[once](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#once)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[parameterValueChanged](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#parametervaluechanged)

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
| `reader` | [`BinReader`](../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[readBinary](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#readbinary)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeListenerById](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removelistenerbyid)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[removeParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L176)

___

### removeTreeItem

▸ **removeTreeItem**(`treeItem`): `void`

Remove tree items from the scene.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree/SceneTree_TreeItem.TreeItem) | The tree item to remove. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:505](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L505)

___

### renderGeomDataFbos

▸ **renderGeomDataFbos**(): `void`

The renderGeomDataFbos method. Frame buffer (FBO).

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:381](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L381)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[replaceParameter](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### requestRedraw

▸ **requestRedraw**(): `boolean`

Request a single redraw, usually in response to a signal/event.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1200](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1200)

___

### resumeDrawing

▸ **resumeDrawing**(): `void`

The resumeDrawing method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:370](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L370)

___

### setScene

▸ **setScene**(`scene`): `void`

Sets scene to the renderer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scene` | [`Scene`](../SceneTree/SceneTree_Scene.Scene) | The scene value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:409](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L409)

___

### setupWebGL

▸ `Private` **setupWebGL**(`$canvas`, `options?`): [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

Setups the WebGL configuration for the renderer, specifying the canvas element where our

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `$canvas` | `HTMLCanvasElement` | The $canvas element. |
| `options` | [`RendererOptions`](Renderer_GLBaseRenderer.RendererOptions) | - |

#### Returns

[`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/GLBaseRenderer.ts:603](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L603)

___

### startContinuousDrawing

▸ **startContinuousDrawing**(): `void`

The startContinuousDrawing method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1157](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1157)

___

### stopContinuousDrawing

▸ **stopContinuousDrawing**(): `void`

The stopContinuousDrawing method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1173](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1173)

___

### supportsVR

▸ **supportsVR**(): `boolean`

The supportsVR method.

#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1062](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1062)

___

### suspendDrawing

▸ **suspendDrawing**(): `void`

The suspendDrawing method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:363](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L363)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toJSON](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tojson)

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

[ParameterOwner](../SceneTree/SceneTree_ParameterOwner.ParameterOwner).[toString](../SceneTree/SceneTree_ParameterOwner.ParameterOwner#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L303)

___

### toggleContinuousDrawing

▸ **toggleContinuousDrawing**(): `void`

The toggleContinuousDrawing method.

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1180](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1180)

___

### registerPass

▸ `Static` **registerPass**(`cls`, `passType`): `void`

The registerPass method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cls` | typeof [`GLPass`](Passes/Renderer_Passes_GLPass.GLPass) | The cls value. |
| `passType` | `number` | The passType value. |

#### Returns

`void`

#### Defined in

[src/Renderer/GLBaseRenderer.ts:1391](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/GLBaseRenderer.ts#L1391)

