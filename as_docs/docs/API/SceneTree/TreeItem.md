---
id: "SceneTree_TreeItem.TreeItem"
title: "Class: TreeItem"
sidebar_label: "TreeItem"
custom_edit_url: null
---



Class representing an Item in the scene tree with hierarchy capabilities (has children).
It has the capability to add and remove children.
**Parameters**
* **Visible(`BooleanParameter`):** Shows/Hides the item.
* **LocalXfo(`XfoParameter`):** Specifies the offset of this tree item from its parent.
* **GlobalXfo(`XfoParameter`):** Provides the computed world Xfo of this tree item.
* **BoundingBox(`BoundingBox`):** Provides the bounding box for the tree item and all of its children in the 3d scene.

**Events**
* **globalXfoChanged:** Emitted when the value of GlobalXfo parameter changes.
* **visibilityChanged:** Emitted when the visibility on the tree item changes.
* **highlightChanged:** Emitted when the highlight on the tree item changes.
* **childAdded:** Emitted when a item is added as a child.
* **childRemoved:** Emitted when an item is removed from the child nodes.
* **pointerDown:** Emitted when a pointerDown event happens in an item.
* **pointerUp:** Emitted when a pointerUp event happens in an item.
* **pointerMove:** Emitted when a pointerMove event happens in an item.
* **pointerEnter:** Emitted when a pointerEnter event happens in an item.

## Hierarchy

- [`BaseItem`](SceneTree_BaseItem.BaseItem)

  ↳ **`TreeItem`**

  ↳↳ [`AssetItem`](SceneTree_AssetItem.AssetItem)

  ↳↳ [`AudioItem`](SceneTree_AudioItem.AudioItem)

  ↳↳ [`BaseGeomItem`](SceneTree_BaseGeomItem.BaseGeomItem)

  ↳↳ [`BillboardItem`](SceneTree_BillboardItem.BillboardItem)

  ↳↳ [`Camera`](SceneTree_Camera.Camera)

  ↳↳ [`GridTreeItem`](SceneTree_GridTreeItem.GridTreeItem)

  ↳↳ [`BaseGroup`](Groups/SceneTree_Groups_BaseGroup.BaseGroup)

  ↳↳ [`InstanceItem`](SceneTree_InstanceItem.InstanceItem)

## Constructors

### constructor

• **new TreeItem**(`name?`)

Creates a tree item with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name of the tree item. It's the identifier of the tree item. It's an identifier intended to be human readable. It's included in the path that we use to access a particular item. It's used to display it in the tree. |

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[constructor](SceneTree_BaseItem.BaseItem#constructor)

#### Defined in

[SceneTree/TreeItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L86)

## Properties

### \_\_childItems

• `Protected` **\_\_childItems**: [`BaseItem`](SceneTree_BaseItem.BaseItem)[] = `[]`

#### Defined in

[SceneTree/TreeItem.ts:43](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L43)

___

### \_\_childItemsEventHandlers

• `Protected` **\_\_childItemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Defined in

[SceneTree/TreeItem.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L44)

___

### \_\_childItemsMapping

• `Protected` **\_\_childItemsMapping**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[SceneTree/TreeItem.ts:45](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L45)

___

### \_\_highlightMapping

• `Protected` **\_\_highlightMapping**: `Record`<`string`, [`Color`](../Math/Math_Color.Color)\> = `{}`

#### Defined in

[SceneTree/TreeItem.ts:70](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L70)

___

### \_\_highlights

• `Protected` **\_\_highlights**: `string`[] = `[]`

#### Defined in

[SceneTree/TreeItem.ts:71](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L71)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__id](SceneTree_BaseItem.BaseItem#__id)

#### Defined in

[Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__metaData](SceneTree_BaseItem.BaseItem#__metadata)

#### Defined in

[SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L39)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__name](SceneTree_BaseItem.BaseItem#__name)

#### Defined in

[SceneTree/BaseItem.ts:34](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L34)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](SceneTree_Owner.Owner)

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__ownerItem](SceneTree_BaseItem.BaseItem#__owneritem)

#### Defined in

[SceneTree/BaseItem.ts:35](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L35)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__path](SceneTree_BaseItem.BaseItem#__path)

#### Defined in

[SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L36)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__selectable](SceneTree_BaseItem.BaseItem#__selectable)

#### Defined in

[SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L37)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[__selected](SceneTree_BaseItem.BaseItem#__selected)

#### Defined in

[SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L38)

___

### \_\_visible

• `Protected` **\_\_visible**: `boolean` = `true`

#### Defined in

[SceneTree/TreeItem.ts:73](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L73)

___

### \_\_visibleCounter

• `Protected` **\_\_visibleCounter**: `number` = `1`

#### Defined in

[SceneTree/TreeItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L74)

___

### boundingBoxParam

• **boundingBoxParam**: [`BoundingBoxParameter`](Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

**`member`** boundingBoxParam - Stores the bounding box for this tree item

#### Defined in

[SceneTree/TreeItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L62)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[deprecatedParamMapping](SceneTree_BaseItem.BaseItem#deprecatedparammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L23)

___

### disableBoundingBox

• **disableBoundingBox**: `boolean` = `false`

#### Defined in

[SceneTree/TreeItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L41)

___

### globalXfoOp

• `Protected` **globalXfoOp**: [`Operator`](Operators/SceneTree_Operators_Operator.Operator)

#### Defined in

[SceneTree/TreeItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L76)

___

### globalXfoParam

• **globalXfoParam**: [`XfoParameter`](Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** globalXfoParam - Stores the global Xfo for this tree item.
global xfos are calculated from the localXfo and parentXfo.

#### Defined in

[SceneTree/TreeItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L51)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[listeners](SceneTree_BaseItem.BaseItem#listeners)

#### Defined in

[Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L26)

___

### localXfoParam

• **localXfoParam**: [`XfoParameter`](Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** localXfoParam - Stores the local Xfo for this tree item.
local Xfos are the offset from the parent's coordinate frame.

#### Defined in

[SceneTree/TreeItem.ts:57](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L57)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[paramEventListenerIDs](SceneTree_BaseItem.BaseItem#parameventlistenerids)

#### Defined in

[SceneTree/ParameterOwner.ts:20](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L20)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[paramMapping](SceneTree_BaseItem.BaseItem#parammapping)

#### Defined in

[SceneTree/ParameterOwner.ts:21](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L21)

___

### params

• **params**: [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[params](SceneTree_BaseItem.BaseItem#params)

#### Defined in

[SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L22)

___

### visibleParam

• **visibleParam**: [`BooleanParameter`](Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** visibleParam - Whether this tree item is visible or not.
Any given tree item is also is affected by parent's visibility.

#### Defined in

[SceneTree/TreeItem.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L68)

## Methods

### \_cleanBoundingBox

▸ `Private` **_cleanBoundingBox**(`bbox`): [`Box3`](../Math/Math_Box3.Box3)

The _cleanBoundingBox method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bbox` | [`Box3`](../Math/Math_Box3.Box3) | The bounding box value. |

#### Returns

[`Box3`](../Math/Math_Box3.Box3)

- The return value.

#### Defined in

[SceneTree/TreeItem.ts:333](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L333)

___

### addChild

▸ **addChild**(`childItem`, `maintainXfo?`, `fixCollisions?`): [`BaseItem`](SceneTree_BaseItem.BaseItem)

Adds a child. It accepts all kind of `BaseItem`, not only `TreeItem`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`BaseItem`](SceneTree_BaseItem.BaseItem) | `undefined` | The child BaseItem to add. |
| `maintainXfo` | `boolean` | `true` | Boolean that determines if the Global Xfo value is maintained. If true, when moving items in the hierarchy from one parent to another, the local Xfo of the item will be modified to maintain and the Global Xfo. Note: this option defaults to false because we expect that is the behavior users would expect when manipulating the tree in code. To be safe and unambiguous, always try to specify this value. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions with other children of the same parent. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem)

childItem - The child BaseItem that was added.

#### Defined in

[SceneTree/TreeItem.ts:532](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L532)

___

### addHighlight

▸ **addHighlight**(`name`, `color`, `propagateToChildren?`): `void`

Adds a highlight to the tree item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the tree item. |
| `color` | [`Color`](../Math/Math_Color.Color) | `undefined` | The color of the highlight. |
| `propagateToChildren` | `boolean` | `false` | A boolean indicating whether to propagate to children. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:237](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L237)

___

### addParameter

▸ **addParameter**(`param`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to add. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[addParameter](SceneTree_BaseItem.BaseItem#addparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:133](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L133)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[addParameterDeprecationMapping](SceneTree_BaseItem.BaseItem#addparameterdeprecationmapping)

#### Defined in

[SceneTree/ParameterOwner.ts:90](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L90)

___

### childBBoxChanged

▸ `Private` **childBBoxChanged**(): `void`

The _childBBoxChanged method.

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:351](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L351)

___

### childNameChanged

▸ `Private` **childNameChanged**(`event`): `void`

When a child's name changed, we update our acceleration structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `Record`<`string`, `any`\> | The start value. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:456](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L456)

___

### clone

▸ **clone**(`context?`): [`TreeItem`](SceneTree_TreeItem.TreeItem)

The clone method constructs a new tree item, copies its values
from this item and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `unknown`\> | The context value. |

#### Returns

[`TreeItem`](SceneTree_TreeItem.TreeItem)

- Returns a new cloned tree item.

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[clone](SceneTree_BaseItem.BaseItem#clone)

#### Defined in

[SceneTree/TreeItem.ts:1028](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L1028)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies current TreeItem with all its children.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`TreeItem`](SceneTree_TreeItem.TreeItem) | The tree item to copy from. |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[copyFrom](SceneTree_BaseItem.BaseItem#copyfrom)

#### Defined in

[SceneTree/TreeItem.ts:1040](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L1040)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[deleteMetadata](SceneTree_BaseItem.BaseItem#deletemetadata)

#### Defined in

[SceneTree/BaseItem.ts:261](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L261)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[emit](SceneTree_BaseItem.BaseItem#emit)

#### Defined in

[Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`, `onDone?`): `void`

The fromJSON method takes a JSON and deserializes into an instance of this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context?` | `Record`<`string`, `any`\> | The context value. |
| `onDone?` | `any` | - |

#### Returns

`void`

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[fromJSON](SceneTree_BaseItem.BaseItem#fromjson)

#### Defined in

[SceneTree/TreeItem.ts:872](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L872)

___

### generateUniqueName

▸ **generateUniqueName**(`name`): `string`

Verifies if there's a child with the specified name.
If there's one, modifiers are applied to the name and returned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

`string`

- Returns a unique name.

#### Defined in

[SceneTree/TreeItem.ts:404](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L404)

___

### getChild

▸ **getChild**(`index`): [`BaseItem`](SceneTree_BaseItem.BaseItem)

Returns child element in the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to remove the child TreeItem. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem)

- Return the child TreeItem.

#### Defined in

[SceneTree/TreeItem.ts:544](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L544)

___

### getChildByName

▸ **getChildByName**(`name`): [`BaseItem`](SceneTree_BaseItem.BaseItem)

Returns child element with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem)

- Return the child BaseItem.

#### Defined in

[SceneTree/TreeItem.ts:554](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L554)

___

### getChildIndex

▸ **getChildIndex**(`childItem`): `number`

Returns index position of the specified item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`BaseItem`](SceneTree_BaseItem.BaseItem) | The child TreeItem value. |

#### Returns

`number`

- Child index in children array.

#### Defined in

[SceneTree/TreeItem.ts:659](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L659)

___

### getChildNames

▸ **getChildNames**(): `string`[]

Returns children names as an array of strings.

#### Returns

`string`[]

- An array of names for each child.

#### Defined in

[SceneTree/TreeItem.ts:567](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L567)

___

### getChildren

▸ **getChildren**(): [`BaseItem`](SceneTree_BaseItem.BaseItem)[]

Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
Meaning that it could be another kind of item than `TreeItem`.

i.e. **BaseImage**

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem)[]

- List of `BaseItem` owned by current TreeItem.

#### Defined in

[SceneTree/TreeItem.ts:384](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L384)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getClassName](SceneTree_BaseItem.BaseItem#getclassname)

#### Defined in

[Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L33)

___

### getHighlight

▸ **getHighlight**(): [`Color`](../Math/Math_Color.Color)

Returns the color of the current highlight.

#### Returns

[`Color`](../Math/Math_Color.Color)

- The color value.

#### Defined in

[SceneTree/TreeItem.ts:307](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L307)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[getId](SceneTree_BaseItem.BaseItem#getid)

#### Defined in

[Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/BaseClass.ts#L25)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[getMetadata](SceneTree_BaseItem.BaseItem#getmetadata)

#### Defined in

[SceneTree/BaseItem.ts:232](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L232)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getName](SceneTree_BaseItem.BaseItem#getname)

#### Defined in

[SceneTree/BaseItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L74)

___

### getNumChildren

▸ **getNumChildren**(): `number`

Returns the number of child elements current `TreeItem` has.

#### Returns

`number`

- The return value.

#### Defined in

[SceneTree/TreeItem.ts:393](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L393)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getNumParameters](SceneTree_BaseItem.BaseItem#getnumparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:39](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L39)

___

### getOwner

▸ **getOwner**(): [`Owner`](SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getOwner](SceneTree_BaseItem.BaseItem#getowner)

#### Defined in

[SceneTree/BaseItem.ts:154](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L154)

___

### getParameter

▸ **getParameter**(`paramName`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object using the given name

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `paramName` | `string` | The parameter name. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getParameter](SceneTree_BaseItem.BaseItem#getparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:100](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L100)

___

### getParameterByIndex

▸ **getParameterByIndex**(`index`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Returns `Parameter` object in a given index

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | Position of the parameter in the array |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- Parameter object value

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getParameterByIndex](SceneTree_BaseItem.BaseItem#getparameterbyindex)

#### Defined in

[SceneTree/ParameterOwner.ts:68](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L68)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[getParameterIndex](SceneTree_BaseItem.BaseItem#getparameterindex)

#### Defined in

[SceneTree/ParameterOwner.ts:58](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L58)

___

### getParameters

▸ **getParameters**(): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getParameters](SceneTree_BaseItem.BaseItem#getparameters)

#### Defined in

[SceneTree/ParameterOwner.ts:48](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L48)

___

### getParentItem

▸ **getParentItem**(): [`TreeItem`](SceneTree_TreeItem.TreeItem)

Returns the parent of current TreeItem.

#### Returns

[`TreeItem`](SceneTree_TreeItem.TreeItem)

- Returns the parent item.

#### Defined in

[SceneTree/TreeItem.ts:157](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L157)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getPath](SceneTree_BaseItem.BaseItem#getpath)

#### Defined in

[SceneTree/BaseItem.ts:111](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L111)

___

### getSelectable

▸ **getSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getSelectable](SceneTree_BaseItem.BaseItem#getselectable)

#### Defined in

[SceneTree/BaseItem.ts:183](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L183)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[hasMetadata](SceneTree_BaseItem.BaseItem#hasmetadata)

#### Defined in

[SceneTree/BaseItem.ts:242](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L242)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[hasParameter](SceneTree_BaseItem.BaseItem#hasparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:78](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L78)

___

### insertChild

▸ **insertChild**(`childItem`, `index`, `maintainXfo?`, `fixCollisions?`): [`BaseItem`](SceneTree_BaseItem.BaseItem)

Inserts a child. It accepts all kind of `BaseItem`, not only `TreeItem`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`BaseItem`](SceneTree_BaseItem.BaseItem) | `undefined` | The child BaseItem to insert. |
| `index` | `number` | `undefined` | The index to add the child item. |
| `maintainXfo` | `boolean` | `false` | Boolean that determines if the Xfo value is maintained. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem)

- The index of the child item in this items children array.

#### Defined in

[SceneTree/TreeItem.ts:473](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L473)

___

### insertParameter

▸ **insertParameter**(`param`, `index`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Adds `Parameter` object to the owner's parameter list using the index.
It replaces the event in the specified index.

**`emits`** `parameterAdded` with the name of the param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to insert. |
| `index` | `number` | The index value. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- With `owner` and `valueChanged` event set.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[insertParameter](SceneTree_BaseItem.BaseItem#insertparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:147](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L147)

___

### isHighlighted

▸ **isHighlighted**(): `boolean`

Returns `true` if this items has a highlight color assigned.

#### Returns

`boolean`

- `True` if this item is highlighted.

#### Defined in

[SceneTree/TreeItem.ts:320](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L320)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[isSelected](SceneTree_BaseItem.BaseItem#isselected)

#### Defined in

[SceneTree/BaseItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L207)

___

### isVisible

▸ **isVisible**(): `boolean`

Returns visible parameter value for current TreeItem.

#### Returns

`boolean`

- The visible param value.

#### Defined in

[SceneTree/TreeItem.ts:178](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L178)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[off](SceneTree_BaseItem.BaseItem#off)

#### Defined in

[Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L97)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[on](SceneTree_BaseItem.BaseItem#on)

#### Defined in

[Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L44)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Causes an event to occur when a user presses a pointer(mouse, touch, pencil, etc.) over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The event value |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:758](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L758)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Causes an event to occur when the mouse pointer is moved onto an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The mouse event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:797](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L797)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Causes an event to occur when the mouse pointer is moved out of an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The mouse event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:810](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L810)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Causes an event to occur when the pointer is moving while over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The mouse event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:784](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L784)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Causes an event to occur when a user releases a mouse button over a element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The mouse event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:771](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L771)

___

### onWheel

▸ **onWheel**(`event`): `void`

Causes an event to occur when the mouse wheel is rolled up or down over an element.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `any` | The wheel event that occurs. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:823](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L823)

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
| `listener` | (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[once](SceneTree_BaseItem.BaseItem#once)

#### Defined in

[Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L82)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[parameterValueChanged](SceneTree_BaseItem.BaseItem#parametervaluechanged)

#### Defined in

[SceneTree/ParameterOwner.ts:122](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L122)

___

### propagateVisibility

▸ **propagateVisibility**(`val`): `void`

Updates current TreeItem visible state and propagates its value to children elements.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `number` | The val param. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:197](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L197)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Sets state of current Item(Including parameters & children) using a binary reader object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](SceneTree_BinReader.BinReader) | The reader value. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[readBinary](SceneTree_BaseItem.BaseItem#readbinary)

#### Defined in

[SceneTree/TreeItem.ts:962](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L962)

___

### removeAllChildren

▸ **removeAllChildren**(): `void`

Removes all children Items.

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:645](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L645)

___

### removeChild

▸ **removeChild**(`index`): `void`

Removes a child BaseItem by specifying its index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:606](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L606)

___

### removeChildByHandle

▸ **removeChildByHandle**(`childItem`): `void`

Removes the provided item from this TreeItem if it is one of its children.
An exception is thrown if the item is not a child of this tree item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`BaseItem`](SceneTree_BaseItem.BaseItem) | The child TreeItem to remove. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:635](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L635)

___

### removeChildByName

▸ **removeChildByName**(`name`): `void`

Removes a child BaseItem by specifying its name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name param. |

#### Returns

`void`

- Return the child TreeItem.

#### Defined in

[SceneTree/TreeItem.ts:622](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L622)

___

### removeHighlight

▸ **removeHighlight**(`name`, `propagateToChildren?`): `void`

Removes a highlight to the tree item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the tree item. |
| `propagateToChildren` | `boolean` | `false` | A boolean indicating whether to propagate to children. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:273](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L273)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[removeListenerById](SceneTree_BaseItem.BaseItem#removelistenerbyid)

#### Defined in

[Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/Utilities/EventEmitter.ts#L134)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[removeParameter](SceneTree_BaseItem.BaseItem#removeparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:174](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L174)

___

### replaceParameter

▸ **replaceParameter**(`param`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

Replaces old `Parameter` by passing a new one with the same name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `param` | [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> | The parameter to replace. |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- `Parameter` with `valueChanged` event set.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[replaceParameter](SceneTree_BaseItem.BaseItem#replaceparameter)

#### Defined in

[SceneTree/ParameterOwner.ts:196](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L196)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`, `displayError?`): [`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

The resolvePath method traverses the subtree from this item down
matching each name in the path with a child until it reaches the
end of the path.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `path` | `string` \| `string`[] | `undefined` | The path value. |
| `index` | `number` | `0` | The index value. |
| `displayError` | `boolean` | `false` | - |

#### Returns

[`BaseItem`](SceneTree_BaseItem.BaseItem) \| [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>

- The return value.

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[resolvePath](SceneTree_BaseItem.BaseItem#resolvepath)

#### Defined in

[SceneTree/TreeItem.ts:679](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L679)

___

### setBoundingBoxDirty

▸ `Private` **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:359](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L359)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[setMetadata](SceneTree_BaseItem.BaseItem#setmetadata)

#### Defined in

[SceneTree/BaseItem.ts:252](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L252)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[setName](SceneTree_BaseItem.BaseItem#setname)

#### Defined in

[SceneTree/BaseItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L84)

___

### setOwner

▸ **setOwner**(`parentItem`): `void`

Sets the owner (another TreeItem) of the current TreeItem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItem` | [`TreeItem`](SceneTree_TreeItem.TreeItem) | The parent item. |

#### Returns

`void`

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[setOwner](SceneTree_BaseItem.BaseItem#setowner)

#### Defined in

[SceneTree/TreeItem.ts:114](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L114)

___

### setParentItem

▸ **setParentItem**(`parentItem`): `void`

Sets the parent of current TreeItem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItem` | [`TreeItem`](SceneTree_TreeItem.TreeItem) | The parent item. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:166](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L166)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[setSelectable](SceneTree_BaseItem.BaseItem#setselectable)

#### Defined in

[SceneTree/BaseItem.ts:193](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L193)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[setSelected](SceneTree_BaseItem.BaseItem#setselected)

#### Defined in

[SceneTree/BaseItem.ts:217](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L217)

___

### setVisible

▸ **setVisible**(`visible`): `void`

Sets visible parameter value.

#### Parameters

| Name | Type |
| :------ | :------ |
| `visible` | `boolean` |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:188](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L188)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method serializes this instance as a JSON.
It can be used for persistence, data transfer, etc.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[toJSON](SceneTree_BaseItem.BaseItem#tojson)

#### Defined in

[SceneTree/TreeItem.ts:840](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L840)

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

[BaseItem](SceneTree_BaseItem.BaseItem).[toString](SceneTree_BaseItem.BaseItem#tostring)

#### Defined in

[SceneTree/ParameterOwner.ts:299](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/ParameterOwner.ts#L299)

___

### traverse

▸ **traverse**(`callback`, `includeThis?`): `void`

Traverse the tree structure from this point down
and fire the callback for each visited item.
Note: Depth only used by selection sets for now.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callback` | (...`args`: `any`[]) => `unknown` | `undefined` | The callback value. |
| `includeThis` | `boolean` | `true` | Fire the callback for this item. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:731](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L731)

___

### unbindChild

▸ `Private` **unbindChild**(`index`, `childItem`): `void`

UnBind an item from the group. This method is called
automatically when an item is removed from the group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `childItem` | [`BaseItem`](SceneTree_BaseItem.BaseItem) | item to unbind. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:583](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L583)

___

### updateChildNameMapping

▸ `Private` **updateChildNameMapping**(`start`): `void`

Updates the internal acceleration structure that speeds up looking up children by name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `start` | `number` | The start value. |

#### Returns

`void`

#### Defined in

[SceneTree/TreeItem.ts:443](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L443)

___

### updatePath

▸ `Private` **updatePath**(): `void`

The updatePath method.

#### Returns

`void`

#### Overrides

[BaseItem](SceneTree_BaseItem.BaseItem).[updatePath](SceneTree_BaseItem.BaseItem#updatepath)

#### Defined in

[SceneTree/TreeItem.ts:145](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L145)

___

### updateVisibility

▸ `Private` **updateVisibility**(): `boolean`

The __updateVisibility method.

#### Returns

`boolean`

- Returns a boolean.

#### Defined in

[SceneTree/TreeItem.ts:207](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/TreeItem.ts#L207)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[BaseItem](SceneTree_BaseItem.BaseItem).[getNumBaseItems](SceneTree_BaseItem.BaseItem#getnumbaseitems)

#### Defined in

[SceneTree/BaseItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/d2f20572/src/SceneTree/BaseItem.ts#L62)
