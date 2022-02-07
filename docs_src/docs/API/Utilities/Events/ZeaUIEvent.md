---
id: "Utilities_Events_ZeaUIEvent.ZeaUIEvent"
title: "Class: ZeaUIEvent"
sidebar_label: "ZeaUIEvent"
custom_edit_url: null
---



ZeaUIEvent are emitted from a 2D UI, such as from a HTMLCanvas element generated from
a mouse or touch interaction, or key presses

## Hierarchy

- [`BaseEvent`](../Utilities_BaseEvent.BaseEvent)

  ↳ **`ZeaUIEvent`**

  ↳↳ [`KeyboardEvent`](Utilities_Events_KeyboardEvent.KeyboardEvent)

  ↳↳ [`ZeaPointerEvent`](Utilities_Events_ZeaPointerEvent.ZeaPointerEvent)

## Constructors

### constructor

• **new ZeaUIEvent**()

Create an BaseEvent.

#### Overrides

[BaseEvent](../Utilities_BaseEvent.BaseEvent).[constructor](../Utilities_BaseEvent.BaseEvent#constructor)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:13](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/Events/ZeaUIEvent.ts#L13)

## Properties

### propagating

• **propagating**: `boolean` = `true`

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:11](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/Events/ZeaUIEvent.ts#L11)

___

### viewport

• **viewport**: [`GLBaseViewport`](../../Renderer/Renderer_GLBaseViewport.GLBaseViewport)

#### Defined in

[src/Utilities/Events/ZeaUIEvent.ts:10](https://github.com/ZeaInc/zea-engine/blob/61f5bb376/src/Utilities/Events/ZeaUIEvent.ts#L10)

