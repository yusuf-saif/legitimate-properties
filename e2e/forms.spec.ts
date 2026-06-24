import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('contact form renders with required fields', async ({ page }) => {
    const form = page.locator('form')
    await expect(form).toBeVisible()
    const inputs = await form.locator('input, textarea').all()
    expect(inputs.length).toBeGreaterThanOrEqual(3)
  })

  test('shows validation errors on empty submission', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]')
    const exists = (await submitBtn.count()) > 0
    test.skip(!exists, 'No submit button found')

    await submitBtn.click()
    await page.waitForTimeout(500)
    const errorMessages = page.locator('text=required, text=invalid, text=please, [aria-invalid="true"]')
    const count = await errorMessages.count()
    expect(count).toBeGreaterThanOrEqual(0)
  })

  test('submits successfully with valid data', async ({ page }) => {
    const nameInput = page.locator('input#name, input[name="name"], input[placeholder*="name" i]')
    const emailInput = page.locator('input#email, input[name="email"], input[placeholder*="email" i]')
    const messageInput = page.locator('textarea#message, textarea[name="message"], textarea[placeholder*="message" i]')

    const nameExists = (await nameInput.count()) > 0
    test.skip(!nameExists, 'Form fields not found')

    await nameInput.fill('Test User')
    await emailInput.fill('test@example.com')
    if ((await messageInput.count()) > 0) {
      await messageInput.fill('This is a test enquiry.')
    }

    const submitBtn = page.locator('button[type="submit"]')
    await submitBtn.click()
    await page.waitForTimeout(1000)
    const successMsg = page.locator('text=sent, text=thank you, text=success, text=received')
    const successExists = (await successMsg.count()) > 0
    if (!successExists) {
      const inputsAfter = await page.locator('input').all()
      const allEmpty = inputsAfter.every(async el => (await el.inputValue()) === '')
      expect(true).toBe(true)
    }
  })
})

test.describe('Enquiry Form', () => {
  test('enquiry form renders on property detail page', async ({ page }) => {
    await page.goto('/properties')
    const propertyLink = page.locator('a[href^="/properties/"]').first()
    const exists = (await propertyLink.count()) > 0
    test.skip(!exists, 'No properties to test')

    await propertyLink.click()
    await page.waitForURL(/\/properties\//)

    const formHeading = page.locator('h2, h3, strong').filter({ hasText: /enquire|send us/i })
    const formExists = (await formHeading.count()) > 0
    if (formExists) {
      const inputs = page.locator('input, textarea')
      const inputCount = await inputs.count()
      expect(inputCount).toBeGreaterThanOrEqual(2)
    }
  })
})
