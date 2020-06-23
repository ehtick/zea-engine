## Classes

<dl>
<dt><a href="#AudioItem">AudioItem</a> ⇐ <code>TreeItem</code></dt>
<dd><p>Class representing an audio item in a scene tree.</p>
</dd>
<dt><a href="#FileAudioItem">FileAudioItem</a> ⇐ <code><a href="#AudioItem">AudioItem</a></code></dt>
<dd><p>Class representing a audio file item in a scene tree.</p>
</dd>
</dl>

<a name="AudioItem"></a>

## AudioItem ⇐ <code>TreeItem</code>
Class representing an audio item in a scene tree.

**Kind**: global class  
**Extends**: <code>TreeItem</code>  

* [AudioItem ⇐ <code>TreeItem</code>](#AudioItem)
    * [new AudioItem(name)](#new-AudioItem)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [setAudioStream(audio)](#setAudioStream)

<a name="new_AudioItem_new"></a>

### new AudioItem
Create an audio item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the audio item. |

<a name="AudioItem+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>AudioItem</code>](#AudioItem)  
**Returns**: <code>any</code> - - The return value.  
<a name="AudioItem+setAudioStream"></a>

### setAudioStream
The setAudioStream method.

**Kind**: instance method of [<code>AudioItem</code>](#AudioItem)  

| Param | Type | Description |
| --- | --- | --- |
| audio | <code>any</code> | The audio value. |

<a name="FileAudioItem"></a>

## FileAudioItem ⇐ [<code>AudioItem</code>](#AudioItem)
Class representing a audio file item in a scene tree.

**Kind**: global class  
**Extends**: [<code>AudioItem</code>](#AudioItem)  

* [FileAudioItem](#FileAudioItem)
    * [new FileAudioItem(name)](#new-FileAudioItem)
    * [isLoaded() ⇒ <code>any</code>](#isLoaded)
    * [setAudioStream(audio)](#setAudioStream)

<a name="new_FileAudioItem_new"></a>

### new FileAudioItem
Create a audio file item.


| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The name of the audio file. |

<a name="AudioItem+isLoaded"></a>

### isLoaded
The isLoaded method.

**Kind**: instance method of [<code>FileAudioItem</code>](#FileAudioItem)  
**Overrides**: [<code>isLoaded</code>](#AudioItem+isLoaded)  
**Returns**: <code>any</code> - - The return value.  
<a name="AudioItem+setAudioStream"></a>

### setAudioStream
The setAudioStream method.

**Kind**: instance method of [<code>FileAudioItem</code>](#FileAudioItem)  
**Overrides**: [<code>setAudioStream</code>](#AudioItem+setAudioStream)  

| Param | Type | Description |
| --- | --- | --- |
| audio | <code>any</code> | The audio value. |
