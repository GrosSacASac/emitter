export { EmitterListenerPlus, onFirstSubscribe, onLastUnsubscribe, onSubscribe, onUnsubscribe };
import { EmitterListener, onSubscribe, onUnsubscribe } from "./EmitterListener.js";


const onFirstSubscribe = Symbol();
const onLastUnsubscribe = Symbol();

const EmitterListenerPlus = class extends EmitterListener {
    on(eventName, fn) {
        if (this.listeners(eventName).length === 0) {
            this.emit(onFirstSubscribe, eventName);
        }
        super.on(eventName, fn);
    }

    off(eventName, fn) {
        super.off(eventName, fn);
        if (eventName !== undefined) {
            if (!fn || this.listeners(eventName).length === 0) {
                this.emit(onLastUnsubscribe, eventName);
            }
        }  // else no chance to observe
    }
};
