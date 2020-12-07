export {
    runEventE3BaslineTests,
    asPrototypeMixin,
    asObjectDecorator,
    inheritance,
};
import test from "ava";


const runEventE3BaslineTests = (Emitter) => {
    test(`Symbols or Stings for eventName, Symbols should be returned by eventNames`, t => {
        const emitter = new Emitter();
        const s = Symbol();
        const s2 = "event"
        emitter.on(s, () => { });
        emitter.on(s2, () => { });

        t.is(emitter.eventNames().includes(s), true);
        t.is(emitter.eventNames().includes(s2), true);
    })

    test(`Stings only for eventNamesStrings, Symbols should be returned by eventNames`, t => {
        const emitter = new Emitter();
        const s = Symbol();
        const s2 = "event"
        emitter.on(s, () => { });
        emitter.on(s2, () => { });

        t.is(emitter.eventNamesStrings().includes(s), false);
        t.is(emitter.eventNamesStrings().includes(s2), true);
    })

    test(`Symbols should be taken into account`, t => {
        const emitter = new Emitter();
        const s = Symbol();
        emitter.on(s, () => { });

        t.is(emitter.hasListeners(s), true);
    })

    test(`Emitter.on(event, fn) should add listeners`, t => {
        const emitter = new Emitter();
        const calls = [];

        emitter.on(`foo`, function (val) {
            calls.push(`one`, val);
        });

        emitter.on(`foo`, function (val) {
            calls.push(`two`, val);
        });

        emitter.emit(`foo`, 1);
        emitter.emit(`bar`, 1);
        emitter.emit(`foo`, 2);

        t.deepEqual(calls, [`one`, 1, `two`, 1, `one`, 2, `two`, 2]);
    })

    test(`should also work with symbols`, t => {
        const eventName = Symbol()
        const emitter = new Emitter();
        const calls = [];

        emitter.on(eventName, function (val) {
            calls.push(`one`, val);
        });

        emitter.emit(eventName, 1);

        t.deepEqual(calls, [`one`, 1]);
    })

    test(`should add listeners for events which are same names with methods of Object.prototype`, t => {
        const emitter = new Emitter();
        const calls = [];

        emitter.on(`constructor`, function (val) {
            calls.push(`one`, val);
        });

        emitter.on(`__proto__`, function (val) {
            calls.push(`two`, val);
        });

        emitter.emit(`constructor`, 1);
        emitter.emit(`__proto__`, 2);

        t.deepEqual(calls, [`one`, 1, `two`, 2]);
    });

    test(`.once(event, fn) should add a single-shot listener`, t => {
        const emitter = new Emitter();
        const calls = [];

        emitter.once(`foo`, function (val) {
            calls.push(`one`, val);
        });

        emitter.emit(`foo`, 1);
        emitter.emit(`foo`, 2);
        emitter.emit(`foo`, 3);
        emitter.emit(`bar`, 1);

        t.deepEqual(calls, [`one`, 1]);
    });

    test(`.off(event, fn) should remove a listener`, t => {
        const emitter = new Emitter();
        const calls = [];

        function one() { calls.push(`one`); }
        function two() { calls.push(`two`); }

        emitter.on(`foo`, one);
        emitter.on(`foo`, two);
        emitter.off(`foo`, two);

        emitter.emit(`foo`);

        t.deepEqual(calls, [`one`]);
    });

    test(`should work with .once()`, t => {
        const emitter = new Emitter();
        const calls = [];

        function one() { calls.push(`one`); }

        emitter.once(`foo`, one);
        emitter.once(`fee`, one);
        emitter.off(`foo`, one);

        emitter.emit(`foo`);

        t.deepEqual(calls, []);
    });

    test(`should work when called from an event`, t => {
        const emitter = new Emitter();
        let called = false;

        function b() {
            called = true;
        }
        emitter.on(`tobi`, b);
        emitter.on(`tobi`, function () {
            emitter.off(`tobi`, b);
        });

        emitter.emit(`tobi`);
        t.is(called, true);
        called = false;
        emitter.emit(`tobi`);
        t.is(called, false);
    });

    test(`.off(event) should remove all listeners for an event`, t => {
        const emitter = new Emitter();
        const calls = [];

        function one() { calls.push(`one`); }
        function two() { calls.push(`two`); }

        emitter.on(`foo`, one);
        emitter.on(`foo`, two);
        emitter.off(`foo`);

        emitter.emit(`foo`);
        emitter.emit(`foo`);

        t.deepEqual(calls, []);
    });

    test(`should remove event array to avoid memory leak`, t => {
        const emitter = new Emitter();

        function cb() { }

        emitter.on(`foo`, cb);
        emitter.off(`foo`, cb);


        t.is(emitter.hasListeners(`foo`), false);
    });

    test(`should only remove the event array when the last subscriber unsubscribes`, t => {
        const emitter = new Emitter();

        function cb1() { }
        function cb2() { }

        emitter.on(`foo`, cb1);
        emitter.on(`foo`, cb2);
        emitter.off(`foo`, cb1);

        t.is(emitter.hasListeners(`foo`), true);
    });

    test(`.off() should remove all listeners`, t => {
        const emitter = new Emitter();
        const calls = [];

        function one() { calls.push(`one`); }
        function two() { calls.push(`two`); }

        emitter.on(`foo`, one);
        emitter.on(`bar`, two);

        emitter.emit(`foo`);
        emitter.emit(`bar`);

        emitter.off();

        emitter.emit(`foo`);
        emitter.emit(`bar`);

        t.deepEqual(calls, [`one`, `two`])
    });

    test(`.listeners(event) when handlers are present should return an array of callbacks`, t => {
        const emitter = new Emitter();
        function foo() { }
        emitter.on(`foo`, foo);
        t.deepEqual(emitter.listeners(`foo`), [foo]);
    });

    test(`when no handlers are present should return an empty array`, t => {
        const emitter = new Emitter();
        t.deepEqual(emitter.listeners(`foo`), []);
    });

    test(`.hasListeners(event) when handlers are present should return true`, t => {
        const emitter = new Emitter();
        emitter.on(`foo`, function () { });
        t.is(emitter.hasListeners(`foo`), true);
    });

    test(`when no handlers are present should return false`, t => {
        const emitter = new Emitter();
        t.is(emitter.hasListeners(`foo`), false);
    });
};

const inheritance = (Emitter) => {
    test(`Prototype inheritance with .prototype`, t => {
        let run = false;
        function Custom() {
            const emitter = new Emitter();
            // customize here
            return emitter;
        }

        Object.setPrototypeOf(Custom.prototype, Emitter.prototype);

        const emitter = new Custom();

        emitter.on(`foo`, () => {
            run = true;
        });
        emitter.emit(`foo`);

        t.is(run, true);
    });


    test(`Prototype inheritance using class syntax with super`, t => {
        let run = false
        class CustomE extends Emitter {
            constructor() {
                super()
            }
        }

        const emitter = new CustomE();
        emitter.on(`foo`, () => {
            run = true
        });
        emitter.emit(`foo`);

        t.is(run, true);
    })
};

const asObjectDecorator = (Emitter) => {
    test(`Emitter(obj) should decorate`, t => {
        const calls = [];

        const proto = {};
        Emitter(proto);
        proto.on(`something`, function () {
            calls.push(7);
        });
        proto.emit(`something`);

        t.deepEqual(calls, [7]);
    })

};

const asPrototypeMixin = (Emitter) => {
    test(`prototype mixin should work on instances`, t => {
        const User = function (name, age = 18) {
            this.age = age;
        };
        Emitter(User.prototype);

        const julie = new User(`Julie`);

        julie.on(`birthday`, function () {
            julie.age += 1;
        });

        julie.emit(`birthday`);

        t.is(julie.age, 19);
    })

    test(`should work separately on many instances`, t => {
        const User = function (name, age = 18) {
            this.age = age;
        };
        Emitter(User.prototype);

        const julie = new User(`Julie`);
        const moritz = new User(`Moritz`);

        julie.on(`birthday`, function () {
            julie.age += 1;
        });
        moritz.on(`birthday`, function () {
            moritz.age += 1;
        });

        julie.emit(`birthday`);

        t.is(julie.age, 19);
        t.is(moritz.age, 18, `was not the birthday of Moritz`);
    });

    test(`should work separately on instance and constructor`, t => {
        const User = function (name, age = 18) {
            this.age = age;
        };
        Emitter(User.prototype);

        let age = 1000;
        const julie = new User(`Julie`);

        julie.on(`birthday`, function () {
            julie.age += 1;
        });
        User.prototype.on(`birthday`, function () {
            age += 1;
        });

        User.prototype.emit(`birthday`);

        t.is(julie.age, 18);
        t.is(age, 1001);

        julie.emit(`birthday`);
        t.is(julie.age, 19);
        t.is(age, 1001);
    });
};
