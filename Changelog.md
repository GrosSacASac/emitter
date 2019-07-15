# Changelog

## 8.0.0

Rename file into event-e3.js

## 7.5.0

 * add method eventNamesStrings

## 7.4.0

 * add RegularListener

## 7.3.0

 * add filterEventStream

## 7.2.0

 * add EmitterListenerPlus

## 7.1.0

 * add EmitterListener as something that can also be imported

## 7.0.0

 * remove .addEventListener alias, use .on instead
 * remove .removeListener .removeAllListeners .removeEventListener aliases, use .off instead
 * Rename History.md into Changelog.md
  
 ## 6.0.0

 * emit takes exactly two arguments, the second one is optional
 * `this` is not defined in the callback

## 5.0.0

 * disable chaining

## 4.1.0

 * commonjs require is avaibable without any extra tool
 * npm package includes built/EventEmitter3.js

## 4.0.5

 * Reenable tests
 * Rename into EventEmitter3.mjs

## 4.0.0

 * name is event-e3 (package.json)
 * name is event-e3 (github)
 * publish event-e3 to npm
 * expose as ES Module (default export)


## 3.0.0

 * Leverage ES2015+ features for cleaner code
 * Use package-lock.json for stability
 * Rename into EventEmitter3.js
 * Remove make file (see readme)
 * Disable outdated tests

## 2.0.0

 * Cannot be used as a prototype mixin anymore

## 1.3.7 / 2018-08-30

 * Implementation change
 * avoid mixin polution

## 1.3.0 / 2017-02-19

 * Add `eventNames`

## 1.2.2 / 2017-02-19

 * Optimize emit
 * Fix memory leak
 * Replace `$` prefixing with `Object.create(null)`

## 1.2.1 / 2016-04-18

 * enable client side use

## 1.2.0 / 2014-02-12

 * prefix events with `$` to support object prototype method names

## 1.1.3 / 2014-06-20

 * republish for npm
 * add LICENSE file

## 1.1.2 / 2014-02-10

  * package: rename to "component-emitter"
  * package: update "main" and "component" fields
  * Add license to Readme (same format as the other components)
  * created .npmignore
  * travis stuff

## 1.1.1 / 2013-12-01

  * fix .once adding .on to the listener
  * component: add `.repo` prop

## 1.1.0 / 2013-10-20

 * add `.addEventListener()` and `.removeEventListener()` aliases

## 1.0.1 / 2013-06-27

 * add support for legacy ie

## 1.0.0 / 2013-02-26

  * add `.off()` support for removing all listeners

## 0.0.6 / 2012-10-08

  * add `this._callbacks` initialization to prevent funky gotcha

## 0.0.5 / 2012-09-07

  * fix `Emitter.call(this)` usage

## 0.0.3 / 2012-07-11

  * add `.listeners()`
  * rename `.has()` to `.hasListeners()`

## 0.0.2 / 2012-06-28

  * fix `.off()` with `.once()`-registered callbacks
