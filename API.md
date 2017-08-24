# API Documentation

## Table of Contents

* [DOM Node](#dom-node)
* [Cascading Stylesheet](#cascading-stylesheet)
* [Color](#color)
* [Events](#events)
* [Dimension and Positioning](#dimension-and-positioning)
* [Node Selection](#node-selection)
* [Animation](#animation)
* [Misc](#misc)

## DOM Node

#### `is(node[, nodeType[,...]])`

* Checks if `node` is a DOM Node filtered by any given `nodeType` parameters.
* If `nodeType` is omitted, it will match any DOM Node.

Parameter

Name    | Type  | Description
--        |--     |--
node      | Mixed | any value to inspect
[nodeType]  | Number | (optional, multiple) nodeType filter (e.g. Element = 1, Document = 9)

Returns

Value | Type  | Description
--    |--     |--
true  | Boolean | if [node] parameter is an HTML DOM node.
false | Boolean | if not an HTML DOM node.

---

#### `isView(defaultView)`

* Checks if `defaultView` is an instance of window or defaultView.

Parameter

Name      | Type  | Description
--        |--     |--
defaultView | Mixed | any value to inspect

Returns

Value | Type  | Description
--    |--     |--
true  | Boolean | if [defaultView] parameter is an instance of window or defaultView.
false | Boolean | if not an instance of window or defaultView.

---

#### `contains(ancestor, descendant)`

* Checks if `ancestor` node has `descendant` node in any depth.

Parameter

Name      | Type  | Description
--        |--     |--
ancestor  | Node  | DOM Node of nodeType: Element, Document, or Fragment.
descendant  | Node  | DOM Node of any nodeType.

Returns

Value | Type  | Description
--    |--     |--
true  | Boolean | if [ancestor] contains [descendant] in DOM tree.
false | Boolean | if [ancestor] doesn't contain [descendant] node.

---

#### `select(dom, selector)`

* Selects nodes within `dom` parameter filtered by CSS `selector` query.
* This throws error if querySelectorAll() is not supported.

Parameter

Name      | Type  | Description
--        |--     |--
dom | Node | DOM Node of nodeType: Element, or Document
selector | String | Browser supported CSS selector.

Returns

Value | Type  | Description
--    |--     |--
Array(HTMLElement,..) | Array | May be empty if no node matched the `selector`.

---

#### `add(element, config[, before])`

* Adds child Node `config` (or create if it's an element configuration Object) to `element` Node.
* This will insert the `config` element before `before` Node if `before` is a valid childnode of `element`.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | DOM Node of nodeType: Element, or Fragment
config | Node or Object | if Node of nodeType: Element, Fragment, Comment, Text, and Processing Instruction then it will be inserted directly. If config is Object, It will be created and configured as DOM Element.
[before] | Node | (optional) `config` Node will be inserted before this node. *(default is `null`)*

Returns

Value | Type  | Description
--    |--     |--
HTMLElement | Node | The inserted `config` Node (or newly the created Node if `config` is Object).

---

#### `move(nodes, element)`

* Relocate `nodes` as child of `element`.

Parameter

Name      | Type  | Description
--        |--     |--
nodes | Array(Node) or Node | DOM Node of nodeType: Element, Comment, Text, or Processing Instruction. Or, an Array of those nodes.
element | Node | Element Node as parent Node of `nodes`

Returns

Value | Type  | Description
--    |--     |--
HTMLElement | Node | The `element` parent Node.

---

#### `replace(node, config[, destroy])`

* Replaces `node` with `config` Node
* If `config` is an Object, new Node will be created based on `config` Object.

Parameter

Name      | Type  | Description
--        |--     |--
node | Node | DOM Node of nodeType: Element, or Fragment
config | Node or Object | if Node of nodeType: Element, Fragment, Comment, Text, and Processing Instruction then it will be inserted directly. If config is Object, It will be created and configured as DOM Element.
[destroy] | Boolean | (optional) when `true` and `node` is an element Node, all DOM events registered to the element is destroyed. *(default is `false`)*

Returns

Value | Type  | Description
--    |--     |--
HTMLElement | Node | The inserted `config` Node as replacement (or newly the created Node if `config` is Object).

---

#### `remove(node[, destroy])`

* Removes `node` from its parent Node.
* Optionally disable node destruction when `destroy` is `false` or if `node` is not an element Node.

Parameter

Name      | Type  | Description
--        |--     |--
node | Node | DOM Node of nodeType: Element, Fragment, Comment, Text, or Processing Instruction.
[destroy] | Boolean | (optional) when `true` and `node` is an element Node, all DOM events registered to the element is destroyed. *(default is `false`)*

Returns

Value | Type  | Description
--    |--     |--
HTMLElement | Node | The removed (or destroyed) Node `node`.

## Cascading Stylesheet

#### `addClass(element, classNames)`

* Adds `classNames` (or Array of `classNames`) into `element`.
* `classNames` (or Array of `classNames`) will not be added if it exist already in "class" attribute of `element`.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.
classNames | String or Array(String) | CSS class to append

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | The libdom module for chaining method calls.

---

#### `removeClass(element, classNames)`

* Removes `classNames` (or Array of `classNames`) attached to `element`.
* `classNames` (or Array of `classNames`) will not be removed if it doesn't exist in "class" attribute of `element`.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.
classNames | String or Array(String) | CSS class names to remove.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | The libdom module for chaining method calls.


#### `computedStyle(element, ruleNames)`

* Extracts CSS computed styles of `element` listed in `ruleNames`.
* If `ruleNames` is not an Array, it is expected that `ruleNames` parameter is spread across the function `arguments`.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.
ruleNames | String or Array(String) | (multiple if String) list of CSS rule names or CSS rule name if String.

Returns

Value | Type  | Description
--    |--     |--
Object([ruleName]:[value], ... ) | Object | The computed style extracted limited to the given `ruleNames`.

--

#### `stylize(element, rules[, value])`

* Applies CSS `rules` Object to `element` style attribute.
* If `rules` is String then `element` style is set individually using `value` parameter.
* If `value` or property value of `rules` is `null` or `undefined`, then CSS rule(s) will be removed from `element` style attribute.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.
rules | String or Object | CSS rules Object to apply or individually set CSS rule String with `value` parameter.
[value] | Mixed | (optional) only applicable if `rules` parameter is String

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---

#### `stylize(element, rules[, value])`

* Applies CSS `rules` Object to `element` style attribute.
* If `rules` is String then `element` style is set individually using `value` parameter. Or when `value` parameter is omitted, `rules` will be applied as cssText to `element` style attribute.
* If `value` or property value of `rules` is `null` or `undefined`, then CSS rule(s) will be removed from `element` style attribute.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.
rules | String or Object | CSS rules Object to apply. When `rules` is String, it will individually set CSS rule String with `value` parameter. Or when `value` is omitted, `rules` parameter is treated as cssText and applied to element style attribute.
[value] | Mixed | (optional) only applicable if `rules` parameter is String

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

#### `stylify(element)`

* Extracts CSS rules in `element` style attribute.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.

Returns

Value | Type  | Description
--    |--     |--
Object(CSS rules) | Object | CSS rules extracted.

## Color

#### `parseColor(subject)`

* Creates Number presentation of String color `subject` formatted in hex (`#fff` or `#fffff`), `rgb(255,255,255)`, `rgba(255,255,255,1)`, `hsl(359,100%,100%)`, or `hsla(359,100%,100%,1)`.
* The extracted Number presentation is useful for transitioning colors in combination with `formatColor(colorValue:Number, type:String)`.

Parameter

Name      | Type  | Description
--        |--     |--
subject | String | String in hex, rgb, rba, hsl, or hsl format.

Returns

Value | Type  | Description
--    |--     |--
Number(12234) | Number | `subject` is in valid color format and succesfully parsed.
null  | Null | `subject` is contains invalid color format, malformed or not recognized.

---

#### `parseType(subject)`

* Extracts String `subject` color format information.
* Array Color information contains the following items:
`[type:String, isHexFormat:Boolean, items:String|Array]`
> Examples:
>
> ['hex', true, 'ff00aa']
>
> ['rgba', false, ['255', '120', '100', '0.5']]

Parameter

Name      | Type  | Description
--        |--     |--
subject | String | String in hex, rgb, rba, hsl, or hsl format.

Returns

Value | Type  | Description
--    |--     |--
Array(type, isHexFormat, items) | Array | `subject` is in valid color format and succesfully parsed.
null  | Null | `subject` is contains invalid color format, malformed or not recognized.

---

#### `formatColor(colorValue[, type])`

* Generates a formatted color string from the given Number `colorValue` and String `type` color format.

Parameter

Name      | Type  | Description
--        |--     |--
colorValue | Number | The Number presentation of color which may be generated from `parseColor(subject:String)`.
[type]  | String  | (optional) Supported color types that should be one of the following values: `"hex"`, `"rgb"`, `"rgba"`, `"hsl"`, or `"hsla"`.

Returns

Value | Type  | Description
--    |--     |--
"#ff00ff" | String | If `type` is `"hex"`.
"rgb(255,255,255)" | String | If `type` is `"rgb"`.
"rgba(255,255,255,1)" | String | If `type` is `"rgba"`.
"hsl(240,100%,50%)" | String | If `type` is `"hsl"`.
"hsl(120,100%,50%,1)" | String | If `type` is `"hsla"`.
null  | Null | `type` is not a supported color format.

## Events

#### `on(observable, type, handler[, context])`

* Listens to dispatched event `type` ocurring in `observable` and runs `handler` callback on each event dispatch.

Parameter

Name      | Type  | Description
--        |--     |--
observable | Mixed | Object supporting DOM Events (e.g. Node, Window, XMLHttpRequest).
type  | String  | event type or name (e.g. "load" for onload events).
handler | Function | callback of event dispatch.
[context] | Mixed | (optional) `this` object inside the handler which defaults to `Window` (or `undefined` in strict mode) if omitted.

Returns

Value | Type  | Description
--    |--     |--
Function(remove listener) | Function | The function that removes the event listener.

---

#### `un(observable, type, handler[, context])`

* Removes event listener in `observable` that matches event `type`, and `handler` (including `context` if provided).

Parameter

Name      | Type  | Description
--        |--     |--
observable | Mixed | Object supporting DOM Events (e.g. Node, Window, XMLHttpRequest).
type  | String  | event type or name (e.g. "load" for onload events).
handler | Function | callback of event dispatch.
[context] | Mixed | (optional) `this` object inside the handler which defaults to `Window` (or `undefined` in strict mode) if omitted.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---

#### `purge([observable, [type, [handler[, context]]]])`

* Removes all listeners that matches the parameters: `observable`, `type`, `handler`, and `context`.
* When all parameters are omitted, all event listeners registered are removed.

> Example
>
> - `purge(window, "load");` remove all "load" event listeners of `window`
> - `purge(window);` remove all event listeners of `window`
> - `purge(document.body, "mousemove", callback);` remove all "mousemove" event listeners of `document.body` having `callback` event handler.
> - `purge()` remove all event listeners. This is called automatically before webpage unloads.

Parameter

Name      | Type  | Description
--        |--     |--
[observable] | Mixed | (optional) Object supporting DOM Events (e.g. Node, Window, XMLHttpRequest).
[type]  | String  | (optional) event type or name (e.g. "load" for onload events).
[handler] | Function | (optional) callback of event dispatch.
[context] | Mixed | (optional) `this` object inside the handler which defaults to `Window` (or `undefined` in strict mode) if omitted.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---

#### `dispatch(observable, type, properties)`

* Dispatches custom DOM Event `type` to `observable`.
> Note:
>
> - IE 8 and below uses "propertychange" event type to dispatch event if `properties.bubbles = false`. And, "beforeupdate" event type if `bubbles = true`.
> - w3c standard browsers including IE9 supporting w3c Event throws errors to readonly Event object property after assigning `properties` to it.

Parameter

Name      | Type  | Description
--        |--     |--
observable | Mixed | Object supporting DOM Events (e.g. Node, Window, XMLHttpRequest).
type  | String  | event type or name (e.g. "load" for onload events).
properties | Object | Event Object property overrides.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

## Dimension and Positioning
## Node Selection
## Animation
## Misc
