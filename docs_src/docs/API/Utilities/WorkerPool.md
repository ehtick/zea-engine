---
id: "Utilities_WorkerPool.WorkerPool"
title: "Class: WorkerPool<WorkerClass>"
sidebar_label: "WorkerPool"
custom_edit_url: null
---



## Type parameters

| Name |
| :------ |
| `WorkerClass` |

## Hierarchy

- [`EventEmitter`](Utilities_EventEmitter.EventEmitter)

  ↳ **`WorkerPool`**

## Constructors

### constructor

• **new WorkerPool**<`WorkerClass`\>(`terminateWorkersWhenFree`)

Initializes an empty `listeners` map that will host all the events,
which implies that it doesn't allow multiple events with the same name.

#### Type parameters

| Name |
| :------ |
| `WorkerClass` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `terminateWorkersWhenFree` | `boolean` |

#### Overrides

[EventEmitter](Utilities_EventEmitter.EventEmitter).[constructor](Utilities_EventEmitter.EventEmitter#constructor)

#### Defined in

[src/Utilities/WorkerPool.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L26)

## Properties

### \_\_id

• `Protected` **\_\_id**: `number`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[__id](Utilities_EventEmitter.EventEmitter#__id)

#### Defined in

[src/Utilities/BaseClass.ts:11](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L11)

___

### availableWorkers

• **availableWorkers**: `number`[] = `[]`

#### Defined in

[src/Utilities/WorkerPool.ts:21](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L21)

___

### listeners

• **listeners**: `Record`<`string`, (`event`: [`BaseEvent`](Utilities_BaseEvent.BaseEvent)) => `void`[]\> = `{}`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[listeners](Utilities_EventEmitter.EventEmitter#listeners)

#### Defined in

[src/Utilities/EventEmitter.ts:26](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L26)

___

### poolSize

• **poolSize**: `number`

#### Defined in

[src/Utilities/WorkerPool.ts:15](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L15)

___

### taskPromiseResolves

• **taskPromiseResolves**: `Record`<`number`, `fn`\> = `{}`

#### Defined in

[src/Utilities/WorkerPool.ts:18](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L18)

___

### taskQueue

• **taskQueue**: `Task`[] = `[]`

#### Defined in

[src/Utilities/WorkerPool.ts:20](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L20)

___

### terminateWorkersWhenFree

• **terminateWorkersWhenFree**: `boolean` = `true`

#### Defined in

[src/Utilities/WorkerPool.ts:23](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L23)

___

### terminationLatency

• **terminationLatency**: `number` = `2000`

#### Defined in

[src/Utilities/WorkerPool.ts:24](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L24)

___

### terminationTimeouts

• **terminationTimeouts**: `number`[] = `[]`

#### Defined in

[src/Utilities/WorkerPool.ts:22](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L22)

___

### workerTaskCount

• **workerTaskCount**: `number`[] = `[]`

#### Defined in

[src/Utilities/WorkerPool.ts:17](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L17)

___

### workers

• **workers**: `WorkerClass`[] = `[]`

#### Defined in

[src/Utilities/WorkerPool.ts:16](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L16)

## Methods

### addTask

▸ **addTask**(`taskData`, `transferables`): `Promise`<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `taskData` | `object` |
| `transferables` | `Transferable`[] |

#### Returns

`Promise`<`object`\>

#### Defined in

[src/Utilities/WorkerPool.ts:31](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L31)

___

### addTaskCallback

▸ **addTaskCallback**(`dataFactory`): `Promise`<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataFactory` | (`workerId`: `number`) => `TaskData` |

#### Returns

`Promise`<`object`\>

#### Defined in

[src/Utilities/WorkerPool.ts:40](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L40)

___

### addWorker

▸ `Private` **addWorker**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Utilities/WorkerPool.ts:95](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L95)

___

### allocWorker

▸ `Private` **allocWorker**(`workerId`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workerId` | `number` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Utilities/WorkerPool.ts:101](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L101)

___

### constructWorker

▸ `Abstract` **constructWorker**(): `Promise`<`WorkerClass`\>

#### Returns

`Promise`<`WorkerClass`\>

#### Defined in

[src/Utilities/WorkerPool.ts:155](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L155)

___

### consumeTask

▸ `Private` **consumeTask**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

#### Defined in

[src/Utilities/WorkerPool.ts:60](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L60)

___

### emit

▸ **emit**(`eventName`, `event?`): `void`

Triggers all listener functions in an event.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `event` | [`BaseEvent`](Utilities_BaseEvent.BaseEvent) | The data you want to pass down to all listener functions as parameter. |

#### Returns

`void`

#### Inherited from

[EventEmitter](Utilities_EventEmitter.EventEmitter).[emit](Utilities_EventEmitter.EventEmitter#emit)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[getClassName](Utilities_EventEmitter.EventEmitter#getclassname)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[getId](Utilities_EventEmitter.EventEmitter#getid)

#### Defined in

[src/Utilities/BaseClass.ts:25](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/BaseClass.ts#L25)

___

### messageWorker

▸ **messageWorker**(`workerId`, `message`): `Promise`<`object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `workerId` | `number` |
| `message` | `object` |

#### Returns

`Promise`<`object`\>

#### Defined in

[src/Utilities/WorkerPool.ts:163](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L163)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[off](Utilities_EventEmitter.EventEmitter#off)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[on](Utilities_EventEmitter.EventEmitter#on)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[once](Utilities_EventEmitter.EventEmitter#once)

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

[EventEmitter](Utilities_EventEmitter.EventEmitter).[removeListenerById](Utilities_EventEmitter.EventEmitter#removelistenerbyid)

#### Defined in

[src/Utilities/EventEmitter.ts:134](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/EventEmitter.ts#L134)

___

### scheduleWorkerTermination

▸ `Private` **scheduleWorkerTermination**(`workerId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `workerId` | `number` |

#### Returns

`void`

#### Defined in

[src/Utilities/WorkerPool.ts:147](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L147)

___

### terminateWorker

▸ `Protected` **terminateWorker**(`workerId`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `workerId` | `number` |

#### Returns

`void`

#### Defined in

[src/Utilities/WorkerPool.ts:157](https://github.com/ZeaInc/zea-engine/blob/bfc726cd6/src/Utilities/WorkerPool.ts#L157)

