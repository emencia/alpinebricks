import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('knob/knob.html');
  const el = page.locator("#knobr");
  // value
  expect(await el.getAttribute("progress")).toBe("30");
  await page.click("text=More")
  expect(await el.getAttribute("progress")).toBe("40");
  await page.click("text=Less")
  expect(await el.getAttribute("progress")).toBe("30");
  // color
  expect(await el.getAttribute("color")).toBe("red");
  await page.click("text=More", { clickCount: 2 });
  expect(await el.getAttribute("color")).toBe("orange");
  await page.click("text=More", { clickCount: 3 });
  expect(await el.getAttribute("color")).toBe("green");
  // overclick
  await page.click("text=More", { clickCount: 3 });
  expect(await el.getAttribute("progress")).toBe("100");
});