// Calendar dates in Austin time, shared by the shows page's build-time
// render and the visitor's browser.

const austinDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Today in Austin as YYYY-MM-DD (en-CA formats dates in ISO order). */
export function todayInAustin(now = new Date()) {
  return austinDate.format(now);
}
