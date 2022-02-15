---
id: "SceneTree_CAD_CADBody.CADBody"
title: "Class: CADBody"
sidebar_label: "CADBody"
custom_edit_url: null
---



Represents a Body within a CAD Part. A Body is made up of either a single mesh or a collection of meshes, one for each surface.
When a zcad file is produced, the tool can  optimize bodies to contain only one mesh to speed up loading of large models, and support bigger models being loaded.

## Hierarchy

- [`GeomItem`](../SceneTree_GeomItem.GeomItem)

  ↳ **`CADBody`**

## Constructors

### constructor

• **new CADBody**(`name?`)

Creates an instance of CADBody setting up the initial configuration for Material and Color parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | The name value. |

#### Overrides

[GeomItem](../SceneTree_GeomItem.GeomItem).[constructor](../SceneTree_GeomItem.GeomItem#constructor)

#### Defined in

[src/SceneTree/CAD/CADBody.ts:25](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/CAD/CADBody.ts#L25)

## Properties

### \_\_childItems

• `Protected` **\_\_childItems**: [`TreeItem`](../SceneTree_TreeItem.TreeItem)[] = `[]`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__childItems](../SceneTree_GeomItem.GeomItem#__childitems)

#### Defined in

[src/SceneTree/TreeItem.ts:51](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L51)

___

### \_\_childItemsEventHandlers

• `Protected` **\_\_childItemsEventHandlers**: `Record`<`string`, `number`\>[] = `[]`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__childItemsEventHandlers](../SceneTree_GeomItem.GeomItem#__childitemseventhandlers)

#### Defined in

[src/SceneTree/TreeItem.ts:52](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L52)

___

### \_\_childItemsMapping

• `Protected` **\_\_childItemsMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__childItemsMapping](../SceneTree_GeomItem.GeomItem#__childitemsmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:53](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L53)

___

### \_\_cutAway

• `Protected` **\_\_cutAway**: `boolean`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__cutAway](../SceneTree_GeomItem.GeomItem#__cutaway)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:19](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L19)

___

### \_\_cutAwayDist

• `Protected` **\_\_cutAwayDist**: `number`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__cutAwayDist](../SceneTree_GeomItem.GeomItem#__cutawaydist)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:21](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L21)

___

### \_\_cutAwayVector

• `Protected` **\_\_cutAwayVector**: [`Vec3`](../../Math/Math_Vec3.Vec3)

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__cutAwayVector](../SceneTree_GeomItem.GeomItem#__cutawayvector)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:20](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L20)

___

### \_\_highlightMapping

• `Protected` **\_\_highlightMapping**: `Record`<`string`, [`Color`](../../Math/Math_Color.Color)\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__highlightMapping](../SceneTree_GeomItem.GeomItem#__highlightmapping)

#### Defined in

[src/SceneTree/TreeItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L78)

___

### \_\_highlights

• `Protected` **\_\_highlights**: `string`[] = `[]`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__highlights](../SceneTree_GeomItem.GeomItem#__highlights)

#### Defined in

[src/SceneTree/TreeItem.ts:79](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L79)

___

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__id](../SceneTree_GeomItem.GeomItem#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L11)

___

### \_\_layers

• `Protected` **\_\_layers**: `string`[]

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__layers](../SceneTree_GeomItem.GeomItem#__layers)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:22](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L22)

___

### \_\_metaData

• `Protected` **\_\_metaData**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__metaData](../SceneTree_GeomItem.GeomItem#__metadata)

#### Defined in

[src/SceneTree/BaseItem.ts:41](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L41)

___

### \_\_name

• `Protected` **\_\_name**: `string`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__name](../SceneTree_GeomItem.GeomItem#__name)

#### Defined in

[src/SceneTree/BaseItem.ts:36](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L36)

___

### \_\_ownerItem

• `Protected` **\_\_ownerItem**: [`Owner`](../SceneTree_Owner.Owner) = `undefined`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__ownerItem](../SceneTree_GeomItem.GeomItem#__owneritem)

#### Defined in

[src/SceneTree/BaseItem.ts:37](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L37)

___

### \_\_path

• `Protected` **\_\_path**: `string`[]

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__path](../SceneTree_GeomItem.GeomItem#__path)

#### Defined in

[src/SceneTree/BaseItem.ts:38](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L38)

___

### \_\_selectable

• `Protected` **\_\_selectable**: `boolean` = `true`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__selectable](../SceneTree_GeomItem.GeomItem#__selectable)

#### Defined in

[src/SceneTree/BaseItem.ts:39](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L39)

___

### \_\_selected

• `Protected` **\_\_selected**: `boolean` = `false`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__selected](../SceneTree_GeomItem.GeomItem#__selected)

#### Defined in

[src/SceneTree/BaseItem.ts:40](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L40)

___

### \_\_visible

• `Protected` **\_\_visible**: `boolean` = `true`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__visible](../SceneTree_GeomItem.GeomItem#__visible)

#### Defined in

[src/SceneTree/TreeItem.ts:81](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L81)

___

### \_\_visibleCounter

• `Protected` **\_\_visibleCounter**: `number` = `1`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[__visibleCounter](../SceneTree_GeomItem.GeomItem#__visiblecounter)

#### Defined in

[src/SceneTree/TreeItem.ts:82](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L82)

___

### assetItem

• `Protected` **assetItem**: [`AssetItem`](../SceneTree_AssetItem.AssetItem) = `null`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[assetItem](../SceneTree_GeomItem.GeomItem#assetitem)

#### Defined in

[src/SceneTree/GeomItem.ts:72](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L72)

___

### boundingBoxParam

• **boundingBoxParam**: [`BoundingBoxParameter`](../Parameters/SceneTree_Parameters_BoundingBoxParameter.BoundingBoxParameter)

**`member`** boundingBoxParam - Stores the bounding box for this tree item

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[boundingBoxParam](../SceneTree_GeomItem.GeomItem#boundingboxparam)

#### Defined in

[src/SceneTree/TreeItem.ts:70](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L70)

___

### calcGeomMatOperator

• `Protected` **calcGeomMatOperator**: [`Operator`](../Operators/SceneTree_Operators_Operator.Operator)

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[calcGeomMatOperator](../SceneTree_GeomItem.GeomItem#calcgeommatoperator)

#### Defined in

[src/SceneTree/GeomItem.ts:73](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L73)

___

### cullable

• **cullable**: `boolean` = `true`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[cullable](../SceneTree_GeomItem.GeomItem#cullable)

#### Defined in

[src/SceneTree/GeomItem.ts:74](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L74)

___

### deprecatedParamMapping

• **deprecatedParamMapping**: `Record`<`string`, `any`\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[deprecatedParamMapping](../SceneTree_GeomItem.GeomItem#deprecatedparammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:25](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L25)

___

### disableBoundingBox

• **disableBoundingBox**: `boolean` = `false`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[disableBoundingBox](../SceneTree_GeomItem.GeomItem#disableboundingbox)

#### Defined in

[src/SceneTree/TreeItem.ts:49](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L49)

___

### geomBBox

• `Protected` `Optional` **geomBBox**: [`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[geomBBox](../SceneTree_GeomItem.GeomItem#geombbox)

#### Defined in

[src/SceneTree/GeomItem.ts:70](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L70)

___

### geomIndex

• `Protected` **geomIndex**: `number` = `-1`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[geomIndex](../SceneTree_GeomItem.GeomItem#geomindex)

#### Defined in

[src/SceneTree/GeomItem.ts:71](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L71)

___

### geomMatParam

• **geomMatParam**: [`Mat4Parameter`](../Parameters/SceneTree_Parameters_Mat4Parameter.Mat4Parameter)

**`member`** geomMatParam - Calculated from the GlobalXfo and the GeomOffsetXfo, this matrix is provided to the renderer for rendering.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[geomMatParam](../SceneTree_GeomItem.GeomItem#geommatparam)

#### Defined in

[src/SceneTree/GeomItem.ts:89](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L89)

___

### geomOffsetXfoParam

• **geomOffsetXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** geomOffsetXfoParam - Provides an offset transformation that is applied only to the geometry and not inherited by child items.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[geomOffsetXfoParam](../SceneTree_GeomItem.GeomItem#geomoffsetxfoparam)

#### Defined in

[src/SceneTree/GeomItem.ts:79](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L79)

___

### geomParam

• **geomParam**: [`GeometryParameter`](../Parameters/SceneTree_Parameters_GeometryParameter.GeometryParameter)

**`member`** geomParam - The geometry to be rendered for this GeomItem

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[geomParam](../SceneTree_GeomItem.GeomItem#geomparam)

#### Defined in

[src/SceneTree/GeomItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L84)

___

### globalXfoOp

• `Protected` **globalXfoOp**: [`Operator`](../Operators/SceneTree_Operators_Operator.Operator)

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[globalXfoOp](../SceneTree_GeomItem.GeomItem#globalxfoop)

#### Defined in

[src/SceneTree/TreeItem.ts:84](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L84)

___

### globalXfoParam

• **globalXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** globalXfoParam - Stores the global Xfo for this tree item.
global xfos are calculated from the localXfo and parentXfo.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[globalXfoParam](../SceneTree_GeomItem.GeomItem#globalxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:59](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L59)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[listenerIDs](../SceneTree_GeomItem.GeomItem#listenerids)

#### Defined in

[src/SceneTree/GeomItem.ts:69](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L69)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[listeners](../SceneTree_GeomItem.GeomItem#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L26)

___

### localXfoParam

• **localXfoParam**: [`XfoParameter`](../Parameters/SceneTree_Parameters_XfoParameter.XfoParameter)

**`member`** localXfoParam - Stores the local Xfo for this tree item.
local Xfos are the offset from the parent's coordinate frame.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[localXfoParam](../SceneTree_GeomItem.GeomItem#localxfoparam)

#### Defined in

[src/SceneTree/TreeItem.ts:65](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L65)

___

### materialParam

• **materialParam**: [`MaterialParameter`](../Parameters/SceneTree_Parameters_MaterialParameter.MaterialParameter)

**`member`** materialParam - The Material to use when rendering this GeomItem

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[materialParam](../SceneTree_GeomItem.GeomItem#materialparam)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:27](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L27)

___

### overlay

• `Protected` **overlay**: `boolean`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[overlay](../SceneTree_GeomItem.GeomItem#overlay)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:18](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L18)

___

### paramEventListenerIDs

• `Protected` **paramEventListenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[paramEventListenerIDs](../SceneTree_GeomItem.GeomItem#parameventlistenerids)

#### Defined in

[src/SceneTree/ParameterOwner.ts:22](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L22)

___

### paramMapping

• `Protected` **paramMapping**: `Record`<`string`, `number`\> = `{}`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[paramMapping](../SceneTree_GeomItem.GeomItem#parammapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:23](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L23)

___

### params

• **params**: [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[] = `[]`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[params](../SceneTree_GeomItem.GeomItem#params)

#### Defined in

[src/SceneTree/ParameterOwner.ts:24](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L24)

___

### shattered

• **shattered**: `boolean` = `false`

#### Defined in

[src/SceneTree/CAD/CADBody.ts:19](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/CAD/CADBody.ts#L19)

___

### visibleParam

• **visibleParam**: [`BooleanParameter`](../Parameters/SceneTree_Parameters_BooleanParameter.BooleanParameter)

**`member`** visibleParam - Whether this tree item is visible or not.
Any given tree item is also is affected by parent's visibility.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[visibleParam](../SceneTree_GeomItem.GeomItem#visibleparam)

#### Defined in

[src/SceneTree/TreeItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L76)

## Methods

### \_cleanBoundingBox

▸ `Private` **_cleanBoundingBox**(): [`Box3`](../../Math/Math_Box3.Box3)

The _cleanBoundingBox method.

#### Returns

[`Box3`](../../Math/Math_Box3.Box3)

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[_cleanBoundingBox](../SceneTree_GeomItem.GeomItem#_cleanboundingbox)

#### Defined in

[src/SceneTree/GeomItem.ts:122](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L122)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[addChild](../SceneTree_GeomItem.GeomItem#addchild)

#### Defined in

[src/SceneTree/TreeItem.ts:540](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L540)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[addHighlight](../SceneTree_GeomItem.GeomItem#addhighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:245](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L245)

___

### addLayer

▸ **addLayer**(`name`): `void`

Adds a layer to current item.

**`todo`** Need to find the layer and add this item to it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the layer. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[addLayer](../SceneTree_GeomItem.GeomItem#addlayer)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:68](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L68)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[addParameter](../SceneTree_GeomItem.GeomItem#addparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:135](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L135)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[addParameterDeprecationMapping](../SceneTree_GeomItem.GeomItem#addparameterdeprecationmapping)

#### Defined in

[src/SceneTree/ParameterOwner.ts:92](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L92)

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

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[childNameChanged](../SceneTree_GeomItem.GeomItem#childnamechanged)

#### Defined in

[src/SceneTree/TreeItem.ts:466](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L466)

___

### clone

▸ **clone**(`context`): [`CADBody`](SceneTree_CAD_CADBody.CADBody)

The clone method constructs a new CADBody, copies its values
from this item and returns it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The CloneContext param. |

#### Returns

[`CADBody`](SceneTree_CAD_CADBody.CADBody)

- The cloned instance.

#### Overrides

[GeomItem](../SceneTree_GeomItem.GeomItem).[clone](../SceneTree_GeomItem.GeomItem#clone)

#### Defined in

[src/SceneTree/CAD/CADBody.ts:50](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/CAD/CADBody.ts#L50)

___

### copyFrom

▸ **copyFrom**(`src`, `context?`): `void`

Copies current GeomItem with all its children.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `src` | [`GeomItem`](../SceneTree_GeomItem.GeomItem) | The geom item to copy from. |
| `context?` | [`CloneContext`](../SceneTree_CloneContext.CloneContext) | The context value. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[copyFrom](../SceneTree_GeomItem.GeomItem#copyfrom)

#### Defined in

[src/SceneTree/GeomItem.ts:280](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L280)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[deleteMetadata](../SceneTree_GeomItem.GeomItem#deletemetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:263](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L263)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[emit](../SceneTree_GeomItem.GeomItem#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L154)

___

### fromJSON

▸ **fromJSON**(`json`, `context`): `void`

The fromJSON method decodes a json object for this type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `json` | `Record`<`string`, `any`\> | The json object this item must decode. |
| `context` | `Record`<`string`, `any`\> | The context value. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[fromJSON](../SceneTree_GeomItem.GeomItem#fromjson)

#### Defined in

[src/SceneTree/GeomItem.ts:170](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L170)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[generateUniqueName](../SceneTree_GeomItem.GeomItem#generateuniquename)

#### Defined in

[src/SceneTree/TreeItem.ts:414](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L414)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getChild](../SceneTree_GeomItem.GeomItem#getchild)

#### Defined in

[src/SceneTree/TreeItem.ts:552](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L552)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getChildByName](../SceneTree_GeomItem.GeomItem#getchildbyname)

#### Defined in

[src/SceneTree/TreeItem.ts:562](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L562)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getChildIndex](../SceneTree_GeomItem.GeomItem#getchildindex)

#### Defined in

[src/SceneTree/TreeItem.ts:664](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L664)

___

### getChildNames

▸ **getChildNames**(): `string`[]

Returns children names as an array of strings.

#### Returns

`string`[]

- An array of names for each child.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getChildNames](../SceneTree_GeomItem.GeomItem#getchildnames)

#### Defined in

[src/SceneTree/TreeItem.ts:575](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L575)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getChildren](../SceneTree_GeomItem.GeomItem#getchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:394](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L394)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getClassName](../SceneTree_GeomItem.GeomItem#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L33)

___

### getCutDist

▸ **getCutDist**(): `number`

Getter for the cutaway distance.

#### Returns

`number`

- The return value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getCutDist](../SceneTree_GeomItem.GeomItem#getcutdist)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:128](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L128)

___

### getCutVector

▸ **getCutVector**(): [`Vec3`](../../Math/Math_Vec3.Vec3)

Returns cutaway vector value.

#### Returns

[`Vec3`](../../Math/Math_Vec3.Vec3)

- `Vec3` when it is set, `false` on default.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getCutVector](../SceneTree_GeomItem.GeomItem#getcutvector)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:109](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L109)

___

### getHighlight

▸ **getHighlight**(): [`Color`](../../Math/Math_Color.Color)

Returns the color of the current highlight.

#### Returns

[`Color`](../../Math/Math_Color.Color)

- The color value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getHighlight](../SceneTree_GeomItem.GeomItem#gethighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:315](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L315)

___

### getHighlightName

▸ **getHighlightName**(): `string`

Returns the name of the current highlight.

#### Returns

`string`

- The color value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getHighlightName](../SceneTree_GeomItem.GeomItem#gethighlightname)

#### Defined in

[src/SceneTree/TreeItem.ts:327](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L327)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getId](../SceneTree_GeomItem.GeomItem#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/BaseClass.ts#L25)

___

### getLayers

▸ **getLayers**(): `string`[]

Returns all layers in current item.

#### Returns

`string`[]

- The return value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getLayers](../SceneTree_GeomItem.GeomItem#getlayers)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:78](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L78)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getMetadata](../SceneTree_GeomItem.GeomItem#getmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:234](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L234)

___

### getName

▸ **getName**(): `string`

Returns the name of the base item.

#### Returns

`string`

- Returns the base item name.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getName](../SceneTree_GeomItem.GeomItem#getname)

#### Defined in

[src/SceneTree/BaseItem.ts:76](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L76)

___

### getNumChildren

▸ **getNumChildren**(): `number`

Returns the number of child elements current `TreeItem` has.

#### Returns

`number`

- The return value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getNumChildren](../SceneTree_GeomItem.GeomItem#getnumchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:403](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L403)

___

### getNumParameters

▸ **getNumParameters**(): `number`

Returns the number of parameters current object has.

#### Returns

`number`

- Amount of parameters in current object.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getNumParameters](../SceneTree_GeomItem.GeomItem#getnumparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:41](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L41)

___

### getOwner

▸ **getOwner**(): [`Owner`](../SceneTree_Owner.Owner)

The getOwner method returns the current owner of the item.
The item is a child of the current owner.

#### Returns

[`Owner`](../SceneTree_Owner.Owner)

- Returns the current owner.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getOwner](../SceneTree_GeomItem.GeomItem#getowner)

#### Defined in

[src/SceneTree/BaseItem.ts:156](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L156)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getParameter](../SceneTree_GeomItem.GeomItem#getparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:102](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L102)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getParameterByIndex](../SceneTree_GeomItem.GeomItem#getparameterbyindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:70](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L70)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[getParameterIndex](../SceneTree_GeomItem.GeomItem#getparameterindex)

#### Defined in

[src/SceneTree/ParameterOwner.ts:60](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L60)

___

### getParameters

▸ **getParameters**(): [`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

Returns all the parameters of the object.

#### Returns

[`Parameter`](../Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\>[]

- Parameter List

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getParameters](../SceneTree_GeomItem.GeomItem#getparameters)

#### Defined in

[src/SceneTree/ParameterOwner.ts:50](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L50)

___

### getParentItem

▸ **getParentItem**(): [`TreeItem`](../SceneTree_TreeItem.TreeItem)

Returns the parent of current TreeItem.

#### Returns

[`TreeItem`](../SceneTree_TreeItem.TreeItem)

- Returns the parent item.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getParentItem](../SceneTree_GeomItem.GeomItem#getparentitem)

#### Defined in

[src/SceneTree/TreeItem.ts:165](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L165)

___

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getPath](../SceneTree_GeomItem.GeomItem#getpath)

#### Defined in

[src/SceneTree/BaseItem.ts:113](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L113)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[hasMetadata](../SceneTree_GeomItem.GeomItem#hasmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:244](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L244)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[hasParameter](../SceneTree_GeomItem.GeomItem#hasparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:80](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L80)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[insertChild](../SceneTree_GeomItem.GeomItem#insertchild)

#### Defined in

[src/SceneTree/TreeItem.ts:483](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L483)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[insertParameter](../SceneTree_GeomItem.GeomItem#insertparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:149](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L149)

___

### isCutawayEnabled

▸ **isCutawayEnabled**(): `boolean`

Checks if cutaway is enabled.

#### Returns

`boolean`

- Returns `true` if enabled.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[isCutawayEnabled](../SceneTree_GeomItem.GeomItem#iscutawayenabled)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:90](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L90)

___

### isHighlighted

▸ **isHighlighted**(): `boolean`

Returns `true` if this items has a highlight color assigned.

#### Returns

`boolean`

- `True` if this item is highlighted.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[isHighlighted](../SceneTree_GeomItem.GeomItem#ishighlighted)

#### Defined in

[src/SceneTree/TreeItem.ts:339](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L339)

___

### isOverlay

▸ **isOverlay**(): `boolean`

Returns `true` if overlay is enabled for current item.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[isOverlay](../SceneTree_GeomItem.GeomItem#isoverlay)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:58](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L58)

___

### isSelectable

▸ **isSelectable**(): `boolean`

Returns a boolean indicating if this item is selectable.

#### Returns

`boolean`

- Returns a boolean indicating if the item is selectable.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[isSelectable](../SceneTree_GeomItem.GeomItem#isselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:185](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L185)

___

### isSelected

▸ **isSelected**(): `boolean`

The isSelected method.

#### Returns

`boolean`

- The return value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[isSelected](../SceneTree_GeomItem.GeomItem#isselected)

#### Defined in

[src/SceneTree/BaseItem.ts:209](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L209)

___

### isVisible

▸ **isVisible**(): `boolean`

Returns visible parameter value for current TreeItem.

#### Returns

`boolean`

- The visible param value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[isVisible](../SceneTree_GeomItem.GeomItem#isvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:186](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L186)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[off](../SceneTree_GeomItem.GeomItem#off)

#### Defined in

[src/Utilities/EventEmitter.ts:97](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L97)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[on](../SceneTree_GeomItem.GeomItem#on)

#### Defined in

[src/Utilities/EventEmitter.ts:44](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L44)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onPointerDown](../SceneTree_GeomItem.GeomItem#onpointerdown)

#### Defined in

[src/SceneTree/TreeItem.ts:767](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L767)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onPointerEnter](../SceneTree_GeomItem.GeomItem#onpointerenter)

#### Defined in

[src/SceneTree/TreeItem.ts:818](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L818)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onPointerLeave](../SceneTree_GeomItem.GeomItem#onpointerleave)

#### Defined in

[src/SceneTree/TreeItem.ts:835](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L835)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onPointerMove](../SceneTree_GeomItem.GeomItem#onpointermove)

#### Defined in

[src/SceneTree/TreeItem.ts:801](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L801)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onPointerUp](../SceneTree_GeomItem.GeomItem#onpointerup)

#### Defined in

[src/SceneTree/TreeItem.ts:784](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L784)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onTouchCancel](../SceneTree_GeomItem.GeomItem#ontouchcancel)

#### Defined in

[src/SceneTree/TreeItem.ts:863](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L863)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[onWheel](../SceneTree_GeomItem.GeomItem#onwheel)

#### Defined in

[src/SceneTree/TreeItem.ts:849](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L849)

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
| `listener` | (`event`: [`BaseEvent`](../../Utilities/Utilities_BaseEvent.BaseEvent)) => `void` | The listener value |

#### Returns

`number`

- the id that can be used to remove the listener.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[once](../SceneTree_GeomItem.GeomItem#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L82)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[parameterValueChanged](../SceneTree_GeomItem.GeomItem#parametervaluechanged)

#### Defined in

[src/SceneTree/ParameterOwner.ts:124](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L124)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[propagateVisibility](../SceneTree_GeomItem.GeomItem#propagatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:205](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L205)

___

### readBinary

▸ **readBinary**(`reader`, `context`): `void`

Initializes CADBody's asset, material, version and layers; adding current `CADBody` Geometry Item toall the layers in reader

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reader` | [`BinReader`](../SceneTree_BinReader.BinReader) | The reader param. |
| `context` | [`AssetLoadContext`](../SceneTree_AssetLoadContext.AssetLoadContext) | The context param. |

#### Returns

`void`

#### Overrides

[GeomItem](../SceneTree_GeomItem.GeomItem).[readBinary](../SceneTree_GeomItem.GeomItem#readbinary)

#### Defined in

[src/SceneTree/CAD/CADBody.ts:65](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/CAD/CADBody.ts#L65)

___

### removeAllChildren

▸ **removeAllChildren**(): `void`

Removes all children Items.

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeAllChildren](../SceneTree_GeomItem.GeomItem#removeallchildren)

#### Defined in

[src/SceneTree/TreeItem.ts:650](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L650)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeChild](../SceneTree_GeomItem.GeomItem#removechild)

#### Defined in

[src/SceneTree/TreeItem.ts:612](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L612)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeChildByHandle](../SceneTree_GeomItem.GeomItem#removechildbyhandle)

#### Defined in

[src/SceneTree/TreeItem.ts:641](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L641)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeChildByName](../SceneTree_GeomItem.GeomItem#removechildbyname)

#### Defined in

[src/SceneTree/TreeItem.ts:628](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L628)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeHighlight](../SceneTree_GeomItem.GeomItem#removehighlight)

#### Defined in

[src/SceneTree/TreeItem.ts:281](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L281)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeListenerById](../SceneTree_GeomItem.GeomItem#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/819769315/src/Utilities/EventEmitter.ts#L134)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[removeParameter](../SceneTree_GeomItem.GeomItem#removeparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:176](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L176)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[replaceParameter](../SceneTree_GeomItem.GeomItem#replaceparameter)

#### Defined in

[src/SceneTree/ParameterOwner.ts:198](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/ParameterOwner.ts#L198)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[resolvePath](../SceneTree_GeomItem.GeomItem#resolvepath)

#### Defined in

[src/SceneTree/TreeItem.ts:684](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L684)

___

### setBoundingBoxDirty

▸ `Private` **setBoundingBoxDirty**(): `void`

The setBoundingBoxDirty method.

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[setBoundingBoxDirty](../SceneTree_GeomItem.GeomItem#setboundingboxdirty)

#### Defined in

[src/SceneTree/TreeItem.ts:369](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L369)

___

### setCutDist

▸ **setCutDist**(`cutAwayDist`): `void`

Sets cutaway distance value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cutAwayDist` | `number` | The cutAwayDist value. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[setCutDist](../SceneTree_GeomItem.GeomItem#setcutdist)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:137](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L137)

___

### setCutVector

▸ **setCutVector**(`cutAwayVector`): `void`

Sets cutaway vector value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cutAwayVector` | [`Vec3`](../../Math/Math_Vec3.Vec3) | The cutAwayVector value. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[setCutVector](../SceneTree_GeomItem.GeomItem#setcutvector)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:118](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L118)

___

### setCutawayEnabled

▸ **setCutawayEnabled**(`state`): `void`

Sets cutaway state.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `boolean` | `true` to enable it, otherwise `false`. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[setCutawayEnabled](../SceneTree_GeomItem.GeomItem#setcutawayenabled)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:99](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L99)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setMetadata](../SceneTree_GeomItem.GeomItem#setmetadata)

#### Defined in

[src/SceneTree/BaseItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L254)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setName](../SceneTree_GeomItem.GeomItem#setname)

#### Defined in

[src/SceneTree/BaseItem.ts:86](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L86)

___

### setOverlay

▸ **setOverlay**(`val`): `void`

Sets overlay value.

**`todo`** Need to find the layer and add this item to it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `val` | `boolean` | `true` to enable it. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[setOverlay](../SceneTree_GeomItem.GeomItem#setoverlay)

#### Defined in

[src/SceneTree/BaseGeomItem.ts:48](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseGeomItem.ts#L48)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setOwner](../SceneTree_GeomItem.GeomItem#setowner)

#### Defined in

[src/SceneTree/TreeItem.ts:122](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L122)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setParentItem](../SceneTree_GeomItem.GeomItem#setparentitem)

#### Defined in

[src/SceneTree/TreeItem.ts:174](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L174)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setSelectable](../SceneTree_GeomItem.GeomItem#setselectable)

#### Defined in

[src/SceneTree/BaseItem.ts:195](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L195)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setSelected](../SceneTree_GeomItem.GeomItem#setselected)

#### Defined in

[src/SceneTree/BaseItem.ts:219](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L219)

___

### setShatterState

▸ **setShatterState**(`state`): `void`

Sets the state of this CADBody whether the geometry isdisplayed as
'shattered', meaning that each face, edge and vertex can be selected
individually.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `state` | `boolean` | The state value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/CAD/CADBody.ts:36](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/CAD/CADBody.ts#L36)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[setVisible](../SceneTree_GeomItem.GeomItem#setvisible)

#### Defined in

[src/SceneTree/TreeItem.ts:196](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L196)

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

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[toJSON](../SceneTree_GeomItem.GeomItem#tojson)

#### Defined in

[src/SceneTree/TreeItem.ts:881](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L881)

___

### toString

▸ **toString**(`context`): `string`

Returns string representation of current object's state.

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `Record`<`string`, `any`\> |

#### Returns

`string`

- The return value.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[toString](../SceneTree_GeomItem.GeomItem#tostring)

#### Defined in

[src/SceneTree/GeomItem.ts:254](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L254)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[traverse](../SceneTree_GeomItem.GeomItem#traverse)

#### Defined in

[src/SceneTree/TreeItem.ts:736](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L736)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[unbindChild](../SceneTree_GeomItem.GeomItem#unbindchild)

#### Defined in

[src/SceneTree/TreeItem.ts:591](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L591)

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

[GeomItem](../SceneTree_GeomItem.GeomItem).[updateChildNameMapping](../SceneTree_GeomItem.GeomItem#updatechildnamemapping)

#### Defined in

[src/SceneTree/TreeItem.ts:453](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L453)

___

### updatePath

▸ `Private` **updatePath**(): `void`

The updatePath method.

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[updatePath](../SceneTree_GeomItem.GeomItem#updatepath)

#### Defined in

[src/SceneTree/TreeItem.ts:153](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L153)

___

### updateVisibility

▸ `Private` **updateVisibility**(): `boolean`

The updateVisibility method.

#### Returns

`boolean`

- Returns a boolean.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[updateVisibility](../SceneTree_GeomItem.GeomItem#updatevisibility)

#### Defined in

[src/SceneTree/TreeItem.ts:215](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/TreeItem.ts#L215)

___

### getNumBaseItems

▸ `Static` **getNumBaseItems**(): `number`

The getNumBaseItems method returns the total number of base items created.
This method is used in debugging memory consumption.

#### Returns

`number`

- Returns the total number of base items created.

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[getNumBaseItems](../SceneTree_GeomItem.GeomItem#getnumbaseitems)

#### Defined in

[src/SceneTree/BaseItem.ts:64](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/BaseItem.ts#L64)

___

### setCalculatePreciseBoundingBoxes

▸ `Static` **setCalculatePreciseBoundingBoxes**(`value`): `void`

Sets the global boolean that controls if GeomItems calculate precise bounding boxes
or use the approximate bounding boxes that are much faster to generate.
Note: computing the precise bounding box is much slower and can make loading
big scenes take a bit longer. This setting is only relevant to geometries loaded
from zcad files.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `boolean` | true for precise bounding boxes, else false for faster approximate bounding boxes. |

#### Returns

`void`

#### Inherited from

[GeomItem](../SceneTree_GeomItem.GeomItem).[setCalculatePreciseBoundingBoxes](../SceneTree_GeomItem.GeomItem#setcalculatepreciseboundingboxes)

#### Defined in

[src/SceneTree/GeomItem.ts:317](https://github.com/ZeaInc/zea-engine/blob/819769315/src/SceneTree/GeomItem.ts#L317)

