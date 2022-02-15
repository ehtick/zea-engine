---
id: "Utilities_Events_ZeaTouchEvent.ZeaTouchEvent"
title: "Class: ZeaTouchEvent"
sidebar_label: "ZeaTouchEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`ZeaTouchEvent`**

## Constructors

### constructor

• **new ZeaTouchEvent**(`sourceEvent`, `rect`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `sourceEvent` | `TouchEvent` |
| `rect` | `DOMRect` |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:68](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L68)

## Properties

### altKey

• **altKey**: `boolean` = `false`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:61](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L61)

___

### changedTouches

• **changedTouches**: [`Touch`](Utilities_Events_ZeaTouchEvent.Touch)[] = `[]`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:59](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L59)

___

### ctrlKey

• **ctrlKey**: `boolean` = `false`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:63](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L63)

___

### detail

• **detail**: `number`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[detail](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#detail)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:22](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L22)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### metaKey

• **metaKey**: `boolean` = `false`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:62](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L62)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerPos](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerpos)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerRay](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:17](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L17)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### shiftKey

• **shiftKey**: `boolean` = `false`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:64](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L64)

___

### sourceEvent

• `Private` **sourceEvent**: `TouchEvent`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:66](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L66)

___

### targetTouches

• **targetTouches**: [`Touch`](Utilities_Events_ZeaTouchEvent.Touch)[] = `[]`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:60](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L60)

___

### touches

• **touches**: [`Touch`](Utilities_Events_ZeaTouchEvent.Touch)[] = `[]`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:58](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L58)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaUIEvent.ts#L10)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L38)

___

### preventDefault

▸ **preventDefault**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:99](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L99)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:42](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L42)

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

[src/Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[src/Utilities/Events/ZeaTouchEvent.ts:92](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaTouchEvent.ts#L92)

