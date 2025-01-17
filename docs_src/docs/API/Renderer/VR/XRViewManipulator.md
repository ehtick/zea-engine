---
id: "Renderer_VR_XRViewManipulator.XRViewManipulator"
title: "Class: XRViewManipulator"
sidebar_label: "XRViewManipulator"
custom_edit_url: null
---



Class representing a view tool

## Hierarchy

- [`default`](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default)

  ↳ **`XRViewManipulator`**

## Constructors

### constructor

• **new XRViewManipulator**(`xrvp`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `xrvp` | `any` |

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[constructor](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#constructor)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L30)

## Properties

### \_\_activated

• `Protected` **\_\_activated**: `boolean` = `false`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[__activated](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#__activated)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L33)

___

### \_\_controllerTriggersHeld

• `Protected` **\_\_controllerTriggersHeld**: `any`[]

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L18)

___

### \_\_grabDir

• `Protected` **\_\_grabDir**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L24)

___

### \_\_grabDist

• `Protected` **\_\_grabDist**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L27)

___

### \_\_grabPos

• `Protected` **\_\_grabPos**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L22)

___

### \_\_grab\_to\_stage

• `Protected` **\_\_grab\_to\_stage**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L25)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[__id](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_invOri

• `Protected` **\_\_invOri**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L26)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[deprecatedParamMapping](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:17](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L17)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[listeners](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[paramEventListenerIDs](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[paramMapping](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[params](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

___

### stageXfo\_\_GrabStart

• `Protected` **stageXfo\_\_GrabStart**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L23)

___

### vrControllerToolTip

• `Protected` **vrControllerToolTip**: [`Sphere`](../../SceneTree/Geometry/Shapes/SceneTree_Geometry_Shapes_Sphere.Sphere)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L20)

___

### vrControllerToolTipMat

• `Protected` **vrControllerToolTipMat**: [`Material`](../../SceneTree/SceneTree_Material.Material)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L21)

___

### xrvp

• `Protected` **xrvp**: `any`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L19)

## Methods

### \_\_initMoveStage

▸ **__initMoveStage**(): `void`

#### Returns

`void`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:87](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L87)

___

### activateTool

▸ **activateTool**(): `void`

The activateTool method.

#### Returns

`void`

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[activateTool](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#activatetool)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L60)

___

### addIconToController

▸ `Private` **addIconToController**(`controller`): `void`

Adds the icon to the tip of the VR Controller

#### Parameters

| Name | Type |
| :------ | :------ |
| `controller` | [`XRController`](Renderer_VR_XRController.XRController) |

#### Returns

`void`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L50)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[addParameter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L135)

___

### addParameterDeprecationMapping

▸ **addParameterDeprecationMapping**(`key`, `paramName`): `void`

Add a mapping from one name to a new parameter.
This is used to handle migrating parameters to new names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The parameter name. |
| `paramName` | `string` | The parameter name. |

#### Returns

`void`

- The return value.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[addParameterDeprecationMapping](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies Parameters from another `ParameterOwner` to current object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`ParameterOwner`](../../SceneTree/SceneTree_ParameterOwner.ParameterOwner) | The ParameterOwner copy from. |
| `context?` | [`CloneContext`](../../SceneTree/SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[copyFrom](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#copyfrom)

#### Defined in

[src/SceneTree/ParameterOwner.ts:316](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L316)

___

### deactivateTool

▸ **deactivateTool**(): `void`

The deactivateTool method.

#### Returns

`void`

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[deactivateTool](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#deactivatetool)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L74)

___

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

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[emit](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`json`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[fromJSON](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#fromjson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:241](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L241)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getClassName](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getId

▸ **getId**(): `number`

Every instance of each class based on BaseClass is assigned a unique number.
This number is not persistent in between different loads of a scene.
Returns the unique id of the object.

#### Returns

`number`

- The Id of the object.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getId](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getNumParameters](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getParameter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getParameterByIndex](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L70)

___

### getParameterIndex

▸ **getParameterIndex**(`paramName`): `number`

Returns the index of a parameter in parameter list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | Name of the parameter. |

#### Returns

`number`

- Position in the array

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getParameterIndex](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[getParameters](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### hasParameter

▸ **hasParameter**(`paramName`): `boolean`

Validates if the specified parameter exists in the object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

`boolean`

- The return value.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[hasParameter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[insertParameter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

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

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[off](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#off)

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

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[on](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L44)

___

### onKeyDown

▸ **onKeyDown**(`event`): `void`

Event fired when the user presses down a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event param. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onKeyDown](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onkeydown)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:132](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L132)

___

### onKeyUp

▸ **onKeyUp**(`event`): `void`

Event fired when the user releases a key on the keyboard.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`KeyboardEvent`](../../Utilities/Events/Utilities_Events_KeyboardEvent.KeyboardEvent) | The event param. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onKeyUp](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onkeyup)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:141](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L141)

___

### onPointerDoublePress

▸ **onPointerDoublePress**(`event`): `void`

Event fired when a pointing device button is double clicked on the tool.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onPointerDoublePress](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onpointerdoublepress)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:258](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L258)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Event fired when a pointing device button is pressed while the pointer is over the tool.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onPointerDown](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onpointerdown)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:225](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L225)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Event fired when a mouse pointer enters the viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onPointerEnter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onpointerenter)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L102)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Event fired when a mouse pointer leaves the viewport

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onPointerLeave](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onpointerleave)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:111](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L111)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Event fired when a pointing device is moved while the cursor's hotspot is inside it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onPointerMove](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onpointermove)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:236](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L236)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Event fired when a pointing device button is released while the pointer is over the tool.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Overrides

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onPointerUp](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onpointerup)

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:247](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L247)

___

### onTouchCancel

▸ **onTouchCancel**(`event`): `void`

Event fired when one or more touch points have been disrupted in an implementation-specific manner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The event param. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onTouchCancel](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#ontouchcancel)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:153](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L153)

___

### onVRControllerButtonDown

▸ **onVRControllerButtonDown**(`event`): `void`

The onVRControllerButtonDown method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The event param. |

#### Returns

`void`

The return value.

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:110](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L110)

___

### onVRControllerButtonUp

▸ **onVRControllerButtonUp**(`event`): `void`

The onVRControllerButtonUp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The event param. |

#### Returns

`void`

The return value.

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:125](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L125)

___

### onVRControllerDoubleClicked

▸ **onVRControllerDoubleClicked**(`event`): `void`

The onVRControllerDoubleClicked method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRControllerEvent`](../../Utilities/Events/Utilities_Events_XRControllerEvent.XRControllerEvent) | The event param. |

#### Returns

`void`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:139](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L139)

___

### onVRPoseChanged

▸ **onVRPoseChanged**(`event`): `void`

The onVRPoseChanged method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`XRPoseEvent`](../../Utilities/Events/Utilities_Events_XRPoseEvent.XRPoseEvent) | The event param. |

#### Returns

`void`

#### Defined in

[src/Renderer/VR/XRViewManipulator.ts:151](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Renderer/VR/XRViewManipulator.ts#L151)

___

### onWheel

▸ **onWheel**(`event`): `void`

Event fired when the user rotates the pointing device wheel.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event param. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[onWheel](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#onwheel)

#### Defined in

[src/SceneTree/Manipulators/BaseTool.ts:120](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Manipulators/BaseTool.ts#L120)

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

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[once](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> | The event object emitted by the parameter. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[parameterValueChanged](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L124)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Uses passed in BinReader object(containing an Int32 array with all the parameters) to reconstruct all parameters state.

In each iteration of the array, propType and propName are extracted and
used to build the right `Parameter` class. Then all of them are added to the object.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../../SceneTree/SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../../SceneTree/SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[readBinary](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#readbinary)

#### Defined in

[src/SceneTree/ParameterOwner.ts:276](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L276)

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

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[removeListenerById](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### removeParameter

▸ **removeParameter**(`name`): `void`

Removes `Parameter` from owner, by using parameter's name.

**`emits`** `parameterRemoved` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The parameter name. |

#### Returns

`void`

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[removeParameter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../../SceneTree/Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[replaceParameter](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`Record`<`string`, `unknown`\>

- Returns the json object.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[toJSON](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#tojson)

#### Defined in

[src/SceneTree/ParameterOwner.ts:218](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L218)

___

### toString

▸ **toString**(`context`): `string`

Converts object's JSON value and converts it to a string.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- String of object's parameter list state.

#### Inherited from

[default](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default).[toString](../../SceneTree/Manipulators/SceneTree_Manipulators_BaseTool.default#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L303)

