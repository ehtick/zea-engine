---
id: "SceneTree_Parameters_ItemSetParameter.ItemSetParameter"
title: "Class: ItemSetParameter"
sidebar_label: "ItemSetParameter"
custom_edit_url: null
---



Class representing an item set parameter.

## Hierarchy

- [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>\>

  ↳ **`ItemSetParameter`**

## Constructors

### constructor

• **new ItemSetParameter**(`name?`, `filterFn`)

Create an item set parameter.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | The name of the item set parameter. |
| `filterFn` | (`item`: [`TreeItem`](../SceneTree_TreeItem.TreeItem)) => `boolean` | `undefined` | The filterFn value. |

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[constructor](SceneTree_Parameters_Parameter.Parameter#constructor)

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L29)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[__id](SceneTree_Parameters_Parameter.Parameter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_value

• `Protected` **\_\_value**: `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[__value](SceneTree_Parameters_Parameter.Parameter#__value)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L26)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[boundInputs](SceneTree_Parameters_Parameter.Parameter#boundinputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L20)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[boundOutputs](SceneTree_Parameters_Parameter.Parameter#boundoutputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L21)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[cleaning](SceneTree_Parameters_Parameter.Parameter#cleaning)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L22)

___

### dataType

• `Protected` **dataType**: `string`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[dataType](SceneTree_Parameters_Parameter.Parameter#datatype)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L27)

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[dirty](SceneTree_Parameters_Parameter.Parameter#dirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L19)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[dirtyOpIndex](SceneTree_Parameters_Parameter.Parameter#dirtyopindex)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L23)

___

### filterFn

• `Protected` **filterFn**: (`item`: [`TreeItem`](../SceneTree_TreeItem.TreeItem)) => `boolean`

#### Type declaration

▸ (`item`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) |

##### Returns

`boolean`

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L22)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[firstOP_WRITE](SceneTree_Parameters_Parameter.Parameter#firstop_write)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[listeners](SceneTree_Parameters_Parameter.Parameter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[ownerItem](SceneTree_Parameters_Parameter.Parameter#owneritem)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L28)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the parameter.

#### Returns

`string`

- Returns the parameter name.

#### Inherited from

Parameter.name

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

Parameter.name

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

Parameter.path

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L83)

___

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Inherited from

Parameter.value

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

Parameter.value

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[_clean](SceneTree_Parameters_Parameter.Parameter#_clean)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:363](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L363)

___

### addItem

▸ **addItem**(`item`, `emitValueChanged?`): `number` \| `void`

The addItem method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The item value. |
| `emitValueChanged` | `boolean` | `true` | The emit value. |

#### Returns

`number` \| `void`

- The return value.

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:66](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L66)

___

### addItems

▸ **addItems**(`items`, `emitValueChanged?`): `void`

Adds items to the parameter value

**`memberof`** ItemSetParameter

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `items` | `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\> | `undefined` | list of items to add to the parameter |
| `emitValueChanged` | `boolean` | `true` |  |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:91](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L91)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[bindOperatorInput](SceneTree_Parameters_Parameter.Parameter#bindoperatorinput)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[bindOperatorOutput](SceneTree_Parameters_Parameter.Parameter#bindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:190](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L190)

___

### clearItems

▸ **clearItems**(`emitValueChanged?`): `void`

The clearItems method.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `emitValueChanged` | `boolean` | `true` |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:135](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L135)

___

### clone

▸ **clone**(): [`ItemSetParameter`](SceneTree_Parameters_ItemSetParameter.ItemSetParameter)

The clone method constructs a item set new parameter, copies its values
from this parameter and returns it.

#### Returns

[`ItemSetParameter`](SceneTree_Parameters_ItemSetParameter.ItemSetParameter)

- Returns a new item set parameter.

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[clone](SceneTree_Parameters_Parameter.Parameter#clone)

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:201](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L201)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<`Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>\> |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[copyFrom](SceneTree_Parameters_Parameter.Parameter#copyfrom)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:460](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L460)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[destroy](SceneTree_Parameters_Parameter.Parameter#destroy)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[emit](SceneTree_Parameters_Parameter.Parameter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[fromJSON](SceneTree_Parameters_Parameter.Parameter#fromjson)

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:174](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L174)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getClassName](SceneTree_Parameters_Parameter.Parameter#getclassname)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getDataType](SceneTree_Parameters_Parameter.Parameter#getdatatype)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getDirtyBindingIndex](SceneTree_Parameters_Parameter.Parameter#getdirtybindingindex)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:292](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L292)

___

### getFilterFn

▸ **getFilterFn**(): (`item`: [`TreeItem`](../SceneTree_TreeItem.TreeItem)) => `boolean`

The getFilterFn method.

#### Returns

`fn`

- The return value.

▸ (`item`): `boolean`

The getFilterFn method.

##### Parameters

| Name | Type |
| :------ | :------ |
| `item` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) |

##### Returns

`boolean`

- The return value.

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L46)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getId](SceneTree_Parameters_Parameter.Parameter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getItem

▸ **getItem**(`index`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

The getItem method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index param. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L55)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getName](SceneTree_Parameters_Parameter.Parameter#getname)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L92)

___

### getNumItems

▸ **getNumItems**(): `number`

The getNumItems method.

#### Returns

`number`

- The return value.

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:144](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L144)

___

### getOwner

▸ **getOwner**(): [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

Returns the owner item of the current parameter.

#### Returns

[`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getOwner](SceneTree_Parameters_Parameter.Parameter#getowner)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getPath](SceneTree_Parameters_Parameter.Parameter#getpath)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L136)

___

### getValue

▸ **getValue**(): `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>

Returns parameter's value.

#### Returns

`Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getValue](SceneTree_Parameters_Parameter.Parameter#getvalue)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:394](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L394)

___

### getValueFromOp

▸ **getValueFromOp**(`index`): `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

`Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\>

- The return value.

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[getValueFromOp](SceneTree_Parameters_Parameter.Parameter#getvaluefromop)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[isDirty](SceneTree_Parameters_Parameter.Parameter#isdirty)

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
| `value` | `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\> | The context value. |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[loadValue](SceneTree_Parameters_Parameter.Parameter#loadvalue)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[off](SceneTree_Parameters_Parameter.Parameter#off)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[on](SceneTree_Parameters_Parameter.Parameter#on)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[once](SceneTree_Parameters_Parameter.Parameter#once)

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

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[readBinary](SceneTree_Parameters_Parameter.Parameter#readbinary)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:470](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L470)

___

### removeItem

▸ **removeItem**(`index`, `emitValueChanged?`): `void` \| [`TreeItem`](../SceneTree_TreeItem.TreeItem)

The removeItem method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `index` | `number` | `undefined` | The index value. |
| `emitValueChanged` | `boolean` | `true` | The emit param. |

#### Returns

`void` \| [`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The return value.

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L102)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[removeListenerById](SceneTree_Parameters_Parameter.Parameter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\> | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setCleanFromOp](SceneTree_Parameters_Parameter.Parameter#setcleanfromop)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setDirty](SceneTree_Parameters_Parameter.Parameter#setdirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:248](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L248)

___

### setFilterFn

▸ **setFilterFn**(`filterFn`): `void`

The setFilterFn method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filterFn` | (`item`: [`TreeItem`](../SceneTree_TreeItem.TreeItem)) => `boolean` | The filterFn value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L38)

___

### setItems

▸ **setItems**(`items`, `emit?`): `void`

The setItems method.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `items` | `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\> | `undefined` | The item param. |
| `emit` | `boolean` | `true` | The emit param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:115](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L115)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setName](SceneTree_Parameters_Parameter.Parameter#setname)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setOwner](SceneTree_Parameters_Parameter.Parameter#setowner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:126](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L126)

___

### setValue

▸ **setValue**(`value`): `void`

Sets value of the parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `Set`<[`TreeItem`](../SceneTree_TreeItem.TreeItem)\> | The value param. |

#### Returns

`void`

#### Inherited from

[Parameter](SceneTree_Parameters_Parameter.Parameter).[setValue](SceneTree_Parameters_Parameter.Parameter#setvalue)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:406](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L406)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Overrides

[Parameter](SceneTree_Parameters_Parameter.Parameter).[toJSON](SceneTree_Parameters_Parameter.Parameter#tojson)

#### Defined in

[src/SceneTree/Parameters/ItemSetParameter.ts:156](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ItemSetParameter.ts#L156)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[unbindOperatorInput](SceneTree_Parameters_Parameter.Parameter#unbindoperatorinput)

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

[Parameter](SceneTree_Parameters_Parameter.Parameter).[unbindOperatorOutput](SceneTree_Parameters_Parameter.Parameter#unbindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:214](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L214)

