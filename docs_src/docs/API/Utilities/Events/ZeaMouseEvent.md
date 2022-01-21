---
id: "Utilities_Events_ZeaMouseEvent.ZeaMouseEvent"
title: "Class: ZeaMouseEvent"
sidebar_label: "ZeaMouseEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`ZeaMouseEvent`**

  ↳↳ [`ZeaWheelEvent`](Utilities_Events_ZeaWheelEvent.ZeaWheelEvent)

## Constructors

### constructor

• **new ZeaMouseEvent**(`sourceEvent`, `rect`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceEvent` | `MouseEvent` |
| `rect` | `DOMRect` |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:15](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L15)

## Properties

### altKey

• **altKey**: `boolean`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L10)

___

### button

• **button**: `number`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:5](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L5)

___

### clientX

• **clientX**: `number`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:6](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L6)

___

### clientY

• **clientY**: `number`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:7](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L7)

___

### ctrlKey

• **ctrlKey**: `boolean`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:12](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L12)

___

### detail

• **detail**: `number`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[detail](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#detail)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:22](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L22)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### metaKey

• **metaKey**: `boolean`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L11)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerPos](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerpos)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerRay](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:17](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L17)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### rendererX

• **rendererX**: `number`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:8](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L8)

___

### rendererY

• **rendererY**: `number`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L9)

___

### shiftKey

• **shiftKey**: `boolean`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:13](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L13)

___

### sourceEvent

• `Private` **sourceEvent**: `MouseEvent`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:14](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L14)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaUIEvent.ts#L10)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L38)

___

### preventDefault

▸ **preventDefault**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:44](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L44)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:42](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L42)

___

### setCapture

▸ **setCapture**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) |

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[setCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#setcapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[src/Utilities/Events/ZeaMouseEvent.ts:40](https://github.com/ZeaInc/zea-engine/blob/d12d3e016/src/Utilities/Events/ZeaMouseEvent.ts#L40)

