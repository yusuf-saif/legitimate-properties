"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/unist-util-filter";
exports.ids = ["vendor-chunks/unist-util-filter"];
exports.modules = {

/***/ "(ssr)/./node_modules/unist-util-filter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/unist-util-filter/index.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar convert = __webpack_require__(/*! unist-util-is/convert */ \"(ssr)/./node_modules/unist-util-is/convert.js\")\n\nmodule.exports = filter\n\nvar own = {}.hasOwnProperty\n\nfunction filter(tree, options, test) {\n  var is = convert(test || options)\n  var cascade = options.cascade == null ? true : options.cascade\n\n  return preorder(tree, null, null)\n\n  function preorder(node, index, parent) {\n    var children\n    var childIndex\n    var result\n    var next\n    var key\n\n    if (!is(node, index, parent)) return null\n\n    if (node.children) {\n      children = []\n      childIndex = -1\n\n      while (++childIndex < node.children.length) {\n        result = preorder(node.children[childIndex], childIndex, node)\n\n        if (result) {\n          children.push(result)\n        }\n      }\n\n      if (cascade && node.children.length && !children.length) return null\n    }\n\n    // Create a shallow clone, using the new children.\n    next = {}\n\n    for (key in node) {\n      /* istanbul ignore else - Prototype injection. */\n      if (own.call(node, key)) {\n        next[key] = key === 'children' ? children : node[key]\n      }\n    }\n\n    return next\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdW5pc3QtdXRpbC1maWx0ZXIvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQVk7O0FBRVosY0FBYyxtQkFBTyxDQUFDLDRFQUF1Qjs7QUFFN0M7O0FBRUEsWUFBWTs7QUFFWjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbGVnaXRpbWF0ZS1wcm9wZXJ0aWVzLy4vbm9kZV9tb2R1bGVzL3VuaXN0LXV0aWwtZmlsdGVyL2luZGV4LmpzP2M2MzYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbnZhciBjb252ZXJ0ID0gcmVxdWlyZSgndW5pc3QtdXRpbC1pcy9jb252ZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJcblxudmFyIG93biA9IHt9Lmhhc093blByb3BlcnR5XG5cbmZ1bmN0aW9uIGZpbHRlcih0cmVlLCBvcHRpb25zLCB0ZXN0KSB7XG4gIHZhciBpcyA9IGNvbnZlcnQodGVzdCB8fCBvcHRpb25zKVxuICB2YXIgY2FzY2FkZSA9IG9wdGlvbnMuY2FzY2FkZSA9PSBudWxsID8gdHJ1ZSA6IG9wdGlvbnMuY2FzY2FkZVxuXG4gIHJldHVybiBwcmVvcmRlcih0cmVlLCBudWxsLCBudWxsKVxuXG4gIGZ1bmN0aW9uIHByZW9yZGVyKG5vZGUsIGluZGV4LCBwYXJlbnQpIHtcbiAgICB2YXIgY2hpbGRyZW5cbiAgICB2YXIgY2hpbGRJbmRleFxuICAgIHZhciByZXN1bHRcbiAgICB2YXIgbmV4dFxuICAgIHZhciBrZXlcblxuICAgIGlmICghaXMobm9kZSwgaW5kZXgsIHBhcmVudCkpIHJldHVybiBudWxsXG5cbiAgICBpZiAobm9kZS5jaGlsZHJlbikge1xuICAgICAgY2hpbGRyZW4gPSBbXVxuICAgICAgY2hpbGRJbmRleCA9IC0xXG5cbiAgICAgIHdoaWxlICgrK2NoaWxkSW5kZXggPCBub2RlLmNoaWxkcmVuLmxlbmd0aCkge1xuICAgICAgICByZXN1bHQgPSBwcmVvcmRlcihub2RlLmNoaWxkcmVuW2NoaWxkSW5kZXhdLCBjaGlsZEluZGV4LCBub2RlKVxuXG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICBjaGlsZHJlbi5wdXNoKHJlc3VsdClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoY2FzY2FkZSAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCAmJiAhY2hpbGRyZW4ubGVuZ3RoKSByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIHNoYWxsb3cgY2xvbmUsIHVzaW5nIHRoZSBuZXcgY2hpbGRyZW4uXG4gICAgbmV4dCA9IHt9XG5cbiAgICBmb3IgKGtleSBpbiBub2RlKSB7XG4gICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgZWxzZSAtIFByb3RvdHlwZSBpbmplY3Rpb24uICovXG4gICAgICBpZiAob3duLmNhbGwobm9kZSwga2V5KSkge1xuICAgICAgICBuZXh0W2tleV0gPSBrZXkgPT09ICdjaGlsZHJlbicgPyBjaGlsZHJlbiA6IG5vZGVba2V5XVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXh0XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/unist-util-filter/index.js\n");

/***/ })

};
;