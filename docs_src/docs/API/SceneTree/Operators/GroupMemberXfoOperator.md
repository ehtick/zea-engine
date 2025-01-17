---
id: "SceneTree_Operators_GroupMemberXfoOperator.GroupMemberXfoOperator"
title: "Class: GroupMemberXfoOperator"
sidebar_label: "GroupMemberXfoOperator"
custom_edit_url: null
---



An operator for modifying group members by the groups Xfo

## Hierarchy

- [`Operator`](SceneTree_Operators_Operator.Operator)

  ↳ **`GroupMemberXfoOperator`**

## Constructors

### constructor

• **new GroupMemberXfoOperator**(`groupTransformXfoParam`, `memberXfoGlobalParam`)

Create a GroupMemberXfoOperator operator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `groupTransformXfoParam` | [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter) | The parameter on the Group which defines the displacement to apply to the members. |
| `memberXfoGlobalParam` | [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter) | The GlobalXfo param found on the Member. |

#### Overrides

[Operator](SceneTree_Operators_Operator.Operator).[constructor](SceneTree_Operators_Operator.Operator#constructor)

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:69](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L69)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__id](SceneTree_Operators_Operator.Operator#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_inputs

• **\_\_inputs**: `Map`<`string`, [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>\>

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__inputs](SceneTree_Operators_Operator.Operator#__inputs)

#### Defined in

[src/SceneTree/Operators/Operator.ts:13](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L13)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__metaData](SceneTree_Operators_Operator.Operator#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L33)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__name](SceneTree_Operators_Operator.Operator#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L28)

___

### \_\_outputs

• **\_\_outputs**: `Map`<`string`, [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>\>

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__outputs](SceneTree_Operators_Operator.Operator#__outputs)

#### Defined in

[src/SceneTree/Operators/Operator.ts:14](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L14)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__ownerItem](SceneTree_Operators_Operator.Operator#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L29)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__path](SceneTree_Operators_Operator.Operator#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L30)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__selectable](SceneTree_Operators_Operator.Operator#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L31)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[__selected](SceneTree_Operators_Operator.Operator#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L32)

___

### \_enabled

• **\_enabled**: `boolean`

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L60)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[deprecatedParamMapping](SceneTree_Operators_Operator.Operator#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### groupTransformXfo

• **groupTransformXfo**: [`XfoOperatorInput`](SceneTree_Operators_OperatorInput.XfoOperatorInput)

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:61](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L61)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[listeners](SceneTree_Operators_Operator.Operator#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### memberGlobalXfo

• **memberGlobalXfo**: [`XfoOperatorOutput`](SceneTree_Operators_OperatorOutput.XfoOperatorOutput)

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L62)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[paramEventListenerIDs](SceneTree_Operators_Operator.Operator#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[paramMapping](SceneTree_Operators_Operator.Operator#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[params](SceneTree_Operators_Operator.Operator#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

Operator.name

#### Defined in

[src/SceneTree/BaseItem.ts:68](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L68)

• `set` **name**(`value`): `void`

Sets the name of the base item(Updates path).

**`emits`** `nameChanged` with `newName` and `oldName` data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |

#### Returns

`void`

- Returns the base item name.

#### Inherited from

Operator.name

#### Defined in

[src/SceneTree/BaseItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L78)

___

### path

• `get` **path**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

Operator.path

#### Defined in

[src/SceneTree/BaseItem.ts:87](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L87)

## Methods

### addInput

▸ **addInput**(`input`): [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>

The addInput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\> | The name of the input, or the input object |

#### Returns

[`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[addInput](SceneTree_Operators_Operator.Operator#addinput)

#### Defined in

[src/SceneTree/Operators/Operator.ts:53](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L53)

___

### addOutput

▸ **addOutput**(`output`): [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>

The addOutput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `output` | [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\> | The name of the output, or the output object |

#### Returns

[`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[addOutput](SceneTree_Operators_Operator.Operator#addoutput)

#### Defined in

[src/SceneTree/Operators/Operator.ts:103](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L103)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[addParameter](SceneTree_Operators_Operator.Operator#addparameter)

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

[Operator](SceneTree_Operators_Operator.Operator).[addParameterDeprecationMapping](SceneTree_Operators_Operator.Operator#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### backPropagateValue

▸ **backPropagateValue**(`value`): [`Xfo`](../../Math/Math_Xfo.Xfo)

When the value on a Parameter is modified by a user by calling 'setValue,
then if any operators are bound, the value of the Parameter cannot be modified
directly as it is the result of a computation. Instead, the Parameter calls
'backPropagateValue' on the Operator to cause the Operator to handle propagating
the value to one or more of its inputs.
to its inputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Xfo`](../../Math/Math_Xfo.Xfo) | The value param. |

#### Returns

[`Xfo`](../../Math/Math_Xfo.Xfo)

- The modified value.

#### Overrides

[Operator](SceneTree_Operators_Operator.Operator).[backPropagateValue](SceneTree_Operators_Operator.Operator#backpropagatevalue)

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:117](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L117)

___

### clone

▸ **clone**(`context?`): [`BaseItem`](../SceneTree_BaseItem.BaseItem)

Clones this base item and returns a new base item.

**Note:** Each class should implement clone to be clonable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

[`BaseItem`](../SceneTree_BaseItem.BaseItem)

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[clone](SceneTree_Operators_Operator.Operator#clone)

#### Defined in

[src/SceneTree/BaseItem.ts:339](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L339)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

When a BaseItem is cloned, initially the constructor is
called to generate a new instance. This instance then copies
its values from the source using this method.
This method copies any relevant data from the source object to
ensure that it represents a valid clone.
Derived classes override this method to copy any relevant
data from the source object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) | The BaseItem to copy from. |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[copyFrom](SceneTree_Operators_Operator.Operator#copyfrom)

#### Defined in

[src/SceneTree/BaseItem.ts:355](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L355)

___

### deleteMetadata

▸ **deleteMetadata**(`key`): `void`

Removes metadata for a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[deleteMetadata](SceneTree_Operators_Operator.Operator#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:283](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L283)

___

### detach

▸ **detach**(): `void`

The detach method.

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[detach](SceneTree_Operators_Operator.Operator#detach)

#### Defined in

[src/SceneTree/Operators/Operator.ts:243](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L243)

___

### disable

▸ **disable**(): `void`

used to temporarily disable/enable the operator when the Group bind Xfo is being calculated

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:81](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L81)

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

[Operator](SceneTree_Operators_Operator.Operator).[emit](SceneTree_Operators_Operator.Operator#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### enable

▸ **enable**(): `void`

used to temporarily disable/enable the operator when the Group bind Xfo is being calculated

#### Returns

`void`

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:89](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L89)

___

### evaluate

▸ **evaluate**(): `void`

The evaluate method.

#### Returns

`void`

#### Overrides

[Operator](SceneTree_Operators_Operator.Operator).[evaluate](SceneTree_Operators_Operator.Operator#evaluate)

#### Defined in

[src/SceneTree/Operators/GroupMemberXfoOperator.ts:97](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/GroupMemberXfoOperator.ts#L97)

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

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[fromJSON](SceneTree_Operators_Operator.Operator#fromjson)

#### Defined in

[src/SceneTree/Operators/Operator.ts:208](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L208)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getClassName](SceneTree_Operators_Operator.Operator#getclassname)

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

[Operator](SceneTree_Operators_Operator.Operator).[getId](SceneTree_Operators_Operator.Operator#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getInput

▸ **getInput**(`name`): [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>

The getInput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getInput](SceneTree_Operators_Operator.Operator#getinput)

#### Defined in

[src/SceneTree/Operators/Operator.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L92)

___

### getInputByIndex

▸ **getInputByIndex**(`index`): `Record`<`string`, `any`\>

The getInputByIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`Record`<`string`, `any`\>

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getInputByIndex](SceneTree_Operators_Operator.Operator#getinputbyindex)

#### Defined in

[src/SceneTree/Operators/Operator.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L83)

___

### getMetadata

▸ **getMetadata**(`key`): `Record`<`string`, `any`\>

Gets Item's meta-data value by passing the `key` string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value under which to check for metadata. |

#### Returns

`Record`<`string`, `any`\>

- Returns the metadata associated with the given key.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getMetadata](SceneTree_Operators_Operator.Operator#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L254)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getName](SceneTree_Operators_Operator.Operator#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:96](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L96)

___

### getNumInputs

▸ **getNumInputs**(): `number`

Getter for the number of inputs in this operator.

#### Returns

`number`

- Returns the number of inputs.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getNumInputs](SceneTree_Operators_Operator.Operator#getnuminputs)

#### Defined in

[src/SceneTree/Operators/Operator.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L74)

___

### getNumOutputs

▸ **getNumOutputs**(): `number`

Getter for the number of outputs in this operator.

#### Returns

`number`

- Returns the number of outputs.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getNumOutputs](SceneTree_Operators_Operator.Operator#getnumoutputs)

#### Defined in

[src/SceneTree/Operators/Operator.ts:128](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L128)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getNumParameters](SceneTree_Operators_Operator.Operator#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getOutput

▸ **getOutput**(`name`): [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>

The getOutput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getOutput](SceneTree_Operators_Operator.Operator#getoutput)

#### Defined in

[src/SceneTree/Operators/Operator.ts:146](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L146)

___

### getOutputByIndex

▸ **getOutputByIndex**(`index`): [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>

The getOutputByIndex method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getOutputByIndex](SceneTree_Operators_Operator.Operator#getoutputbyindex)

#### Defined in

[src/SceneTree/Operators/Operator.ts:137](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L137)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getOwner](SceneTree_Operators_Operator.Operator#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:177](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L177)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getParameter](SceneTree_Operators_Operator.Operator#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L102)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getParameterByIndex](SceneTree_Operators_Operator.Operator#getparameterbyindex)

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

[Operator](SceneTree_Operators_Operator.Operator).[getParameterIndex](SceneTree_Operators_Operator.Operator#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getParameters](SceneTree_Operators_Operator.Operator#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getPath](SceneTree_Operators_Operator.Operator#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L134)

___

### hasMetadata

▸ **hasMetadata**(`key`): `boolean`

Checks to see if there is metadata for a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value under which to check for metadata. |

#### Returns

`boolean`

- Returns `true` if metadata exists under the given key, otherwise returns `false`.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[hasMetadata](SceneTree_Operators_Operator.Operator#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:264](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L264)

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

[Operator](SceneTree_Operators_Operator.Operator).[hasParameter](SceneTree_Operators_Operator.Operator#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[insertParameter](SceneTree_Operators_Operator.Operator#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[isSelectable](SceneTree_Operators_Operator.Operator#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:205](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L205)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[isSelected](SceneTree_Operators_Operator.Operator#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:229](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L229)

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

[Operator](SceneTree_Operators_Operator.Operator).[off](SceneTree_Operators_Operator.Operator#off)

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

[Operator](SceneTree_Operators_Operator.Operator).[on](SceneTree_Operators_Operator.Operator#on)

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

[Operator](SceneTree_Operators_Operator.Operator).[once](SceneTree_Operators_Operator.Operator#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### parameterValueChanged

▸ `Private` **parameterValueChanged**(`event`): `void`

This method can be overridden in derived classes
to perform general updates (see GLPass or BaseItem).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Record`<`string`, `unknown`\> |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[parameterValueChanged](SceneTree_Operators_Operator.Operator#parametervaluechanged)

#### Defined in

[src/SceneTree/Operators/Operator.ts:43](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L43)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[readBinary](SceneTree_Operators_Operator.Operator#readbinary)

#### Defined in

[src/SceneTree/BaseItem.ts:320](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L320)

___

### reattach

▸ **reattach**(): `void`

The reattach method.

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[reattach](SceneTree_Operators_Operator.Operator#reattach)

#### Defined in

[src/SceneTree/Operators/Operator.ts:251](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L251)

___

### rebind

▸ **rebind**(): `void`

The rebind method.

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[rebind](SceneTree_Operators_Operator.Operator#rebind)

#### Defined in

[src/SceneTree/Operators/Operator.ts:259](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L259)

___

### removeInput

▸ **removeInput**(`input`): `void`

The removeInput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | [`OperatorInput`](SceneTree_Operators_OperatorInput.OperatorInput)<`any`\> | The name of the input, or the input object |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[removeInput](SceneTree_Operators_Operator.Operator#removeinput)

#### Defined in

[src/SceneTree/Operators/Operator.ts:64](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L64)

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

[Operator](SceneTree_Operators_Operator.Operator).[removeListenerById](SceneTree_Operators_Operator.Operator#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### removeOutput

▸ **removeOutput**(`output`): `void`

The removeOutput method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `output` | `string` \| [`OperatorOutput`](SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\> | The name of the output, or the output object |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[removeOutput](SceneTree_Operators_Operator.Operator#removeoutput)

#### Defined in

[src/SceneTree/Operators/Operator.ts:115](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L115)

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

[Operator](SceneTree_Operators_Operator.Operator).[removeParameter](SceneTree_Operators_Operator.Operator#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L176)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[replaceParameter](SceneTree_Operators_Operator.Operator#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](../SceneTree_BaseItem.BaseItem)

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](../SceneTree_BaseItem.BaseItem)

- The return value.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[resolvePath](SceneTree_Operators_Operator.Operator#resolvepath)

#### Defined in

[src/SceneTree/BaseItem.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L149)

___

### setDirty

▸ `Private` **setDirty**(): `void`

This method sets the state of the operator to dirty which propagates
to the outputs of this operator, and which may then propagate to other
operators. When the scene is cleaned, which usually is caused by rendering
then the chain of operators are cleaned by triggering evaluation.

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[setDirty](SceneTree_Operators_Operator.Operator#setdirty)

#### Defined in

[src/SceneTree/Operators/Operator.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L32)

___

### setMetadata

▸ **setMetadata**(`key`, `metaData`): `void`

Assigns metadata to a given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value under which the metadata is is going to be saved. |
| `metaData` | `any` | The metaData value. |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[setMetadata](SceneTree_Operators_Operator.Operator#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:274](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L274)

___

### setName

▸ **setName**(`name`): `void`

Sets the name of the base item(Updates path).

**`emits`** `nameChanged` with `newName` and `oldName` data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The base item name. |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[setName](SceneTree_Operators_Operator.Operator#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:106](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L106)

___

### setOwner

▸ **setOwner**(`ownerItem`): `void`

The setOwner method assigns a new owner to the item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ownerItem` | [`BaseItem`](../SceneTree_BaseItem.BaseItem) \| [`Owner`](../SceneTree_Owner.Owner) | The new owner item. |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[setOwner](SceneTree_Operators_Operator.Operator#setowner)

#### Defined in

[src/SceneTree/BaseItem.ts:187](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L187)

___

### setSelectable

▸ **setSelectable**(`val`): `boolean`

Modifies the selectability of this item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `boolean` | A boolean indicating the selectability of the item. |

#### Returns

`boolean`

- Returns true if value changed.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[setSelectable](SceneTree_Operators_Operator.Operator#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:215](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L215)

___

### setSelected

▸ **setSelected**(`sel`): `void`

Changes the current state of the selection of this item.

**`emits`** `selectedChanged` with selected state

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sel` | `boolean` | Boolean indicating the new selection state. |

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[setSelected](SceneTree_Operators_Operator.Operator#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:239](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L239)

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

- Returns the json object.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[toJSON](SceneTree_Operators_Operator.Operator#tojson)

#### Defined in

[src/SceneTree/Operators/Operator.ts:186](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Operators/Operator.ts#L186)

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

[Operator](SceneTree_Operators_Operator.Operator).[toString](SceneTree_Operators_Operator.Operator#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L303)

___

### updatePath

▸ `Private` **updatePath**(): `void`

When the name or the hierarchy changes, this method
recomputes and caches the path of this item.

#### Returns

`void`

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[updatePath](SceneTree_Operators_Operator.Operator#updatepath)

#### Defined in

[src/SceneTree/BaseItem.ts:121](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L121)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[Operator](SceneTree_Operators_Operator.Operator).[getNumBaseItems](SceneTree_Operators_Operator.Operator#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L56)

