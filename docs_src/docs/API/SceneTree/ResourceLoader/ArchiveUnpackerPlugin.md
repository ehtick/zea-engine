---
id: "SceneTree_ResourceLoader_ArchiveUnpackerPlugin.ArchiveUnpackerPlugin"
title: "Class: ArchiveUnpackerPlugin"
sidebar_label: "ArchiveUnpackerPlugin"
custom_edit_url: null
---



Archive unpacker plugin.

## Constructors

### constructor

• **new ArchiveUnpackerPlugin**()

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:76](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L76)

## Properties

### resourceLoader

• `Protected` **resourceLoader**: [`ResourceLoader`](../SceneTree_resourceLoader.ResourceLoader)

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L74)

___

### threadPool

• `Protected` **threadPool**: `ArchiveUnpackerWorkerPool`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:73](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L73)

## Methods

### getType

▸ **getType**(): `string`

The type of file this plugin handles.

#### Returns

`string`

The type of file.

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:86](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L86)

___

### init

▸ **init**(`resourceLoader`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `resourceLoader` | `any` |

#### Returns

`void`

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L78)

___

### loadFile

▸ **loadFile**(`url`): `Promise`<`unknown`\>

Loads an archive file, returning a promise that resolves to the JSON data value.
Note: using the resource loader to centralize data loading enables progress to be tracked and displayed

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | The url of the data to load. |

#### Returns

`Promise`<`unknown`\>

- The promise value.

#### Defined in

[src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts:96](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/ResourceLoader/ArchiveUnpackerPlugin.ts#L96)

