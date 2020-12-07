import {
    runEventE3BaslineTests,
    asPrototypeMixin,
    asObjectDecorator,
    inheritance,
} from "./helpers/runEventE3BaslineTests.js";
import test from "ava";
import { EmitterListenerPlus } from "../source/EmitterListenerPlus.js";

runEventE3BaslineTests(EmitterListenerPlus);
// asObjectDecorator(EmitterListener); // only with new
inheritance(EmitterListenerPlus);

// todo add here specific tests for this variant