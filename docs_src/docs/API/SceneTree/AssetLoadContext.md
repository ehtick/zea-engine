---
id: "SceneTree_AssetLoadContext.AssetLoadContext"
title: "Class: AssetLoadContext"
sidebar_label: "AssetLoadContext"
custom_edit_url: null
---



Provides a context for loading assets. This context can provide the units of the loading scene.
E.g. you can specify the scene units as 'millimeters' in the context object.
To load external references, you can also provide a dictionary that maps filenames to URLs that are used
to resolve the URL of an external reference that a given asset is expecting to find.

## Hierarchy

- [`EventEmitter`](../Utilities/Utilities_EventEmitter.EventEmitter)

  ↳ **`AssetLoadContext`**

## Constructors

### constructor

• **new AssetLoadContext**(`context?`)

Create a AssetLoadContext

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `context?` | [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext) | The source context to base this context on. |

#### Overrides

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[constructor](../Utilities/Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/SceneTree/AssetLoadContext.ts:35](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L35)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[__id](../Utilities/Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### addGeomToLayer

• **addGeomToLayer**: (`geomItem`: [`BaseGeomItem`](SceneTree_BaseGeomItem.BaseGeomItem), `layer`: `string`) => `void`

#### Type declaration

▸ (`geomItem`, `layer`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `geomItem` | [`BaseGeomItem`](SceneTree_BaseGeomItem.BaseGeomItem) |
| `layer` | `string` |

##### Returns

`void`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:30](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L30)

___

### assetItem

• **assetItem**: [`AssetItem`](SceneTree_AssetItem.AssetItem) = `null`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L23)

___

### asyncCount

• `Protected` **asyncCount**: `number` = `0`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:28](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L28)

___

### camera

• **camera**: [`Camera`](SceneTree_Camera.Camera) = `null`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L22)

___

### folder

• **folder**: `string` = `''`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L21)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](../Utilities/Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](../Utilities/Utilities_EventEmitter.EventEmitter).[listeners](../Utilities/Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### postLoadCallbacks

• `Protected` **postLoadCallbacks**: () => `void`[] = `[]`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:27](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L27)

___

### resources

• **resources**: `Record`<`string`, `string`\> = `null`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L24)

___

### sdk

• **sdk**: `string` = `''`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:19](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L19)

___

### units

• **units**: `string` = `'meters'`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:17](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L17)

___

### url

• **url**: `string` = `''`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L20)

___

### versions

• **versions**: `Record`<`string`, [`Version`](SceneTree_Version.Version)\> = `{}`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L18)

___

### xrefLoadCallback

• **xrefLoadCallback**: (`resourceId`: `string`, `xref`: [`XRef`](CAD/SceneTree_CAD_XRef.XRef)) => `string` = `null`

#### Type declaration

▸ (`resourceId`, `xref`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `resourceId` | `string` |
| `xref` | [`XRef`](CAD/SceneTree_CAD_XRef.XRef) |

##### Returns

`string`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L26)

___

### xrefs

• **xrefs**: `Record`<`string`, [`XRef`](CAD/SceneTree_CAD_XRef.XRef)\> = `{}`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L25)

## Methods

### addPLCB

▸ **addPLCB**(`postLoadCallback`): `void`

Adds a function to be called back once the main load call stack exists.
This is used to connect parts of the tree together after loading.
e.g. an instance will

#### Parameters

| Name | Type |
| :------ | :------ |
| `postLoadCallback` | () => `void` |

#### Returns

`void`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:116](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L116)

___

### clone

▸ **clone**(): [`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext)

The clone method constructs a new AssetLoadContext, copies its values
from this instance and returns it.

#### Returns

[`AssetLoadContext`](SceneTree_AssetLoadContext.AssetLoadContext)

#### Defined in

[src/SceneTree/AssetLoadContext.ts:124](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L124)

___

### decrementAsync

▸ **decrementAsync**(): `void`

As each external reference completes loading, it decrements this counter allowing the owning
asset to know that the subtrees are loaded.

#### Returns

`void`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:62](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L62)

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

### incrementAsync

▸ **incrementAsync**(): `void`

During loading, asynchronous processes may be launched, and subsequently completed.
These method helps the Asset track how many asynchronous loading operations may be
occurring with the tree during load.
As each external reference starts to load, it increments this counter, letting the owning
Asset know to wait till the children are loaded before emitting its own 'loaded' event.

#### Returns

`void`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:54](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L54)

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

### resolvePath

▸ **resolvePath**(`path`, `onSucceed`, `onFail`): `void`

Resolves a path within the loading asset. This is used to connect
items within the tree to other items. e.g. a Group can find its members.
or an instance can find its source tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string`[] | the path within the tree relative to the loading asset |
| `onSucceed` | (`result`: [`Parameter`](Parameters/SceneTree_Parameters_Parameter.Parameter)<`any`\> \| [`BaseItem`](SceneTree_BaseItem.BaseItem)) => `void` | called with the successful result of the path resolution. |
| `onFail` | (`e`: `Error`) => `void` | called when the path resolution fails. |

#### Returns

`void`

#### Defined in

[src/SceneTree/AssetLoadContext.ts:78](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/SceneTree/AssetLoadContext.ts#L78)

