/**
 * Use it as a constructor
 * or as a decorator for an existing object
 * or as a base class for extend
 * cannot be used as a mixin for a constructor's prototype
 * without calling the constructor
 */
function EventEmitter3(obj) {
    (obj || this)._callbacks = Object.create(null);
    if (obj) {return Object.assign(obj, EventEmitter3.prototype);}
}

/**
 * Listen on the given `eventName` with `fn`
 *
 * @param {String | Symbol} eventName
 * @param {Function} fn
 * @api public
 */

EventEmitter3.prototype.on = function (eventName, fn) {
    (this._callbacks[eventName] = this._callbacks[eventName] || [])
        .push(fn);
};

/**
 * Adds an `eventName` listener that will be invoked once then removed
 *
 * @param {String | Symbol} eventName
 * @param {Function} fn
 * @api public
 */

EventEmitter3.prototype.once = function (eventName, fn) {
    const once = (data) => {
        this.off(eventName, once);
        fn(data);
    };

    once.fn = fn; // makes it possible to remove with off
    this.on(eventName, once);
};

/**
 * Remove a callback for `eventName` or
 * all callbacks for `eventName` or
 * all callbacks for all events
 *
 * @param {String | Symbol} eventName
 * @param {Function} fn
 * @api public
 */

EventEmitter3.prototype.off = function (eventName, fn) {
    // all
    if (!eventName) {
        this._callbacks = Object.create(null);
        return;
    }

    // specific event
    const callbacks = this._callbacks[eventName];
    if (!callbacks) {
        return;
    }

    // remove all handlers
    if (!fn) {
        delete this._callbacks[eventName];
        return;
    }

    // remove specific handler
    const index = callbacks.findIndex(function (cb) {
        return (cb === fn || cb.fn === fn);
    });
    if (index > -1) {
        // Remove event specific arrays for the eventName type that no
        // one is subscribed for, to avoid memory leak.
        if (callbacks.length === 1) {
            delete this._callbacks[eventName];
        } else {
            callbacks.splice(index, 1);
        }
    }
};

/**
 * Emit `eventName` with data
 *
 * @param {String | Symbol} eventName
 * @param {any} data
 */

EventEmitter3.prototype.emit = function (eventName, data) {
    const callbacks = this._callbacks[eventName];
    if (!callbacks) {
        return;
    }
    const frozenCallbacks = Array.from(callbacks);
    frozenCallbacks.forEach(callback => {
        callback(data);
    });
};

/**
 * Return array of callbacks for `eventName`
 *
 * @param {String | Symbol} eventName
 * @return {Array} listeners
 * @api public
 */

EventEmitter3.prototype.listeners = function (eventName) {
    return this._callbacks[eventName] || [];
};

/**
 * True if this emitter has `eventName` handlers
 *
 * @param {String | Symbol} eventName
 * @return {Boolean}
 * @api public
 */

EventEmitter3.prototype.hasListeners = function (eventName) {
    return Boolean(this.listeners(eventName).length);
};

/**
 * Returns an array of event names for which the emitter has registered listeners
 *
 * @return {Array <String || Symbol>}
 * @api public
 */
EventEmitter3.prototype.eventNames = function () {
    return Reflect.ownKeys(this._callbacks);
};

/**
 * Returns an array of event anmes of type string
 * for which the emitter has registered listeners
 *
 * @return {Array <String>}
 * @api public
 */
EventEmitter3.prototype.eventNamesStrings = function () {
    return Object.keys(this._callbacks);
};

export default EventEmitter3;
