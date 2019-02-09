/*
EmitterListener is like Emitter but also allow to subscribe to subscriptions and unsubscriptions
limitation: it only works when off is used to unsubscribe 1 only 
example usage
const x = new EmitterListener(); 
x.on(onSymbol, console.log.bind('console', 'on\'ed'))
x.on(offSymbol, console.log.bind('console', 'off\'ed')) // -->  on'ed { eventName: offSymbol, functionName: "bound log" }

x.on('a', console.log) // -->  on'ed { eventName: "a", functionName: "log" }
x.emit('a', 'aaaaaaaaaaaaaaaaaaaaa') // -->  aaaaaaaaaaaaaaaaaaaaa
x.off('a') // -->  off'ed  { eventName: "a", functionName: undefined }
x.emit('a', 'aaaaaaaaaaaaaaaaaaaaa') // --> nothing   
*/

export {EmitterListener, onSymbol, offSymbol};
import Emitter from "../EventEmitter3.mjs";

const onSymbol = Symbol();
const offSymbol = Symbol();

const EmitterListener = class extends Emitter {
    constructor() {
        super();
    }

    on(eventName, fn) {
        this.emit(onSymbol, {eventName, functionName: fn.name});
        super.on(eventName, fn);
    }

    off(eventName, fn) {
        this.emit(offSymbol, {eventName, functionName: fn && fn.name});
        super.off(eventName, fn);
    }
};