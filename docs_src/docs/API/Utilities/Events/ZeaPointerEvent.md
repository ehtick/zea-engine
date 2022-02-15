---
id: "Utilities_Events_ZeaPointerEvent.ZeaPointerEvent"
title: "Class: ZeaPointerEvent"
sidebar_label: "ZeaPointerEvent"
custom_edit_url: null
---



ZeaPointerEvent are emitted from mouse or touch interactions or from WebXR controllers.

## Hierarchy

- [`ZeaUIEvent`](Utilities_Events_ZeaUIEvent.ZeaUIEvent)

  ↳ **`ZeaPointerEvent`**

  ↳↳ [`XRControllerEvent`](Utilities_Events_XRControllerEvent.XRControllerEvent)

  ↳↳ [`XRPoseEvent`](Utilities_Events_XRPoseEvent.XRPoseEvent)

  ↳↳ [`ZeaMouseEvent`](Utilities_Events_ZeaMouseEvent.ZeaMouseEvent)

  ↳↳ [`ZeaTouchEvent`](Utilities_Events_ZeaTouchEvent.ZeaTouchEvent)

## Constructors

### constructor

• **new ZeaPointerEvent**(`pointerType`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointerType` | `string` |

#### Overrides

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[constructor](Utilities_Events_ZeaUIEvent.ZeaUIEvent#constructor)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:25](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L25)

## Properties

### detail

• **detail**: `number`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:22](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L22)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### pointerType

• **pointerType**: `string`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:17](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L17)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[propagating](Utilities_Events_ZeaUIEvent.ZeaUIEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[viewport](Utilities_Events_ZeaUIEvent.ZeaUIEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaUIEvent.ts#L10)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:38](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L38)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

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

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:34](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L34)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:30](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/Events/ZeaPointerEvent.ts#L30)

