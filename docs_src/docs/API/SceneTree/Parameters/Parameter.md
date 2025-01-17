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

[src/SceneTree/Parameters/Parameter.ts:52](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L52)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_name

• `Private` **\_\_name**: `string`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L25)

___

### \_\_value

• `Protected` **\_\_value**: `T`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L26)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L20)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L21)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L22)

___

### dataType

• `Protected` **dataType**: `string`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L27)

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L19)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L23)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L28)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the parameter.

#### Returns

`string`

- Returns the parameter name.

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L74)

___

### path

• `get` **path**(): `string`[]

Returns the current path of the parameter in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L83)

___

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:434](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L434)

• `set` **value**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:438](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L438)

## Methods

### \_\_findFirstOP\_WRITE

▸ `Private` **__findFirstOP_WRITE**(): `void`

Find the first operator in our stack which writes using an OP_WRITE connection.
All operators before this op can be ignored during dirty propagation.

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:232](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L232)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:190](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L190)

___

### clone

▸ `Abstract` **clone**(): [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`T`\>

#### Returns

[`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`T`\>

#### Implementation of

[ICloneable](../../Utilities/Utilities_ICloneable.ICloneable).[clone](../../Utilities/Utilities_ICloneable.ICloneable#clone)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:458](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L458)

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

[src/SceneTree/Parameters/Parameter.ts:460](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L460)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

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

[src/SceneTree/Parameters/Parameter.ts:456](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L456)

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

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getDataType

▸ **getDataType**(): `string`

Returns parameter's data type.

#### Returns

`string`

- The return value.

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L92)

___

### getOwner

▸ **getOwner**(): [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

Returns the owner item of the current parameter.

#### Returns

[`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

- The return value.

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L136)

___

### getValue

▸ **getValue**(): `T`

Returns parameter's value.

#### Returns

`T`

- The return value.

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:394](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L394)

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

[src/SceneTree/Parameters/Parameter.ts:348](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L348)

___

### isDirty

▸ **isDirty**(): `boolean`

Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.

#### Returns

`boolean`

- Returns a boolean.

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
| `value` | `T` | The context value. |

#### Returns

`void`

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[off](../../Utilities/Utilities_EventEmitter.EventEmitter#off)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[on](../../Utilities/Utilities_EventEmitter.EventEmitter#on)

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

[EventEmitter](../../Utilities/Utilities_EventEmitter.EventEmitter).[once](../../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

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

[src/SceneTree/Parameters/Parameter.ts:470](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L470)

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

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:248](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L248)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:126](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L126)

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

[src/SceneTree/Parameters/Parameter.ts:406](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L406)

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

[src/SceneTree/Parameters/Parameter.ts:454](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L454)

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

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:214](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L214)

