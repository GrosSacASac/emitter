import {
    runEventE3BaslineTests,
    asPrototypeMixin,
    asObjectDecorator,
    inheritance,
} from "./helpers/runEventE3BaslineTests.js";
import Emitter from "../event-e3.js";

runEventE3BaslineTests(Emitter);
// prototype mixin is available in
// https://github.com/GrosSacASac/emitter/releases/tag/1.3.7
// asPrototypeMixin(Emitter);
asObjectDecorator(Emitter);
inheritance(Emitter);