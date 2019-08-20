import {
    runEventE3BaslineTests,
    asPrototypeMixin,
    asObjectDecorator,
    inheritance,
} from "./runEventE3BaslineTests.js";
import test from "ava";
import { RegularListener } from "../source/RegularListener.js";

runEventE3BaslineTests(RegularListener);
// asObjectDecorator(RegularListener); // only with new
inheritance(RegularListener);

// todo add here specific tests for this variant