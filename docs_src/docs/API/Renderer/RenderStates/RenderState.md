---
id: "Renderer_RenderStates_RenderState.RenderState"
title: "Class: RenderState"
sidebar_label: "RenderState"
custom_edit_url: null
---



## Hierarchy

- **`RenderState`**

  ↳ [`ColorRenderState`](Renderer_RenderStates_ColorRenderState.ColorRenderState)

  ↳ [`GeomDataRenderState`](Renderer_RenderStates_GeomDataRenderState.GeomDataRenderState)

  ↳ [`HighlightRenderState`](Renderer_RenderStates_HighlightRenderState.HighlightRenderState)

## Constructors

### constructor

• **new RenderState**(`gl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) |

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L60)

## Properties

### attrs

• **attrs**: `Record`<`string`, `Record`<`string`, `any`\>\>

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L32)

___

### bindRendererUnifs



#### Type declaration

▸ (`unifs`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |


##### Returns

`void`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L50)

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

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:49](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L49)

___

### boundRendertarget

• **boundRendertarget**: `WebGLFramebuffer`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:53](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L53)

___

### boundTextures

• **boundTextures**: `number`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:52](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L52)

___

### cameraMatrix

• `Optional` **cameraMatrix**: [`Mat4`](../../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:58](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L58)

___

### directives

• `Optional` **directives**: `string`[]

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L30)

___

### drawItemsTexture

• `Optional` **drawItemsTexture**: `any`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L35)

___

### gl

• **gl**: [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L23)

___

### glGeom

• `Optional` **glGeom**: [`GLGeom`](../Drawing/Renderer_Drawing_GLGeom.GLGeom)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L37)

___

### glShader

• `Optional` **glShader**: [`GLShader`](../Renderer_GLShader.GLShader)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L27)

___

### pass

• `Optional` **pass**: `string`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L42)

___

### passIndex

• **passIndex**: `number`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L41)

___

### region

• `Optional` **region**: `number`[]

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:57](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L57)

___

### shaderkey

• `Optional` **shaderkey**: `string`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L28)

___

### shaderopts



#### Defined in

[src/Renderer/RenderStates/RenderState.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L29)

___

### stack

• **stack**: [`StackObj`](Renderer_RenderStates_RenderState.StackObj)[] = `[]`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L24)

___

### supportsInstancing

• `Optional` **supportsInstancing**: `boolean`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:45](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L45)

___

### top

• **top**: [`StackObj`](Renderer_RenderStates_RenderState.StackObj)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L25)

___

### unifs



#### Defined in

[src/Renderer/RenderStates/RenderState.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L33)

___

### viewScale

• **viewScale**: `number`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L56)

___

### viewXfo

• `Optional` **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L55)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](../Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L46)

___

### viewports

• `Optional` **viewports**: [`ViewportRenderState`](Renderer_RenderStates_RenderState.ViewportRenderState)[]

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L47)

___

### vrPresenting

• `Optional` **vrPresenting**: `boolean`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L44)

___

### xrviewport

• `Optional` **xrviewport**: `any`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L39)

## Methods

### glDisable

▸ **glDisable**(`prop`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `number` |

#### Returns

`void`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:144](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L144)

___

### glEnable

▸ **glEnable**(`prop`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `number` |

#### Returns

`void`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:140](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L140)

___

### popGLStack

▸ **popGLStack**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L70)

___

### pushGLStack

▸ **pushGLStack**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:65](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L65)

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

#### Defined in

[src/Renderer/RenderStates/RenderState.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/RenderStates/RenderState.ts#L149)

