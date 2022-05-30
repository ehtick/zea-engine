---
id: "Renderer_RenderStates_GeomDataRenderState.GeomDataRenderState"
title: "Class: GeomDataRenderState"
sidebar_label: "GeomDataRenderState"
custom_edit_url: null
---



## Hierarchy

- [`RenderState`](Renderer_RenderStates_RenderState.RenderState)

  ↳ **`GeomDataRenderState`**

## Constructors

### constructor

• **new GeomDataRenderState**(`gl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) |

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[constructor](Renderer_RenderStates_RenderState.RenderState#constructor)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:60](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L60)

## Properties

### attrs

• **attrs**: `Record`<`string`, `Record`<`string`, `any`\>\>

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[attrs](Renderer_RenderStates_RenderState.RenderState#attrs)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:32](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L32)

___

### bindRendererUnifs



#### Type declaration

▸ (`unifs`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |


##### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[bindRendererUnifs](Renderer_RenderStates_RenderState.RenderState#bindrendererunifs)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:50](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L50)

___

### bindViewports



#### Type declaration

▸ (`unifs`, `cb`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |

| `cb` | `any` |

##### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[bindViewports](Renderer_RenderStates_RenderState.RenderState#bindviewports)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:49](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L49)

___

### boundRendertarget

• **boundRendertarget**: `WebGLFramebuffer`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[boundRendertarget](Renderer_RenderStates_RenderState.RenderState#boundrendertarget)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:53](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L53)

___

### boundTextures

• **boundTextures**: `number`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[boundTextures](Renderer_RenderStates_RenderState.RenderState#boundtextures)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:52](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L52)

___

### cameraMatrix

• `Optional` **cameraMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[cameraMatrix](Renderer_RenderStates_RenderState.RenderState#cameramatrix)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:58](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L58)

___

### directives

• `Optional` **directives**: `string`[]

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[directives](Renderer_RenderStates_RenderState.RenderState#directives)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:30](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L30)

___

### drawItemsTexture

• `Optional` **drawItemsTexture**: `any`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[drawItemsTexture](Renderer_RenderStates_RenderState.RenderState#drawitemstexture)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:35](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L35)

___

### floatGeomBuffer

• **floatGeomBuffer**: `boolean`

#### Defined in

[src/Renderer/RenderStates/GeomDataRenderState.ts:6](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/GeomDataRenderState.ts#L6)

___

### geomDataFbo

• `Optional` **geomDataFbo**: [`GLFbo`](../Renderer_GLFbo.GLFbo)

#### Defined in

[src/Renderer/RenderStates/GeomDataRenderState.ts:5](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/GeomDataRenderState.ts#L5)

___

### gl

• **gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[gl](Renderer_RenderStates_RenderState.RenderState#gl)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:23](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L23)

___

### glGeom

• `Optional` **glGeom**: [`GLGeom`](../Drawing/Renderer_Drawing_GLGeom.GLGeom)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[glGeom](Renderer_RenderStates_RenderState.RenderState#glgeom)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:37](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L37)

___

### glShader

• `Optional` **glShader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[glShader](Renderer_RenderStates_RenderState.RenderState#glshader)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:27](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L27)

___

### occlusionCulling

• **occlusionCulling**: `number`

#### Defined in

[src/Renderer/RenderStates/GeomDataRenderState.ts:7](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/GeomDataRenderState.ts#L7)

___

### pass

• `Optional` **pass**: `string`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[pass](Renderer_RenderStates_RenderState.RenderState#pass)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:42](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L42)

___

### passIndex

• **passIndex**: `number`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[passIndex](Renderer_RenderStates_RenderState.RenderState#passindex)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:41](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L41)

___

### region

• `Optional` **region**: `number`[]

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[region](Renderer_RenderStates_RenderState.RenderState#region)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:57](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L57)

___

### shaderkey

• `Optional` **shaderkey**: `string`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[shaderkey](Renderer_RenderStates_RenderState.RenderState#shaderkey)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:28](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L28)

___

### shaderopts



#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[shaderopts](Renderer_RenderStates_RenderState.RenderState#shaderopts)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:29](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L29)

___

### stack

• **stack**: [`StackObj`](Renderer_RenderStates_RenderState.StackObj)[] = `[]`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[stack](Renderer_RenderStates_RenderState.RenderState#stack)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:24](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L24)

___

### supportsInstancing

• `Optional` **supportsInstancing**: `boolean`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[supportsInstancing](Renderer_RenderStates_RenderState.RenderState#supportsinstancing)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:45](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L45)

___

### top

• **top**: [`StackObj`](Renderer_RenderStates_RenderState.StackObj)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[top](Renderer_RenderStates_RenderState.RenderState#top)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:25](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L25)

___

### unifs



#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[unifs](Renderer_RenderStates_RenderState.RenderState#unifs)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:33](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L33)

___

### viewScale

• **viewScale**: `number`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[viewScale](Renderer_RenderStates_RenderState.RenderState#viewscale)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:56](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L56)

___

### viewXfo

• `Optional` **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[viewXfo](Renderer_RenderStates_RenderState.RenderState#viewxfo)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:55](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L55)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[viewport](Renderer_RenderStates_RenderState.RenderState#viewport)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:46](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L46)

___

### viewports

• `Optional` **viewports**: [`ViewportRenderState`](Renderer_RenderStates_RenderState.ViewportRenderState)[]

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[viewports](Renderer_RenderStates_RenderState.RenderState#viewports)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:47](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L47)

___

### vrPresenting

• `Optional` **vrPresenting**: `boolean`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[vrPresenting](Renderer_RenderStates_RenderState.RenderState#vrpresenting)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:44](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L44)

___

### vrviewport

• `Optional` **vrviewport**: `any`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[vrviewport](Renderer_RenderStates_RenderState.RenderState#vrviewport)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:39](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L39)

## Methods

### glDisable

▸ **glDisable**(`prop`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `number` |

#### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[glDisable](Renderer_RenderStates_RenderState.RenderState#gldisable)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:144](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L144)

___

### glEnable

▸ **glEnable**(`prop`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `number` |

#### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[glEnable](Renderer_RenderStates_RenderState.RenderState#glenable)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:140](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L140)

___

### popGLStack

▸ **popGLStack**(): `void`

#### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[popGLStack](Renderer_RenderStates_RenderState.RenderState#popglstack)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:70](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L70)

___

### pushGLStack

▸ **pushGLStack**(): `void`

#### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[pushGLStack](Renderer_RenderStates_RenderState.RenderState#pushglstack)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:65](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L65)

___

### setGLParam

▸ **setGLParam**(`key`, `args`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `args` | `number` \| `number`[] |

#### Returns

`void`

#### Inherited from

[RenderState](Renderer_RenderStates_RenderState.RenderState).[setGLParam](Renderer_RenderStates_RenderState.RenderState#setglparam)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:149](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderStates/RenderState.ts#L149)
