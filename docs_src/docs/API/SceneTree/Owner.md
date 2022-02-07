---
id: "SceneTree_Owner.Owner"
title: "Interface: Owner"
sidebar_label: "Owner"
custom_edit_url: null
---



## Implemented by

- [`BaseItem`](SceneTree_BaseItem.BaseItem)
- [`MaterialLibrary`](SceneTree_MaterialLibrary.MaterialLibrary)

## Methods

### getPath

▸ **getPath**(): `string`[]

Returns the current path of the item in the tree as an array of names.

#### Returns

`string`[]

- Returns an array.

#### Defined in

[src/SceneTree/Owner.ts:10](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/SceneTree/Owner.ts#L10)

___

### resolvePath

▸ **resolvePath**(`path`, `index?`): [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](SceneTree_BaseItem.BaseItem)

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string`[] |
| `index?` | `number` |

#### Returns

[`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](SceneTree_BaseItem.BaseItem)

#### Defined in

[src/SceneTree/Owner.ts:12](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/SceneTree/Owner.ts#L12)

