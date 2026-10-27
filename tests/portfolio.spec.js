import { test, expect } from '@playwright/test';

test('production page loads every chapter and asset without browser errors', async ({ page }) => {
  const errors = [];
  const failedResponses = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('requestfailed', (request) => errors.push(`${request.url()}: ${request.failure()?.errorText}`));
  page.on('response', (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
  });

  await page.goto('/');
  await expect(page).toHaveTitle('Jiyan (Livia) Lu | Accounting, Finance & Tax');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Livia’s');
  await expect(page.locator('main section')).toHaveCount(6);
  await expect(page.locator('img')).toHaveCount(7);
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));

  const linkedInLinks = page.getByRole('link', { name: 'Connect with Livia on LinkedIn (opens in a new tab)' });
  await expect(linkedInLinks).toHaveCount(2);
  for (const link of await linkedInLinks.all()) {
    await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/livia-lu-584baa390/');
  }
  expect(errors).toEqual([]);
  expect(failedResponses).toEqual([]);
});

test('CV buttons download the PDF with a clear filename', async ({ page }) => {
  await page.route('**/cv/Jiyan-Lu-CV.pdf', (route) => route.fulfill({
    status: 200,
    contentType: 'application/pdf',
    body: '%PDF-1.4\n%%EOF'
  }));
  await page.goto('/');
  const cvLinks = page.getByRole('link', { name: 'Download CV' });
  await expect(cvLinks).toHaveCount(2);
  for (const link of await cvLinks.all()) {
    await expect(link).toHaveAttribute('href', '/cv/Jiyan-Lu-CV.pdf');
    await expect(link).toHaveAttribute('download', '');
  }
  const downloadPromise = page.waitForEvent('download');
  await cvLinks.last().click();
  expect((await downloadPromise).suggestedFilename()).toBe('Jiyan-Lu-CV.pdf');
});

test('contact scene uses the posting dog instead of the old stamp', async ({ page }) => {
  await page.goto('/#contact');
  await expect(page.locator('#contact img[src="/assets/contact-dog-posting.png"]')).toBeVisible();
  await expect(page.locator('#contact .scene-stamp')).toHaveCount(0);
});

test('page ends without the old footer', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer')).toHaveCount(0);
});

test('navigation is compact without shrinking touch targets', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open journey navigation' }).click();
  const panel = page.locator('#journey-menu');
  expect((await panel.boundingBox()).width).toBeLessThanOrEqual(230);
  for (const link of await page.getByRole('navigation', { name: 'Journey stops' }).getByRole('link').all()) {
    expect((await link.boundingBox()).height).toBeGreaterThanOrEqual(44);
  }
});

test('chapter navigation and deep links scroll to the right content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open journey navigation' }).click();
  await page.getByRole('navigation', { name: 'Journey stops' }).getByRole('link', { name: 'Work Experience' }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.getByRole('heading', { name: 'Work Experience', exact: true })).toBeInViewport();

  await page.goto('/#contact');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Let’s Connect' })).toBeInViewport();
});

test('mobile navigation closes with Escape and after following a link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Journey stops' });
  await page.getByRole('button', { name: 'Open journey navigation' }).click();
  await expect(navigation).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(navigation).toBeHidden();

  await page.getByRole('button', { name: 'Open journey navigation' }).click();
  await navigation.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(navigation).toBeHidden();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole('heading', { name: 'Let’s Connect' })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test('contact form sends the expected payload and clears after success', async ({ page }) => {
  let payload;
  await page.route('https://api.web3forms.com/submit', async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, json: { success: true } });
  });
  await page.goto('/#contact');
  await page.getByLabel('Name', { exact: true }).fill('Test Visitor');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Message', { exact: true }).fill('A test enquiry');
  await page.getByRole('button', { name: 'Send message' }).click();

  await expect(page.getByRole('status')).toHaveText('Thanks — your message has been sent.');
  expect(payload).toMatchObject({
    access_key: 'test-key',
    name: 'Test Visitor',
    email: 'visitor@example.com',
    message: 'A test enquiry',
    subject: 'Portfolio enquiry from Test Visitor'
  });
  await expect(page.getByLabel('Name', { exact: true })).toBeEmpty();
  await expect(page.getByLabel('Email', { exact: true })).toBeEmpty();
  await expect(page.getByLabel('Message', { exact: true })).toBeEmpty();
});

test('contact form validates input and keeps the message after rejection', async ({ page }) => {
  await page.route('https://api.web3forms.com/submit', (route) => route.fulfill({ status: 200, json: { success: false } }));
  await page.goto('/#contact');
  const name = page.getByLabel('Name', { exact: true });
  await page.getByRole('button', { name: 'Send message' }).click();
  expect(await name.evaluate((input) => input.validationMessage)).not.toBe('');

  await name.fill('Test Visitor');
  await page.getByLabel('Email', { exact: true }).fill('visitor@example.com');
  await page.getByLabel('Message', { exact: true }).fill('Keep this text');
  await page.getByRole('button', { name: 'Send message' }).click();
  await expect(page.getByRole('status')).toHaveText('Message could not be sent. Please try again or use LinkedIn.');
  await expect(page.getByLabel('Message', { exact: true })).toHaveValue('Keep this text');
  await expect(page.getByRole('button', { name: 'Send message' })).toBeEnabled();
});
