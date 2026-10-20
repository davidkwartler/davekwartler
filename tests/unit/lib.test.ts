// Property tests for the pure helpers in src/lib, run with Node's own test
// runner (`npm run test:unit`): no bundler, Node strips the types. Playwright
// skips this folder (testIgnore in playwright.config.ts).

import { test } from "node:test";
import assert from "node:assert/strict";
import fc from "fast-check";
import { mulberry32 } from "../../src/lib/star-seed.ts";
import { todayInAustin } from "../../src/lib/austin-date.ts";

const DAY_MS = 24 * 60 * 60 * 1000;
// Any instant from 1970 to 2100
const instant = fc.integer({ min: 0, max: 4_102_444_800_000 }).map((ms) => new Date(ms));

test("mulberry32 replays the same sequence for the same seed", () => {
  fc.assert(
    fc.property(fc.integer(), (seed) => {
      const a = mulberry32(seed);
      const b = mulberry32(seed);
      for (let i = 0; i < 20; i++) assert.equal(a(), b());
    }),
  );
});

test("mulberry32 stays in [0, 1)", () => {
  fc.assert(
    fc.property(fc.integer(), fc.integer({ min: 1, max: 200 }), (seed, n) => {
      const next = mulberry32(seed);
      for (let i = 0; i < n; i++) {
        const x = next();
        assert.ok(x >= 0 && x < 1, `${x} out of range`);
      }
    }),
  );
});

test("mulberry32 reads the seed as a uint32", () => {
  fc.assert(
    fc.property(fc.integer({ min: 0, max: 0xffffffff }), (seed) => {
      assert.equal(mulberry32(seed)(), mulberry32(seed + 2 ** 32)());
    }),
  );
});

test("todayInAustin is an ISO calendar date", () => {
  fc.assert(
    fc.property(instant, (now) => {
      const day = todayInAustin(now);
      assert.match(day, /^\d{4}-\d{2}-\d{2}$/);
      assert.equal(new Date(`${day}T00:00:00Z`).toISOString().slice(0, 10), day);
    }),
  );
});

test("todayInAustin trails UTC by zero or one day", () => {
  fc.assert(
    fc.property(instant, (now) => {
      const utc = now.toISOString().slice(0, 10);
      const austin = todayInAustin(now);
      const behind = (Date.parse(utc) - Date.parse(austin)) / DAY_MS;
      assert.ok(behind === 0 || behind === 1, `${austin} vs UTC ${utc}`);
    }),
  );
});

test("todayInAustin never goes backwards", () => {
  fc.assert(
    fc.property(instant, fc.integer({ min: 0, max: 400 * DAY_MS }), (now, later) => {
      assert.ok(todayInAustin(now) <= todayInAustin(new Date(now.getTime() + later)));
    }),
  );
});
