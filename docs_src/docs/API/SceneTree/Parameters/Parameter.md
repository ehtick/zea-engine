---
id: "SceneTree_Parameters_Parameter.Parameter"
title: "Class: Parameter<T>"
sidebar_label: "Parameter"
custom_edit_url: null
---



Represents a reactive type of attribute that can be owned by a `ParameterOwner` class.

**Events**
* **nameChanged:** Triggered when the name of the parameter changes.
* **valueChanged:** Triggered when the value of the parameter changes.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`EventEmitter`](../../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`Parameter`**

  ↳↳ [`BooleanParameter`](SceneTree_Parameters_BooleanParameter.BooleanParameter)

  ↳↳ [`Box2Parameter`](SceneTree_Parameters_Box2Parameter.Box2Parameter)

  ↳↳ [`Box3Parameter`](SceneTree_Parameters_Box3Parameter.Box3Parameter)

  ↳↳ [`ColorParameter`](SceneTree_Parameters_ColorParameter.ColorParameter)

  ↳↳ [`FilePathParameter`](SceneTree_Parameters_FilePathParameter.FilePathParameter)

  ↳↳ [`GeometryParameter`](SceneTree_Parameters_GeometryParameter.GeometryParameter)

  ↳↳ [`ImageParameter`](SceneTree_Parameters_ImageParameter.ImageParameter)

  ↳↳ [`ItemSetParameter`](SceneTree_Parameters_ItemSetParameter.ItemSetParameter)

  ↳↳ [`ListParameter`](SceneTree_Parameters_ListParameter.ListParameter)

  ↳↳ [`Mat3Parameter`](SceneTree_Parameters_Mat3Parameter.Mat3Parameter)

  ↳↳ [`Mat4Parameter`](SceneTree_Parameters_Mat4Parameter.Mat4Parameter)

  ↳↳ [`MaterialParameter`](SceneTree_Parameters_MaterialParameter.MaterialParameter)

  ↳↳ [`NumberParameter`](SceneTree_Parameters_NumberParameter.NumberParameter)

  ↳↳ [`QuatParameter`](SceneTree_Parameters_QuatParameter.QuatParameter)

  ↳↳ [`StringListParameter`](SceneTree_Parameters_StringListParameter.StringListParameter)

  ↳↳ [`StringParameter`](SceneTree_Parameters_StringParameter.StringParameter)

  ↳↳ [`StructParameter`](SceneTree_Parameters_StructParameter.StructParameter)

  ↳↳ [`TreeItemParameter`](SceneTree_Parameters_TreeItemParameter.TreeItemParameter)

  ↳↳ [`Vec2Parameter`](SceneTree_Parameters_Vec2Parameter.Vec2Parameter)

  ↳↳ [`Vec3Parameter`](SceneTree_Parameters_Vec3Parameter.Vec3Parameter)

  ↳↳ [`Vec4Parameter`](SceneTree_Parameters_Vec4Parameter.Vec4Parameter)

  ↳↳ [`XfoParameter`](SceneTree_Parameters_XfoParameter.XfoParameter)

## Implements

- [`ICloneable`](../../Utilities/Utilities_ICloneable.ICloneable)
- [`ISerializable`](../../Utilities/Utilities_ISerializable.ISerializable)

## Constructors

### constructor

• **new Parameter**<`T`\>(`name?`, `value`, `dataType`)

When initializing a new parameter, the passed in value could be anything.
If it is a new type of value, just ensure you register it in the `Registry`.

How to use it:

```javascript
 // Creating a parameter object
 const param = new Parameter('Title', 'Awesome Parameter Value', 'String')

  // Capturing events
 param.on('valueChanged', (...params) => console.log('Value changed!'))

 // Changing parameter's value will cause `valueChanged` event to trigger.
 param.setValue('A New Awesome Parameter Value')
 // As result the console log code will execute: Value Changed!
```

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the parameter. |
| `value` | `T` | `undefined` | The value of the parameter. |
| `dataType` | `string` | `undefined` | The data type of the parameter. |

#### Overrides

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:52](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L52)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/BaseClass.ts#L11)

___

### \_\_value

• **\_\_value**: `T`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L26)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L20)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L21)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L22)

___

### dataType

• `Protected` **dataType**: `string`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L27)

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:19](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L19)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L23)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L26)

___

### name

• `Protected` **name**: `string`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:25](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L25)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L28)

## Accessors

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:406](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L406)

• `set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:410](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L410)

## Methods

### \_\_findFirstOP\_WRITE

▸ `Private` **__findFirstOP_WRITE**(): `void`

Find the first operator in our stack which writes using an OP_WRITE connection.
All operators before this op can be ignored during dirty propagation.

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:204](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L204)

___

### \_clean

▸ **_clean**(`index`): `void`

Cleans the parameter up tp the index of the specified index of the bound OperatorOutput

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:335](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L335)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:137](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L137)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:162](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L162)

___

### clone

▸ `Abstract` **clone**(): [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`T`\>

#### Returns

[`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`T`\>

#### Implementation of

[ICloneable](../../Utilities/Utilities_ICloneable.ICloneable).[clone](../../Utilities/Utilities_ICloneable.ICloneable#clone)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:430](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L430)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`T`\> |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:432](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L432)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:452](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L452)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ `Abstract` **fromJSON**(`j`, `context?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `j` | `Record`<`string`, `any`\> |
| `context?` | `Record`<`string`, `any`\> |

#### Returns

`void`

#### Implementation of

[ISerializable](../../Utilities/Utilities_ISerializable.ISerializable).[fromJSON](../../Utilities/Utilities_ISerializable.ISerializable#fromjson)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:428](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L428)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/BaseClass.ts#L33)

___

### getDataType

▸ **getDataType**(): `string`

Returns parameter's data type.

#### Returns

`string`

- The return value.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:121](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L121)

___

### getDirtyBindingIndex

▸ **getDirtyBindingIndex**(): `number`

Returns the index of the first 'dirty' binding in the stack. This will be the index of the
first operator that will evaluate when the parameter needs to be cleaned.

#### Returns

`number`

- The index of the dirty binding in the binding stack.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:264](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L264)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/BaseClass.ts#L25)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:64](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L64)

___

### getOwner

▸ **getOwner**(): [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

Returns the owner item of the current parameter.

#### Returns

[`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

- The return value.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:89](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L89)

___

### getPath

▸ **getPath**(): `string`[]

Returns the parameter's path as an array of strings.
Includes owner's path in case it is owned by a `ParameterOwner`.

#### Returns

`string`[]

- The return value.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:108](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L108)

___

### getValue

▸ **getValue**(): `T`

Returns parameter's value.

#### Returns

`T`

- The return value.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:366](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L366)

___

### getValueFromOp

▸ **getValueFromOp**(`index`): `T`

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`T`

- The return value.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:320](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L320)

___

### isDirty

▸ **isDirty**(): `boolean`

Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.

#### Returns

`boolean`

- Returns a boolean.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:254](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L254)

___

### loadValue

▸ **loadValue**(`value`): `void`

The loadValue is used to change the value of a parameter, without triggering a
valueChanges, or setting the USER_EDITED state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The context value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:422](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L422)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[off](../../Utilities/Utilities_EventEmitter.EventEmitter#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L97)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L44)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L82)

___

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

The readBinary method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:442](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L442)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/Utilities/EventEmitter.ts#L134)

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:273](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L273)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:220](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L220)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:74](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L74)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:98](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L98)

___

### setValue

▸ **setValue**(`value`): `void`

Sets value of the parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:378](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L378)

___

### toJSON

▸ `Abstract` **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `Record`<`string`, `any`\> |

#### Returns

`Record`<`string`, `any`\>

#### Implementation of

[ISerializable](../../Utilities/Utilities_ISerializable.ISerializable).[toJSON](../../Utilities/Utilities_ISerializable.ISerializable#tojson)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:426](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L426)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:148](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L148)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:186](https://github.com/ZeaInc/zea-engine/blob/8e646f8a8/src/SceneTree/Parameters/Parameter.ts#L186)

