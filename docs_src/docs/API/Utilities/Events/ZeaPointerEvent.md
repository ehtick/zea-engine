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

  ↳↳ [`XRPointerEvent`](Utilities_Events_XRPointerEvent.XRPointerEvent)

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

[src/Utilities/Events/ZeaPointerEvent.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L26)

## Properties

### detail

• **detail**: `number`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L21)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L24)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerType

• **pointerType**: `string`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[propagating](Utilities_Events_ZeaUIEvent.ZeaUIEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaUIEvent](Utilities_Events_ZeaUIEvent.ZeaUIEvent).[viewport](Utilities_Events_ZeaUIEvent.ZeaUIEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaUIEvent.ts#L10)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:39](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L39)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L43)

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

[src/Utilities/Events/ZeaPointerEvent.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L35)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L31)

