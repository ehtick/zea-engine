---
id: "SceneTree_Version.Version"
title: "Class: Version"
sidebar_label: "Version"
custom_edit_url: null
---



Class designed to store version data. Widely used in the zea engine for backwards compatibility.

## Constructors

### constructor

• **new Version**(`arg?`)

Creates a version.
The version string should have the following structure:
major, minor and patch separated by a dot(`.`) and parts separated by a dash(`-`).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg?` | `string` \| `number`[] | The version string value, or an array of version numbers. |

#### Defined in

[src/SceneTree/Version.ts:16](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L16)

## Properties

### branch

• **branch**: `string` = `''`

#### Defined in

[src/SceneTree/Version.ts:8](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L8)

___

### major

• **major**: `number` = `0`

#### Defined in

[src/SceneTree/Version.ts:5](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L5)

___

### minor

• **minor**: `number` = `0`

#### Defined in

[src/SceneTree/Version.ts:6](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L6)

___

### patch

• **patch**: `number` = `0`

#### Defined in

[src/SceneTree/Version.ts:7](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L7)

## Methods

### asArray

▸ **asArray**(): `number`[]

Converts the Version class instance back to an array for comparisons with other version class instances.
e.g.
```
  const version1 = new Version([1, 2, 3])
  const version2 = new Version([1, 2, 4])
  const res = version1.compare(version2.asArray())
```

#### Returns

`number`[]

an array containing the major, minor and patch version numbers.

#### Defined in

[src/SceneTree/Version.ts:58](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L58)

___

### compare

▸ **compare**(`numbers`): `number`

Compare a version object against a version numbers array.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `numbers` | `number`[] | An array containing 3 version numbers. [Major, Minor, Patch] |

#### Returns

`number`

- return positive: v1 > v2, zero:v1 == v2, negative: v1 < v2

#### Defined in

[src/SceneTree/Version.ts:38](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L38)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/SceneTree/Version.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/Version.ts#L62)

