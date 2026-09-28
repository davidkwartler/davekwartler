import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Vercel's analytics script only exists when served by Vercel.
const IGNORED = [/\/_vercel\/insights\//];

function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => {
    if (m.type() === "error" && !IGNORED.some((re) => re.test(m.location().url)))
      errors.push(m.text());
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && !IGNORED.some((re) => re.test(r.url())))
      errors.push(`${r.status()} ${r.url()}`);
  });
  return errors;
}

const routes = [
  { path: "/", heading: "David Kwartler" },
  { path: "/travel", heading: null },
  { path: "/shows", heading: "The live music receipts." },
  { path: "/does-not-exist", heading: "401" },
];

for (const { path, heading } of routes) {
  test(`${path} renders cleanly and passes axe`, async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto(path, { waitUntil: "networkidle" });
    if (heading)
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(heading);

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "best-practice"])
      .analyze();
    const serious = violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical" || v.id === "region",
    );
    expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target).join(", ")}`)).toEqual([]);

    // The 404 route answers with a 404 status by design
    const unexpected = errors.filter(
      (e) => !(path === "/does-not-exist" && e.includes(path)) &&
        !(path === "/does-not-exist" && e.includes("404 (Not Found)")),
    );
    expect(unexpected).toEqual([]);
  });
}

test("hero actions link to contact and LinkedIn", async ({ page }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero.getByRole("link", { name: "Get in touch" })).toHaveAttribute("href", "#contact");
  await expect(hero.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
    "href",
    /linkedin\.com\/in\/dkwartler/,
  );
});

test("copy email puts the address on the clipboard", async ({ page, context, browserName }) => {
  test.skip(browserName !== "chromium", "clipboard permissions are Chromium-only");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "david@davidkwartler.com",
  );
});

test("mobile menu is labelled and closes on Escape", async ({ page, isMobile }) => {
  test.skip(!isMobile, "hamburger is mobile-only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  const close = page.getByRole("button", { name: "Close menu" });
  await expect(close).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
});
