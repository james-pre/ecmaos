import assert from "assert";
import { enabled, init } from "../build/debug.js";
init('fake-kernel-id');
assert.strictEqual(enabled.value, true);
console.log("ok");
