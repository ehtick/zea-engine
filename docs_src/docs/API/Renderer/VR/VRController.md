---
id: "Renderer_VR_XRController.VRController"
title: "Class: VRController"
sidebar_label: "VRController"
custom_edit_url: null
---



## Hierarchy

- [`XRController`](Renderer_VR_XRController.XRController)

  ↳ **`VRController`**

## Constructors

### constructor

• **new VRController**(`xrvp`, `inputSource`, `id`)

Create a VR controller.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `xrvp` | `any` | The Vr viewport. |
| `inputSource` | `any` | The input source. |
| `id` | `number` | The id value. |

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[constructor](Renderer_VR_XRController.XRController#constructor)

#### Defined in

[src/Renderer/VR/XRController.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L102)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[__id](Renderer_VR_XRController.XRController#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### buttonPressed

• **buttonPressed**: `boolean`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[buttonPressed](Renderer_VR_XRController.XRController#buttonpressed)

#### Defined in

[src/Renderer/VR/XRController.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L70)

___

### capturedItem

• **capturedItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem) \| [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default) = `null`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[capturedItem](Renderer_VR_XRController.XRController#captureditem)

#### Defined in

[src/Renderer/VR/XRController.ts:94](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L94)

___

### id

• **id**: `number`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[id](Renderer_VR_XRController.XRController#id)

#### Defined in

[src/Renderer/VR/XRController.ts:69](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L69)

___

### inputSource

• **inputSource**: `any`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[inputSource](Renderer_VR_XRController.XRController#inputsource)

#### Defined in

[src/Renderer/VR/XRController.ts:72](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L72)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[listeners](Renderer_VR_XRController.XRController#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### pointerRay

• **pointerRay**: [`Ray`](../../Math/Math_Ray.Ray)

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[pointerRay](Renderer_VR_XRController.XRController#pointerray)

#### Defined in

[src/Renderer/VR/XRController.ts:81](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L81)

___

### pressedButtons

• **pressedButtons**: `boolean`[] = `[]`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[pressedButtons](Renderer_VR_XRController.XRController#pressedbuttons)

#### Defined in

[src/Renderer/VR/XRController.ts:73](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L73)

___

### raycastArea

• **raycastArea**: `number` = `0.005`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[raycastArea](Renderer_VR_XRController.XRController#raycastarea)

#### Defined in

[src/Renderer/VR/XRController.ts:79](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L79)

___

### raycastDist

• **raycastDist**: `number` = `0.04`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[raycastDist](Renderer_VR_XRController.XRController#raycastdist)

#### Defined in

[src/Renderer/VR/XRController.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L80)

___

### raycastTick

• **raycastTick**: `number` = `5`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[raycastTick](Renderer_VR_XRController.XRController#raycasttick)

#### Defined in

[src/Renderer/VR/XRController.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L78)

___

### tipItem

• **tipItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[tipItem](Renderer_VR_XRController.XRController#tipitem)

#### Defined in

[src/Renderer/VR/XRController.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L75)

___

### treeItem

• **treeItem**: [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[treeItem](Renderer_VR_XRController.XRController#treeitem)

#### Defined in

[src/Renderer/VR/XRController.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L74)

___

### xrvp

• **xrvp**: [`XRViewport`](Renderer_VR_XRViewport.XRViewport)

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[xrvp](Renderer_VR_XRController.XRController#xrvp)

#### Defined in

[src/Renderer/VR/XRController.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L71)

## Methods

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[emit](Renderer_VR_XRController.XRController#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getClassName](Renderer_VR_XRController.XRController#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getControllerStageLocalXfo

▸ **getControllerStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getControllerStageLocalXfo](Renderer_VR_XRController.XRController#getcontrollerstagelocalxfo)

#### Defined in

[src/Renderer/VR/XRController.ts:282](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L282)

___

### getControllerTipStageLocalXfo

▸ **getControllerTipStageLocalXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getControllerTipStageLocalXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getControllerTipStageLocalXfo](Renderer_VR_XRController.XRController#getcontrollertipstagelocalxfo)

#### Defined in

[src/Renderer/VR/XRController.ts:290](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L290)

___

### getGeomItemAtTip

▸ **getGeomItemAtTip**(): [`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

The getGeomItemAtTip method.

#### Returns

[`IntersectionData`](../../Utilities/Utilities_IntersectionData.IntersectionData)

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getGeomItemAtTip](Renderer_VR_XRController.XRController#getgeomitemattip)

#### Defined in

[src/Renderer/VR/XRController.ts:382](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L382)

___

### getHandedness

▸ **getHandedness**(): `any`

The getHandedness method.

#### Returns

`any`

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getHandedness](Renderer_VR_XRController.XRController#gethandedness)

#### Defined in

[src/Renderer/VR/XRController.ts:226](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L226)

___

### getId

▸ **getId**(): `number`

The getId method.

#### Returns

`number`

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getId](Renderer_VR_XRController.XRController#getid)

#### Defined in

[src/Renderer/VR/XRController.ts:234](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L234)

___

### getTipItem

▸ **getTipItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTipItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getTipItem](Renderer_VR_XRController.XRController#gettipitem)

#### Defined in

[src/Renderer/VR/XRController.ts:250](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L250)

___

### getTipXfo

▸ **getTipXfo**(): [`Xfo`](../../Math/Math_Xfo.Xfo)

The getTipXfo method.

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getTipXfo](Renderer_VR_XRController.XRController#gettipxfo)

#### Defined in

[src/Renderer/VR/XRController.ts:258](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L258)

___

### getTouchPadValue

▸ **getTouchPadValue**(): `any`

The getTouchPadValue method.

#### Returns

`any`

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getTouchPadValue](Renderer_VR_XRController.XRController#gettouchpadvalue)

#### Defined in

[src/Renderer/VR/XRController.ts:266](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L266)

___

### getTreeItem

▸ **getTreeItem**(): [`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

The getTreeItem method.

#### Returns

[`TreeItem`](../../SceneTree/SceneTree_TreeItem.TreeItem)

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[getTreeItem](Renderer_VR_XRController.XRController#gettreeitem)

#### Defined in

[src/Renderer/VR/XRController.ts:242](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L242)

___

### isButtonPressed

▸ **isButtonPressed**(): `boolean`

The isButtonPressed method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[isButtonPressed](Renderer_VR_XRController.XRController#isbuttonpressed)

#### Defined in

[src/Renderer/VR/XRController.ts:274](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L274)

___

### off

▸ **off**(`eventName`, `listener?`): `void`

Removes a listener function from the specified event, using either the function or the index id. Depends on what is passed in.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function or the id number. |

#### Returns

`void`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[off](Renderer_VR_XRController.XRController#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L97)

___

### on

▸ **on**(`eventName`, `listener?`): `number`

Adds a listener function for a given event name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener?` | (`event`: `any`) => `void` | The listener function(callback). |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[on](Renderer_VR_XRController.XRController#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L44)

___

### once

▸ **once**(`eventName`, `listener`): `number`

Similar to the `on` method with the difference that when the event is triggered,
it is automatically unregistered meaning that the event listener will be triggered at most one time.

Useful for events that we expect to trigger one time, such as when assets load.
```javascript
const asset = new Asset();
asset.once('loaded', () => {
  console.log("Yay! the asset is loaded")
})
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The eventName value |
| `listener` | (`event`: `any`) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[once](Renderer_VR_XRController.XRController#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### removeListenerById

▸ **removeListenerById**(`eventName`, `id`): `void`

remove listener by ID returned from #on

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `id` | `number` | The id returned by addListener |

#### Returns

`void`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[removeListenerById](Renderer_VR_XRController.XRController#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### updatePose

▸ **updatePose**(`refSpace`, `xrFrame`, `inputSource`): `void`

The updatePose method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `refSpace` | `any` | The refSpace value. |
| `xrFrame` | `any` | The xrFrame value. |
| `inputSource` | `any` | The inputSource value. |

#### Returns

`void`

#### Inherited from

[XRController](Renderer_VR_XRController.XRController).[updatePose](Renderer_VR_XRController.XRController#updatepose)

#### Defined in

[src/Renderer/VR/XRController.ts:302](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRController.ts#L302)

