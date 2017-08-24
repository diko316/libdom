# API Documentation

## Table of Contents

* [String](#string)

  - [xmlEncode()](#xmlencodesubject)
  - [xmlDecode()](#xmldecodesubject)

* [DOM](#dom)

  - [is()](#is-node-nodetype)
  - [isView()](#is-view-defaultview)
  - [contains()](#contains-ancestor-descendant)
  - [select()](#select-dom-selector)
  - [add()](#add-element-config-before)
  - [move()](#move-nodes-element)
  - [replace()](#replace-node-config-destroy)
  - [remove()](#remove-node-destroy)

* [Cascading Stylesheet](#cascading-stylesheet)

  - [addClass()](#addclass-element-classnames)
  - [removeClass()](#addclass-element-classnames)
  - [computedStyle()](#computedstyle-element-rulenames)
  - [stylize()](#stylize-element-rules-value)
  - [stylify()](#stylify-element)

* [Color](#color)

  - [parseColor()](#parsecolor-subject)
  - [parseColorType()](#parsecolortype-subject)
  - [formatColor()](#formatcolor-colorvalue-type)

* [Events](#events)

  - [on()](#on-observable-type-handler-context)
  - [un()](#un-observable-type-handler-context)
  - [purge()](#purge-observable-type-handler-context)
  - [dispatch()](#dispatch-observable-type-properties)
  - [destructor()](#destructor-handler)

* [Dimension and Positioning](#dimension-and-positioning)

  - [offset()](#offset-element-x-y)
  - [size()](#size-element-width-height)
  - [box()](#box-element-x-y-width-height)
  - [scroll()](#scroll-dom-x-y)
  - [screen()](#screen-dom)

* [Node Selection](#node-selection)

  - [highlight()](#highlight-from-to)
  - [unhighlightable()](#unhighlightable-element-disableselect)
  - [clearHighlight()](#clearhighlight-documentnode)

* [Animation](#animation)

  - [transition()](#transition-callback-from-to-type-duration)
  - [animateStyle()](#animatestyle-element-styles-type)

## String

### `xmlEncode(subject)`

* Encode HTML special characters in String `subject` into HTML entity returning an HTML safe String for `HTMLElement.innerHTML` operations.

Parameter

Name    | Type  | Description
--        |--     |--
subject      | String | Raw String value to encode.

Returns

Value | Type  | Description
--    |--     |--
String(with HTML entities)  | String | Encoded String.

### `xmlDecode(subject)`

* Decodes HTML entities in String `subject` into HTML special characters returning the original/raw String value of `subject`.

Parameter

Name    | Type  | Description
--        |--     |--
subject      | String | HTML encoded String to decode.

Returns

Value | Type  | Description
--    |--     |--
String(raw String with decoded HTML entities)  | String | Decoded String.

## DOM

### `is(node[, nodeType[,...]])`
test
: Checks if `node` is a DOM Node filtered by any given `nodeType` parameters.
: If `nodeType` is omitted, it will match any DOM Node.

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

### `isView(defaultView)`

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

### `contains(ancestor, descendant)`

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

### `select(dom, selector)`

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

### `add(element, config[, before])`

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

### `move(nodes, element)`

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

### `replace(node, config[, destroy])`

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

### `remove(node[, destroy])`

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

### `addClass(element, classNames)`

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

### `removeClass(element, classNames)`

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


### `computedStyle(element, ruleNames)`

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

### `stylize(element, rules[, value])`

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

### `stylize(element, rules[, value])`

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

### `stylify(element)`

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

### `parseColor(subject)`

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

### `parseColorType(subject)`

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

### `formatColor(colorValue[, type])`

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

### `on(observable, type, handler[, context])`

* Listens to dispatched event `type` ocurring in `observable` and runs `handler` callback on each event dispatch.

* `handler` is called with the following arguments:
  * *`event`:Event* - DOM Event Object.

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

### `un(observable, type, handler[, context])`

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

### `purge([observable, [type, [handler[, context]]]])`

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

### `dispatch(observable, type, properties)`

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

---

### `destructor(handler)`

* Registers destructor event `handler` where all registered `handler`s will run when `Window` Object has unloaded or webpage has navigated out (also when browser is closed).

* `handler` doesn't have arguments when called.

Parameter

Name      | Type  | Description
--        |--     |--
handler | Function | callback function to run when `Window` is unloaded or destroyed.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

## Dimension and Positioning

### `offset(element[, x, y])`

* *Setter:* when `x` and `y` parameter is provided.

  It positions the `element` node to `x` and `y` offset relative to document page.

  > **Warning!**
  >
  > Setter is not supported  if `element` is Window or Document Node.

* *Getter:* when `x` and `y` parameter is omitted.

  It returns Array containing `x` and `y` offset of `element` relative to document page.

  When `element` provided is Window or Document Node, returned offset Array will contain scroll offset of the viewport.

* `x`,`y` and offset Array are always in pixel `px` units.

Parameter

Name      | Type  | Description
--        |--     |--
element | Window, Document Node or Element Node | Accepts DOM `Window`, `Document Node`, or `Element Node`.
[x] | Number | (optional) horizontal pixel offset relative to document page.
[y] | Number | (optional) vertical pixel offset relative to document page.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module is returned when `x`, and `y` is provided. (Setter mode)
Array(Number) | Array | `Array(x, y)` offset is returned when `x`, and `y` is omitted. (Getter mode)

> **Note:**
>
> Setting `element` offset doesn't work on `position: static` styled `element`s.

---

### `size(element[, width, height])`

* *Setter:* when `width` and `height` parameter is provided.

  It resizes the `element` node using `width` and `height` parameter.

  > **Warning!**
  >
  > Setter is not supported  if `element` is Window or Document Node.

* *Getter:* when `width` and `height` parameter is omitted.

  It returns Array containing `width` and `height` size of `element`.

  When `element` provided is Window or Document Node, returned size Array will contain size of the document.

* `width`,`height` and size Array are always in pixel `px` units.

Parameter

Name      | Type  | Description
--        |--     |--
element | Window, Document Node or Element Node | Accepts DOM `Window`, `Document Node`, or `Element Node`.
[width] | Number | (optional) pixel width.
[height] | Number | (optional) pixel height.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module is returned when `width`, and `height` is provided. (Setter mode)
Array(Number) | Array | `Array(width, height)` size is returned when `width`, and `height` is omitted. (Getter mode)

---

### `box(element[, x, y, width, height])`

* *Setter:* when `x`, `y`, `width` and `height` parameter is provided.

  It positions and resizes the `element` node using `x`, `y`, `width`, and `height` parameter.

  > **Warning!**
  >
  > Setter is not supported  if `element` is Window or Document Node.

* *Getter:* when `x`, `y`, `width` and `height` parameter is omitted.

  It returns Array containing `x`, `y`, `right`, `bottom`, `width` and `height` box of `element`.

  When `element` provided is Window or Document Node, returned box Array will contain scroll offset of the viewport and size of the document.

* `x`, `y`, `width`,`height` and box Array are always in pixel `px` units.

Parameter

Name      | Type  | Description
--        |--     |--
element | Window, Document Node or Element Node | Accepts DOM `Window`, `Document Node`, or `Element Node`.
[x] | Number | (optional) horizontal pixel offset relative to document page.
[y] | Number | (optional) vertical pixel offset relative to document page.
[width] | Number | (optional) pixel width.
[height] | Number | (optional) pixel height.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module is returned when `x`, `y`, `width`, and `height` is provided. (Setter mode)
Array(Number) | Array | `Array(x, y, right, bottom, width, height)` box is returned when `x`, `y`, `width`, and `height` is omitted. (Getter mode)

---

### `scroll(dom[, x, y])`

* *Setter:* when `x`, and `y` parameter is provided.

  It scrolls the `dom` node using `x`, and `y` scroll offset parameter.

* *Getter:* when `x`, and `y` parameter is omitted.

  It returns Array containing `x`, `y` scroll offsets of `dom`.

  When `dom` provided is Window or Document Node, returned scroll Array will contain scroll offset of the viewport.

* `x`, `y` and scroll offset Array are always in pixel `px` units.

Parameter

Name      | Type  | Description
--        |--     |--
dom | Window, Document Node or Element Node | Accepts DOM `Window`, `Document Node`, or `Element Node`.
[x] | Number | (optional) horizontal pixel scroll offset.
[y] | Number | (optional) vertical pixel scroll offset.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module is returned when `x`, `y` is provided. (Setter mode)
Array(Number) | Array | `Array(x, y)` scroll offsets is returned when `x`, and `y` is omitted. (Getter mode)

---

### `screen(dom)`

* It returns Array containing `x`, `y` scroll offsets and `width` and `height` of the `dom` viewport.

* `x`, `y`, `width`, `height` and viewport box Array are always in pixel `px` units.

Parameter

Name      | Type  | Description
--        |--     |--
dom | Window, Document Node or Element Node | Accepts DOM `Window`, `Document Node`, or `Element Node`.

Returns

Value | Type  | Description
--    |--     |--
Array(Number) | Array | `Array(x, y, width, height)` viewport box

---

## Node Selection

### `highlight(from, to)`

* Highlights or selects `from` to `to` Element Nodes

Parameter

Name      | Type  | Description
--        |--     |--
from | Element Node | Element where selection starts.
to | Element Node | Element where selection ends.

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---

### `unhighlightable(element[, disableSelect])`

* Disables highlighting of `element` or enables highlighting if `disableSelect` is set to `false`.

Parameter

Name      | Type  | Description
--        |--     |--
element | Element Node | Element to enable or disable selection/highlighting.
[disableSelect] | Boolean | (optional) `true` to disable selection/highlighting or `false` otherwise. *(default value is `true`)*

Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---

### `clearHighlight([documentNode])`

* Clears all highlighted Element nodes in `documentNode`.

Parameter

Name      | Type  | Description
--        |--     |--
[documentNode] | Document Node | (optional) Document Node to clear selection or highlights. *(default value is current `document`)*


Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---

## Animation

### `transition(callback, from, to[, type[, duration]])`

* Traverse transitions overtime within `duration` seconds of `from` and `to` Object's Number properties and execute `callback` function on each transition.

* `callback` function is called with the following arguments:
  * *`result`:Object* - an object containing transition results of `current` animation frame.
  * *`current`:Number* - current animation frame.
  * *`total`:Number* - total animation frame.
* Available easing `type`s based from [http://gizma.com/easing](http://gizma.com/easing):
  1. `linear` - simple linear tweening - no easing, no acceleration
  2. `easeIn` or `easeInQuad` - quadratic easing in - accelerating from zero velocity
  3. `easeOut` or `easeOutQuad` - quadratic easing out - decelerating to zero velocity
  4. `easeInOut` or `easeInOutQuad` - quadratic easing in/out - acceleration until halfway, then deceleration
  5. `easeInCubic` - cubic easing in - accelerating from zero velocity
  6. `easeOutCubic` - cubic easing out - decelerating to zero velocity
  7. `easeInOutCubic` - cubic easing in/out - acceleration until halfway, then deceleration
  8. `easeInQuart` - quartic easing in - accelerating from zero velocity
  9. `easeOutQuart` - quartic easing out - decelerating to zero velocity
  10. `easeInOutQuart` - quartic easing in/out - acceleration until halfway, then deceleration
  11. `easeInQuint` - quintic easing in - accelerating from zero velocity
  12. `easeOutQuint` - quintic easing out - decelerating to zero velocity
  13. `easeInOutQuint` - quintic easing in/out - acceleration until halfway, then deceleration
  14. `easeInSine` - sinusoidal easing in - accelerating from zero velocity
  15. `easeOutSine` - sinusoidal easing out - decelerating to zero velocity
  16. `easeInOutSine` - sinusoidal easing in/out - accelerating until halfway, then decelerating
  17. `easeInExpo` - exponential easing in - accelerating from zero velocity
  18. `easeOutExpo` - exponential easing out - decelerating to zero velocity
  19. `easeInOutExpo` - exponential easing in/out - accelerating until halfway, then decelerating
  20. `easeInCirc` - circular easing in - accelerating from zero velocity
  21. `easeOutCirc` - circular easing out - decelerating to zero velocity
  22. `easeInOutCirc` - circular easing in/out - acceleration until halfway, then deceleration

  Parameter

  Name      | Type  | Description
  --        |--     |--
  callback | Function | Callback function to run on each transition from `from` Object to `to` Object.
  from    | Object | Starting values to animate. (non-Number properties will not be included in the `result` arguments of `callback`)
  to      | Object | Ending values of the animation. (non-Number properties will not be included in the `result` arguments of `callback`)
  [type]  | String | (optional) The easing `type` to use in the animation. (default value is `"linear"`)
  [duration]  | Number | (optional) The duration of the animation in seconds. (default value is `1`)

  Returns

  Value | Type  | Description
  --    |--     |--
  Function(stop animation) | Function | Run this function to stop the running animation.

---

### `animateStyle(element, styles[, type])`

* Animates `element` Node's current style attribute filtered by property names of `styles` Object.

* Possible CSS rules in `element` that can be animated:
  * position: `left`, `bottom`, `top`, and `right`
  * size: `width` and `height` (includes `border-width`, and other CSS rules ending with `-width`)
  * `color` (includes `background-color`, and other CSS rules ending with `-color`)
  * `opacity`

Parameter

Name      | Type  | Description
--        |--     |--
element | Element Node | The Element to animate.
styles | Object | The CSS rules and values to animate (may include non-Number CSS rule values).
type | String | The easing `type` to use in the animation.


Returns

Value | Type  | Description
--    |--     |--
Object(libdom) | Object | libdom module.

---
