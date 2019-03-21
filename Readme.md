# event-e3

Event Emitter 3

## Installation

[`npm i event-e3`](https://www.npmjs.com/package/event-e3)

## import

```js
import Emitter from "event-e3";
```

raw import

```js
import Emitter from "./node_modules/event-e3/EventEmitter3.mjs";
```

node

```js
const Emitter = require("event-e3");
```

## API

`eventName` must be a string or a symbol

### Emitter

As a decorator:

```js
const user = Emitter({ name: 'tobi' });


user.emit(`I'm a user`, true);
```

  As an instance:

```js
const emitter = new Emitter();
emitter.emit(`I'm an emitter`, true);
```


### .on(eventName, fn)

  Register an `eventName` handler `fn`.

### .emit(eventName, data)

 Emit an event `eventName` with data. Will trigger previously registered handlers

### .once(eventName, fn)

  Register a single-shot `eventName` handler `fn`,
  removed immediately after it is invoked the
  first time.

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


## EmitterListener

EmitterListener is like Emitter but also allow to subscribe to subscriptions and unsubscriptions. It can only be used as a constructor, example usage:

```
import {EmitterListener, onSubscribe, onUnsubscribe} from "event-e3/source/EmitterListener";
const x = new EmitterListener(); 

x.on(onSubscribe, console.log.bind('console', 'on\'ed'))
x.on(onUnsubscribe, console.log.bind('console', 'off\'ed')) 
```

## Tests

`npm t`

## License

MIT
