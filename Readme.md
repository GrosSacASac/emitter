# event-e3

Event Emitter 3

## Installation

[`npm i event-e3`](https://www.npmjs.com/package/event-e3)

## import

```js
// rollup webpack typescript
import Emitter from "event-e3";
// node 12+ with --experimental-modules
import Emitter from "event-e3/EventEmitter3.mjs";
// raw import
import Emitter from "./node_modules/event-e3/EventEmitter3.mjs";
// with require()
const Emitter = require("event-e3");
```

## API

`eventName` must be a string or a symbol

### Emitter

As a decorator:

```js
const user = Emitter({ name: 'tobi' });
```

As an instance:

```js
const emitter = new Emitter();
```


### .on(eventName, fn)

Register an `eventName` handler `fn`.

### .emit(eventName, data)

Emit an event `eventName` with data. Will trigger previously registered handlers

### .once(eventName, fn)

Register a single-shot `eventName` handler `fn`, removed immediately after it is invoked the first time.

### .off(eventName, fn)

  * Pass `eventName` and `fn` to remove a listener.
  * Pass `eventName` to remove all listeners on that eventName.
  * Pass nothing to remove all listeners on all events.

### .listeners(eventName)

Return an array of callbacks, or an empty array.

### .hasListeners(eventName)

True if this emitter has any `eventName` handlers.

### .eventNames()

Returns an array listing the events for which the emitter has registered listeners.

### .eventNamesStrings()

Same as `.eventNames()` but the array is only Strings.


## EmitterListener

EmitterListener exposes a way to subscribe to subscriptions and unsubscriptions. It can only be used as a constructor, example usage:

```
import {EmitterListener, onSubscribe, onUnsubscribe} from "event-e3/source/EmitterListener.js";
const x = new EmitterListener(); 

x.on(onSubscribe, console.log.bind('console', 'on\'ed'))
x.on(onUnsubscribe, console.log.bind('console', 'off\'ed')) 
```


## EmitterListenerPlus

EmitterListener further extends EmitterListener. It can be used to direclty listen for the first subscription and last unsubscription for a given event name and  It can only be used as a constructor, example usage:

```
import {EmitterListenerPlus, onFirstSubscribe, onLastUnsubscribe, onSubscribe, onUnsubscribe} from "event-e3/source/EmitterListenerPlus.js";
const x = new EmitterListenerPlus(); 

x.on(onFirstSubscribe, console.log.bind('console', 'on\'ed'))
x.on(onLastUnsubscribe, console.log.bind('console', 'off\'ed')) 
```

## RegularListener

Extends EmitterListenerPlus, also emits `onFirstSubscribeString` and `onLastUnsubscribeString`

## filterEventStream

Makes it convenient to filter an event stream. The new event stream is emitted on the same emitter as regular events.

An example use case: An Emitter emits 'Earthquake' for the scientific community. But the general public is interested in big ones only.

```
import Emitter from "event-e3";
import {filterEventStream} from "event-e3/source/filterEventStream.js";
const earthQuakeEmitter = Emitter({});

const isBigEarthQuake = earthQuake => earthQuake.richterScale > 6;
filterEventStream(earthQuakeEmitter, 'Earthquake', 'BigEarthQuake', isBigEarthQuake);

// the original event is still emitted
earthQuakeEmitter.on('Earthquake', scientificCommunity.study);

// 'BigEarthQuake' happens sometimes
earthQuakeEmitter.on('BigEarthQuake', newsAggregator.publishNews);
earthQuakeEmitter.on('BigEarthQuake', humanHelpWithoutBorders.organize);
```

## Tests

`npm t`

## License

[MIT](./LICENSE)
