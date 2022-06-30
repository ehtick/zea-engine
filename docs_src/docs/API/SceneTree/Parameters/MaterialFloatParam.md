---
id: "SceneTree_Parameters_MaterialFloatParam.MaterialFloatParam"
title: "Class: MaterialFloatParam"
sidebar_label: "MaterialFloatParam"
custom_edit_url: null
---



Represents a specific type of parameter, that stores `number` and `BaseImage` texture values.

i.e.:
```javascript
const image = new LDRImage();
image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")

const numberParam = new MaterialFloatParam('MyMaterialFloat', 15.5)
numberParam.setImage(image)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(numberParam)
```

* **Events**
* **valueChanged:** Triggered every time the Image value changes
* **textureDisconnected:** Triggered when Image value is cleaned/removed.
* **textureConnected:** Triggered when the Image value is set.

## Hierarchy

- [`NumberParameter`](SceneTree_Parameters_NumberParameter.NumberParameter)

  ↳ **`MaterialFloatParam`**

## Implements

- [`IBinaryReader`](../../Utilities/Utilities_IBinaryReader.IBinaryReader)

## Constructors

### constructor

• **new MaterialFloatParam**(`name?`, `value?`, `range?`)

Create a material float parameter.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the material color parameter. |
| `value?` | `number` | `undefined` | The value of the parameter. |
| `range?` | `number`[] | `undefined` | An array with two numbers. If defined, the parameter value will be clamped. |

#### Overrides

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[constructor](SceneTree_Parameters_NumberParameter.NumberParameter#constructor)

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:37](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L37)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[__id](SceneTree_Parameters_NumberParameter.NumberParameter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_value

• `Protected` **\_\_value**: `number`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[__value](SceneTree_Parameters_NumberParameter.NumberParameter#__value)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L26)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[boundInputs](SceneTree_Parameters_NumberParameter.NumberParameter#boundinputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L20)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[boundOutputs](SceneTree_Parameters_NumberParameter.NumberParameter#boundoutputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L21)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[cleaning](SceneTree_Parameters_NumberParameter.NumberParameter#cleaning)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L22)

___

### dataType

• `Protected` **dataType**: `string`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[dataType](SceneTree_Parameters_NumberParameter.NumberParameter#datatype)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L27)

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[dirty](SceneTree_Parameters_NumberParameter.NumberParameter#dirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L19)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[dirtyOpIndex](SceneTree_Parameters_NumberParameter.NumberParameter#dirtyopindex)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L23)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[firstOP_WRITE](SceneTree_Parameters_NumberParameter.NumberParameter#firstop_write)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L24)

___

### image

• `Protected` `Optional` **image**: [`BaseImage`](../SceneTree_BaseImage.BaseImage)

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L30)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[listeners](SceneTree_Parameters_NumberParameter.NumberParameter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[ownerItem](SceneTree_Parameters_NumberParameter.NumberParameter#owneritem)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L28)

___

### range

• `Protected` `Optional` **range**: `number`[]

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[range](SceneTree_Parameters_NumberParameter.NumberParameter#range)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L21)

___

### step

• `Protected` `Optional` **step**: `number`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[step](SceneTree_Parameters_NumberParameter.NumberParameter#step)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L22)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the parameter.

#### Returns

`string`

- Returns the parameter name.

#### Inherited from

NumberParameter.name

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:64](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L64)

• `set` **name**(`value`): `void`

Sets the name of the parameter(Updates path).

**`emits`** `nameChanged` with `newName` and `oldName` data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

- Returns the parameter name.

#### Inherited from

NumberParameter.name

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L74)

___

### path

• `get` **path**(): `string`[]

Returns the current path of the parameter in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

NumberParameter.path

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L83)

___

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Inherited from

NumberParameter.value

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:434](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L434)

• `set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Inherited from

NumberParameter.value

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:438](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L438)

## Methods

### \_clean

▸ **_clean**(`index`): `void`

Cleans the parameter up tp the index of the specified index of the bound OperatorOutput

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[_clean](SceneTree_Parameters_NumberParameter.NumberParameter#_clean)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:363](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L363)

___

### bindOperatorInput

▸ **bindOperatorInput**(`operatorInput`): `void`

When an Operator is reading from a parameter, it must be dirtied when the parameter value
changes. The Parameter maintains a list of bound inputs and will propagate dirty to
them explicitly.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorInput` | [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\> | The output that we are unbinding from the Parameter |

#### Returns

`void`

- The index of the bound output.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[bindOperatorInput](SceneTree_Parameters_NumberParameter.NumberParameter#bindoperatorinput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:165](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L165)

___

### bindOperatorOutput

▸ **bindOperatorOutput**(`operatorOutput`, `index?`): `number`

When an Operator writes to a parameter, it binds its outputs to the parameter at a given
index. Then when the operator is dirtied by one of its inputs, it explicitly dirties
the output parameters.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `operatorOutput` | [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\> | `undefined` | The output that we are unbinding from the Parameter |
| `index` | `number` | `-1` | The index(optional) that the output is being bound at. |

#### Returns

`number`

- The index of the bound output.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[bindOperatorOutput](SceneTree_Parameters_NumberParameter.NumberParameter#bindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:190](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L190)

___

### clone

▸ **clone**(): [`MaterialFloatParam`](SceneTree_Parameters_MaterialFloatParam.MaterialFloatParam)

The clone method constructs a new material float parameter,
copies its values from this parameter and returns it.

#### Returns

[`MaterialFloatParam`](SceneTree_Parameters_MaterialFloatParam.MaterialFloatParam)

- Returns a new cloned material float parameter.

#### Overrides

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[clone](SceneTree_Parameters_NumberParameter.NumberParameter#clone)

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:109](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L109)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`number`\> |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[copyFrom](SceneTree_Parameters_NumberParameter.NumberParameter#copyfrom)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:460](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L460)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[destroy](SceneTree_Parameters_NumberParameter.NumberParameter#destroy)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:480](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L480)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[emit](SceneTree_Parameters_NumberParameter.NumberParameter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `unknown`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[fromJSON](SceneTree_Parameters_NumberParameter.NumberParameter#fromjson)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:95](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L95)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getClassName](SceneTree_Parameters_NumberParameter.NumberParameter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getDataType

▸ **getDataType**(): `string`

Returns parameter's data type.

#### Returns

`string`

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getDataType](SceneTree_Parameters_NumberParameter.NumberParameter#getdatatype)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L149)

___

### getDirtyBindingIndex

▸ **getDirtyBindingIndex**(): `number`

Returns the index of the first 'dirty' binding in the stack. This will be the index of the
first operator that will evaluate when the parameter needs to be cleaned.

#### Returns

`number`

- The index of the dirty binding in the binding stack.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getDirtyBindingIndex](SceneTree_Parameters_NumberParameter.NumberParameter#getdirtybindingindex)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:292](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L292)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getId](SceneTree_Parameters_NumberParameter.NumberParameter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getImage

▸ **getImage**(): [`BaseImage`](../SceneTree_BaseImage.BaseImage)

Returns `BaseImage` texture of the Material.

#### Returns

[`BaseImage`](../SceneTree_BaseImage.BaseImage)

- The return value.

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:45](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L45)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getName](SceneTree_Parameters_NumberParameter.NumberParameter#getname)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L92)

___

### getOwner

▸ **getOwner**(): [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

Returns the owner item of the current parameter.

#### Returns

[`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getOwner](SceneTree_Parameters_NumberParameter.NumberParameter#getowner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:117](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L117)

___

### getPath

▸ **getPath**(): `string`[]

Returns the parameter's path as an array of strings.
Includes owner's path in case it is owned by a `ParameterOwner`.

#### Returns

`string`[]

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getPath](SceneTree_Parameters_NumberParameter.NumberParameter#getpath)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L136)

___

### getRange

▸ **getRange**(): `number`[]

Returns the range to which the parameter is restrained.

#### Returns

`number`[]

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getRange](SceneTree_Parameters_NumberParameter.NumberParameter#getrange)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L42)

___

### getStep

▸ **getStep**(): `number`

Returns the step number, which is the one used for rounding.

#### Returns

`number`

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getStep](SceneTree_Parameters_NumberParameter.NumberParameter#getstep)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L60)

___

### getValue

▸ **getValue**(): `number`

Returns parameter's value.

#### Returns

`number`

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getValue](SceneTree_Parameters_NumberParameter.NumberParameter#getvalue)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:394](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L394)

___

### getValueFromOp

▸ **getValueFromOp**(`index`): `number`

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`number`

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[getValueFromOp](SceneTree_Parameters_NumberParameter.NumberParameter#getvaluefromop)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:348](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L348)

___

### isDirty

▸ **isDirty**(): `boolean`

Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[isDirty](SceneTree_Parameters_NumberParameter.NumberParameter#isdirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:282](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L282)

___

### loadValue

▸ **loadValue**(`value`): `void`

The loadValue is used to change the value of a parameter, without triggering a
valueChanges, or setting the USER_EDITED state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The context value. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[loadValue](SceneTree_Parameters_NumberParameter.NumberParameter#loadvalue)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:450](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L450)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[off](SceneTree_Parameters_NumberParameter.NumberParameter#off)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[on](SceneTree_Parameters_NumberParameter.NumberParameter#on)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[once](SceneTree_Parameters_NumberParameter.NumberParameter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Extracts `number` and `Image` values from a buffer, updating current parameter state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Implementation of

[IBinaryReader](../../Utilities/Utilities_IBinaryReader.IBinaryReader).[readBinary](../../Utilities/Utilities_IBinaryReader.IBinaryReader#readbinary)

#### Overrides

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[readBinary](SceneTree_Parameters_NumberParameter.NumberParameter#readbinary)

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:93](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L93)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[removeListenerById](SceneTree_Parameters_NumberParameter.NumberParameter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setCleanFromOp](SceneTree_Parameters_NumberParameter.NumberParameter#setcleanfromop)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:301](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L301)

___

### setDirty

▸ **setDirty**(`index`): `boolean`

Dirties this Parameter so subsequent calls to `getValue` will cause an evaluation of its bound operators.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Index of the operator |

#### Returns

`boolean`

- `true` if the Parameter was made dirty, else `false` if it was already dirty.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setDirty](SceneTree_Parameters_NumberParameter.NumberParameter#setdirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:248](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L248)

___

### setImage

▸ **setImage**(`value`): `void`

Sets `BaseImage` texture value in parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`BaseImage`](../SceneTree_BaseImage.BaseImage) | The value value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:54](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L54)

___

### setName

▸ **setName**(`name`): `void`

Sets the name of the current parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The base parameter name. |

#### Returns

`void`

- The instance itself.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setName](SceneTree_Parameters_NumberParameter.NumberParameter#setname)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L102)

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

Sets the owner item of the current parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner) | The ownerItem value. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setOwner](SceneTree_Parameters_NumberParameter.NumberParameter#setowner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:126](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L126)

___

### setRange

▸ **setRange**(`range`): `void`

Sets the range to which the parameter is restrained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `range` | `number`[] | The range value. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setRange](SceneTree_Parameters_NumberParameter.NumberParameter#setrange)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:51](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L51)

___

### setStep

▸ **setStep**(`step`): `void`

Returns step value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `step` | `number` | The step value. |

#### Returns

`void`

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setStep](SceneTree_Parameters_NumberParameter.NumberParameter#setstep)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:69](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L69)

___

### setValue

▸ **setValue**(`value`): `void`

Sets `number` or the `BaseImage` texture value in parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `number` \| [`BaseImage`](../SceneTree_BaseImage.BaseImage) | The value param. |

#### Returns

`void`

#### Overrides

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[setValue](SceneTree_Parameters_NumberParameter.NumberParameter#setvalue)

#### Defined in

[src/SceneTree/Parameters/MaterialFloatParam.ts:79](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialFloatParam.ts#L79)

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

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[toJSON](SceneTree_Parameters_NumberParameter.NumberParameter#tojson)

#### Defined in

[src/SceneTree/Parameters/NumberParameter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/NumberParameter.ts#L82)

___

### unbindOperatorInput

▸ **unbindOperatorInput**(`operatorInput`): `void`

When an operator is being removed from reading from a Parameter, the Input is removed
This means the operator will no longer receive updates when the operator changes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorInput` | [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\> | The output that we are unbinding from the Parameter |

#### Returns

`void`

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[unbindOperatorInput](SceneTree_Parameters_NumberParameter.NumberParameter#unbindoperatorinput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L176)

___

### unbindOperatorOutput

▸ **unbindOperatorOutput**(`operatorOutput`): `number`

When an operator is unbinding from a parameter, it removes its self from the list maintained
by the parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `operatorOutput` | [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\> | The output that we are unbinding from the Parameter |

#### Returns

`number`

- The return value.

#### Inherited from

[NumberParameter](SceneTree_Parameters_NumberParameter.NumberParameter).[unbindOperatorOutput](SceneTree_Parameters_NumberParameter.NumberParameter#unbindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:214](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L214)

