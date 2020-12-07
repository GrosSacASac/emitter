export {
    RegularListener,
    onFirstSubscribeString,
    onLastUnsubscribeString,
    onFirstSubscribe,
    onLastUnsubscribe,
    onSubscribe,
    onUnsubscribe,
};
import { EmitterListenerPlus, onFirstSubscribe, onLastUnsubscribe, onSubscribe, onUnsubscribe } from "./EmitterListenerPlus.js";
import { isString } from "./isString.js";
import { filterEventStream } from "./filterEventStream.js";


const onFirstSubscribeString = Symbol();
const onLastUnsubscribeString = Symbol();

const RegularListener = class extends EmitterListenerPlus {
    constructor() {
        super();
        filterEventStream(this, onFirstSubscribe, onFirstSubscribeString, isString);
        filterEventStream(this, onLastUnsubscribe, onLastUnsubscribeString, isString);
    }
};
