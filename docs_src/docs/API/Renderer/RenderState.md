---
id: "Renderer_RenderState.RenderState"
title: "Class: RenderState"
sidebar_label: "RenderState"
custom_edit_url: null
---



## Constructors

### constructor

• **new RenderState**(`gl`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext) |

#### Defined in

[src/Renderer/RenderState.ts:45](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L45)

## Properties

### attrs

• **attrs**: `Record`<`string`, `Record`<`string`, `any`\>\>

#### Defined in

[src/Renderer/RenderState.ts:16](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L16)

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

[src/Renderer/RenderState.ts:35](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L35)

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

[src/Renderer/RenderState.ts:34](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L34)

___

### boundRendertarget

• **boundRendertarget**: `WebGLFramebuffer`

#### Defined in

[src/Renderer/RenderState.ts:38](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L38)

___

### boundTextures

• **boundTextures**: `number`

#### Defined in

[src/Renderer/RenderState.ts:37](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L37)

___

### cameraMatrix

• `Optional` **cameraMatrix**: [`Mat4`](../Math/Math_Mat4.Mat4)

#### Defined in

[src/Renderer/RenderState.ts:43](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L43)

___

### directives

• `Optional` **directives**: `string`[]

#### Defined in

[src/Renderer/RenderState.ts:18](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L18)

___

### drawItemsTexture

• `Optional` **drawItemsTexture**: `any`

#### Defined in

[src/Renderer/RenderState.ts:20](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L20)

___

### gl

• **gl**: [`WebGL12RenderingContext`](types/Renderer_types_webgl.WebGL12RenderingContext)

#### Defined in

[src/Renderer/RenderState.ts:9](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L9)

___

### glGeom

• `Optional` **glGeom**: [`GLGeom`](Drawing/Renderer_Drawing_GLGeom.GLGeom)

#### Defined in

[src/Renderer/RenderState.ts:22](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L22)

___

### glShader

• `Optional` **glShader**: [`GLShader`](Renderer_GLShader.GLShader)

#### Defined in

[src/Renderer/RenderState.ts:13](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L13)

___

### pass

• `Optional` **pass**: `string`

#### Defined in

[src/Renderer/RenderState.ts:27](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L27)

___

### passIndex

• **passIndex**: `number`

#### Defined in

[src/Renderer/RenderState.ts:26](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L26)

___

### region

• `Optional` **region**: `number`[]

#### Defined in

[src/Renderer/RenderState.ts:42](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L42)

___

### shaderkey

• `Optional` **shaderkey**: `string`

#### Defined in

[src/Renderer/RenderState.ts:14](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L14)

___

### shaderopts



#### Defined in

[src/Renderer/RenderState.ts:15](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L15)

___

### stack

• **stack**: `Record`<`string`, `number` \| `number`[]\>[] = `[]`

#### Defined in

[src/Renderer/RenderState.ts:10](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L10)

___

### supportsInstancing

• `Optional` **supportsInstancing**: `boolean`

#### Defined in

[src/Renderer/RenderState.ts:30](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L30)

___

### top

• **top**: `Record`<`string`, `number` \| `number`[]\>

#### Defined in

[src/Renderer/RenderState.ts:11](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L11)

___

### unifs



#### Defined in

[src/Renderer/RenderState.ts:17](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L17)

___

### viewScale

• **viewScale**: `number`

#### Defined in

[src/Renderer/RenderState.ts:41](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L41)

___

### viewXfo

• `Optional` **viewXfo**: [`Xfo`](../Math/Math_Xfo.Xfo)

#### Defined in

[src/Renderer/RenderState.ts:40](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L40)

___

### viewport

• `Optional` **viewport**: [`GLBaseViewport`](Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[src/Renderer/RenderState.ts:31](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L31)

___

### viewports

• `Optional` **viewports**: [`GLBaseViewport`](Renderer_GLBaseViewport.GLBaseViewport)[]

#### Defined in

[src/Renderer/RenderState.ts:32](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L32)

___

### vrPresenting

• `Optional` **vrPresenting**: `boolean`

#### Defined in

[src/Renderer/RenderState.ts:29](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L29)

___

### vrviewport

• `Optional` **vrviewport**: `any`

#### Defined in

[src/Renderer/RenderState.ts:24](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L24)

## Methods

### popGLStack

▸ **popGLStack**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/RenderState.ts:55](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L55)

___

### pushGLStack

▸ **pushGLStack**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/RenderState.ts:50](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L50)

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

[src/Renderer/RenderState.ts:81](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Renderer/RenderState.ts#L81)

