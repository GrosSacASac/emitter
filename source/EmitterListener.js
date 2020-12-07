export { EmitterListener, onSubscribe, onUnsubscribe };
import Emitter from "../event-e3.js";


const onSubscribe = Symbol();
const onUnsubscribe = Symbol();

const EmitterListener = class extends Emitter {
    on(eventName, fn) {
        this.emit(onSubscribe, { eventName, functionName: fn.name });
        // emit after to not show self subscription (onSubscribe)
        super.on(eventName, fn);
    }

    off(eventName, fn) {
        // emit before to not show self (onUnsubscribe)
        super.off(eventName, fn);
        if (eventName !== undefined && fn) {
            this.emit(onUnsubscribe, { eventName, functionName: fn.name });
        } else if (eventName !== undefined && !fn) {
            const listeners = this.listeners(eventName);
            listeners.forEach(listener => {
                this.emit(onUnsubscribe, {
                    eventName: listener,
                    functionName: listener.name,
                });
            });
        } // else no chance to observe
    }
};
