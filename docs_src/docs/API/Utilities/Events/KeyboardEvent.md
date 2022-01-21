---
id: "Utilities_Events_KeyboardEvent.KeyboardEvent"
title: "Class: KeyboardEvent"
sidebar_label: "KeyboardEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaUIEvent`](Utilities_Events_ZeaUIEvent.ZeaUIEvent)

  ↳ **`KeyboardEvent`**

## Constructors

### constructor

• **new KeyboardEvent**(`sourceEvent`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceEvent` | `KeyboardEvent` |

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[constructor](Utilities_Events_ZeaUIEvent.ZeaUIEvent#constructor)

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:37](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L37)

## Properties

### altKey

• **altKey**: `boolean`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L8)

___

### code

• **code**: `string`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L11)

___

### ctrlKey

• **ctrlKey**: `boolean`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L14)

___

### isComposing

• **isComposing**: `boolean`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:17](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L17)

___

### key

• **key**: `string`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L20)

___

### location

• **location**: `number`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L23)

___

### metaKey

• **metaKey**: `boolean`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L26)

___

### propagating

• **propagating**: `boolean` = `true`

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[propagating](Utilities_Events_ZeaUIEvent.ZeaUIEvent#propagating)

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:5](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L5)

___

### repeat

• **repeat**: `boolean`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:29](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L29)

___

### shiftKey

• **shiftKey**: `boolean`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:32](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L32)

___

### sourceEvent

• `Private` **sourceEvent**: `KeyboardEvent`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:4](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L4)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[viewport](Utilities_Events_ZeaUIEvent.ZeaUIEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaUIEvent.ts#L10)

___

### which

• **which**: `number`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:35](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L35)

## Methods

### preventDefault

▸ **preventDefault**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:56](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L56)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/KeyboardEvent.ts:52](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/KeyboardEvent.ts#L52)

