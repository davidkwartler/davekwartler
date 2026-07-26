// The galaxy's star layout is random, but rolling a fresh one on every page
// load made the sky visibly rearrange itself on each refresh, and again on
// every hop to /travel and back. The seed is now cached for 20 minutes, so a
// session sees one stable sky and a later visit gets a new one.
//
// Star positions are only ever drawn to canvas, never server-rendered, so a
// cached seed can't produce a hydration mismatch.

const KEY = "dk:galaxy-seed";
const TTL_MS = 20 * 60 * 1000;

/**
 * Small fast PRNG (mulberry32). Same seed in, same sequence out, which is the
 * whole point: `Math.random` can't be replayed.
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The session's star seed. Reads through to localStorage, minting and storing
 * a new one when there's nothing cached or the cache has aged out. The stored
 * timestamp is deliberately not refreshed on read, so the sky turns over 20
 * minutes after it first appeared rather than 20 minutes after the last page
 * view.
 *
 * Every storage access is guarded: Safari private mode throws on write, and a
 * hand-edited or truncated value shouldn't take the hero down. Any failure
 * just means an uncached seed, which is the old behaviour.
 */
export function galaxySeed(): number {
  if (typeof window === "undefined") return 1;

  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        const { seed, at } = parsed as { seed?: unknown; at?: unknown };
        if (
          typeof seed === "number" &&
          Number.isFinite(seed) &&
          typeof at === "number" &&
          Number.isFinite(at) &&
          Date.now() - at < TTL_MS
        ) {
          return seed >>> 0;
        }
      }
    }
  } catch {
    // Unreadable or unparseable: fall through and mint a fresh one
  }

  const seed = (Math.random() * 0xffffffff) >>> 0;
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ seed, at: Date.now() }));
  } catch {
    // Private mode or quota: the seed still works, it just won't persist
  }
  return seed;
}
