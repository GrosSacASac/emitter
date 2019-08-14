import {
    runEventE3BaslineTests,
    asPrototypeMixin,
    asObjectDecorator,
    inheritance,
} from "./runEventE3BaslineTests.js";
import test from "ava";
import { EmitterListener } from "../source/EmitterListener.js";

runEventE3BaslineTests(EmitterListener);
// asObjectDecorator(EmitterListener); // only with new
inheritance(EmitterListener);