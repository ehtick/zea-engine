---
id: "Utilities_Events_XRPoseEvent.XRPoseEvent"
title: "Class: XRPoseEvent"
sidebar_label: "XRPoseEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`XRPoseEvent`**

## Constructors

### constructor

• **new XRPoseEvent**(`viewport`, `viewXfo`, `controllers`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`XRViewport`](../../Renderer/VR/Renderer_VR_XRViewport.XRViewport) |
| `viewXfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) |
| `controllers` | [`XRController`](../../Renderer/VR/Renderer_VR_XRController.XRController)[] |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[src/Utilities/Events/XRPoseEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/XRPoseEvent.ts#L23)

## Properties

### controllers

• **controllers**: [`XRController`](../../Renderer/VR/Renderer_VR_XRController.XRController)[] = `[]`

#### Defined in

[src/Utilities/Events/XRPoseEvent.ts:22](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/XRPoseEvent.ts#L22)

___

### detail

• **detail**: `number`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[detail](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#detail)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:21](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L21)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:24](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L24)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerPos](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerpos)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerRay](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### viewXfo

• **viewXfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Utilities/Events/XRPoseEvent.ts:21](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/XRPoseEvent.ts#L21)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaUIEvent.ts#L10)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:39](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L39)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:43](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L43)

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

[src/Utilities/Events/ZeaPointerEvent.ts:35](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L35)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:31](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/Events/ZeaPointerEvent.ts#L31)

