---
id: "Utilities_Events_XRPointerEvent.XRPointerEvent"
title: "Class: XRPointerEvent"
sidebar_label: "XRPointerEvent"
custom_edit_url: null
---



## Hierarchy

- [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

  ↳ **`XRPointerEvent`**

## Constructors

### constructor

• **new XRPointerEvent**(`viewport`, `xfo`, `xrSelectEvent`, `hitTestResults`)

Create an BaseEvent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `viewport` | [`XRViewport`](../../Renderer/VR/Renderer_VR_XRViewport.XRViewport) |
| `xfo` | [`Xfo`](../../Math/Math_Xfo.Xfo) |
| `xrSelectEvent` | `any` |
| `hitTestResults` | `any` |

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[constructor](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#constructor)

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:12](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L12)

## Properties

### detail

• **detail**: `number`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[detail](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#detail)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L21)

___

### hitTestResults

• **hitTestResults**: `any`

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L11)

___

### intersectionData

• `Optional` **intersectionData**: [`IntersectionData`](../Utilities_IntersectionData.IntersectionData)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[intersectionData](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#intersectiondata)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L23)

___

### leftGeometry

• **leftGeometry**: [`BaseItem`](../../SceneTree/SceneTree_BaseItem.BaseItem)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[leftGeometry](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#leftgeometry)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L24)

___

### pointerPos

• **pointerPos**: [`Vec2`](../../Math/Math_Vec2.Vec2)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerPos](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerpos)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L20)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerRay](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointerray)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L19)

___

### pointerType

• **pointerType**: `string`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[pointerType](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#pointertype)

#### Defined in

[src/Utilities/Events/ZeaPointerEvent.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaPointerEvent.ts#L18)

___

### propagating

• **propagating**: `boolean` = `true`

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[propagating](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#propagating)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Inherited from

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[viewport](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#viewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/ZeaUIEvent.ts#L10)

___

### xfo

• **xfo**: [`Xfo`](../../Math/Math_Xfo.Xfo)

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:9](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L9)

___

### xrSelectEvent

• **xrSelectEvent**: `any`

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L10)

## Methods

### getCapture

▸ **getCapture**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[getCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#getcapture)

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L28)

___

### releaseCapture

▸ **releaseCapture**(): `void`

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[releaseCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#releasecapture)

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L32)

___

### setCapture

▸ **setCapture**(`item`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) |

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[setCapture](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#setcapture)

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L24)

___

### stopPropagation

▸ **stopPropagation**(): `void`

#### Returns

`void`

#### Overrides

[ZeaPointerEvent](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent).[stopPropagation](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent#stoppropagation)

#### Defined in

[src/Utilities/Events/XRPointerEvent.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/Events/XRPointerEvent.ts#L20)

