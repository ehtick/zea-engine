---
id: "SceneTree_CAD_XRef.XRef"
title: "Class: XRef"
sidebar_label: "XRef"
custom_edit_url: null
---



Represents a view of PMI data. within a CAD assembly.

## Hierarchy

- [`CADAsset`](SceneTree_CAD_CADAsset.CADAsset)

  ↳ **`XRef`**

## Constructors

### constructor

• **new XRef**(`name?`)

Creates an instance of XRef setting up the initial configuration for Material and Color parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name value. |

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[constructor](SceneTree_CAD_CADAsset.CADAsset#constructor)

#### Defined in

[src/SceneTree/CAD/XRef.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/XRef.ts#L20)

## Properties

### \_\_childItems

• `Protected` **\_\_childItems**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItems](SceneTree_CAD_CADAsset.CADAsset#__childitems)

#### Defined in

[src/SceneTree/TreeItem.ts:53](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L53)

___

### \_\_childItemsEventHandlers

• `Protected` **\_\_childItemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItemsEventHandlers](SceneTree_CAD_CADAsset.CADAsset#__childitemseventhandlers)

#### Defined in

[src/SceneTree/TreeItem.ts:54](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L54)

___

### \_\_childItemsMapping

• `Protected` **\_\_childItemsMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItemsMapping](SceneTree_CAD_CADAsset.CADAsset#__childitemsmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L55)

___

### \_\_childItemsMappingCorrupt

• `Protected` **\_\_childItemsMappingCorrupt**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__childItemsMappingCorrupt](SceneTree_CAD_CADAsset.CADAsset#__childitemsmappingcorrupt)

#### Defined in

[src/SceneTree/TreeItem.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L56)

___

### \_\_highlightMapping

• `Protected` **\_\_highlightMapping**: `Record`<`string`, [`Color`](../../Math/Math_Color.Color)\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__highlightMapping](SceneTree_CAD_CADAsset.CADAsset#__highlightmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:87](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L87)

___

### \_\_highlights

• `Protected` **\_\_highlights**: `string`[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__highlights](SceneTree_CAD_CADAsset.CADAsset#__highlights)

#### Defined in

[src/SceneTree/TreeItem.ts:88](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L88)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__id](SceneTree_CAD_CADAsset.CADAsset#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__metaData](SceneTree_CAD_CADAsset.CADAsset#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L33)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__name](SceneTree_CAD_CADAsset.CADAsset#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L28)

___

### \_\_opacity

• `Protected` **\_\_opacity**: `number` = `1`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__opacity](SceneTree_CAD_CADAsset.CADAsset#__opacity)

#### Defined in

[src/SceneTree/TreeItem.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L92)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__ownerItem](SceneTree_CAD_CADAsset.CADAsset#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:29](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L29)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__path](SceneTree_CAD_CADAsset.CADAsset#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L30)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__selectable](SceneTree_CAD_CADAsset.CADAsset#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L31)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__selected](SceneTree_CAD_CADAsset.CADAsset#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:32](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L32)

___

### \_\_visible

• `Protected` **\_\_visible**: `boolean` = `true`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__visible](SceneTree_CAD_CADAsset.CADAsset#__visible)

#### Defined in

[src/SceneTree/TreeItem.ts:90](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L90)

___

### \_\_visibleCounter

• `Protected` **\_\_visibleCounter**: `number` = `1`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[__visibleCounter](SceneTree_CAD_CADAsset.CADAsset#__visiblecounter)

#### Defined in

[src/SceneTree/TreeItem.ts:91](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L91)

___

### boundingBoxParam

• **boundingBoxParam**: [`BoundingBoxParameter`](../Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

**`member`** boundingBoxParam - Stores the bounding box for this tree item

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[boundingBoxParam](SceneTree_CAD_CADAsset.CADAsset#boundingboxparam)

#### Defined in

[src/SceneTree/TreeItem.ts:73](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L73)

___

### cadfileVersion

• **cadfileVersion**: [`Version`](../SceneTree_Version.Version)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[cadfileVersion](SceneTree_CAD_CADAsset.CADAsset#cadfileversion)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L22)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[deprecatedParamMapping](SceneTree_CAD_CADAsset.CADAsset#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L25)

___

### disableBoundingBox

• **disableBoundingBox**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[disableBoundingBox](SceneTree_CAD_CADAsset.CADAsset#disableboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L51)

___

### engineDataVersion

• `Optional` **engineDataVersion**: [`Version`](../SceneTree_Version.Version)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[engineDataVersion](SceneTree_CAD_CADAsset.CADAsset#enginedataversion)

#### Defined in

[src/SceneTree/AssetItem.ts:54](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L54)

___

### geomLibrary

• **geomLibrary**: [`GeomLibrary`](../SceneTree_GeomLibrary.GeomLibrary)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[geomLibrary](SceneTree_CAD_CADAsset.CADAsset#geomlibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L50)

___

### globalXfoOp

• `Protected` **globalXfoOp**: [`Operator`](../Operators/SceneTree_Operators_Operator.Operator)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[globalXfoOp](SceneTree_CAD_CADAsset.CADAsset#globalxfoop)

#### Defined in

[src/SceneTree/TreeItem.ts:94](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L94)

___

### globalXfoParam

• **globalXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** globalXfoParam - Stores the global Xfo for this tree item.
global xfos are calculated from the localXfo and parentXfo.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[globalXfoParam](SceneTree_CAD_CADAsset.CADAsset#globalxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L62)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[listeners](SceneTree_CAD_CADAsset.CADAsset#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### loaded

• **loaded**: `boolean` = `false`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[loaded](SceneTree_CAD_CADAsset.CADAsset#loaded)

#### Defined in

[src/SceneTree/AssetItem.ts:52](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L52)

___

### localXfoParam

• **localXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** localXfoParam - Stores the local Xfo for this tree item.
local Xfos are the offset from the parent's coordinate frame.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[localXfoParam](SceneTree_CAD_CADAsset.CADAsset#localxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:68](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L68)

___

### materialLibrary

• **materialLibrary**: [`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary)

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[materialLibrary](SceneTree_CAD_CADAsset.CADAsset#materiallibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L51)

___

### opacityParam

• **opacityParam**: [`NumberParameter`](../Parameters/SceneTree_Parameters_NumberParameter.NumberParameter)

**`member`** opacityParam - Controls, in combination with Material transparency,
the opacity of this item and its children.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[opacityParam](SceneTree_CAD_CADAsset.CADAsset#opacityparam)

#### Defined in

[src/SceneTree/TreeItem.ts:85](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L85)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[paramEventListenerIDs](SceneTree_CAD_CADAsset.CADAsset#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[paramMapping](SceneTree_CAD_CADAsset.CADAsset#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[params](SceneTree_CAD_CADAsset.CADAsset#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L24)

___

### sdk

• **sdk**: `string`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[sdk](SceneTree_CAD_CADAsset.CADAsset#sdk)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L23)

___

### units

• **units**: `string` = `'meters'`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[units](SceneTree_CAD_CADAsset.CADAsset#units)

#### Defined in

[src/SceneTree/AssetItem.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L56)

___

### unitsScale

• **unitsScale**: `number` = `1.0`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[unitsScale](SceneTree_CAD_CADAsset.CADAsset#unitsscale)

#### Defined in

[src/SceneTree/AssetItem.ts:55](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L55)

___

### url

• **url**: `string`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[url](SceneTree_CAD_CADAsset.CADAsset#url)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L24)

___

### visibleParam

• **visibleParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** visibleParam - Whether this tree item is visible or not.
Any given tree item is also is affected by parent's visibility.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[visibleParam](SceneTree_CAD_CADAsset.CADAsset#visibleparam)

#### Defined in

[src/SceneTree/TreeItem.ts:79](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L79)

## Accessors

### name

• `get` **name**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

CADAsset.name

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

CADAsset.name

#### Defined in

[src/SceneTree/BaseItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L78)

___

### opacity

• `get` **opacity**(): `number`

#### Returns

`number`

#### Inherited from

CADAsset.opacity

#### Defined in

[src/SceneTree/TreeItem.ts:259](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L259)

___

### parent

• `get` **parent**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

#### Inherited from

CADAsset.parent

#### Defined in

[src/SceneTree/TreeItem.ts:192](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L192)

• `set` **parent**(`treeItem`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `treeItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) |

#### Returns

`void`

#### Inherited from

CADAsset.parent

#### Defined in

[src/SceneTree/TreeItem.ts:196](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L196)

___

### path

• `get` **path**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

CADAsset.path

#### Defined in

[src/SceneTree/BaseItem.ts:87](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L87)

## Methods

### \_cleanBoundingBox

▸ `Private` **_cleanBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

The _cleanBoundingBox method.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[_cleanBoundingBox](SceneTree_CAD_CADAsset.CADAsset#_cleanboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:404](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L404)

___

### addChild

▸ **addChild**(`childItem`, `maintainXfo?`, `fixCollisions?`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Adds a child.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The child TreeItem to add. |
| `maintainXfo` | `boolean` | `true` | Boolean that determines if the Global Xfo value is maintained. If true, when moving items in the hierarchy from one parent to another, the local Xfo of the item will be modified to maintain and the Global Xfo. Note: this option defaults to false because we expect that is the behavior users would expect when manipulating the tree in code. To be safe and unambiguous, always try to specify this value. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions with other children of the same parent. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

childItem - The child TreeItem that was added.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addChild](SceneTree_CAD_CADAsset.CADAsset#addchild)

#### Defined in

[src/SceneTree/TreeItem.ts:602](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L602)

___

### addHighlight

▸ **addHighlight**(`name`, `color`, `propagateToChildren?`): `void`

Adds a highlight to the tree item.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `name` | `string` | `undefined` | The name of the tree item. |
| `color` | [`Color`](../../Math/Math_Color.Color) | `undefined` | The color of the highlight. |
| `propagateToChildren` | `boolean` | `false` | A boolean indicating whether to propagate to children. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addHighlight](SceneTree_CAD_CADAsset.CADAsset#addhighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:298](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L298)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addParameter](SceneTree_CAD_CADAsset.CADAsset#addparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[addParameterDeprecationMapping](SceneTree_CAD_CADAsset.CADAsset#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L92)

___

### childNameChanged

▸ `Private` **childNameChanged**(`event`): `void`

When a child's name changed, we update our acceleration structure.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`NameChangedEvent`](../../Utilities/Events/Utilities_Events_NameChangedEvent.NameChangedEvent) | The start value. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[childNameChanged](SceneTree_CAD_CADAsset.CADAsset#childnamechanged)

#### Defined in

[src/SceneTree/TreeItem.ts:518](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L518)

___

### clone

▸ **clone**(`context?`): [`XRef`](SceneTree_CAD_XRef.XRef)

The clone method constructs a new XRef, copies its values
from this item and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

[`XRef`](SceneTree_CAD_XRef.XRef)

- Returns a new cloned xref.

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[clone](SceneTree_CAD_CADAsset.CADAsset#clone)

#### Defined in

[src/SceneTree/CAD/XRef.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/XRef.ts#L31)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies current TreeItem with all its children.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`CADAsset`](SceneTree_CAD_CADAsset.CADAsset) | The tree item to copy from. |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[copyFrom](SceneTree_CAD_CADAsset.CADAsset#copyfrom)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L56)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[deleteMetadata](SceneTree_CAD_CADAsset.CADAsset#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:283](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L283)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[emit](SceneTree_CAD_CADAsset.CADAsset#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`j`, `context?`): `any`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `j` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`any`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[fromJSON](SceneTree_CAD_CADAsset.CADAsset#fromjson)

#### Defined in

[src/SceneTree/AssetItem.ts:267](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L267)

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

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[generateUniqueName](SceneTree_CAD_CADAsset.CADAsset#generateuniquename)

#### Defined in

[src/SceneTree/TreeItem.ts:466](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L466)

___

### getChild

▸ **getChild**(`index`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns child element in the specified index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index to remove the child TreeItem. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Return the child TreeItem.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChild](SceneTree_CAD_CADAsset.CADAsset#getchild)

#### Defined in

[src/SceneTree/TreeItem.ts:614](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L614)

___

### getChildByName

▸ **getChildByName**(`name`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns child element with the specified name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name value. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Return the child TreeItem.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildByName](SceneTree_CAD_CADAsset.CADAsset#getchildbyname)

#### Defined in

[src/SceneTree/TreeItem.ts:624](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L624)

___

### getChildIndex

▸ **getChildIndex**(`childItem`): `number`

Returns index position of the specified item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The child TreeItem value. |

#### Returns

`number`

- Child index in children array.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildIndex](SceneTree_CAD_CADAsset.CADAsset#getchildindex)

#### Defined in

[src/SceneTree/TreeItem.ts:726](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L726)

___

### getChildNames

▸ **getChildNames**(): `string`[]

Returns children names as an array of strings.

#### Returns

`string`[]

- An array of names for each child.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildNames](SceneTree_CAD_CADAsset.CADAsset#getchildnames)

#### Defined in

[src/SceneTree/TreeItem.ts:637](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L637)

___

### getChildren

▸ **getChildren**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)[]

Returns children list, but children are not required to have hierarchy structure(`TreeItem`).
Meaning that it could be another kind of item than `TreeItem`.

i.e. **BaseImage**

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)[]

- List of `TreeItem` owned by current TreeItem.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getChildren](SceneTree_CAD_CADAsset.CADAsset#getchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:446](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L446)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getClassName](SceneTree_CAD_CADAsset.CADAsset#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getEngineDataVersion

▸ **getEngineDataVersion**(): [`Version`](../SceneTree_Version.Version)

Returns the zea engine version as an array with major, minor, patch order.

#### Returns

[`Version`](../SceneTree_Version.Version)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getEngineDataVersion](SceneTree_CAD_CADAsset.CADAsset#getenginedataversion)

#### Defined in

[src/SceneTree/AssetItem.ts:89](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L89)

___

### getGeometryLibrary

▸ **getGeometryLibrary**(): [`GeomLibrary`](../SceneTree_GeomLibrary.GeomLibrary)

Returns asset `GeomLibrary` that is in charge of rendering geometry data using workers.

#### Returns

[`GeomLibrary`](../SceneTree_GeomLibrary.GeomLibrary)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getGeometryLibrary](SceneTree_CAD_CADAsset.CADAsset#getgeometrylibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:98](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L98)

___

### getHighlight

▸ **getHighlight**(): [`Color`](../../Math/Math_Color.Color)

Returns the color of the current highlight.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The color value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getHighlight](SceneTree_CAD_CADAsset.CADAsset#gethighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:367](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L367)

___

### getHighlightName

▸ **getHighlightName**(): `string`

Returns the name of the current highlight.

#### Returns

`string`

- The color value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getHighlightName](SceneTree_CAD_CADAsset.CADAsset#gethighlightname)

#### Defined in

[src/SceneTree/TreeItem.ts:379](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L379)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getId](SceneTree_CAD_CADAsset.CADAsset#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getMaterialLibrary

▸ **getMaterialLibrary**(): [`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary)

Returns `MaterialLibrary` that is in charge of storing all materials of current Item.

#### Returns

[`MaterialLibrary`](../SceneTree_MaterialLibrary.MaterialLibrary)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getMaterialLibrary](SceneTree_CAD_CADAsset.CADAsset#getmateriallibrary)

#### Defined in

[src/SceneTree/AssetItem.ts:107](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L107)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getMetadata](SceneTree_CAD_CADAsset.CADAsset#getmetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getName](SceneTree_CAD_CADAsset.CADAsset#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:96](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L96)

___

### getNumChildren

▸ **getNumChildren**(): `number`

Returns the number of child elements current `TreeItem` has.

#### Returns

`number`

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getNumChildren](SceneTree_CAD_CADAsset.CADAsset#getnumchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:455](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L455)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getNumParameters](SceneTree_CAD_CADAsset.CADAsset#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getOwner](SceneTree_CAD_CADAsset.CADAsset#getowner)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameter](SceneTree_CAD_CADAsset.CADAsset#getparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameterByIndex](SceneTree_CAD_CADAsset.CADAsset#getparameterbyindex)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameterIndex](SceneTree_CAD_CADAsset.CADAsset#getparameterindex)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParameters](SceneTree_CAD_CADAsset.CADAsset#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L50)

___

### getParentItem

▸ **getParentItem**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns the parent of current TreeItem.

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Returns the parent item.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getParentItem](SceneTree_CAD_CADAsset.CADAsset#getparentitem)

#### Defined in

[src/SceneTree/TreeItem.ts:179](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L179)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getPath](SceneTree_CAD_CADAsset.CADAsset#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L134)

___

### getUnitsConversion

▸ **getUnitsConversion**(): `number`

Returns the scale factor of current item.

#### Returns

`number`

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getUnitsConversion](SceneTree_CAD_CADAsset.CADAsset#getunitsconversion)

#### Defined in

[src/SceneTree/AssetItem.ts:115](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L115)

___

### getVersion

▸ **getVersion**(): [`Version`](../SceneTree_Version.Version)

Returns the version of the data loaded by the CADAsset.

#### Returns

[`Version`](../SceneTree_Version.Version)

- The version value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getVersion](SceneTree_CAD_CADAsset.CADAsset#getversion)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L74)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[hasMetadata](SceneTree_CAD_CADAsset.CADAsset#hasmetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[hasParameter](SceneTree_CAD_CADAsset.CADAsset#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L80)

___

### insertChild

▸ **insertChild**(`childItem`, `index`, `maintainXfo?`, `fixCollisions?`): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Inserts a child. It accepts all kind of `TreeItem`, not only `TreeItem`.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | `undefined` | The child TreeItem to insert. |
| `index` | `number` | `undefined` | The index to add the child item. |
| `maintainXfo` | `boolean` | `false` | Boolean that determines if the Xfo value is maintained. |
| `fixCollisions` | `boolean` | `true` | Modify the name of the item to avoid name collisions. If false, an exception wll be thrown instead if a name collision occurs. |

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- The index of the child item in this items children array.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[insertChild](SceneTree_CAD_CADAsset.CADAsset#insertchild)

#### Defined in

[src/SceneTree/TreeItem.ts:542](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L542)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[insertParameter](SceneTree_CAD_CADAsset.CADAsset#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L149)

___

### isHighlighted

▸ **isHighlighted**(): `boolean`

Returns `true` if this items has a highlight color assigned.

#### Returns

`boolean`

- `True` if this item is highlighted.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isHighlighted](SceneTree_CAD_CADAsset.CADAsset#ishighlighted)

#### Defined in

[src/SceneTree/TreeItem.ts:391](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L391)

___

### isLoaded

▸ **isLoaded**(): `boolean`

Returns the loaded status of current item.

#### Returns

`boolean`

- Returns true if the asset has already loaded its data.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isLoaded](SceneTree_CAD_CADAsset.CADAsset#isloaded)

#### Defined in

[src/SceneTree/AssetItem.ts:80](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L80)

___

### isOpaque

▸ **isOpaque**(): `boolean`

Returns the current status of the opacity value.

#### Returns

`boolean`

- Returns true if the opacity value is less than 1.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isOpaque](SceneTree_CAD_CADAsset.CADAsset#isopaque)

#### Defined in

[src/SceneTree/TreeItem.ts:268](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L268)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isSelectable](SceneTree_CAD_CADAsset.CADAsset#isselectable)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isSelected](SceneTree_CAD_CADAsset.CADAsset#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:229](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L229)

___

### isVisible

▸ **isVisible**(): `boolean`

Returns visible parameter value for current TreeItem.

#### Returns

`boolean`

- The visible param value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[isVisible](SceneTree_CAD_CADAsset.CADAsset#isvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:208](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L208)

___

### load

▸ **load**(`url`, `context?`): `Promise`<`void`\>

Loads all the geometries and metadata from the asset file.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The URL of the asset to load |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The load context object that provides additional data such as paths to external references. |

#### Returns

`Promise`<`void`\>

- Returns a promise that resolves once the load of the tree is complete. Geometries, textures and other resources might still be loading.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[load](SceneTree_CAD_CADAsset.CADAsset#load)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:102](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L102)

___

### loadMetadata

▸ **loadMetadata**(`metaDataUrl?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `metaDataUrl` | `string` | `''` |

#### Returns

`Promise`<`void`\>

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[loadMetadata](SceneTree_CAD_CADAsset.CADAsset#loadmetadata)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:215](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L215)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[off](SceneTree_CAD_CADAsset.CADAsset#off)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[on](SceneTree_CAD_CADAsset.CADAsset#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L44)

___

### onPointerDown

▸ **onPointerDown**(`event`): `void`

Called by the Viewport when events are received by the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerDown', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The event value |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerDown](SceneTree_CAD_CADAsset.CADAsset#onpointerdown)

#### Defined in

[src/SceneTree/TreeItem.ts:829](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L829)

___

### onPointerEnter

▸ **onPointerEnter**(`event`): `void`

Called by the Viewport when the mouse or other pointer enters the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerEnter', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerEnter](SceneTree_CAD_CADAsset.CADAsset#onpointerenter)

#### Defined in

[src/SceneTree/TreeItem.ts:880](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L880)

___

### onPointerLeave

▸ **onPointerLeave**(`event`): `void`

Called by the Viewport when the mouse or other pointer leaves the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerLeave', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerLeave](SceneTree_CAD_CADAsset.CADAsset#onpointerleave)

#### Defined in

[src/SceneTree/TreeItem.ts:897](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L897)

___

### onPointerMove

▸ **onPointerMove**(`event`): `void`

Called by the Viewport when events are received by the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerMove', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerMove](SceneTree_CAD_CADAsset.CADAsset#onpointermove)

#### Defined in

[src/SceneTree/TreeItem.ts:863](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L863)

___

### onPointerUp

▸ **onPointerUp**(`event`): `void`

Called by the Viewport when events are received by the canvas element.
The event is propagated to a TreeItem if it is under the pointer at the time.
The ZeaPointerEvent abstracts the Mouse, touch and our custom XR events.
This method emits the ZeaPointerEvent with the key 'pointerDown', and
propagates it up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaPointerEvent`](../../Utilities/Events/Utilities_Events_ZeaPointerEvent.ZeaPointerEvent) | The pointer event that was generated from the user interaction |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onPointerUp](SceneTree_CAD_CADAsset.CADAsset#onpointerup)

#### Defined in

[src/SceneTree/TreeItem.ts:846](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L846)

___

### onTouchCancel

▸ **onTouchCancel**(`event`): `void`

Called by the Viewport when the touch cancel event is received by the canvas element.
Emits the ZeaTouchEvent with the key 'touchCancel', and Propagates is up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaTouchEvent`](../../Utilities/Events/Utilities_Events_ZeaTouchEvent.ZeaTouchEvent) | The wheel event that occurs. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onTouchCancel](SceneTree_CAD_CADAsset.CADAsset#ontouchcancel)

#### Defined in

[src/SceneTree/TreeItem.ts:925](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L925)

___

### onWheel

▸ **onWheel**(`event`): `void`

Called by the Viewport when the mouse wheel event is received by the canvas element.
Emits the ZeaWheelEvent with the key 'mouseWheel', and Propagates is up to the TreeItem's owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | [`ZeaWheelEvent`](../../Utilities/Events/Utilities_Events_ZeaWheelEvent.ZeaWheelEvent) | The wheel event that occurs. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[onWheel](SceneTree_CAD_CADAsset.CADAsset#onwheel)

#### Defined in

[src/SceneTree/TreeItem.ts:911](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L911)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[once](SceneTree_CAD_CADAsset.CADAsset#once)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[parameterValueChanged](SceneTree_CAD_CADAsset.CADAsset#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L124)

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

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[propagateVisibility](SceneTree_CAD_CADAsset.CADAsset#propagatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:227](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L227)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Initializes XRef's asset, material, version and layers; adding current `XRef` Geometry Item toall the layers in reader

**`paramreader`** - The reader param.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | - |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The load context param. |

#### Returns

`void`

#### Overrides

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[readBinary](SceneTree_CAD_CADAsset.CADAsset#readbinary)

#### Defined in

[src/SceneTree/CAD/XRef.ts:46](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/XRef.ts#L46)

___

### readRootLevelBinary

▸ **readRootLevelBinary**(`reader`, `context`): `void`

Initializes CADAsset's asset, material, version and layers; adding current `CADAsset` Geometry Item toall the layers in reader

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader param. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The load context object that provides additional data such as the units of the scene we are loading into. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[readRootLevelBinary](SceneTree_CAD_CADAsset.CADAsset#readrootlevelbinary)

#### Defined in

[src/SceneTree/CAD/CADAsset.ts:84](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/CAD/CADAsset.ts#L84)

___

### removeAllChildren

▸ **removeAllChildren**(): `void`

Removes all children Items.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeAllChildren](SceneTree_CAD_CADAsset.CADAsset#removeallchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:712](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L712)

___

### removeChild

▸ **removeChild**(`index`): `void`

Removes a child TreeItem by specifying its index.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeChild](SceneTree_CAD_CADAsset.CADAsset#removechild)

#### Defined in

[src/SceneTree/TreeItem.ts:674](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L674)

___

### removeChildByHandle

▸ **removeChildByHandle**(`childItem`): `void`

Removes the provided item from this TreeItem if it is one of its children.
An exception is thrown if the item is not a child of this tree item.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The child TreeItem to remove. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeChildByHandle](SceneTree_CAD_CADAsset.CADAsset#removechildbyhandle)

#### Defined in

[src/SceneTree/TreeItem.ts:703](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L703)

___

### removeChildByName

▸ **removeChildByName**(`name`): `void`

Removes a child TreeItem by specifying its name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name param. |

#### Returns

`void`

- Return the child TreeItem.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeChildByName](SceneTree_CAD_CADAsset.CADAsset#removechildbyname)

#### Defined in

[src/SceneTree/TreeItem.ts:690](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L690)

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

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeHighlight](SceneTree_CAD_CADAsset.CADAsset#removehighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:334](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L334)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeListenerById](SceneTree_CAD_CADAsset.CADAsset#removelistenerbyid)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[removeParameter](SceneTree_CAD_CADAsset.CADAsset#removeparameter)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[replaceParameter](SceneTree_CAD_CADAsset.CADAsset#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L198)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`, `displayError?`): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](../SceneTree_BaseItem.BaseItem)

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

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](../SceneTree_BaseItem.BaseItem)

- The return value.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[resolvePath](SceneTree_CAD_CADAsset.CADAsset#resolvepath)

#### Defined in

[src/SceneTree/TreeItem.ts:746](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L746)

___

### setBoundingBoxDirty

▸ `Private` **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setBoundingBoxDirty](SceneTree_CAD_CADAsset.CADAsset#setboundingboxdirty)

#### Defined in

[src/SceneTree/TreeItem.ts:421](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L421)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setMetadata](SceneTree_CAD_CADAsset.CADAsset#setmetadata)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setName](SceneTree_CAD_CADAsset.CADAsset#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:106](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L106)

___

### setOwner

▸ **setOwner**(`parentItem`): `void`

Sets the owner (another TreeItem) of the current TreeItem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The parent item. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setOwner](SceneTree_CAD_CADAsset.CADAsset#setowner)

#### Defined in

[src/SceneTree/TreeItem.ts:136](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L136)

___

### setParentItem

▸ **setParentItem**(`parentItem`): `void`

Sets the parent of current TreeItem.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | The parent item. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setParentItem](SceneTree_CAD_CADAsset.CADAsset#setparentitem)

#### Defined in

[src/SceneTree/TreeItem.ts:188](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L188)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setSelectable](SceneTree_CAD_CADAsset.CADAsset#setselectable)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setSelected](SceneTree_CAD_CADAsset.CADAsset#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:239](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L239)

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

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[setVisible](SceneTree_CAD_CADAsset.CADAsset#setvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:218](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L218)

___

### toJSON

▸ **toJSON**(`context?`): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[toJSON](SceneTree_CAD_CADAsset.CADAsset#tojson)

#### Defined in

[src/SceneTree/AssetItem.ts:241](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetItem.ts#L241)

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

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[toString](SceneTree_CAD_CADAsset.CADAsset#tostring)

#### Defined in

[src/SceneTree/ParameterOwner.ts:303](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ParameterOwner.ts#L303)

___

### traverse

▸ **traverse**(`callback`, `includeThis?`): `void`

Traverse the tree structure from this point down
and fire the callback for each visited item.
Note: Depth only used by selection sets for now.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callback` | (`treeItem`: [`TreeItem`](../SceneTree_TreeItem.TreeItem), `depth`: `number`) => `unknown` | `undefined` | The callback value. |
| `includeThis` | `boolean` | `true` | Fire the callback for this item. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[traverse](SceneTree_CAD_CADAsset.CADAsset#traverse)

#### Defined in

[src/SceneTree/TreeItem.ts:798](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L798)

___

### unbindChild

▸ `Private` **unbindChild**(`index`, `childItem`): `void`

UnBind an item from the group. This method is called
automatically when an item is removed from the group.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |
| `childItem` | [`TreeItem`](../SceneTree_TreeItem.TreeItem) | item to unbind. |

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[unbindChild](SceneTree_CAD_CADAsset.CADAsset#unbindchild)

#### Defined in

[src/SceneTree/TreeItem.ts:653](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L653)

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

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updateChildNameMapping](SceneTree_CAD_CADAsset.CADAsset#updatechildnamemapping)

#### Defined in

[src/SceneTree/TreeItem.ts:505](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L505)

___

### updateOpacity

▸ `Protected` **updateOpacity**(): `void`

The updateOpacity method.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updateOpacity](SceneTree_CAD_CADAsset.CADAsset#updateopacity)

#### Defined in

[src/SceneTree/TreeItem.ts:275](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L275)

___

### updatePath

▸ `Private` **updatePath**(): `void`

The updatePath method.

#### Returns

`void`

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updatePath](SceneTree_CAD_CADAsset.CADAsset#updatepath)

#### Defined in

[src/SceneTree/TreeItem.ts:167](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L167)

___

### updateVisibility

▸ `Protected` **updateVisibility**(): `boolean`

The updateVisibility method.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[updateVisibility](SceneTree_CAD_CADAsset.CADAsset#updatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:236](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/TreeItem.ts#L236)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[CADAsset](SceneTree_CAD_CADAsset.CADAsset).[getNumBaseItems](SceneTree_CAD_CADAsset.CADAsset#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:56](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/BaseItem.ts#L56)

