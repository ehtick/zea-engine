---
id: "SceneTree_GeomLibrary.GeomLibrary"
title: "Class: GeomLibrary"
sidebar_label: "GeomLibrary"
custom_edit_url: null
---



Class representing a geometry library.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`GeomLibrary`**

## Constructors

### constructor

• **new GeomLibrary**(`assetItem`)

Create a geom library.

#### Parameters

| Name | Type |
| :------ | :------ |
| `assetItem` | [`AssetItem`](SceneTree_AssetItem.AssetItem) |

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/GeomLibrary.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L82)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### assetItem

• `Protected` **assetItem**: [`AssetItem`](SceneTree_AssetItem.AssetItem)

#### Defined in

[src/SceneTree/GeomLibrary.ts:70](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L70)

___

### basePath

• `Protected` **basePath**: `string` = `''`

#### Defined in

[src/SceneTree/GeomLibrary.ts:77](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L77)

___

### genBuffersOpts

• `Protected` **genBuffersOpts**: `Record`<`string`, `any`\> = `{}`

#### Defined in

[src/SceneTree/GeomLibrary.ts:73](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L73)

___

### geoms

• `Protected` **geoms**: ([`BaseGeom`](Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) \| [`BaseProxy`](Geometry/SceneTree_Geometry_GeomProxies.BaseProxy))[] = `[]`

#### Defined in

[src/SceneTree/GeomLibrary.ts:76](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L76)

___

### listenerIDs

• `Protected` **listenerIDs**: `Record`<`string`, `number`\> = `{}`

#### Defined in

[src/SceneTree/GeomLibrary.ts:71](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L71)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### loadContext

• `Protected` `Optional` **loadContext**: [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext)

#### Defined in

[src/SceneTree/GeomLibrary.ts:74](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L74)

___

### loadedCount

• `Protected` **loadedCount**: `number` = `0`

#### Defined in

[src/SceneTree/GeomLibrary.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L78)

___

### numGeoms

• `Protected` **numGeoms**: `number` = `-1`

#### Defined in

[src/SceneTree/GeomLibrary.ts:75](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L75)

___

### streamInfos

• `Protected` **streamInfos**: `Record`<`string`, `StreamInfo`\> = `{}`

#### Defined in

[src/SceneTree/GeomLibrary.ts:72](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L72)

## Methods

### \_\_receiveGeomDatas

▸ `Private` **__receiveGeomDatas**(`results`): `boolean`

The __receiveGeomDatas method.

#### Parameters

| Name | Type |
| :------ | :------ |
| `results` | `object` |

#### Returns

`boolean`

- returns true once all data for this geom library has been loaded.

#### Defined in

[src/SceneTree/GeomLibrary.ts:308](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L308)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[emit](../Utilities/Utilities_EventEmitter.EventEmitter#emit)

#### Defined in

[src/Utilities/EventEmitter.ts:154](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L154)

___

### getClassName

▸ **getClassName**(): `string`

Returns the unmangled name of the class.

#### Returns

`string`

- The name of the class definition.

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getClassName](../Utilities/Utilities_EventEmitter.EventEmitter#getclassname)

#### Defined in

[src/Utilities/BaseClass.ts:33](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L33)

___

### getGeom

▸ **getGeom**(`index`): [`BaseGeom`](Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) \| [`BaseProxy`](Geometry/SceneTree_Geometry_GeomProxies.BaseProxy)

The getGeom method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | The index value. |

#### Returns

[`BaseGeom`](Geometry/SceneTree_Geometry_BaseGeom.BaseGeom) \| [`BaseProxy`](Geometry/SceneTree_Geometry_GeomProxies.BaseProxy)

- The stored geometry

#### Defined in

[src/SceneTree/GeomLibrary.ts:175](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L175)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[getId](../Utilities/Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### getNumGeoms

▸ **getNumGeoms**(): `number`

Returns the number of geometries the GeomLibrary has, or will have at the end of loading.

#### Returns

`number`

- The number of geometries.

#### Defined in

[src/SceneTree/GeomLibrary.ts:166](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L166)

___

### isLoaded

▸ **isLoaded**(): `boolean`

The returns true if all the geometries have been loaded and the loaded event has already been emitted.

#### Returns

`boolean`

- True if all geometries are already loaded, else false.

#### Defined in

[src/SceneTree/GeomLibrary.ts:92](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L92)

___

### loadGeomFile

▸ `Private` **loadGeomFile**(`geomFileID`, `incrementProgress?`): `Promise`<`void`\>

Loads a single geometry file for this GeomLibrary.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `geomFileID` | `number` | `undefined` | The index of the file to load |
| `incrementProgress` | `boolean` | `false` | If true, the progress bar is incremented and decremented. |

#### Returns

`Promise`<`void`\>

the promise resolves once the file is loaded, but not parsed.

#### Defined in

[src/SceneTree/GeomLibrary.ts:105](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L105)

___

### loadGeomFilesStream

▸ **loadGeomFilesStream**(`geomLibraryJSON`, `basePath`, `context`): `void`

Loads the geometry files for this GeomLibrary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomLibraryJSON` | `Record`<`string`, `any`\> | The json data describing the data needed to be loaded by the geom library |
| `basePath` | `string` | The base path of the file. (this is theURL of the zcad file without its extension.) |
| `context` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/GeomLibrary.ts:132](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L132)

___

### loadMetadata

▸ **loadMetadata**(`data`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `Uint8Array` |
| `context` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) |

#### Returns

`void`

#### Defined in

[src/SceneTree/GeomLibrary.ts:396](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L396)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[off](../Utilities/Utilities_EventEmitter.EventEmitter#off)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[on](../Utilities/Utilities_EventEmitter.EventEmitter#on)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[once](../Utilities/Utilities_EventEmitter.EventEmitter#once)

#### Defined in

[src/Utilities/EventEmitter.ts:82](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L82)

___

### readBinaryBuffer

▸ **readBinaryBuffer**(`geomFileID`, `buffer`, `context`): `void`

The readBinaryBuffer method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `geomFileID` | `string` | The key value. |
| `buffer` | `ArrayBuffer` | The buffer value. |
| `context` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) | The context value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/GeomLibrary.ts:189](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L189)

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

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[removeListenerById](../Utilities/Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### setGenBufferOption

▸ **setGenBufferOption**(`key`, `value`): `void`

The setGenBufferOption method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | The key value. |
| `value` | `any` | The value param. |

#### Returns

`void`

#### Defined in

[src/SceneTree/GeomLibrary.ts:150](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L150)

___

### setNumGeoms

▸ **setNumGeoms**(`expectedNumGeoms`): `void`

The setNumGeoms method.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `expectedNumGeoms` | `number` | The expectedNumGeoms value. |

#### Returns

`void`

#### Defined in

[src/SceneTree/GeomLibrary.ts:158](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L158)

___

### toJSON

▸ **toJSON**(): `Record`<`string`, `any`\>

The toJSON method encodes this type as a json object for persistence.

#### Returns

`Record`<`string`, `any`\>

- Returns the json object.

#### Defined in

[src/SceneTree/GeomLibrary.ts:379](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L379)

___

### toString

▸ **toString**(): `string`

The toString method.

#### Returns

`string`

- The return value.

#### Defined in

[src/SceneTree/GeomLibrary.ts:389](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/GeomLibrary.ts#L389)

