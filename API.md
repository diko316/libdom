# API Documentation

## Table of Contents

* [DOM Node](#dom-node)
* [Cascading Stylesheet](#cascading-stylesheet)
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
[HTMLElement,..] | Array | May be empty if no node matched the `selector`.

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

#### `addClass(element, className[, ...])`

* Adds `className` (or `className`s) into `element`.
* `className` (or `className`s) will not be added if it exist already in "class" attribute of `element`.

Parameter

Name      | Type  | Description
--        |--     |--
element | Node | Element Node.
className[className, ..] | String | (multiple) CSS class to append

Returns

Value | Type  | Description
--    |--     |--
libdom | Object | The libdom module for chaining method calls.

## Events
## Dimension and Positioning
## Node Selection
## Animation
## Misc
