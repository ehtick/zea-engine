---
id: "Renderer_Drawing_MaterialShaderBinding.MaterialShaderBinding"
title: "Class: MaterialShaderBinding"
sidebar_label: "MaterialShaderBinding"
custom_edit_url: null
---



Class representing material shader binding.

## Constructors

### constructor

• **new MaterialShaderBinding**(`gl`, `glMaterial`, `unifs`, `warnMissingUnifs`)

Create material shader binding.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `gl` | [`WebGL12RenderingContext`](../types/Renderer_types_webgl.WebGL12RenderingContext) | The webgl rendering context. |
| `glMaterial` | `any` | The glMaterial value. |

| `warnMissingUnifs` | `any` | The warnMissingUnifs value. |

#### Defined in

[src/Renderer/Drawing/MaterialShaderBinding.ts:506](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/Drawing/MaterialShaderBinding.ts#L506)

## Properties

### uniformBindings

• `Protected` **uniformBindings**: `ParamUniformBinding`[] = `[]`

#### Defined in

[src/Renderer/Drawing/MaterialShaderBinding.ts:498](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/Drawing/MaterialShaderBinding.ts#L498)

## Methods

### bind

▸ **bind**(`renderstate`): `boolean`

The bind method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |


#### Returns

`boolean`

- The return value.

#### Defined in

[src/Renderer/Drawing/MaterialShaderBinding.ts:588](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/Drawing/MaterialShaderBinding.ts#L588)

___

### destroy

▸ **destroy**(): `void`

The destroy is called by the system to cause explicit resources cleanup.
Users should never need to call this method directly.

#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/MaterialShaderBinding.ts:608](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/Drawing/MaterialShaderBinding.ts#L608)

___

### unbind

▸ **unbind**(`renderstate`): `void`

The unbind method.

#### Parameters

| Name | Type |
| :------ | :------ |


#### Returns

`void`

#### Defined in

[src/Renderer/Drawing/MaterialShaderBinding.ts:598](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Renderer/Drawing/MaterialShaderBinding.ts#L598)

