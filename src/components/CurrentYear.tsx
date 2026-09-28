"use client";

import { useSyncExternalStore } from "react";

// The page is prerendered once at build time, so a plain `new Date()` would
// freeze the footer at the year of the last deploy. The static HTML carries
// the build year; hydration swaps in the visitor's current year.
const BUILD_YEAR = new Date().getFullYear();
const subscribe = () => () => {};

export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}
