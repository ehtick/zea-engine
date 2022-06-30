---
id: "SceneTree_Parameters_MaterialColorParam.MaterialColorParam"
title: "Class: MaterialColorParam"
sidebar_label: "MaterialColorParam"
custom_edit_url: null
---



Represents a specific type of parameter, that stores `Color` and `BaseImage` texture values.

i.e.:
```javascript
const image = new LDRImage();
image.load("https://storage.googleapis.com/zea-playground-assets/zea-engine/texture.png")

const matColorParam = new MaterialColorParam('MyMaterialColor', new Color(0, 254, 2))
matColorParam.setImage(image)
//'myParameterOwnerItem' is an instance of a 'ParameterOwner' class.
// Remember that only 'ParameterOwner' and classes that extend from it can host 'Parameter' objects.
myParameterOwnerItem.addParameter(matColorParam)
```

**Events**
* **valueChanged:** Triggered every time the Image value changes
* **textureDisconnected:** Triggered when Image value is cleaned/removed.
* **textureConnected:** Triggered when the Image value is set.

## Hierarchy

- [`ColorParameter`](SceneTree_Parameters_ColorParameter.ColorParameter)

  ↳ **`MaterialColorParam`**

## Constructors

### constructor

• **new MaterialColorParam**(`name?`, `value?`)

Create a material color parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name of the material color parameter. |
| `value?` | [`Color`](../../Math/Math_Color.Color) | The value of the parameter. |

#### Overrides

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[constructor](SceneTree_Parameters_ColorParameter.ColorParameter#constructor)

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L71)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[__id](SceneTree_Parameters_ColorParameter.ColorParameter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_value

• `Protected` **\_\_value**: [`Color`](../../Math/Math_Color.Color)

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[__value](SceneTree_Parameters_ColorParameter.ColorParameter#__value)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L26)

___

### boundInputs

• `Protected` **boundInputs**: [`OperatorInput`](../Operators/SceneTree_Operators_OperatorInput.OperatorInput)<`any`\>[] = `[]`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[boundInputs](SceneTree_Parameters_ColorParameter.ColorParameter#boundinputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L20)

___

### boundOutputs

• `Protected` **boundOutputs**: [`OperatorOutput`](../Operators/SceneTree_Operators_OperatorOutput.OperatorOutput)<`any`\>[] = `[]`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[boundOutputs](SceneTree_Parameters_ColorParameter.ColorParameter#boundoutputs)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L21)

___

### cleaning

• `Protected` **cleaning**: `boolean` = `false`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[cleaning](SceneTree_Parameters_ColorParameter.ColorParameter#cleaning)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L22)

___

### colorSpace

• `Optional` **colorSpace**: [`ColorSpace`](SceneTree_Parameters_MaterialColorParam.ColorSpace) = `ColorSpace.Gamma`

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:65](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L65)

___

### dataType

• `Protected` **dataType**: `string`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[dataType](SceneTree_Parameters_ColorParameter.ColorParameter#datatype)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L27)

___

### dirty

• `Protected` **dirty**: `boolean` = `false`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[dirty](SceneTree_Parameters_ColorParameter.ColorParameter#dirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L19)

___

### dirtyOpIndex

• `Protected` **dirtyOpIndex**: `number` = `0`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[dirtyOpIndex](SceneTree_Parameters_ColorParameter.ColorParameter#dirtyopindex)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L23)

___

### firstOP\_WRITE

• `Protected` **firstOP\_WRITE**: `number` = `0`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[firstOP_WRITE](SceneTree_Parameters_ColorParameter.ColorParameter#firstop_write)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L24)

___

### image

• `Protected` `Optional` **image**: [`BaseImage`](../SceneTree_BaseImage.BaseImage)

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:61](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L61)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L60)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[listeners](SceneTree_Parameters_ColorParameter.ColorParameter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### ownerItem

• `Protected` `Optional` **ownerItem**: [`ParameterOwner`](../SceneTree_ParameterOwner.ParameterOwner)

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[ownerItem](SceneTree_Parameters_ColorParameter.ColorParameter#owneritem)

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

ColorParameter.name

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

ColorParameter.name

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

ColorParameter.path

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:83](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L83)

___

### value

• `get` **value**(): `T`

#### Returns

`T`

#### Inherited from

ColorParameter.value

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

ColorParameter.value

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[_clean](SceneTree_Parameters_ColorParameter.ColorParameter#_clean)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[bindOperatorInput](SceneTree_Parameters_ColorParameter.ColorParameter#bindoperatorinput)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[bindOperatorOutput](SceneTree_Parameters_ColorParameter.ColorParameter#bindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:190](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L190)

___

### clone

▸ **clone**(): [`MaterialColorParam`](SceneTree_Parameters_MaterialColorParam.MaterialColorParam)

The clone method constructs a new material color parameter,
copies its values from this parameter and returns it.

#### Returns

[`MaterialColorParam`](SceneTree_Parameters_MaterialColorParam.MaterialColorParam)

- Returns a new cloned material color parameter.

#### Overrides

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[clone](SceneTree_Parameters_ColorParameter.ColorParameter#clone)

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:161](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L161)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `src` | [`Parameter`](SceneTree_Parameters_Parameter.Parameter)<[`Color`](../../Math/Math_Color.Color)\> |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) |

#### Returns

`void`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[copyFrom](SceneTree_Parameters_ColorParameter.ColorParameter#copyfrom)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:460](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L460)

___

### destroy

▸ **destroy**(): `void`

The readBinary method.

#### Returns

`void`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[destroy](SceneTree_Parameters_ColorParameter.ColorParameter#destroy)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[emit](SceneTree_Parameters_ColorParameter.ColorParameter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `j` | `Record`<`string`, `any`\> |
| `context?` | `Record`<`string`, `unknown`\> |

#### Returns

`void`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[fromJSON](SceneTree_Parameters_ColorParameter.ColorParameter#fromjson)

#### Defined in

[src/SceneTree/Parameters/ColorParameter.ts:53](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ColorParameter.ts#L53)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getClassName](SceneTree_Parameters_ColorParameter.ColorParameter#getclassname)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getDataType](SceneTree_Parameters_ColorParameter.ColorParameter#getdatatype)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getDirtyBindingIndex](SceneTree_Parameters_ColorParameter.ColorParameter#getdirtybindingindex)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getId](SceneTree_Parameters_ColorParameter.ColorParameter#getid)

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

[src/SceneTree/Parameters/MaterialColorParam.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L80)

___

### getName

▸ **getName**(): `string`

Returns specified name of the parameter.

#### Returns

`string`

- Returns the name.

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getName](SceneTree_Parameters_ColorParameter.ColorParameter#getname)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getOwner](SceneTree_Parameters_ColorParameter.ColorParameter#getowner)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getPath](SceneTree_Parameters_ColorParameter.ColorParameter#getpath)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L136)

___

### getValue

▸ **getValue**(): [`Color`](../../Math/Math_Color.Color)

Returns parameter's value.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The return value.

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getValue](SceneTree_Parameters_ColorParameter.ColorParameter#getvalue)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:394](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L394)

___

### getValueFromOp

▸ **getValueFromOp**(`index`): [`Color`](../../Math/Math_Color.Color)

During operator evaluation, operators can use this method to retrieve the existing
value of one of their outputs.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index of the bound OperatorOutput to evaluate up to. |

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The return value.

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[getValueFromOp](SceneTree_Parameters_ColorParameter.ColorParameter#getvaluefromop)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:348](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L348)

___

### imageUpdated

▸ `Private` **imageUpdated**(): `void`

The imageUpdated method.

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:88](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L88)

___

### isDirty

▸ **isDirty**(): `boolean`

Returns true if this parameter is currently dirty and will evaluate its bound
operators if its value is requested by a call to getValue.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[isDirty](SceneTree_Parameters_ColorParameter.ColorParameter#isdirty)

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
| `value` | [`Color`](../../Math/Math_Color.Color) | The context value. |

#### Returns

`void`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[loadValue](SceneTree_Parameters_ColorParameter.ColorParameter#loadvalue)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[off](SceneTree_Parameters_ColorParameter.ColorParameter#off)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[on](SceneTree_Parameters_ColorParameter.ColorParameter#on)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[once](SceneTree_Parameters_ColorParameter.ColorParameter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Extracts `Color` and `Image` values from a buffer, updating current parameter state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader value. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Overrides

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[readBinary](SceneTree_Parameters_ColorParameter.ColorParameter#readbinary)

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:144](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L144)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[removeListenerById](SceneTree_Parameters_ColorParameter.ColorParameter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setCleanFromOp

▸ **setCleanFromOp**(`value`, `index`): `void`

The setCleanFromOp method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Color`](../../Math/Math_Color.Color) | The computed value to be stored in the Parameter. |
| `index` | `number` | The index of the bound OperatorOutput. |

#### Returns

`void`

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[setCleanFromOp](SceneTree_Parameters_ColorParameter.ColorParameter#setcleanfromop)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[setDirty](SceneTree_Parameters_ColorParameter.ColorParameter#setdirty)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:248](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L248)

___

### setImage

▸ **setImage**(`value`): `void`

Sets `BaseImage` texture value in parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`BaseImage`](../SceneTree_BaseImage.BaseImage) | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:97](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L97)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[setName](SceneTree_Parameters_ColorParameter.ColorParameter#setname)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[setOwner](SceneTree_Parameters_ColorParameter.ColorParameter#setowner)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:126](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L126)

___

### setValue

▸ **setValue**(`value`): `void`

Sets `Color` or the `BaseImage` texture value in parameter.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | [`Color`](../../Math/Math_Color.Color) \| [`BaseImage`](../SceneTree_BaseImage.BaseImage) | The value param. |

#### Returns

`void`

#### Overrides

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[setValue](SceneTree_Parameters_ColorParameter.ColorParameter#setvalue)

#### Defined in

[src/SceneTree/Parameters/MaterialColorParam.ts:129](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/MaterialColorParam.ts#L129)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> |

#### Returns

`Record`<`string`, `any`\>

#### Inherited from

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[toJSON](SceneTree_Parameters_ColorParameter.ColorParameter#tojson)

#### Defined in

[src/SceneTree/Parameters/ColorParameter.ts:47](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/ColorParameter.ts#L47)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[unbindOperatorInput](SceneTree_Parameters_ColorParameter.ColorParameter#unbindoperatorinput)

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

[ColorParameter](SceneTree_Parameters_ColorParameter.ColorParameter).[unbindOperatorOutput](SceneTree_Parameters_ColorParameter.ColorParameter#unbindoperatoroutput)

#### Defined in

[src/SceneTree/Parameters/Parameter.ts:214](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Parameters/Parameter.ts#L214)

