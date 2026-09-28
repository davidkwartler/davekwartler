// Following a link to the hash you're already on is a no-op for both the
// browser and the Next router, so a second "Contact" click wouldn't scroll.
// Returns true when it handled the scroll itself.
export function scrollIfSameSection(href: string) {
  const match = /^\/?#(.+)$/.exec(href);
  if (!match || window.location.pathname !== "/" || window.location.hash !== `#${match[1]}`)
    return false;
  // scroll-behavior in globals.css keeps this smooth, or instant under
  // reduced motion
  document.getElementById(match[1])?.scrollIntoView();
  return true;
}
