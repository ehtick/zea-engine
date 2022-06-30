---
id: "SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter"
title: "Class: BoundingBoxParameter"
sidebar_label: "BoundingBoxParameter"
custom_edit_url: null
---



Represents a specific type of parameter, that only stores `Box3` values.

i.e.:
```javascript
const boundingBox = new BoundingBoxParameter('MyBBox', new TreeItem())
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(boundingBox)
```

## Hierarchy

- [`Box3Parameter`](SceneTree_Parameters_Box3Parameter.Box3Parameter)

  ↳ **`BoundingBoxParameter`**

## Constructors

### constructor

• **new BoundingBoxParameter**(`name?`, `treeItem`)

Creates an instance of BoundingBoxParameter.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `''` | Name of the parameter |
| `treeItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | `TreeItem` that contains `Box3` representing the Bounding Box |

#### Overrides

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[constructor](SceneTree_Parameters_Box3Parameter.Box3Parameter#constructor)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L30)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[__id](SceneTree_Parameters_Box3Parameter.Box3Parameter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_value

• `Protected` **\_\_value**: [`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[__value](SceneTree_Parameters_Box3Parameter.Box3Parameter#__value)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L26)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[boundInputs](SceneTree_Parameters_Box3Parameter.Box3Parameter#boundinputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L20)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[boundOutputs](SceneTree_Parameters_Box3Parameter.Box3Parameter#boundoutputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L21)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[cleaning](SceneTree_Parameters_Box3Parameter.Box3Parameter#cleaning)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L22)

___

### dataType

• `Protected` **dataType**: `string`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[dataType](SceneTree_Parameters_Box3Parameter.Box3Parameter#datatype)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L27)

___

### dirty

• `Protected` **dirty**: `boolean` = `true`

#### Overrides

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[dirty](SceneTree_Parameters_Box3Parameter.Box3Parameter#dirty)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L24)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[dirtyOpIndex](SceneTree_Parameters_Box3Parameter.Box3Parameter#dirtyopindex)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L23)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[firstOP_WRITE](SceneTree_Parameters_Box3Parameter.Box3Parameter#firstop_write)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L24)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[listeners](SceneTree_Parameters_Box3Parameter.Box3Parameter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[ownerItem](SceneTree_Parameters_Box3Parameter.Box3Parameter#owneritem)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L28)

___

### treeItem

• `Protected` **treeItem**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L23)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the parameter.

#### Returns

`string`

- Returns the parameter name.

#### Inherited from

Box3Parameter.name

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

Box3Parameter.name

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

Box3Parameter.path

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L83)

___

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Inherited from

Box3Parameter.value

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

Box3Parameter.value

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[_clean](SceneTree_Parameters_Box3Parameter.Box3Parameter#_clean)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[bindOperatorInput](SceneTree_Parameters_Box3Parameter.Box3Parameter#bindoperatorinput)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[bindOperatorOutput](SceneTree_Parameters_Box3Parameter.Box3Parameter#bindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:190](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L190)

___

### clone

▸ **clone**(): [`BoundingBoxParameter`](SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

The clone method constructs a new Box3 parameter,
copies its values from this parameter and returns it.

#### Returns

[`BoundingBoxParameter`](SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

- Returns a new cloned Box3 parameter.

#### Overrides

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[clone](SceneTree_Parameters_Box3Parameter.Box3Parameter#clone)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L62)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<[`Box3`](../../Math/Math_Box3.Box3)\> |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) |

#### Returns

`void`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[copyFrom](SceneTree_Parameters_Box3Parameter.Box3Parameter#copyfrom)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:460](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L460)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[destroy](SceneTree_Parameters_Box3Parameter.Box3Parameter#destroy)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[emit](SceneTree_Parameters_Box3Parameter.Box3Parameter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `j` | `Record`<`string`, `unknown`\> |
| `context?` | `Record`<`string`, `unknown`\> |

#### Returns

`void`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[fromJSON](SceneTree_Parameters_Box3Parameter.Box3Parameter#fromjson)

#### Defined in

[src/SceneTree/Parameters/Box3Parameter.ts:42](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Box3Parameter.ts#L42)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getClassName](SceneTree_Parameters_Box3Parameter.Box3Parameter#getclassname)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getDataType](SceneTree_Parameters_Box3Parameter.Box3Parameter#getdatatype)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getDirtyBindingIndex](SceneTree_Parameters_Box3Parameter.Box3Parameter#getdirtybindingindex)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getId](SceneTree_Parameters_Box3Parameter.Box3Parameter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getName](SceneTree_Parameters_Box3Parameter.Box3Parameter#getname)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getOwner](SceneTree_Parameters_Box3Parameter.Box3Parameter#getowner)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getPath](SceneTree_Parameters_Box3Parameter.Box3Parameter#getpath)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L136)

___

### getValue

▸ **getValue**(): [`Box3`](../../Math/Math_Box3.Box3)

Returns bounding box value

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Overrides

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getValue](SceneTree_Parameters_Box3Parameter.Box3Parameter#getvalue)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:54](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L54)

___

### getValueFromOp

▸ **getValueFromOp**(`index`): [`Box3`](../../Math/Math_Box3.Box3)

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[getValueFromOp](SceneTree_Parameters_Box3Parameter.Box3Parameter#getvaluefromop)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[isDirty](SceneTree_Parameters_Box3Parameter.Box3Parameter#isdirty)

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
| `value` | [`Box3`](../../Math/Math_Box3.Box3) | The context value. |

#### Returns

`void`

#### Overrides

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[loadValue](SceneTree_Parameters_Box3Parameter.Box3Parameter#loadvalue)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L78)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[off](SceneTree_Parameters_Box3Parameter.Box3Parameter#off)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[on](SceneTree_Parameters_Box3Parameter.Box3Parameter#on)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[once](SceneTree_Parameters_Box3Parameter.Box3Parameter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### readBinary

▸ **readBinary**(`reader`, `context?`): `void`

Extracts a number value from a buffer, updating current parameter state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context?` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[readBinary](SceneTree_Parameters_Box3Parameter.Box3Parameter#readbinary)

#### Defined in

[src/SceneTree/Parameters/Box3Parameter.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Box3Parameter.ts#L28)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[removeListenerById](SceneTree_Parameters_Box3Parameter.Box3Parameter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Box3`](../../Math/Math_Box3.Box3) | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[setCleanFromOp](SceneTree_Parameters_Box3Parameter.Box3Parameter#setcleanfromop)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:301](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L301)

___

### setDirty

▸ **setDirty**(`index`): `boolean`

Makes parameter value be dirty, so when `getValue` is called,
an evaluation is then executed to re-calculate the BoundingBox

**`memberof`** BoundingBoxParameter

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`boolean`

#### Overrides

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[setDirty](SceneTree_Parameters_Box3Parameter.Box3Parameter#setdirty)

#### Defined in

[src/SceneTree/Parameters/BoundingBoxParameter.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/BoundingBoxParameter.ts#L41)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[setName](SceneTree_Parameters_Box3Parameter.Box3Parameter#setname)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[setOwner](SceneTree_Parameters_Box3Parameter.Box3Parameter#setowner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:126](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L126)

___

### setValue

▸ **setValue**(`value`): `void`

Sets value of the parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Box3`](../../Math/Math_Box3.Box3) | The value param. |

#### Returns

`void`

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[setValue](SceneTree_Parameters_Box3Parameter.Box3Parameter#setvalue)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:406](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L406)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `unknown`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> |

#### Returns

`Record`<`string`, `unknown`\>

#### Inherited from

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[toJSON](SceneTree_Parameters_Box3Parameter.Box3Parameter#tojson)

#### Defined in

[src/SceneTree/Parameters/Box3Parameter.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Box3Parameter.ts#L33)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[unbindOperatorInput](SceneTree_Parameters_Box3Parameter.Box3Parameter#unbindoperatorinput)

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

[Box3Parameter](SceneTree_Parameters_Box3Parameter.Box3Parameter).[unbindOperatorOutput](SceneTree_Parameters_Box3Parameter.Box3Parameter#unbindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:214](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L214)

